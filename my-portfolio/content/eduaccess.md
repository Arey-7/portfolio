---
title: EduAccess
status: in-progress
year: 2026
summary: An offline-first learning network that puts a full Khan Academy library inside a community with no reliable internet, and lets students pay in mobile-money increments.
stack: [Flask, Kolibri, MikroTik RouterOS, M-Pesa Daraja, Raspberry Pi]
diagram: eduaccess
---

## The problem

In most conversations about educational access, "connectivity" is treated as a binary: a school has internet, or it doesn't. In practice, the communities I was building for sit in a more awkward middle. There is intermittent cellular coverage. There are smartphones. What's missing is a link that's fast enough and cheap enough to stream educational video to thirty students at once, and a payment model that matches how people actually hold money — in small, irregular amounts on a mobile wallet, not on a card that gets charged monthly.

So the design constraint wasn't "build a learning platform." It was: assume the uplink is unreliable, expensive, or absent; assume the payment rail is M-Pesa; assume the enforcement has to hold up when a curious student pokes at it; and assume nobody is on site to administer the thing.

## What it is

EduAccess (running as **Ar3y Online School**) is a self-contained learning network deployed at the edge:

| Component | Role |
|---|---|
| **Ubuntu 24.04 edge server** | Hosts Kolibri LMS with Khan Academy Science & Engineering content, plus the Flask portal application |
| **MikroTik hAP lite router** | Hotspot gateway and enforcement point — issues the captive portal, holds IP bindings, runs the firewall |
| **DigitalOcean VPS** | Public endpoint; receives M-Pesa payment callbacks and acts as the sync origin |
| **Raspberry Pi Zero 2W** | Delay-tolerant network node — a store-and-forward data mule, not a hotspot |
| **SIM800L GSM module** | Out-of-band SMS confirmation when the IP path is down |

The student-facing flow is deliberately boring: connect to the WiFi, get redirected, pay, start learning. Everything interesting is in what has to be true for that to work.

## Four decisions that shaped the system

**1. Payment is the access-control primitive, and it's asynchronous.**

M-Pesa's Daraja API works by STK Push: you ask Safaricom to prompt the user's phone, the user enters their PIN, and Safaricom calls *you* back over HTTPS to tell you what happened. That callback is the authoritative event — not the student clicking anything. Which means the system needs a publicly reachable HTTPS endpoint, on a network whose whole premise is that it isn't reliably reachable. Hence the VPS: it's not a web host, it's a callback receiver and a durable record of payments that the edge can reconcile against. Payment records are deduplicated there, because a callback that arrives twice must not grant two sessions.

**2. Enforcement belongs at the network layer, not the application layer.**

The first working version authenticated at the Flask layer and then let the browser through to Kolibri. That's a bypass waiting to happen — and it was. Kolibri listens on port 8080, and a device that simply typed the server's address and port got straight into the LMS without ever touching the portal. The fix was an explicit firewall rule on the MikroTik's unauthenticated (`!auth`) hotspot chain, blocking direct 8080 access outright.

The general principle I took from it: if the only thing stopping a bypass is that the user doesn't know the URL, there is no access control. Enforcement has to sit at a layer the user can't route around, and in a hotspot topology that layer is the router.

**3. Fairness is a requirement, not an optimization.**

On a shared uplink, one device pulling a large video can make the network unusable for everyone else — which, in a classroom, means the payment they just made bought them nothing. So bandwidth allocation is part of the product, not an ops detail.

The design is a Hierarchical Token Bucket with four service classes — M-Pesa and portal traffic 40%, Kolibri content 40%, DTN sync 10%, general traffic 10% — with Stochastic Fairness Queueing under each leaf so no single flow dominates within its class. Payment traffic is prioritized deliberately: a student who can't complete a payment because someone else is streaming is the worst failure mode in the system.

Working out *where* the shaping belongs took longer than writing it. It goes on the edge server's `eth0` interface facing the router — not on the Pi (which isn't in the traffic path at all) and not on the router itself (which lacks the queueing discipline granularity). Success criterion: Jain's Fairness Index above 0.9, verified by a Python measurement script rather than asserted.

**4. Sync doesn't require connectivity — it requires patience.**

Content updates, OS packages, and student progress records still have to move between the cloud and the edge. The delay-tolerant path uses the Pi Zero 2W as a data mule: it's carried to a location with connectivity, syncs against the VPS, is carried back, and syncs against the edge server. Transfers are rsync-over-SSH, triggered automatically by a systemd network dispatcher hook on WiFi reconnection — so the human's only job is to move the device, not to run anything.

The payload is bidirectional and asymmetric: Kolibri content and apt packages (via apt-mirror and Ubuntu ARM ports) flow *out* to the edge; student progress, usage logs, and M-Pesa records flow *back*.

## What broke, and what it taught

- **A dual-write race in the payment flow — still open.** The router binding and the payment record live in two systems that share no transaction, so a crash between the two writes leaves one of them wrong. The current ordering writes the binding first, which fails in the worse direction: an orphan binding grants network access that no database record knows about, and the reclamation thread can only expire sessions it can see. The fix is to commit the record first, make the binding call idempotent, and let a reconciler converge the router's actual state onto the database's desired state. Listed here as a known issue rather than a solved one.
- **`ProxyFix` silently misconfigured.** Werkzeug 2.x changed the parameter — `x_for=1`, not `x_real_ip=1`. The symptom was the portal seeing the proxy's IP instead of the client's, which quietly broke per-device binding. Proxy header configuration has to be verified against the library version in front of you, not against the last tutorial you read.
- **Timestamps.** Store UTC, display through an East Africa Time filter. Anything else produces records that disagree with each other the first time you look at them from somewhere else.

## Where it stands

Honest status, because it matters:

| Objective | Status |
|---|---|
| Kolibri LMS with Khan Academy content | **Complete** |
| Captive portal with M-Pesa token access | **Complete** — full end-to-end flow, including session expiry and binding reclamation |
| HTB + SFQ bandwidth shaping (JFI > 0.9) | **Designed in full; pending hardware deployment** |
| DTN sync via Raspberry Pi Zero 2W | **Designed in full; pending deployment** |

## What's next

The change that matters most for real use is moving from phone-number-keyed sessions to proper student accounts — because in practice parents pay for children, so the payer and the learner aren't the same person. That brings a Student model with auto-provisioned Kolibri credentials, auto-login via Kolibri's REST API after payment, and data packages denominated in megabytes rather than minutes, which is both fairer and easier to reason about against the shaping classes.

## Stack

Python / Flask · Kolibri LMS · MikroTik RouterOS · Linux `tc` (HTB + SFQ) · Safaricom M-Pesa Daraja API · Ubuntu 24.04 Server · rsync / systemd · Raspberry Pi Zero 2W · DigitalOcean · Let's Encrypt · vanilla HTML/CSS

---

*Recognition: 2nd runner-up, Engineers Board of Kenya — Engineering Recognition and Excellence Awards 2026. Final-year Electronic and Computer Engineering project, Jomo Kenyatta University of Agriculture and Technology.*
