# Security & Access Document
## PaperPilot — AI Research Briefing Agent

**Version:** 1.0
**Status:** Draft for build (Antigravity)

---

## 1. Purpose & Scope

This document defines authentication, authorization, data protection, and access-control requirements for PaperPilot. Uploaded papers may include unpublished research, pre-print drafts, or proprietary data — the system must treat all uploaded content as private and sensitive by default.

---

## 2. Authentication

* Users authenticate via OAuth (Google) and/or email + password, issued through a managed auth provider or custom JWT-based service.
* Sessions use short-lived access tokens (e.g., 15–60 min) with refresh tokens; refresh tokens are stored as HttpOnly, Secure, SameSite=Strict cookies — never in local storage.
* Passwords (if email/password is supported) are hashed with a modern algorithm (bcrypt/argon2) with per-user salt; no plaintext or reversible storage.
* Multi-factor authentication (MFA) should be available as an optional account setting, especially for any "Team/Pro" tier.

---

## 3. Authorization & Access Control

### 3.1 Roles (v1)

| Role | Access |
|---|---|
| Free user | Limited uploads/month, core features (Executive Brief, Claims Explorer, Limitations), capped Study Mode generations |
| Pro user | Full feature set incl. Concept Map, Comparison Mode, Mentor Mode, unlimited/high-cap uploads |
| Admin (internal) | Access to system health, usage metrics, moderation tools — **no default access to user-uploaded paper content** |

### 3.2 Resource-level access
* Every paper record is scoped to the `user_id` (or `team_id` if/when team workspaces are introduced) that uploaded it.
* All API endpoints under `/papers/:id/*` must verify the requesting user owns or has been explicitly granted access to that `paper_id` before returning any data — including structured representation, generated features, and source resolution.
* No cross-user data access by default. If a future "share this brief" feature is introduced, it must use explicit, revocable share tokens scoped to a single paper, not account-wide access.

---

## 4. Data Privacy

* **Uploaded papers are user-owned data.** They must not be used to train models, shared with third parties, or exposed to other users without explicit consent.
* If any usage data is sent to the LLM provider (Anthropic API) for processing, this happens under standard API terms (not used for model training by default) — this should be stated clearly in the product's privacy policy.
* Users must be able to **delete a paper and all derived artifacts** (structured representation, embeddings, generated features, cached figures) permanently, with deletion cascading through: object storage, vector store, and primary DB.
* Provide a clear data retention policy in-product (e.g., "Uploaded papers are retained until you delete them or your account is closed").

---

## 5. Encryption

| Data state | Requirement |
|---|---|
| In transit | TLS 1.2+ for all client-server and server-to-service communication |
| At rest — object storage (PDFs, figure images) | Server-side encryption (e.g., SSE-S3/KMS) |
| At rest — database (structured representations, user data) | Encrypted storage volumes; sensitive fields (if any PII beyond email) encrypted at column level |
| At rest — vector store | Encrypted storage volumes; embeddings are non-reversible but chunk text should still be treated as sensitive |

---

## 6. API & Infrastructure Security

* All API endpoints require a valid access token except explicit public routes (e.g., landing page, health check).
* Rate limiting per user/IP on upload and generation endpoints to prevent abuse and control LLM cost exposure (e.g., N uploads/hour, N generation calls/hour).
* Input validation on all uploads: file type restricted to PDF, max file size enforced, malware/virus scan on upload before processing.
* Signed, time-limited URLs for any direct object-storage access (e.g., serving extracted figure images to the frontend) — never expose permanent public bucket URLs.
* Secrets (LLM API keys, DB credentials, storage keys) stored in a secrets manager, never committed to source or exposed to the frontend.

---

## 7. LLM-Specific Security Considerations

* **Prompt injection from paper content:** uploaded PDFs are untrusted input. Text extracted from a paper (including in figures/tables) must be treated as data, not instructions — system prompts must clearly delineate "paper content" from "system instructions" so malicious text embedded in a PDF cannot hijack generation behavior.
* Generation outputs are validated against the structured representation (per the grounding pipeline in the Technical Architecture Document) before being served — this also acts as a safety net against injected or fabricated instructions leaking into output.
* No user-uploaded content should be interpolated directly into prompts that also contain system/admin-level instructions without clear boundary markers (e.g., XML-style tags).

---

## 8. Audit & Logging

* Log authentication events (login, logout, failed attempts, password resets) with timestamps — no plaintext credentials in logs.
* Log access to paper resources (who accessed which `paper_id`, when) for security review, without logging the actual paper content.
* Admin access to any user content (e.g., for support/debugging) must be logged and, where feasible, require explicit user consent or a documented support workflow.

---

## 9. Compliance Considerations

* Design with GDPR-style principles in mind even for v1: right to access, right to deletion, data minimization, clear consent for any optional data use (e.g., analytics).
* If targeting EU/UK users, confirm data residency requirements for storage and the LLM provider's data processing terms.
* Maintain a basic Data Processing Agreement (DPA) understanding with all third-party processors (LLM provider, storage provider, auth provider) as part of legal review — flagged here as a dependency, not owned by engineering.

---

## 10. Out of Scope for v1 (flag for future)

* SOC 2 / ISO 27001 certification (future consideration if selling to enterprise/institutional customers).
* Team workspaces with granular per-paper sharing permissions.
* SSO/SAML for institutional (university) accounts.
