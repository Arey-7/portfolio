---
title: Quote Calculator
status: in-progress
year: 2023
summary: A pricing tool for a printing and graphic design company, built to cut the time between an enquiry and a quote.
stack: [Next.js, React, Formik, Tailwind CSS]
---

## The problem

Noah's Navy was a printing and graphic design company, run by my mother. Every
job that came in had to be priced by hand before it could be answered — and
most of that arithmetic was the same arithmetic as the last job. Paper, film,
plates, printing, trimming, packing, transport: the rates barely moved between
jobs, but all of them were recalculated every time.

The cost wasn't difficulty, it was repetition. The sum sat between an enquiry
and a reply, and it had to be redone before every answer.

## What it does

Ten cost inputs, a 35% margin, quotes rounded up to the nearest 200, and 16%
VAT, with total, profit and profit percentage recalculating live as the numbers
change. The rounding rule is the part worth keeping: it isn't a tidy-number
heuristic, it's how the shop already quoted — encoded rather than replaced.

## Where it stands

The calculator works, and it does cut the arithmetic down to one screen. What
it doesn't do yet is the thing that motivated it: it still asks for every cost
on every job, including the rates that rarely change. The next version splits
stable rates from per-job quantities, so a quote only asks what's actually
different this time — and files finished quotes under client accounts as dated
documents.
