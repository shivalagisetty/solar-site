# CLI Agent Observability — Product Brief

> Drafted using the canonical New Relic [Product Brief Template](https://newrelic.atlassian.net/wiki/spaces/PRODOPS/pages/2637922433/Product+Brief+Template). Working title; rename on copy.

| | |
|---|---|
| **Status** | DRAFT |
| **Document owner** | _@ mention_ |
| **Sponsor / GM** | _@ mention_ |
| **Engineering lead** | _@ mention_ |
| **Target release** | TBD |
| **Last updated** | 2026-05-29 |

---

## 🔍 Product Discovery

_Are we solving the right problem at the right time?_

### Problem Statement

New Relic offers a first-class **Browser agent** that gives customers drop-in observability for web applications: page views, Core Web Vitals, JS errors, AJAX, session traces, SPA route changes — all from a single embed snippet. There is **no equivalent agent for terminal-based AI chat tools** (Claude Code, Cursor CLI, Aider, GitHub Copilot CLI, Codeium, Sourcegraph Cody CLI, internal NR tools like Cowork and Nova) — even though these tools are now the primary developer-facing surface for AI-assisted engineering at most enterprises, including New Relic itself.

The gap shows up in four places:

1. **No standardized RUM-style telemetry.** Browser RUM models a "page view." Terminal AI tools have nothing analogous — no session entity, no turn-level performance contract, no client-side error capture beyond stderr.
2. **Vendor coverage is fragmented.** Claude Code natively emits OTLP **metrics + logs only** (per the [[Spike] Claude CLI IDD](https://newrelic.atlassian.net/wiki/spaces/AIO11y/pages/5191270751)). It does **not** emit native distributed traces. Cursor, Copilot CLI, and Aider have proprietary or no telemetry.
3. **No drop-in install.** Today, monitoring requires per-tool environment-variable plumbing, custom collectors, or wrapper proxies (LiteLLM, claude_telemetry). There is no `<script src="..."/>` equivalent for terminals.
4. **Customers are noticing.** Internal pages show the demand: AgentTrace ([Observability for Vibe Coding](https://newrelic.atlassian.net/wiki/spaces/~712020b11d0acc40984161b3bf6930c675e4f0/pages/5312872587)) targets the post-incident correlation slice; the [Claude Code Monitor Competitive Analysis](https://newrelic.atlassian.net/wiki/spaces/~712020468958465767472dae555831f9e3cc31/pages/5463867395) flags Claude Code's Monitor tool as a competitive threat that DIY observability builders are exploiting. Both signal real demand; neither delivers a standard agent.

**Who is affected:** every NR customer running an internal AI coding platform (a growing majority of mid-to-large engineering orgs), plus our own Engineering org running Claude Code at scale.

**Evidence solving this is relevant *now*:**
- Claude Code at New Relic is in [controlled production rollout](https://newrelic.atlassian.net/wiki/spaces/EPD/pages/5237997715/Claude+Code+at+New+Relic+-+Overview).
- Internal AIO11y team has already done the technical spike confirming OTLP feasibility.
- Competitor signal: LangSmith shipped Claude Code tracing (cited in AgentTrace). Datadog announced LLM Observability for IDE assistants in 2025. The window to lead this category is open but closing.

### Context

**Has New Relic previously attempted to solve this problem?**

Three pieces of prior work, none of which fully addresses this gap:

| Prior work | What it covers | What it leaves unsolved |
|---|---|---|
| [[Spike] Claude CLI IDD](https://newrelic.atlassian.net/wiki/spaces/AIO11y/pages/5191270751) | Technical feasibility; env-var-driven OTLP wiring for Claude Code → NR metrics + logs | Single-tool, no spans, no productized install, no UI |
| [Observability for Vibe Coding (AgentTrace)](https://newrelic.atlassian.net/wiki/spaces/~712020b11d0acc40984161b3bf6930c675e4f0/pages/5312872587) | Capture AI session telemetry, tie to `git commit` SHA, correlate to APM in NR | Narrower use case (commit↔incident bridge); doesn't address day-to-day RUM-style ops, cost, or non-coding agents |
| [Claude Code Monitor Competitive Analysis](https://newrelic.atlassian.net/wiki/spaces/~712020468958465767472dae555831f9e3cc31/pages/5463867395) | Strategic build-vs-buy; recommends ecosystem integration (Option 3) | Not a product spec; specific to Claude Code Monitor's log-streaming surface |
| [AI Agent Monitoring](https://newrelic.atlassian.net/wiki/spaces/TECHMARKET/pages/5480480946/AI+Agent+Monitoring) | Existing NR offering for agent traces (mostly server-side LLM agents — LangChain, LangGraph, server tools) | Designed for production agent backends, not developer-facing terminal tools |

**How do competitors address this?**
- **LangSmith** added Claude Code tracing — chat-history viewer, no production correlation.
- **Helicone / Langfuse / Phoenix / Traceloop** — proxy or SDK; cover LLM call telemetry but not terminal-tool sessions.
- **Datadog LLM Observability** — server-shaped, not terminal-shaped.
- **DIY via Claude Code Monitor + custom backends** — the threat surface flagged in our own competitive analysis.

**What can we extend rather than rebuild?**
- The **Claude CLI IDD spike's** OTLP plumbing → ship as the v0 ingestion path.
- **AgentTrace's** commit-correlation logic → fold in as the "post-incident" feature of this product.
- **AI Agent Monitoring's** trace UI → extend to render terminal-tool sessions natively.
- The **Browser agent's** install-and-config UX → mirror the experience exactly: paste-a-snippet equivalent for terminals.

### Measuring Success

**North-star metric**

- **Active CLI Agent Observability installs** (distinct service.names emitting agent telemetry / month). Equivalent of "Browser agent installs" KPI.

**Input metrics (we control these)**

| Goal | Metric | Target (12-mo) |
|---|---|---|
| Adoption | # of customer accounts with ≥1 CLI agent install | 500 |
| Coverage | # of supported tools (Claude Code, Cursor, Aider, Copilot CLI, internal) | 5 |
| Time-to-first-data | p50 minutes from install to first event in NR | < 5 min |
| Stickiness | % of installs still emitting after 30 days | > 70% |
| Internal validation | # of NR engineering teams with the agent active | 100% of EPD |

**Outcome metrics (business signal)**

- AI-SDLC-tier ARR contribution (new SKU candidate per AgentTrace brief)
- Net new ingest volume from CLI agent telemetry
- Reduced churn for customers evaluating DIY Claude Code Monitor builds (per competitive analysis target: <5%)

Dashboards: extend the existing **AI Agent Monitoring** dashboards with a "Developer Agents" filter; build a dedicated **CLI Agent Health** dashboard analogous to the Browser agent's install dashboard.

### Solution Assumptions

We're not certain about every detail yet, but the working hypothesis:

**Shape**: a single-purpose **CLI Agent Observability SDK + zero-config installer** that any terminal AI tool can adopt — with first-party support for the three tools that matter most (Claude Code, Cursor, internal Cowork-class agents), and an open spec for everyone else.

**Architecture (sketch)**:

```
┌──────────────────────────────────────────┐
│  Terminal AI tool (Claude Code / Cursor) │
│   ▲                                      │
│   │ env vars OR SDK import               │
│   ▼                                      │
│  NR CLI Agent (Node/Python/Rust shim)    │
│   - OTLP metrics (turns, tokens, cost)   │
│   - OTLP logs (prompts, tool calls)      │
│   - OTLP spans (turn-as-trace, optional) │
│   - local buffer + redaction             │
│   ▼                                      │
│  NR OTLP ingest                          │
│   ▼                                      │
│  NRDB → Agent Monitoring UI (extended)   │
│   - turn timelines, token/cost dashboards│
│   - error inbox for tool-call failures   │
│   - commit↔session bridge (AgentTrace)   │
└──────────────────────────────────────────┘
```

**Key product bets (each open to validation)**:
1. **One agent, many tools.** Wrapper-style adapter pattern beats one-bespoke-integration-per-tool.
2. **OTel-native, NR-extended.** We use OTel semantic conventions for LLM workloads (OpenLLMetry/OpenInference alignment) so customers' existing OTel pipelines work, then ship NR-only enrichments (entity model, AgentTrace correlation, NR1 UI).
3. **Edge redaction is non-optional.** PII/secret stripping happens client-side before any payload leaves the laptop (per AgentTrace's risk analysis).
4. **Session is the primitive.** Not "page view," not "transaction" — `agent.session` with nested `agent.turn` spans. New entity type proposed.
5. **The install is *one* command.** `npx @newrelic/cli-agent install` (or equivalent). Mirrors Browser agent install UX.

**User journey (target state)**:
1. Customer admin installs the agent: one CLI command writes a config file to `~/.config/newrelic/cli-agent.json` and registers env vars for supported tools.
2. Developer uses Claude Code / Cursor / internal CLI normally. Telemetry flows automatically.
3. Operator opens NR1 → All Entities → "AI Developer Agents" → sees a list of tool entities, sessions over time, top errors, token cost by team, commit-correlated incidents.
4. On-call engineer hits an APM error → "View AI session that produced this commit" → AgentTrace view loads.

**Dependencies / teams that must contribute**:
- AIO11y (owns the spike + OTel pipeline)
- APM Agents (SDK packaging patterns)
- Browser agent team (install UX know-how)
- Errors Inbox + APM (commit-correlation surface)
- AI Agent Monitoring (UI extension)
- EPD / Internal Tooling (Customer Zero — Claude Code at NR)
- Security / Privacy (edge redaction sign-off)
- Pricing (new SKU / ingest pricing)

### Getting Started

**First chunk of work** — _why this first_: the highest-leverage move is to **productize the AIO11y spike** into a real installable agent for Claude Code, with the entity model and one extended dashboard. This:

- proves the install UX is achievable
- gets data flowing for the EPD Customer-Zero population
- establishes the entity model that Cursor/Aider/etc. will plug into
- defers the harder UI work and AgentTrace correlation to phase 2

**Approach to collect customer feedback**:
- **Customer Zero**: NR EPD (Claude Code is in production rollout — built-in audience).
- **Design-partner program**: 5–10 enterprise NR customers running Claude Code or Cursor at scale (sourced via AE flags + Slack/Field signals).
- **Public OSS spec**: publish the agent semantic conventions so the OTel community can converge with us.

**Essential teams** (above), with AIO11y on point initially.

> ⛔ **Break for approval from Sponsor / GM**

---

## 🛠 Product Development

### What work we need to do

**Phase 1 — Productized v0 (months 1–3)**
- Package the AIO11y spike's OTLP wiring into an installer (`npx @newrelic/cli-agent` style).
- Define the OTel semantic conventions for `agent.session` and `agent.turn`.
- Ship native support for **Claude Code** (the existing OTLP path) plus a wrapper for **Cursor** (no native OTLP yet — needs proxy/hook).
- Stand up a CLI Agent Health dashboard.
- Customer-Zero pilot inside NR EPD.

**Open experiments needed before Phase 1 lock**
- Validate the entity model in NRDB (does `service.name = claude-code-*` cardinality blow up at scale?).
- Test edge redaction on real prompts — does our PII regex set hold up?
- Decide native span emission strategy for Claude Code given Anthropic doesn't emit spans yet (proxy vs. wait for Anthropic vs. infer from logs).

**Phase 2 — Coverage + Correlation (months 4–6)**
- Add Aider, Copilot CLI, Cody CLI.
- Fold in **AgentTrace** commit-correlation as a feature of this agent (not a separate product).
- Errors Inbox surface for agent tool-call failures.
- IDE adapter spike (VS Code) so the same agent covers IDE-resident chat too.

**Phase 3 — Platform + Monetization (months 7–9)**
- New SKU: "AI SDLC Observability" tier.
- Open the agent for partner integrations (per Competitive Analysis Option 3).
- ML-powered anomaly detection on agent telemetry.
- Public GA.

### Tracking success

- Weekly: install count, time-to-first-data p50, internal NR adoption %.
- Monthly: design-partner NPS, churn-defended-against-DIY metric.
- Quarterly: ARR / ingest contribution, OKR check.
- Dashboards: link here once stood up.

### Identified risks

| Risk | Owner | Mitigation |
|---|---|---|
| **Claude Code doesn't emit spans natively.** Trace waterfall UI is gated on Anthropic shipping spans, OR on us shipping a proxy. | AIO11y | Phase 1 = metrics+logs only. Proxy/wrapper as Phase 2 if Anthropic hasn't shipped spans by then. |
| **Developer "spyware" perception** — IDE/CLI tracking can read as surveillance. | Product + Security | Mirror AgentTrace mitigations: opt-in default, edge redaction, commit-triggered pruning, transparency about what's captured. |
| **PII / secret leakage** to NRDB. | Security | Edge redaction non-optional. Block list + regex + customer-supplied filters. SOC2/GDPR review pre-GA. |
| **Vendor API churn** (Anthropic, Cursor, etc., change CLI surface). | Eng | Keep the adapter layer thin; pin to OTel semantic conventions, not vendor specifics. |
| **Cannibalization of AI Agent Monitoring**. | Product | Position as the *developer-facing* surface; AAM remains for production agent backends. Shared UI primitives. |
| **Pricing collision** with Logs / APM ingest. | Pricing + Product | Decide early: ingest-priced (logs-style) or seat-priced (developer-tier). |
| **Internal duplication** — AgentTrace and this brief overlap. | Product leadership | This brief proposes folding AgentTrace into Phase 2 of the agent rather than running two product streams. |

> ⛔ **Break for launch approval checklist**

---

## 🚀 Product Delivery

_To be filled at launch readiness._

## ⚙️ Product Optimization

_To be filled post-launch._

---

## Appendix — Prior art consulted

- [[Spike] Claude CLI IDD](https://newrelic.atlassian.net/wiki/spaces/AIO11y/pages/5191270751) — Sailesh Tummepalli, AIO11y
- [Observability for Vibe Coding (AgentTrace)](https://newrelic.atlassian.net/wiki/spaces/~712020b11d0acc40984161b3bf6930c675e4f0/pages/5312872587)
- [Claude Code Monitor Competitive Analysis: Build vs Buy Economics](https://newrelic.atlassian.net/wiki/spaces/~712020468958465767472dae555831f9e3cc31/pages/5463867395)
- [AI Agent Monitoring](https://newrelic.atlassian.net/wiki/spaces/TECHMARKET/pages/5480480946/AI+Agent+Monitoring)
- [Claude Code at New Relic — Overview](https://newrelic.atlassian.net/wiki/spaces/EPD/pages/5237997715/Claude+Code+at+New+Relic+-+Overview)
- [Product Brief Template (PRODOPS)](https://newrelic.atlassian.net/wiki/spaces/PRODOPS/pages/2637922433/Product+Brief+Template) — structure used
