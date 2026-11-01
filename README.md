# APAAR ONE: AICTE Student Data Management, Enrolment Intelligence & Academic Verification Platform

> **"One Academic Identity. Every Enrolment Verified."**  
> *Proposed prototype developed for AICTE SIH — Regulation Bureau.*

---

## Live Links

- **Production Deployment (Vercel)**: [https://apaar-one.vercel.app](https://apaar-one.vercel.app)
- **Source Code Repository (GitHub)**: [https://github.com/BhaskarShah05/apaar-one](https://github.com/BhaskarShah05/apaar-one)

---

## Executive Summary

**APAAR ONE** is a unified, multi-tenant academic enrolment management and verification ecosystem built specifically for AICTE-approved higher education institutions across India. It grounds institutional enrolment verification and regulatory seat compliance on the Ministry of Education's 12-digit **Automated Permanent Academic Account Registry (APAAR / EduLocker) ID**, while cleanly separating **Identity Reference** from **Academic Awards / Credentials** (which remain governed by DigiLocker/NAD).

---

## Key Platform Highlights

1. **Enterprise-Grade Architecture**: Built on Next.js 14 App Router, TypeScript, Tailwind CSS, and Lucide icons with a design system inspired by Stripe, Linear, and Vercel.
2. **Five Interconnected Portals**:
   - **Public Portal**: Mission explanation, workflow diagrams, policy explanations, trust & privacy documentation, and portal sign-in.
   - **Institution Workspace**: Intake management, batch CSV/manual student record submission, real-time validation error resolution, duplicate conflict adjudication, seat utilization tracking, and API integration.
   - **AICTE Intelligence Console**: National enrolment oversight, supernumerary quota compliance auditing, cross-state/cross-institution duplicate case review, policy-as-code rule engine, and full cryptographic audit log.
   - **Student Portal**: Masked APAAR identity card, active & historic enrolments, third-party consent approvals for background verification, demographic correction workflows, and sharing audit trail.
   - **External Verifier Portal**: B2B verification engine for employers and universities with batch requests, instant QR-code scan verification with digital signature validation, and tamper-evident result certificates.
3. **Policy-as-Code Compliance Engine**:
   - Implements AICTE Approval Process Handbook (APH 2024–27) rules.
   - Mathematical arithmetic verification of Approved Intake vs. Permitted Capacity vs. Supernumerary Quotas (TFW 5%, Lateral Entry 10%, EWS 10%, NRI/FN/OCI under separate AICTE sanctions).
4. **Privacy-by-Design & Security**:
   - **Default Masked Display**: APAAR numbers displayed as `XXXX-XXXX-4819` across all portals.
   - **Audit-Logged Reveal**: Clicking the reveal icon requires authorization and logs an immutable audit event (`SECURITY_APPAR_UNMASKED`).
   - **Opaque Verification Tokens**: QR codes and public verification links never expose raw personally identifiable information (PII); they use short-lived, cryptographically signed tokens.
5. **10 Pre-Seeded Real-World Scenarios (from PRD Section 16 & 30.1)**:
   - Delhi Institute of Technology (DIT) - Clean B.Tech CSE enrolment.
   - Maharashtra National College of Engineering (MNCE) - B.Tech Mechanical over-capacity violation (134 enrolled vs. 120 intake).
   - Transfer Certificate (TC) Enrolment hand-off (Sneha Patel).
   - Concurrent active enrolment across two state institutions (Kabir Singhania).
   - Name/DoB mismatch between Institute submission and APAAR Registry (Vikrant Roy).
   - In-batch duplicate roll number detection.
   - Upstream DigiLocker/UIDAI API timeout fallback (504 Gateway Timeout simulation for Tanya Banerjee).
   - Provisional APAAR generation for newly admitted students without existing registry accounts.
   - Employer background verification with student consent gate.
   - QR Code instant validation for walk-in verifiers.

---

## System Architecture

```
                                      +-----------------------------+
                                      |   APAAR ONE Central Engine  |
                                      +--------------+--------------+
                                                     |
         +--------------------+----------------------+--------------------+--------------------+
         |                    |                      |                    |                    |
         v                    v                      v                    v                    v
  +--------------+     +--------------+       +--------------+     +--------------+     +--------------+
  | Public Site  |     | Institution  |       |    AICTE     |     |   Student    |     |   Verifier   |
  |  (7 routes)  |     |  Workspace   |       | Intelligence |     |    Portal    |     |    Portal    |
  |              |     | (13 routes)  |       | (13 routes)  |     |  (7 routes)  |     |  (7 routes)  |
  +--------------+     +--------------+       +--------------+     +--------------+     +--------------+
                              |                      |                    |                    |
                              +----------------------+--------------------+--------------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |  Standardized REST API v1   |
                                      |  (22 Functional Endpoints)  |
                                      +--------------+--------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      | Relational In-Memory Store  |
                                      | with Pre-Seeded Scenarios   |
                                      +-----------------------------+
```

---

## Directory Structure

```
├── app/
│   ├── layout.tsx                     # Root layout with AuthProvider & metadata
│   ├── page.tsx                       # Public Home with interactive workflow diagram
│   ├── about/                         # About APAAR ONE page
│   ├── how-it-works/                  # Architectural & workflow breakdown
│   ├── features/                      # Detailed platform capability matrix
│   ├── security-privacy/              # Security safeguards, encryption & consent model
│   ├── help/                          # Multi-stakeholder FAQ & support desk
│   ├── sign-in/                       # Unified authentication gateway
│   │
│   ├── institution/                   # Institution Administration Workspace
│   │   ├── overview/                  # Executive institution dashboard & KPIs
│   │   ├── programmes/                # Departmental programmes list
│   │   ├── intake/                    # Approved intake & permitted capacity calculator
│   │   ├── students/                  # Filterable student enrolment directory
│   │   │   ├── [id]/                  # Deep student profile & lifecycle audit log
│   │   │   └── new/                   # Single student enrolment entry form
│   │   ├── uploads/                   # Batch upload center with drag-and-drop CSV preview
│   │   │   └── [batchId]/             # Batch validation inspection & staging table
│   │   ├── issues/                    # Validation issues triage & resolution board
│   │   ├── duplicates/                # Duplicate & overlap adjudication desk
│   │   ├── reports/                   # Institutional compliance & enrolment report generator
│   │   ├── integrations/              # Webhook & API key administration
│   │   ├── users/                     # Role-based access control for college staff
│   │   └── settings/                  # Institution profile & academic calendar settings
│   │
│   ├── aicte/                         # AICTE Intelligence & Regulatory Console
│   │   ├── overview/                  # National overview, regional heatmap & macro metrics
│   │   ├── institutions/              # Nationwide directory of 12,000+ AICTE colleges
│   │   │   └── [id]/                  # College regulatory profile & intake audit
│   │   ├── enrolments/                # National multi-parameter enrolment search
│   │   ├── capacity/                  # Over-capacity violations & APH compliance monitor
│   │   ├── alerts/                    # Cross-institution duplicate alert triage board
│   │   │   └── [caseId]/              # Case detail, institute response & resolution actions
│   │   ├── policies/                  # Policy-as-code rule list (APH 2024-27)
│   │   │   └── new/                   # Regulatory rule authoring sandbox
│   │   ├── reports/                   # Parliamentary & state-level analytics generator
│   │   ├── audit/                     # Immutable cryptographic audit event trail
│   │   ├── integrations/              # Central integrations (UIDAI, DigiLocker, ABC)
│   │   ├── users-roles/               # Bureau staff permissions & access tiers
│   │   └── settings/                  # Global academic year thresholds & system settings
│   │
│   ├── student/                       # Citizen Student Portal
│   │   ├── overview/                  # Student dashboard with digital APAAR card
│   │   ├── identity/                  # Masked APAAR details, demographic sync & QR badge
│   │   ├── enrolments/                # Active & historical academic enrolments
│   │   ├── verification-requests/     # Pending & approved third-party verification requests
│   │   ├── corrections/               # Demographic correction request tracking
│   │   ├── sharing-history/           # Complete access log of who viewed student data
│   │   └── help/                      # Student support, grievance redressal & FAQs
│   │
│   ├── verifier/                      # External Verifier Portal (B2B / Background check)
│   │   ├── overview/                  # Verifier workspace with quota & request status
│   │   ├── new-request/               # Create new single or bulk verification request
│   │   ├── requests/                  # Searchable verification request archive
│   │   │   └── [id]/                  # Verification report, status & download certificate
│   │   ├── scan/                      # Instant QR code camera scanner & manual token lookup
│   │   ├── organization/              # Verifier corporate profile & authorization docs
│   │   └── api/                       # Verifier REST API documentation & API keys
│   │
│   └── api/v1/                        # Production REST API Engine
│       ├── institutions/              # Institution queries & capacity calculations
│       ├── enrolments/                # Student enrolment records & lifecycle events
│       ├── enrolment-batches/         # CSV batch ingestion, row validation & staging
│       ├── cases/                     # Duplicate alert cases & resolution transitions
│       ├── validation/issues/         # Active validation errors & remediation actions
│       ├── policies/                  # Policy-as-code definitions & evaluation
│       ├── verifications/             # Verifier requests & student consent decisions
│       ├── audit-events/              # Cryptographic audit events retrieval
│       ├── analytics/                 # National & institutional aggregate analytics
│       └── system/reset/              # Instant state reset to initial seed data
│
├── components/ui/
│   ├── AppShell.tsx                   # Universal top navigation, sandbox bar & quick demo persona switcher
│   ├── IdentityMask.tsx               # Privacy-first masked APAAR component with audited unmasking
│   ├── StatusBadge.tsx                # Status chips for enrolments, batches, cases, and requests
│   └── KpiCard.tsx                    # Minimalist enterprise KPI metric cards
│
├── lib/
│   ├── auth/authContext.tsx           # React authentication context with 7 switchable demo personas
│   ├── data/mockDatabase.ts           # Relational in-memory store pre-seeded with 10 test scenarios
│   └── api/response.ts                # Standard API response envelope (data, meta, error)
│
└── types/
    └── index.ts                       # Complete TypeScript domain contracts & enums
```

---

## 7 Switchable Demo Personas

Using the top bar dropdown or `/sign-in`, test the platform across any of the following pre-configured personas:

| Persona | Name | Role | Scope |
| :--- | :--- | :--- | :--- |
| **Institution Admin** | Dr. R. K. Sharma | `INSTITUTION_ADMIN` | Delhi Institute of Technology (DIT) |
| **Data Operator** | Ananya Verma | `INSTITUTION_OPERATOR` | Delhi Institute of Technology (DIT) |
| **AICTE Reviewer** | Priya Sundaram | `AICTE_REVIEWER` | AICTE Regulation Bureau |
| **Policy Admin** | Vikram Malhotra | `AICTE_POLICY_ADMIN` | AICTE Policy & Approval Cell |
| **System Admin** | Rajesh Nair | `SYSTEM_ADMIN` | Global Platform Infrastructure |
| **Student** | Kabir Singhania | `STUDENT` | Active Student (Subject of duplicate case) |
| **External Verifier**| Neha Deshmukh | `VERIFIER` | TCS Talent Verification Services |

---

## 10-Step Interactive Demo Walkthrough (PRD Section 16 & 30.1)

1. **Step 1: Explore Public Portal**
   - Navigate to `http://localhost:3000/`.
   - Inspect the interactive workflow diagram, stakeholder cards, and security principles.
2. **Step 2: Sign in as Institution Admin**
   - Click "Sign In" or select **Dr. R. K. Sharma** via the top persona dropdown.
   - Navigate to `/institution/overview` to view Approved Intake (420), Enrolled (395), and Seat Utilization (94.0%).
3. **Step 3: Review Over-Capacity & Supernumerary Seats**
   - Navigate to `/institution/intake`.
   - Inspect the Policy-as-Code breakdown: regular intake vs. 5% TFW, 10% Lateral Entry, and EWS quotas.
4. **Step 4: Upload Student Batch via CSV**
   - Go to `/institution/uploads`.
   - Drag and drop or upload a CSV, preview the 4 parsed rows, and click "Upload & Validate Batch".
   - Notice the real-time syntax checking and batch progress tracking.
5. **Step 5: Inspect Validation Issues**
   - Go to `/institution/issues`.
   - View the active mismatch for Vikrant Roy (DoB mismatch between submission and APAAR Registry).
   - Click "Mark as Resolved" after fixing the date of birth.
6. **Step 6: AICTE Duplicate Case Adjudication**
   - Switch persona to **Priya Sundaram (AICTE Reviewer)**.
   - Go to `/aicte/alerts` and click into case `CASE-2024-001` (Kabir Singhania enrolled in both DIT Delhi and MNCE Pune).
   - Review timeline, compare college submissions, and select "Request Transfer Certificate Confirmation".
7. **Step 7: Over-Capacity Sanction Enforcement**
   - In the AICTE console, visit `/aicte/capacity`.
   - Locate Maharashtra National College of Engineering (MNCE Pune) with 111.7% capacity utilization.
   - Review the regulatory violation notice issued under APH 2024 Clause 4.2.
8. **Step 8: Student View & Consent Gate**
   - Switch persona to **Kabir Singhania (Student)**.
   - Visit `/student/overview` to see the digital APAAR Card (`XXXX-XXXX-4819`). Click "Reveal" to test the audited unmasking.
   - Visit `/student/verification-requests` to approve or deny pending employer verification requests.
9. **Step 9: Employer Verification & QR Scanning**
   - Switch persona to **Neha Deshmukh (Verifier)**.
   - Visit `/verifier/requests` and open `VR-2024-001`.
   - Download the official Tamper-Evident Enrolment Verification Certificate.
   - Visit `/verifier/scan` to test QR code scanning and instant cryptographic token lookup (`TOK-VER-98234-A7`).
10. **Step 10: Immutable Audit Log Verification**
    - Switch back to **Rajesh Nair (System Admin)**.
    - Go to `/aicte/audit` to view the chronological, cryptographically hashed audit event trail documenting all actions taken during the demo.

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v24.14.0)
- npm 9+

### Installation
```bash
# Clone the repository and install dependencies
cd /Users/bhaskarshah05/Apaar
npm install
```

### Running in Development Mode
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

### Building & Running Production Build
```bash
npm run build
npm run start
# Running on http://localhost:3000
```

---

## Regulatory Policy Compliance

| Regulation | Provision | Platform Implementation |
| :--- | :--- | :--- |
| **AICTE APH Clause 4.2** | Maximum Approved Intake enforcement | Dynamic capacity warning triggers at 100% and strict non-compliance alert at >100%. |
| **AICTE APH Clause 4.4** | Supernumerary Quota separation | TFW (5%) & Lateral Entry (10%) calculated separately; cannot be merged into regular intake. |
| **DPDP Act 2023** | Citizen data minimization & consent | APAAR masked by default; verifiers only see verified boolean unless student grants explicit consent. |
| **National Credit Framework (NCrF)** | Unified student identifier | APAAR ID used strictly as identity reference; academic credit ledger points to DigiLocker/ABC. |

---

*Designed and engineered for the AICTE Smart India Hackathon (Regulation Bureau).*

