# EduAccess — drafting material

Kept out of `my-portfolio/content/` because everything in that directory is
published verbatim. This is source material for the site card, the résumé,
and future rewrites.

## Deck line

*Offline-first e-learning edge network for low-connectivity communities in Kenya*

## Card summary — long form


**EduAccess is an offline-first learning network that puts a full Khan Academy library inside a community that has no reliable internet — and lets students pay for access with the money they actually have, in mobile-money increments, rather than a subscription.**

The system runs on a local edge server hosting Kolibri LMS, fronted by a MikroTik router that acts as gateway and enforcement point. A student connects to the WiFi, lands on a captive portal, pays via M-Pesa STK Push, and the router opens a binding for their device. Content reaches the edge server without a connection through a Raspberry Pi Zero 2W acting as a delay-tolerant "data mule" that physically carries updates between a cloud node and the school.

The hard parts were not the LMS. They were access control that can't be bypassed at the network layer, an asynchronous payment callback that has to survive an unreliable link, and bandwidth fairness on a shared uplink where one device streaming can starve a classroom — addressed with kernel-level HTB and SFQ queueing measured against Jain's Fairness Index.

The project won 2nd runner-up at the Engineers Board of Kenya's Engineering Recognition and Excellence Awards 2026, and is now being developed into a standalone product.


## Résumé bullets


Pick three or four; they're written to stand alone.

- Built an offline-first e-learning edge network (Kolibri LMS, Flask, MikroTik RouterOS, Ubuntu 24.04) delivering Khan Academy content to low-connectivity communities in Kenya; 2nd runner-up, Engineers Board of Kenya Engineering Recognition and Excellence Awards 2026.
- Designed and shipped a captive-portal access-control flow integrating Safaricom's M-Pesa Daraja API — STK Push initiation, asynchronous HTTPS callback to a public VPS endpoint, and automated MikroTik IP binding — with session expiry handled by a background reclamation thread.
- Closed a payment-bypass vulnerability by moving enforcement from the application layer to the router's firewall, blocking direct access to the LMS port on the unauthenticated hotspot chain.
- Designed a kernel-level HTB + SFQ traffic-shaping scheme (four service classes with per-leaf fair queueing) targeting a Jain's Fairness Index above 0.9 on a shared uplink, with a Python measurement harness to verify it.
- Architected a delay-tolerant sync path using a Raspberry Pi Zero 2W as a store-and-forward data mule, moving LMS content, OS packages, and student progress records between a cloud node and an offline edge server over rsync-over-SSH triggered by systemd network dispatcher events.
