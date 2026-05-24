/**
 * Seed script: publishes the 3 long-form engineering blogs to MongoDB.
 * Usage:  node scripts/seedBlogs.js
 * Idempotent — upserts by slug.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('../src/models/Blog');
const { MONGODB_URI } = require('../src/config/env');

const IMG = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

const BLOGS = [
  /* ─────────────────────────  BLOG 1  ───────────────────────── */
  {
    slug: 'building-kanhaji-japan-ecommerce',
    title: 'Building a Production E-Commerce Platform for Japan: Lessons from Kanhaji.jp',
    excerpt:
      "Every client who says 'we need a simple e-commerce website' is describing a system that is never simple. When that client is based in Japan — with GMO payment rails, Japanese address formats, and high UX expectations — the surface area expands fast.",
    coverImage: IMG('photo-1542051841857-5f90071e7989'),
    tags: ['Next.js', 'Node.js', 'Redis', 'MongoDB', 'Docker', 'Nginx', 'AWS', 'E-Commerce', 'System Design'],
    status: 'published',
    content: `*What it actually takes to ship a cross-border commerce system under real client constraints — architecture, payments, localization, and the things that only break in production.*

---

Every client who says **"we need a simple e-commerce website"** is describing a system that is never simple. When that client is based in Japan, serving Japanese customers, operating under Japanese payment rails, and expecting Japanese-grade UX quality — the surface area expands fast.

**Kanhaji.jp** was one of those projects. What started as a storefront became a full production platform: multi-currency catalog management, GMO and Square payment integrations, inventory synchronization, logistics APIs, and a deployment pipeline that had to stay stable for a real business with real customers.

This is the story of the engineering decisions that made it work.

---

## The Problem That Actually Needed Solving

The client's core need seemed straightforward: sell products online in Japan. But unpacking that single sentence revealed several interlocking problems.

First, **Japanese e-commerce is not Western e-commerce with different currency symbols**. GMO Payment Gateway dominates the market — not Stripe, not PayPal. GMO has its own SDK, its own error code system, and documentation primarily in Japanese. Square was also in use for the client's physical store operations, which meant inventory changes in one system had to be reflected in the other.

Second, Japanese users have a high standard for site performance and UX fidelity. Slow initial loads, unrendered pages, or broken character encoding are trust signals — *negative ones*. Serving the right content fast wasn't a nice-to-have; it was table stakes.

Third, the client needed an admin interface. Product management, inventory control, order tracking, logistics integration — all of this had to be built alongside the customer-facing storefront.

> This wasn't a template job. It was a full-stack production system with real users, real transactions, and a real business depending on it.

---

## Architecture Decisions — and Why

![Architecture and infrastructure](${IMG('photo-1558494949-ef010cbdcc31')})

### Next.js over a pure SPA

The storefront had to be indexable. Japan-based search engines, Google's Japanese index, and product-specific landing pages all required server-rendered HTML with proper meta tags, structured data, and Open Graph markup. A React SPA rendered entirely on the client would have made SEO an ongoing battle.

Next.js gave me **server-side rendering where it mattered** — product pages, category listings, landing pages — and client-side navigation once the user was on the site. The App Router let me colocate server components with client components without architectural gymnastics.

The alternative I seriously considered was a decoupled architecture — a static site generator for the storefront, separate React app for the admin panel. I rejected it because it would have doubled the deployment surface area, made shared component logic awkward, and created two separate authentication contexts to maintain. **One Next.js codebase served both concerns cleanly.**

### MongoDB for flexible product schemas

Product catalogs in real e-commerce are messy. A socket set has SKU variants, dimension attributes, and packaging weights. A food product has expiry dates, storage requirements, and country-of-origin fields. Designing a SQL schema that accommodates both without constant migrations is painful.

MongoDB's document model meant each product could carry exactly the attributes it needed without altering a shared schema. The tradeoff was query complexity — aggregation pipelines replaced SQL joins. For analytics queries across order data, this required more deliberate query design. But for the primary use case — *flexible product catalog management* — the document model was the right call.

### Redis for caching and session state

Two things warranted Redis:

1. **Product catalog caching.** Catalog queries involved aggregations across collections that were computationally expensive and rarely changed. Caching results with a TTL of several minutes eliminated repeated round-trips to MongoDB.
2. **Session validation.** JWT tokens stored in httpOnly cookies handled authentication, but Redis became a fast lookup for session validation on protected admin routes — sub-millisecond auth checks without hitting the database on every protected request.

The cache invalidation strategy was straightforward: on any product or inventory update via the admin panel, I explicitly invalidated the relevant cache keys rather than waiting for TTL expiry.

### Docker for deployment consistency

The staging and production environments differed in subtle ways early in the project — Node version mismatches, environment variable handling inconsistencies. Docker eliminated this class of problem entirely. *One Dockerfile, one image, identical behavior across environments.*

In production on AWS EC2, the container ran directly. Not Kubernetes — the traffic volume didn't warrant the operational overhead. A single EC2 instance with Docker, managed by \`systemd\`, with Nginx in front, was sufficient and maintainable.

### Nginx as the production gateway

Nginx sat in front of the Node.js application handling:

- **SSL termination** via Certbot
- **gzip compression** for static and dynamic responses
- **Rate limiting** on the API surface
- **WebSocket proxying** for the admin dashboard's real-time updates

One decision I'd make differently: I'd invest more time upfront in structuring rate limits **by route category** rather than applying a blanket limit.

---

## The GMO Integration Problem

![Payment integration](${IMG('photo-1556742502-ec7c0e9f34b1')})

If there's one part of this project that took disproportionate time relative to its apparent scope, it was **GMO**. Unlike Stripe — which has excellent documentation, client libraries for every major language, and an active developer community — GMO's developer documentation is sparse in English. The error codes are documented primarily in Japanese.

The integration required several flows:

- Initial payment authorization
- Capture
- Partial refunds
- Subscription-style deferred billing for pre-orders

Each flow had its own API endpoint format, its own set of response codes, and its own sandbox behavior that didn't always match production behavior.

My approach was methodical: work through the Japanese documentation directly, map every possible error code to a user-facing message, build an explicit retry strategy for network-level failures, and **log every API interaction with enough context to reconstruct any transaction from logs alone**. The logging investment paid off multiple times during testing when sandbox transactions behaved unexpectedly.

Synchronizing GMO and Square inventory required a reconciliation layer. When an order was placed via the website (routed through GMO), inventory had to be decremented in both systems. Square's Catalog API was the source of truth, with a sync job that ran on order confirmation.

> This introduced eventual consistency — not ideal — but acceptable for the client's volume. A proper message queue would have been the cleaner solution.

---

## Japanese Localization Beyond i18n

**Translation is the easy part of localization.** The harder parts don't show up in i18n libraries.

- **Address format** is the inverse of Western format: postal code → prefecture → city → ward → street number → building. A form that collects addresses in the wrong order signals to Japanese users that the product wasn't built for them.
- **Name ordering** places family name before given name. User registration, order confirmation emails, and shipping labels all had to respect this. *Small error, serious trust signal if wrong.*
- **Character encoding** required explicit attention throughout. MongoDB stores UTF-8 natively, but ensuring Japanese characters survived the full round-trip — from client input through Express middleware through MongoDB and back — required testing at each layer rather than assuming it worked.

---

## Production Debugging at a Distance

Debugging a production system you can't physically access teaches you to invest in observability *before* you need it. My logging setup used Winston with structured JSON output, capturing request IDs that could trace a request from Nginx access log through the Next.js API layer to the Express backend to MongoDB.

One incident stands out. Orders placed during a specific time window were failing silently — no error surface to the user, but no confirmation either. The structured logs revealed that the GMO capture call was timing out at **exactly 30 seconds** — a timeout I'd configured in the HTTP client that matched GMO's processing time under load.

Increasing the timeout and adding an explicit retry on timeout resolved it.

> Without the logs, I'd have been guessing.

---

## What I'd Build Differently

- **Order processing via a message queue.** Order confirmation, inventory update, email dispatch, and logistics submission currently happen synchronously in a single Express handler. Bull with Redis would decouple these jobs, allow retries on failure, and give visibility into job status.
- **CDN for static assets.** Product images served directly from EC2. CloudFront would reduce latency for Japanese users and offload the origin server.
- **Granular cache invalidation.** The current approach invalidates entire cache namespaces on updates. Tag-based invalidation would be more precise as the catalog grows.

---

## Key Takeaways

- **SSR is not optional when SEO is a business requirement.** Next.js handles both server and client cleanly without architectural compromise.
- **Redis caching is most effective when paired with explicit invalidation logic**, not just TTLs.
- **Payment integrations from non-English-dominant markets require more investment** than their Stripe equivalents. Plan for it.
- **Localization is deeper than string translation** — it's address formats, name ordering, date formats, and cultural UX expectations.
- **Observability investment at build time pays dividends in production debugging.** Log structured data from day one.
- **Docker eliminates environment drift.** It's not complexity — it's discipline.

---

## Conclusion

Kanhaji.jp is a production system serving real transactions for a real business. The architecture decisions — Next.js for SEO, MongoDB for catalog flexibility, Redis for performance, Docker for consistency, Nginx for the production gateway — each solved a real problem with an appropriate tool.

The most interesting engineering wasn't in the choices that worked smoothly; it was in the choices that revealed their tradeoffs under production load. Every system teaches you something.

> This one taught me to log everything, plan for payment API oddities, and never underestimate the engineering depth of "just a simple e-commerce site."
`,
  },

  /* ─────────────────────────  BLOG 2  ───────────────────────── */
  {
    slug: 'real-time-industrial-inspection-yolov11-realsense',
    title: 'Building a Real-Time Industrial Inspection System with YOLOv11 and Intel RealSense',
    excerpt:
      'The gap between a computer vision model that performs well on a benchmark dataset and one that performs reliably in a factory is larger than most engineers expect. Industrial environments are adversarial by default.',
    coverImage: IMG('photo-1565793298595-6a879b1d9492'),
    tags: ['Computer Vision', 'YOLOv11', 'Intel RealSense', 'Python', 'OpenCV', 'Production AI', 'Edge Deployment'],
    status: 'published',
    content: `*How computer vision, depth imaging, and disciplined engineering delivered 96.9% segmentation accuracy in a real manufacturing environment.*

---

The gap between a computer vision model that performs well on a benchmark dataset and one that performs reliably in a factory is **larger than most engineers expect**. Industrial environments are adversarial by default: inconsistent lighting, vibration, reflective metal surfaces, and a cycle time requirement that doesn't care about your model's complexity.

When I built an automated toolkit inspection system for a manufacturing client — detecting sockets and deep sockets and measuring their dimensions in real time — those constraints shaped every decision I made.

> Final results: **96.9% segmentation accuracy**, **93.2% detection accuracy**, and a **10% increase in production throughput**.

Getting there required more engineering than machine learning.

---

## The Problem

Manual inspection of industrial toolkits is slow, expensive, and inconsistent. A human inspector checking socket dimensions across hundreds of toolkit assemblies per day will have variance — fatigue, distraction, measurement drift.

The client's goal was automation: a system that could identify each socket in an assembly, classify it as a standard or deep socket, and verify its dimensions met specification — all within the production line's cycle time.

The core technical requirements were:

- Detect individual sockets in a toolkit tray, correctly segmented from each other
- Classify each as **socket** or **deep socket** (visually similar; the distinction is internal depth)
- Measure **outer diameter** to within an acceptable tolerance
- Complete inference within the time window available in the production cycle
- Operate reliably under factory lighting conditions

> The last two requirements were not negotiable. A system that was 99% accurate but too slow to keep up with the production line was useless. A system that was fast but degraded under factory lighting was dangerous.

---

## Why RGB-D, Not Just RGB

![Computer vision and depth imaging](${IMG('photo-1518770660439-4636190af475')})

The first architecture decision was the most consequential: **what kind of camera?**

A standard RGB camera could detect and segment sockets. But it cannot *measure* them. You can estimate size from a known camera distance and calibrated reference, but this is fragile — any camera position drift introduces measurement error. For a system with dimensional tolerances, this wasn't acceptable.

**Intel RealSense** cameras output pixel-aligned depth maps alongside RGB frames. Every pixel in the RGB image has a corresponding depth value in real-world coordinates. Once you've segmented a socket instance, you can project its pixel coordinates through the depth map to get **real-world dimensions** — actual millimeters, not pixel counts normalized against an assumed depth.

For classifying deep sockets versus standard sockets, depth data was particularly critical. The visual difference between a standard and deep socket from above is subtle — primarily a slight difference in the shadow profile inside the socket opening. **The depth profile of the socket interior, however, is unambiguous.** A deep socket has measurably greater interior depth. RGB-only classification would have required a much more complex model to catch what depth data makes obvious.

Alternatives I considered:

- **Structured light systems** — more depth accuracy, but expensive and fragile under factory conditions
- **Stereo cameras** — cheaper, but more computational overhead and lower near-range accuracy than RealSense for our working distance

RealSense struck the right balance for the deployment context.

---

## Choosing YOLOv11

Model selection was driven by two constraints: **accuracy** and **inference speed**.

Instance segmentation — not object detection — was required. Bounding boxes around sockets don't give you the precise pixel mask needed to extract depth measurements for the socket boundary. *You need per-pixel instance masks.*

I evaluated several approaches:

- **Detectron2 (Mask R-CNN).** Strong segmentation accuracy, but inference time was too high for real-time use on the target hardware. Optimized versions exist, but the operational complexity of tuning Detectron2 for production wasn't justified.
- **YOLOv8 with segmentation head.** Viable, and I built an initial prototype on it. Accuracy on the specific domain — close-range, top-down, reflective metal objects — was lower than I wanted. The model struggled with partially overlapping sockets in crowded trays.
- **YOLOv11.** Improvements in YOLOv11's segmentation head — particularly better small-object handling and tighter mask boundaries — were directly relevant. Inference time on GPU remained within the cycle time budget.

I chose **YOLOv11-medium over YOLOv11-large** after profiling: the accuracy difference on the dataset was marginal (~1.2%) but the inference speed difference was meaningful at scale.

> The model was not used off-the-shelf. It was trained on factory-collected data — images captured in the actual production environment with actual sockets, under actual lighting conditions. **Domain specificity is not optional in industrial vision.**

---

## The Measurement Pipeline

![Industrial manufacturing automation](${IMG('photo-1565043666747-69f6646db940')})

Once the model returns instance masks, the measurement pipeline works as follows:

1. **Frame acquisition** — capture synchronized RGB and depth frames from RealSense.
2. **Inference** — run YOLOv11 segmentation on the RGB frame. Get per-instance masks and class labels.
3. **Mask projection** — for each instance mask, extract corresponding depth values. Filter pixels where depth is unavailable (RealSense has depth holes in highly reflective areas).
4. **Dimension computation** — use RealSense intrinsic calibration to project pixel coordinates and depth values into real-world 3D coordinates. Compute socket diameter from the projected point cloud.
5. **Deep socket classification** — analyze the depth profile within the socket interior. Deep sockets show a characteristic depth gradient at the interior rim boundary that standard sockets don't.
6. **Result output** — pass measurements to the PLC interface for pass/fail decision.

The most brittle part of this pipeline was step 3 — **depth hole handling**. RealSense depth maps have missing values in highly reflective areas, and sockets are made of polished metal. I addressed this with a combination of *temporal averaging across frames* and *inpainting for persistent holes*. Neither is perfect; together they were sufficient.

---

## The Hard Parts Nobody Writes About

**Lighting calibration was manual and fragile.** Industrial fluorescent lighting creates reflections that shift as the light source flickers or as different numbers of lights are active in the cell. The model had to be trained with exposure variation to generalize. I collected images across multiple days at different times of day to capture lighting diversity.

**The dataset labeling problem.** You cannot use open-source socket images for a production industrial inspection system. Every image in the training set had to be captured in the actual factory, on actual toolkits, and *manually labeled*. The dataset was approximately **2,400 images** with applied augmentation (rotation, brightness variation, synthetic occlusion). This was time-consuming. There is no shortcut.

**Confidence threshold calibration.** In manufacturing, a false negative — missing a defective or misidentified socket — is more costly than a false positive. I calibrated confidence thresholds to bias toward false positives, accepting more manual review flags in exchange for near-zero missed detections on defects.

> This is an engineering judgment, not a model parameter.

**Inference optimization under a real cycle time budget.** The production line had a fixed cycle time. Inference had to complete within it or the system would become a bottleneck. I profiled the full pipeline — not just model inference, but frame capture latency, depth map processing, and result transmission to the PLC. The model itself was fast; the surrounding overhead required careful implementation. Python's GIL was a constraint; I moved depth processing to a separate thread with a shared memory buffer.

---

## Edge Deployment Considerations

The system ran on an industrial PC with a discrete GPU — **not a cloud endpoint**. Latency to a cloud API would have made real-time operation impossible, and factory network connectivity couldn't be relied upon for mission-critical inspection.

This meant the entire model and inference pipeline had to run on local hardware, and that hardware had to be maintainable by factory staff who were not ML engineers. The deployment had to be durable: no Python environment management issues, no dependency conflicts that broke on OS updates.

I containerized the inference service with Docker, using a pinned **CUDA + PyTorch** base image. The container started automatically on system boot via \`systemd\`. Updates were pushed as new image versions.

---

## Results and Where the Numbers Come From

- **96.9% segmentation accuracy** — mean IoU across all socket instances in a held-out test set collected separately from training data in the same factory environment.
- **93.2% detection accuracy** — mAP@0.5 on detection, slightly lower because some overlapping sockets in dense trays challenged the model.
- **10% production throughput increase** — eliminated a manual inspection step that previously required a human operator to sample and verify toolkit completeness.

---

## What I'd Build Differently

- **Uncertainty estimation.** The model outputs a confidence score, but this isn't the same as calibrated uncertainty. For a production system, I'd want the system to say *"I'm not sure about this instance, flag for human review"* rather than committing to a potentially wrong classification at a confidence that still exceeds threshold.
- **Automated re-labeling pipeline.** As socket designs change, the model needs retraining. A pipeline where edge cases flagged by the system automatically become training candidates — with human review — would make the system self-improving.
- **Structured light supplement.** For the small percentage of sockets where RealSense depth is unreliable due to reflection, a supplementary structured light scan could provide ground truth. Expensive, but would push measurement reliability from *"very good"* to *"production-certified."*

---

## Key Takeaways

- **Depth imaging (RGB-D) enables capabilities that RGB alone cannot** — specifically real-world dimensional measurement. Choose your sensor with the task in mind.
- **Industrial AI systems require domain-specific data.** Open-source datasets will not generalize. Invest in data collection in the actual deployment environment.
- **Model selection should be driven by the product of accuracy and inference speed**, not accuracy alone.
- **Confidence threshold calibration is a business decision** as much as a technical one. In manufacturing, the cost of a false negative typically outweighs the cost of a false positive.
- **Containerize edge AI deployments.** Factory IT staff should not need to manage Python virtual environments.

---

## Conclusion

Building an industrial AI vision system isn't primarily a machine learning problem. It's an **engineering problem where machine learning is one of several components**.

The accuracy numbers matter — but so does the frame capture latency, the depth hole handling strategy, the deployment containerization, and the threshold calibration that reflects the actual cost asymmetry of false positives versus false negatives in the factory context.

> The 96.9% segmentation accuracy came from careful engineering of the full pipeline, not from running a state-of-the-art model on clean benchmark data. That's the version of AI engineering that ships to production.
`,
  },

  /* ─────────────────────────  BLOG 3  ───────────────────────── */
  {
    slug: 'ai-assisted-engineering-workflow',
    title: 'How I Use AI to Build Software Faster Without Sacrificing Engineering Quality',
    excerpt:
      "The engineers who will be most effective with AI tools are not the ones who are best at prompting. They're the ones who can evaluate AI output critically — who understand systems well enough to know when the AI is right, and when it isn't.",
    coverImage: IMG('photo-1555949963-aa79dcee981c'),
    tags: ['Software Engineering', 'AI Tools', 'Developer Productivity', 'Engineering Fundamentals', 'Best Practices'],
    status: 'published',
    content: `*A practical account of where AI makes engineers faster, where it makes them dangerous, and the mental model that keeps the difference clear.*

---

Every few months, a new wave of *"AI will replace engineers"* content floods the internet. Meanwhile, the engineers actually building things are quietly using AI as a tool — the way they use documentation, a debugger, or a trusted colleague they can ask a dumb question at 2am.

> The difference between engineers who use AI well and engineers who use it poorly isn't access. It's **judgment**.

I've been using AI-assisted workflows across full-stack development, computer vision systems, cloud infrastructure, and production debugging for over a year. This is an honest account of what it actually looks like — where it speeds things up, where it gets dangerous, and the mental model I use to tell the difference.

---

## What AI Actually Is in an Engineering Context

AI code assistants are **not oracles**. They don't understand your system. They don't know your deployment environment, your team's constraints, your client's non-negotiable requirements, or the reason your last approach failed.

What they do well is **pattern matching** — they have seen an enormous amount of code, documentation, and engineering writing, and they can retrieve relevant patterns faster than you can search for them.

That framing matters because it determines how you use the tool:

- If you think of AI as a *senior engineer who understands your codebase*, you'll trust its output inappropriately.
- If you think of it as a *very well-read junior who can synthesize patterns quickly but has no context*, you'll use it correctly: as a starting point, not a conclusion.

---

## Where I Use AI — With Specific Examples

![Developer workflow](${IMG('photo-1517694712202-14dd9538aa97')})

### Debugging: Hypothesis Generation, Not Solution Delivery

The most consistently useful application in my workflow is debugging assistance — specifically, **generating hypotheses faster than I could enumerate them myself**.

When I was building Kanhaji.jp, orders placed during a specific time window were failing silently. No error surface to the user, no obvious log entry. I'd already narrowed it down to the GMO payment capture flow. I pasted the relevant Express middleware, the GMO API client configuration, and the surrounding Nginx config into an AI conversation and asked:

> *"Given this setup, what are the most likely reasons a GMO capture call would succeed at the API level but fail to be acknowledged by our handler?"*

The response gave me four hypotheses:

1. Timeout mismatch between Nginx's \`proxy_read_timeout\` and my HTTP client timeout
2. Response parsing error on an edge-case GMO response format
3. Network-level retry causing duplicate confirmation handling
4. SSL certificate verification issue in the GMO sandbox

I hadn't considered the first one. I checked — the HTTP client had a **30-second timeout** that precisely matched GMO's processing time under load. Increasing the timeout and adding an explicit retry resolved the issue.

What I didn't do: *accept any of those hypotheses as correct without verifying*. The AI didn't know which one applied. **It gave me a useful search space. I did the debugging.**

### Architecture Brainstorming: Structured Comparison, Not Decisions

When I needed to synchronize inventory between GMO and Square in near-real-time, I had a rough idea — a message queue — but wanted to evaluate alternatives. I asked for a structured comparison of synchronous API-to-API sync, polling with a reconciliation job, and an event-driven queue approach, with explicit tradeoffs on consistency guarantees, failure modes, and operational complexity.

The AI gave me a well-structured comparison covering most of the relevant dimensions. I identified three constraints it hadn't accounted for:

- The specific MongoDB driver behavior under rapid writes
- The client's tolerance for eventual consistency
- The operational overhead I was willing to carry as a solo developer

Those constraints changed the decision.

> The AI structured my thinking. The decision was mine. **This is the right division of labor.**

### Unfamiliar APIs and Documentation

During the GMO integration, I was working with documentation primarily in Japanese. I used AI to quickly understand the API's data model, response format conventions, and error code taxonomy — the kind of structural understanding that would have taken *hours* of reading Japanese documentation to extract.

The AI's knowledge of GMO was incomplete — it knew the general structure but not the specific edge cases I'd encounter. What it saved was the bootstrap time: getting from *"I don't understand this API's structure at all"* to *"I understand the structure and can now read the specific documentation for the parts I need"* in minutes instead of hours.

> The AI's overview was a map; the documentation was the territory.

### Frontend Iteration

In UI development, where iteration speed matters and the cost of a wrong direction is low, AI accelerates the loop meaningfully. For rapid component prototyping — *"here's my current Tailwind card, suggest three variations that improve information hierarchy"* — AI generates options I evaluate and select from. I don't copy them wholesale; I use them to shortcut the iteration cycle.

### DevOps and Infrastructure Troubleshooting

Cloud and DevOps problems are often well-documented in the aggregate but highly specific in your exact configuration. When I've hit AWS EC2 Nginx proxy issues, Docker network configuration problems, or environment variable inconsistencies across deployment environments, AI is useful for quickly surfacing relevant configuration parameters and common mistakes.

The pattern is the same: **describe the problem, get a search space, verify and apply.**

---

## What I Don't Delegate to AI

![Debugging and reasoning](${IMG('photo-1542831371-29b0f74f9713')})

### System Architecture

Architecture decisions require context that AI doesn't have: your traffic patterns, your team's operational capability, your client's budget constraints, your tolerance for operational complexity, your deployment environment's limitations.

> An AI can tell you when to use a message queue versus polling *in the abstract*. It cannot tell you whether **your specific team** can operate a Redis-backed Bull queue in production, whether **your client's budget** supports an additional managed service, or whether **your traffic volume** actually warrants the complexity.

When I chose MongoDB over PostgreSQL for Kanhaji.jp, the decision hinged on the expected product catalog variability and the likelihood of schema churn during early development. **AI had no way to assess that.**

### Scalability Tradeoffs

*"Should I cache this?"* is not a question AI can answer for your system. It requires knowing your read/write ratio, your tolerance for stale data, your cache invalidation complexity, and your current performance bottleneck. AI gives you patterns. **Scalability decisions require knowing which pattern fits your specific load profile.**

### Ownership

Nobody else is on call for your production system at 2am. AI can't be paged. The requirements of ownership — understanding the system deeply enough to diagnose novel failures, make rapid decisions under pressure, explain tradeoffs to stakeholders — require *genuine knowledge that can't be outsourced*.

> Every part of a system you let AI write without understanding is a part of the system you don't own.

### Novel Production Issues

For genuinely novel production problems — race conditions in specific configurations, edge-case behavior in third-party SDKs, subtle timing issues in distributed systems — AI's suggestions tend toward generic patterns that may not apply. The novel problem is novel *precisely because* it falls outside the distribution of well-documented cases that AI learned from.

For these problems, you need **engineering fundamentals**: the ability to reason from first principles, read source code, construct hypotheses, and verify them.

> This is where engineers who have used AI as a crutch get caught. If you've been letting AI do the technical reasoning and you're now facing a problem AI can't reason about, you don't have the fallback capability you'd built through experience.

---

## The Mental Model: Proportional Trust Based on Verifiability

I use a simple heuristic: **use AI output proportionally to how quickly I can verify it.**

| Situation | AI Reliance | Why |
|---|---|---|
| Timeout config check | **High** | 30-second verification, low risk |
| Architectural recommendation | **Low** | Verification requires building a mental model of failure modes |
| Code I'm shipping | **Conditional on understanding** | AI-generated code I don't understand is code I don't own |

For code I'm going to ship: *I understand it*. Not *"I could understand it if I spent time on it"* — I understand it now, before it goes anywhere near production.

> AI-generated code that I don't understand is code I don't own.

---

## Why Fundamentals Matter More in an AI Era, Not Less

The engineers who will be most effective with AI tools over the next decade are **not the ones who are best at prompting**. They're the ones who can evaluate AI output critically — who understand systems well enough to know when the AI is right, when it's generating a plausible-sounding wrong answer, and when it's answering a different question than the one they asked.

> **Weak engineers who use AI will produce more wrong code faster. Strong engineers who use AI will produce correct systems faster.**

The AI hasn't changed what *"strong engineer"* means. It's changed the productivity ceiling of what strong engineers can accomplish.

The fundamentals — systems thinking, understanding data structures and algorithms, reading documentation, debugging from first principles, reasoning about failure modes — these skills matter *more* when AI is in the picture, not less. **They're the filter that makes AI output useful rather than dangerous.**

---

## A Practical Workflow

- **New feature:** I draft the architecture and core decisions independently. AI fills in implementation details where patterns are well-known and the risk of wrong output is low.
- **Debugging:** I form a hypothesis first, independently. Then I present the problem to AI to check whether I've missed likely causes. *Verify before apply.*
- **Unfamiliar technology:** AI to bootstrap structural understanding, then read the actual documentation for the parts I'm implementing.
- **Code review on my own work:** I write the code myself, then ask AI to surface issues I might have missed — particularly edge cases, error handling gaps, and security considerations. This is the direction I want — using AI to improve work I already own, not to generate work I'll then try to own.

---

## Key Takeaways

- **AI is most useful as a hypothesis generator and pattern synthesizer.** It is least useful as a decision maker, architect, or owner.
- **Treat AI output proportionally to how quickly you can verify it.** Fast verification → use liberally. Slow verification → reason more independently first.
- **The engineers who benefit most from AI are those with strong fundamentals** — not despite the AI, but because good fundamentals let them evaluate AI output critically.
- **Every part of a system you don't understand is a part you don't own.** Ownership requires understanding, regardless of how the code was generated.
- **AI doesn't make engineering judgment obsolete.** It makes it more valuable.

---

## Conclusion

Using AI well in software engineering is a **judgment problem, not a tooling problem**. The tool is widely available; the judgment is not.

I use AI to move faster on well-understood problems with clear verification paths, and I reason independently on architecture decisions, scalability tradeoffs, and novel production issues where AI's pattern-matching approach isn't reliable. That division keeps my engineering fundamentals sharp while extracting real productivity from the tools available.

> The engineers who figure out that division will build better systems, faster, for a long time.
`,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const post of BLOGS) {
    const existing = await Blog.findOne({ slug: post.slug });
    if (existing) {
      Object.assign(existing, post);
      await existing.save();
      console.log(`Updated: ${post.slug}`);
    } else {
      await Blog.create(post);
      console.log(`Created: ${post.slug}`);
    }
  }

  const all = await Blog.find({ status: 'published' }).select('slug title readTime coverImage');
  console.log('\nPublished blogs:');
  all.forEach(b => console.log(`  - [${b.readTime} min] ${b.slug}  cover=${b.coverImage ? 'yes' : 'no'}`));

  await mongoose.disconnect();
  console.log('\nDone.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
