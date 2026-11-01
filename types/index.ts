export type Role = 
  | 'INSTITUTION_ADMIN'
  | 'INSTITUTION_OPERATOR'
  | 'AICTE_REVIEWER'
  | 'AICTE_POLICY_ADMIN'
  | 'AICTE_SYSTEM_ADMIN'
  | 'STUDENT'
  | 'EXTERNAL_VERIFIER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  institutionId?: string;
  institutionName?: string;
  studentApaarId?: string;
  studentUuid?: string;
  verifierOrg?: string;
  mfaEnabled: boolean;
}

export interface Institution {
  id: string;
  aicteId: string; // e.g. "1-3514210981"
  aisheCode: string; // e.g. "C-16492"
  name: string;
  type: 'GOVERNMENT' | 'GOVT_AIDED' | 'PRIVATE_SELF_FINANCED' | 'UNIVERSITY_DEPT' | 'DEEMED';
  state: string;
  district: string;
  status: 'ACTIVE' | 'PROVISIONAL' | 'SUSPENDED' | 'UNDER_REVIEW';
  contactEmail: string;
  contactPhone: string;
  principalName: string;
  intakeApprovedTotal: number;
  enrolmentCurrentTotal: number;
  apaarVerifiedRate: number;
  unresolvedIssuesCount: number;
  lastSyncAt: string;
}

export type SeatBucketCode = 'REGULAR' | 'NRI' | 'OCI_FN' | 'TFW' | 'LATERAL_ENTRY' | 'SUPERNUMERARY' | 'J_AND_K_PMSSS' | 'SPORTS_QUOTA';

export type CapacityBasis = 'WITHIN_APPROVED_INTAKE' | 'SUPERNUMERARY' | 'RESERVED_WITHIN_BUCKET' | 'CONDITIONAL';

export interface CapacityEntitlement {
  bucketCode: SeatBucketCode;
  bucketLabel: string;
  basis: CapacityBasis;
  approvedQuantity: number;
  consumedQuantity: number;
  policyFormula?: string;
  reversionCondition?: string;
  approvalReference: string;
}

export interface Programme {
  id: string; // e.g. "PRG-DIT-CSE-UG"
  institutionId: string;
  level: 'UNDERGRADUATE' | 'POSTGRADUATE' | 'DIPLOMA';
  degree: 'B.Tech' | 'M.Tech' | 'MCA' | 'MBA' | 'Polytechnic';
  branch: string; // "Computer Science and Engineering"
  academicYear: string; // "2026-27"
  mode: 'REGULAR_FULL_TIME' | 'PART_TIME';
  baseApprovedIntake: number;
  effectiveCapacity: number;
  currentActiveEnrolment: number;
  approvalReference: string;
  lastUpdated: string;
  entitlements: CapacityEntitlement[];
}

export type APAARVerificationState = 
  | 'VERIFIED'
  | 'FORMAT_VALID'
  | 'NOT_FOUND'
  | 'MISMATCH'
  | 'PENDING'
  | 'UNAVAILABLE'
  | 'NOT_SUBMITTED';

export interface StudentIdentity {
  uuid: string;
  apaarIdMasked: string; // e.g. "XXXX-XXXX-4819"
  apaarHmac: string; // SHA-256 HMAC for privacy-safe deduplication
  verificationState: APAARVerificationState;
  providerMetadata?: {
    source: 'SANDBOX_APPLY_ABC' | 'DIGILOCKER_NAD_MOCK' | 'MANUAL_OVERRIDE';
    txRef: string;
    verifiedAt: string;
    providerResponseCode: string;
  };
  name: string;
  dobMasked: string; // e.g. "15-XX-2004"
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  fatherName: string;
  guardianConsentRecorded: boolean;
}

export type EnrolmentStatus = 
  | 'ACTIVE'
  | 'PENDING_VALIDATION'
  | 'TRANSFERRED_OUT'
  | 'WITHDRAWN'
  | 'COMPLETED'
  | 'QUARANTINED';

export interface Enrolment {
  id: string; // e.g. "ENR-2026-00812"
  studentUuid: string;
  institutionId: string;
  institutionName: string;
  programmeId: string;
  programmeName: string;
  academicYear: string;
  institutionRollNumber: string;
  admissionDate: string; // ISO "2026-08-10"
  admissionCategory: 'GENERAL' | 'OBC' | 'SC' | 'ST' | 'EWS';
  seatBucket: SeatBucketCode;
  nriStatus: boolean;
  ociStatus: boolean;
  foreignNationalStatus: boolean;
  status: EnrolmentStatus;
  batchId?: string;
  createdAt: string;
  updatedAt: string;
}

export type EventType = 
  | 'ADMISSION'
  | 'CORRECTION'
  | 'TRANSFER_OUT'
  | 'WITHDRAWAL'
  | 'COMPLETION'
  | 'REOPEN';

export interface EnrolmentEvent {
  id: string;
  enrolmentId: string;
  eventType: EventType;
  effectiveDate: string;
  actor: string;
  evidenceReference: string;
  notes: string;
  timestamp: string;
}

export type Severity = 'BLOCKER' | 'ERROR' | 'WARNING' | 'INFO';

export interface ValidationIssue {
  id: string;
  recordId?: string;
  batchId?: string;
  institutionId: string;
  studentRollNumber?: string;
  apaarMasked?: string;
  ruleCode: string;
  severity: Severity;
  field: string;
  message: string;
  explanation: string;
  nextAction: string;
  status: 'OPEN' | 'RESOLVED' | 'QUARANTINED';
  createdAt: string;
}

export type ConflictState = 
  | 'OPEN'
  | 'UNDER_REVIEW'
  | 'LEGITIMATE_TRANSFER'
  | 'CONFIRMED_DUPLICATE'
  | 'INCONCLUSIVE'
  | 'RESOLVED';

export interface ConflictCase {
  id: string; // e.g. "CASE-2026-042"
  title: string;
  conflictType: 'CROSS_INSTITUTION_OVERLAP' | 'SAME_INSTITUTION_COLLISION' | 'CAPACITY_EXCEEDED' | 'ANOMALOUS_SPIKE';
  studentUuid?: string;
  apaarMasked?: string;
  studentName?: string;
  enrolments: {
    enrolmentId: string;
    institutionId: string;
    institutionName: string;
    programmeName: string;
    academicYear: string;
    rollNumber: string;
    admissionDate: string;
    status: EnrolmentStatus;
  }[];
  dateOverlap: string; // e.g. "2026-08-15 to Present (Simultaneous Active Enrolment)"
  confidenceScore: number; // 0-100
  reasonCodes: string[];
  evidenceText: string;
  state: ConflictState;
  assignedReviewer?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  history: {
    actor: string;
    action: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface PolicyRule {
  id: string;
  code: string; // e.g. "AICTE-APH-2024-27-CLAUSE-4.2"
  title: string;
  programmeLevel: 'UNDERGRADUATE' | 'POSTGRADUATE' | 'DIPLOMA' | 'ALL';
  seatBucket: SeatBucketCode;
  capacityBasis: CapacityBasis;
  ruleFormula: string; // e.g. "TFW is capped at 5% supernumerary of approved intake"
  sourceAuthority: string; // e.g. "AICTE Approval Process Handbook 2024-25 to 2026-27"
  effectiveFrom: string;
  effectiveTo: string;
  version: string;
  status: 'PUBLISHED' | 'DRAFT' | 'SUPERSEDED';
  publishedBy: string;
  publishedAt: string;
}

export interface VerificationRequest {
  id: string;
  opaqueToken: string; // e.g. "vref_98a72b4c10"
  requesterOrg: string;
  requesterUser: string;
  studentUuid: string;
  studentName: string;
  studentApaarMasked: string;
  claimType: 'ENROLMENT_STATUS' | 'INSTITUTION_ATTENDANCE' | 'ACADEMIC_AWARD_REDIRECT';
  purpose: 'EMPLOYMENT_BACKGROUND_CHECK' | 'HIGHER_STUDY_ADMISSION' | 'VISA_APPLICATION' | 'REGULATORY_AUDIT';
  requestedAttributes: string[];
  status: 'PENDING_STUDENT_CONSENT' | 'APPROVED' | 'DECLINED' | 'EXPIRED';
  consentGrantedAt?: string;
  expiresAt: string;
  createdAt: string;
  verifiedResult?: {
    institutionName: string;
    programmeName: string;
    academicYear: string;
    admissionDate: string;
    enrolmentStatus: string;
    cryptographicSignature: string;
    issuerProvenance: string;
    limitationsDisclaimer: string;
  };
}

export interface AuditEvent {
  id: string;
  actor: string;
  actorRole: Role;
  action: string; // "STUDENT_SUBMIT", "CASE_RESOLVE", "POLICY_PUBLISH", "APAAR_REVEAL", "EXPORT_REPORT"
  entity: string; // "Enrolment", "ConflictCase", "PolicyRule", "BatchUpload"
  targetId: string;
  requestCorrelationId: string;
  ipAddress: string;
  outcome: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  details: string;
  timestamp: string;
}

export interface BatchRow {
  rowNumber: number;
  institutionStudentId: string;
  apaarIdRaw?: string;
  apaarMasked: string;
  studentName: string;
  admissionDate: string;
  admissionCategory: string;
  seatBucket: SeatBucketCode;
  nriStatus: boolean;
  ociStatus: boolean;
  foreignNationalStatus: boolean;
  status: 'ACCEPTED' | 'WARNING' | 'REJECTED';
  apaarVerificationState: APAARVerificationState;
  reasonCode?: string;
  message?: string;
  correctable: boolean;
}

export interface SubmissionBatch {
  id: string; // e.g. "BATCH-2026-0891"
  institutionId: string;
  institutionName: string;
  programmeId: string;
  programmeName: string;
  academicYear: string;
  filename: string;
  schemaVersion: string;
  totalRows: number;
  acceptedRows: number;
  warningRows: number;
  rejectedRows: number;
  apaarVerifiedRows: number;
  apaarPendingRows: number;
  status: 'COMPLETED' | 'PROCESSING' | 'VALIDATION_FAILED' | 'RECONCILED';
  submittedBy: string;
  createdAt: string;
  rows: BatchRow[];
}

