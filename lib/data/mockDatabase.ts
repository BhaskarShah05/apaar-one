import {
  Institution,
  Programme,
  StudentIdentity,
  Enrolment,
  EnrolmentEvent,
  ValidationIssue,
  ConflictCase,
  PolicyRule,
  VerificationRequest,
  AuditEvent,
  SubmissionBatch,
  UserProfile,
  Role,
} from '@/types';

// In-Memory autoritative repository state
interface DBState {
  institutions: Institution[];
  programmes: Programme[];
  studentIdentities: StudentIdentity[];
  enrolments: Enrolment[];
  enrolmentEvents: EnrolmentEvent[];
  validationIssues: ValidationIssue[];
  conflictCases: ConflictCase[];
  policyRules: PolicyRule[];
  verificationRequests: VerificationRequest[];
  auditEvents: AuditEvent[];
  submissionBatches: SubmissionBatch[];
}

export const INITIAL_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-dit-del-01',
    aicteId: '1-3514210981',
    aisheCode: 'C-16492',
    name: 'Delhi Institute of Technology & Engineering',
    type: 'GOVT_AIDED',
    state: 'Delhi',
    district: 'New Delhi',
    status: 'ACTIVE',
    contactEmail: 'admissions@dit.edu.in',
    contactPhone: '+91 11 2659 7120',
    principalName: 'Dr. Rajeshwar Sharma',
    intakeApprovedTotal: 360,
    enrolmentCurrentTotal: 351,
    apaarVerifiedRate: 94.2,
    unresolvedIssuesCount: 3,
    lastSyncAt: '2026-10-31T09:15:00Z',
  },
  {
    id: 'inst-mnce-pune-02',
    aicteId: '1-9872341201',
    aisheCode: 'C-20184',
    name: 'Maharashtra National College of Engineering',
    type: 'PRIVATE_SELF_FINANCED',
    state: 'Maharashtra',
    district: 'Pune',
    status: 'ACTIVE',
    contactEmail: 'registrar@mnce.ac.in',
    contactPhone: '+91 20 2420 5000',
    principalName: 'Dr. Sunil Kulkarni',
    intakeApprovedTotal: 480,
    enrolmentCurrentTotal: 486, // Over-enrolment flagged!
    apaarVerifiedRate: 88.5,
    unresolvedIssuesCount: 7,
    lastSyncAt: '2026-10-30T17:45:00Z',
  },
  {
    id: 'inst-bits-blr-03',
    aicteId: '1-5463728190',
    aisheCode: 'C-33291',
    name: 'Bengaluru Institute of Technology & Science',
    type: 'PRIVATE_SELF_FINANCED',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    status: 'ACTIVE',
    contactEmail: 'office@bits-blr.edu.in',
    contactPhone: '+91 80 2234 9000',
    principalName: 'Dr. Anuradha Hegde',
    intakeApprovedTotal: 600,
    enrolmentCurrentTotal: 582,
    apaarVerifiedRate: 96.8,
    unresolvedIssuesCount: 1,
    lastSyncAt: '2026-10-31T08:30:00Z',
  },
  {
    id: 'inst-gtu-ahmd-04',
    aicteId: '1-4455667788',
    aisheCode: 'C-11928',
    name: 'Gujarat Technical University School of Technology',
    type: 'UNIVERSITY_DEPT',
    state: 'Gujarat',
    district: 'Ahmedabad',
    status: 'ACTIVE',
    contactEmail: 'admissions@gtu.ac.in',
    contactPhone: '+91 79 2326 7500',
    principalName: 'Prof. J. M. Patel',
    intakeApprovedTotal: 300,
    enrolmentCurrentTotal: 294,
    apaarVerifiedRate: 92.1,
    unresolvedIssuesCount: 2,
    lastSyncAt: '2026-10-29T14:20:00Z',
  },
  {
    id: 'inst-cea-chennai-05',
    aicteId: '1-6789123456',
    aisheCode: 'C-44120',
    name: 'Chennai Engineering Academy & Research Institute',
    type: 'GOVERNMENT',
    state: 'Tamil Nadu',
    district: 'Chennai',
    status: 'ACTIVE',
    contactEmail: 'dean@ceachennai.edu.in',
    contactPhone: '+91 44 2235 8000',
    principalName: 'Dr. K. Swaminathan',
    intakeApprovedTotal: 420,
    enrolmentCurrentTotal: 410,
    apaarVerifiedRate: 95.5,
    unresolvedIssuesCount: 0,
    lastSyncAt: '2026-10-31T07:10:00Z',
  },
];

export const INITIAL_PROGRAMMES: Programme[] = [
  {
    id: 'PRG-DIT-CSE-UG',
    institutionId: 'inst-dit-del-01',
    level: 'UNDERGRADUATE',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    academicYear: '2026-27',
    mode: 'REGULAR_FULL_TIME',
    baseApprovedIntake: 60,
    effectiveCapacity: 69, // 60 + 3 TFW + 6 Lateral
    currentActiveEnrolment: 62, // 60 regular + 2 TFW
    approvalReference: 'AICTE/NWRO/2026-27/1-3514210981/EOA',
    lastUpdated: '2026-06-15T10:00:00Z',
    entitlements: [
      {
        bucketCode: 'REGULAR',
        bucketLabel: 'Regular Approved Intake',
        basis: 'WITHIN_APPROVED_INTAKE',
        approvedQuantity: 60,
        consumedQuantity: 60,
        approvalReference: 'AICTE/EOA/2026-27/1-3514210981',
      },
      {
        bucketCode: 'TFW',
        bucketLabel: 'Tuition Fee Waiver (TFW)',
        basis: 'SUPERNUMERARY',
        approvedQuantity: 3,
        consumedQuantity: 2,
        policyFormula: 'Max 5% of Approved Intake as per APH Clause 4.2',
        approvalReference: 'AICTE/APH/2026-27/SUPERNUM-TFW',
      },
      {
        bucketCode: 'LATERAL_ENTRY',
        bucketLabel: 'Lateral Entry (2nd Year Direct)',
        basis: 'SUPERNUMERARY',
        approvedQuantity: 6,
        consumedQuantity: 0,
        policyFormula: '10% of Approved Intake as per APH Clause 4.4',
        approvalReference: 'AICTE/APH/2026-27/LATERAL',
      },
    ],
  },
  {
    id: 'PRG-DIT-ECE-UG',
    institutionId: 'inst-dit-del-01',
    level: 'UNDERGRADUATE',
    degree: 'B.Tech',
    branch: 'Electronics & Communication Engineering',
    academicYear: '2026-27',
    mode: 'REGULAR_FULL_TIME',
    baseApprovedIntake: 60,
    effectiveCapacity: 66,
    currentActiveEnrolment: 58,
    approvalReference: 'AICTE/NWRO/2026-27/1-3514210981/EOA',
    lastUpdated: '2026-06-15T10:00:00Z',
    entitlements: [
      {
        bucketCode: 'REGULAR',
        bucketLabel: 'Regular Approved Intake',
        basis: 'WITHIN_APPROVED_INTAKE',
        approvedQuantity: 60,
        consumedQuantity: 58,
        approvalReference: 'AICTE/EOA/2026-27/1-3514210981',
      },
      {
        bucketCode: 'TFW',
        bucketLabel: 'Tuition Fee Waiver (TFW)',
        basis: 'SUPERNUMERARY',
        approvedQuantity: 3,
        consumedQuantity: 0,
        approvalReference: 'AICTE/APH/2026-27/SUPERNUM-TFW',
      },
    ],
  },
  {
    id: 'PRG-MNCE-IT-UG',
    institutionId: 'inst-mnce-pune-02',
    level: 'UNDERGRADUATE',
    degree: 'B.Tech',
    branch: 'Information Technology',
    academicYear: '2026-27',
    mode: 'REGULAR_FULL_TIME',
    baseApprovedIntake: 120,
    effectiveCapacity: 126, // 120 + 6 TFW
    currentActiveEnrolment: 128, // Flagged! 128 exceeds permitted 126!
    approvalReference: 'AICTE/WRO/2026-27/1-9872341201/EOA',
    lastUpdated: '2026-06-20T11:30:00Z',
    entitlements: [
      {
        bucketCode: 'REGULAR',
        bucketLabel: 'Regular Approved Intake',
        basis: 'WITHIN_APPROVED_INTAKE',
        approvedQuantity: 120,
        consumedQuantity: 122, // OVER-CAPACITY!
        approvalReference: 'AICTE/EOA/2026-27/1-9872341201',
      },
      {
        bucketCode: 'TFW',
        bucketLabel: 'Tuition Fee Waiver (TFW)',
        basis: 'SUPERNUMERARY',
        approvedQuantity: 6,
        consumedQuantity: 6,
        approvalReference: 'AICTE/APH/2026-27/SUPERNUM-TFW',
      },
    ],
  },
];

export const INITIAL_POLICY_RULES: PolicyRule[] = [
  {
    id: 'pol-rule-aph-4.1',
    code: 'AICTE-APH-2024-27-CLAUSE-4.1',
    title: 'Base Approved Intake Regular Seats',
    programmeLevel: 'ALL',
    seatBucket: 'REGULAR',
    capacityBasis: 'WITHIN_APPROVED_INTAKE',
    ruleFormula: 'Intake sanctioned by AICTE in Extension of Approval (EoA) letter for the academic year.',
    sourceAuthority: 'AICTE Approval Process Handbook 2024-25 to 2026-27 Chapter IV',
    effectiveFrom: '2024-04-01',
    effectiveTo: '2027-03-31',
    version: '2.1',
    status: 'PUBLISHED',
    publishedBy: 'Dr. S. K. Gupta (Policy Director, AICTE)',
    publishedAt: '2024-03-25T14:00:00Z',
  },
  {
    id: 'pol-rule-aph-4.2',
    code: 'AICTE-APH-2024-27-CLAUSE-4.2',
    title: 'Tuition Fee Waiver (TFW) Scheme',
    programmeLevel: 'UNDERGRADUATE',
    seatBucket: 'TFW',
    capacityBasis: 'SUPERNUMERARY',
    ruleFormula: 'A maximum of 5% of Approved Intake per Course shall be available for these admissions over and above the sanctioned intake. Eligibility: Annual family income less than Rs. 8 Lakhs.',
    sourceAuthority: 'AICTE Approval Process Handbook 2024-25 to 2026-27 Clause 4.2',
    effectiveFrom: '2024-04-01',
    effectiveTo: '2027-03-31',
    version: '1.4',
    status: 'PUBLISHED',
    publishedBy: 'Dr. S. K. Gupta (Policy Director, AICTE)',
    publishedAt: '2024-03-25T14:00:00Z',
  },
  {
    id: 'pol-rule-aph-4.3',
    code: 'AICTE-APH-2024-27-CLAUSE-4.3',
    title: 'Supernumerary Seats for NRI / PIO / FN / Gulf Quota',
    programmeLevel: 'UNDERGRADUATE',
    seatBucket: 'NRI',
    capacityBasis: 'SUPERNUMERARY',
    ruleFormula: '15% Supernumerary seats over and above the approved intake permitted strictly subject to specific approval from AICTE and Ministry clearance.',
    sourceAuthority: 'AICTE Approval Process Handbook Clause 4.3 & Gazette Notification',
    effectiveFrom: '2024-04-01',
    effectiveTo: '2027-03-31',
    version: '1.2',
    status: 'PUBLISHED',
    publishedBy: 'Dr. S. K. Gupta (Policy Director, AICTE)',
    publishedAt: '2024-03-25T14:00:00Z',
  },
  {
    id: 'pol-rule-aph-4.4',
    code: 'AICTE-APH-2024-27-CLAUSE-4.4',
    title: 'Lateral Entry to 2nd Year B.Tech / B.E.',
    programmeLevel: 'UNDERGRADUATE',
    seatBucket: 'LATERAL_ENTRY',
    capacityBasis: 'SUPERNUMERARY',
    ruleFormula: '10% of the Approved Intake for Diploma holders and B.Sc Degree holders eligible for direct second year admission.',
    sourceAuthority: 'AICTE Approval Process Handbook Clause 4.4',
    effectiveFrom: '2024-04-01',
    effectiveTo: '2027-03-31',
    version: '1.0',
    status: 'PUBLISHED',
    publishedBy: 'Dr. S. K. Gupta (Policy Director, AICTE)',
    publishedAt: '2024-03-25T14:00:00Z',
  },
];

export const INITIAL_STUDENTS: StudentIdentity[] = [
  {
    uuid: 'stu-9011-8842-001',
    apaarIdMasked: 'XXXX-XXXX-4819',
    apaarHmac: 'hmac_sha256_902138471092',
    verificationState: 'VERIFIED',
    name: 'Aarav Sharma',
    dobMasked: '15-XX-2004',
    gender: 'MALE',
    fatherName: 'M. K. Sharma',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-2026-9921',
      verifiedAt: '2026-08-11T11:20:00Z',
      providerResponseCode: 'ABC_SUCCESS_MATCH_200',
    },
  },
  {
    uuid: 'stu-9011-8842-002',
    apaarIdMasked: 'XXXX-XXXX-3190',
    apaarHmac: 'hmac_sha256_445588992211',
    verificationState: 'VERIFIED',
    name: 'Ananya Deshmukh',
    dobMasked: '03-XX-2005',
    gender: 'FEMALE',
    fatherName: 'Sanjay Deshmukh',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-2026-9922',
      verifiedAt: '2026-08-11T12:05:00Z',
      providerResponseCode: 'ABC_SUCCESS_MATCH_200',
    },
  },
  {
    uuid: 'stu-9011-8842-003',
    apaarIdMasked: 'NOT_SUBMITTED',
    apaarHmac: 'provisional_temp_9011_003',
    verificationState: 'NOT_SUBMITTED',
    name: 'Rohan Mehra',
    dobMasked: '22-XX-2004',
    gender: 'MALE',
    fatherName: 'Harish Mehra',
    guardianConsentRecorded: false,
  },
  {
    uuid: 'stu-9011-8842-004',
    apaarIdMasked: 'XXXX-XXXX-9901',
    apaarHmac: 'hmac_sha256_overlap_conflict_key',
    verificationState: 'VERIFIED',
    name: 'Kabir Singhania',
    dobMasked: '19-XX-2004',
    gender: 'MALE',
    fatherName: 'V. Singhania',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-2026-4491',
      verifiedAt: '2026-08-12T14:30:00Z',
      providerResponseCode: 'ABC_SUCCESS_MATCH_200',
    },
  },
  {
    uuid: 'stu-9011-8842-005',
    apaarIdMasked: 'XXXX-XXXX-1122',
    apaarHmac: 'hmac_sha256_transfer_case_key',
    verificationState: 'VERIFIED',
    name: 'Sneha Patel',
    dobMasked: '08-XX-2005',
    gender: 'FEMALE',
    fatherName: 'Bipin Patel',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-2026-6611',
      verifiedAt: '2026-08-14T09:40:00Z',
      providerResponseCode: 'ABC_SUCCESS_MATCH_200',
    },
  },
  {
    uuid: 'stu-9011-8842-006',
    apaarIdMasked: 'XXXX-XXXX-7721',
    apaarHmac: 'hmac_sha256_mismatch_record_key',
    verificationState: 'MISMATCH',
    name: 'Vikrant Roy',
    dobMasked: '11-XX-2004',
    gender: 'MALE',
    fatherName: 'P. Roy',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-2026-8802',
      verifiedAt: '2026-08-15T16:10:00Z',
      providerResponseCode: 'ABC_ATTRIBUTE_NAME_DOB_CONFLICT_409',
    },
  },
  {
    uuid: 'stu-9011-8842-007',
    apaarIdMasked: 'XXXX-XXXX-5541',
    apaarHmac: 'hmac_sha256_provider_down_key',
    verificationState: 'UNAVAILABLE',
    name: 'Tanya Banerjee',
    dobMasked: '27-XX-2004',
    gender: 'FEMALE',
    fatherName: 'A. Banerjee',
    guardianConsentRecorded: true,
    providerMetadata: {
      source: 'SANDBOX_APPLY_ABC',
      txRef: 'TXN-ABC-GATEWAY-TIMEOUT-504',
      verifiedAt: '2026-08-16T10:00:00Z',
      providerResponseCode: 'GATEWAY_TIMEOUT_RETRY_SCHEDULED',
    },
  },
];

export const INITIAL_ENROLMENTS: Enrolment[] = [
  {
    id: 'ENR-DIT-2026-001',
    studentUuid: 'stu-9011-8842-001',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE101',
    admissionDate: '2026-08-10',
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-10T10:00:00Z',
  },
  {
    id: 'ENR-DIT-2026-002',
    studentUuid: 'stu-9011-8842-002',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE102',
    admissionDate: '2026-08-10',
    admissionCategory: 'OBC',
    seatBucket: 'TFW',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-10T10:05:00Z',
    updatedAt: '2026-08-10T10:05:00Z',
  },
  {
    id: 'ENR-DIT-2026-003',
    studentUuid: 'stu-9011-8842-003',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE103',
    admissionDate: '2026-08-11',
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-11T09:30:00Z',
    updatedAt: '2026-08-11T09:30:00Z',
  },
  // Cross-institution conflict student (Kabir Singhania) active at DIT and MNCE!
  {
    id: 'ENR-DIT-2026-004',
    studentUuid: 'stu-9011-8842-004',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE104',
    admissionDate: '2026-08-12',
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-12T11:00:00Z',
    updatedAt: '2026-08-12T11:00:00Z',
  },
  {
    id: 'ENR-MNCE-2026-099',
    studentUuid: 'stu-9011-8842-004',
    institutionId: 'inst-mnce-pune-02',
    institutionName: 'Maharashtra National College of Engineering',
    programmeId: 'PRG-MNCE-IT-UG',
    programmeName: 'B.Tech Information Technology',
    academicYear: '2026-27',
    institutionRollNumber: '24IT099',
    admissionDate: '2026-08-14',
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    createdAt: '2026-08-14T15:20:00Z',
    updatedAt: '2026-08-14T15:20:00Z',
  },
  // Legitimate Transfer case (Sneha Patel transferred from BITS to DIT)
  {
    id: 'ENR-BITS-2025-045',
    studentUuid: 'stu-9011-8842-005',
    institutionId: 'inst-bits-blr-03',
    institutionName: 'Bengaluru Institute of Technology & Science',
    programmeId: 'PRG-BITS-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2025-26',
    institutionRollNumber: '23CSE045',
    admissionDate: '2025-08-01',
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'TRANSFERRED_OUT',
    createdAt: '2025-08-01T10:00:00Z',
    updatedAt: '2026-07-28T14:00:00Z',
  },
  {
    id: 'ENR-DIT-2026-005',
    studentUuid: 'stu-9011-8842-005',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE-LAT-01',
    admissionDate: '2026-08-16',
    admissionCategory: 'GENERAL',
    seatBucket: 'LATERAL_ENTRY',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'ACTIVE',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-16T12:00:00Z',
    updatedAt: '2026-08-16T12:00:00Z',
  },
  // Mismatch student
  {
    id: 'ENR-DIT-2026-006',
    studentUuid: 'stu-9011-8842-006',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE106',
    admissionDate: '2026-08-17',
    admissionCategory: 'SC',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'QUARANTINED',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-17T09:00:00Z',
    updatedAt: '2026-08-17T09:00:00Z',
  },
  // Provider unavailable student
  {
    id: 'ENR-DIT-2026-007',
    studentUuid: 'stu-9011-8842-007',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    institutionRollNumber: '24CSE107',
    admissionDate: '2026-08-18',
    admissionCategory: 'EWS',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    status: 'PENDING_VALIDATION',
    batchId: 'BATCH-2026-0891',
    createdAt: '2026-08-18T10:15:00Z',
    updatedAt: '2026-08-18T10:15:00Z',
  },
];

export const INITIAL_EVENTS: EnrolmentEvent[] = [
  {
    id: 'evt-001',
    enrolmentId: 'ENR-DIT-2026-001',
    eventType: 'ADMISSION',
    effectiveDate: '2026-08-10',
    actor: 'P. Verma (Data Operator, DIT)',
    evidenceReference: 'MERIT_LIST_SEAT_ALLOTMENT_ROUND_1_RANK_4210',
    notes: 'Regular round 1 merit admission confirmed.',
    timestamp: '2026-08-10T10:00:00Z',
  },
  {
    id: 'evt-002',
    enrolmentId: 'ENR-BITS-2025-045',
    eventType: 'TRANSFER_OUT',
    effectiveDate: '2026-07-28',
    actor: 'Dr. Anuradha Hegde (Principal, BITS)',
    evidenceReference: 'TC_ISSUANCE_REF_BITS_2026_8819',
    notes: 'Institutional transfer certificate issued on parent relocation request.',
    timestamp: '2026-07-28T14:00:00Z',
  },
  {
    id: 'evt-003',
    enrolmentId: 'ENR-DIT-2026-005',
    eventType: 'ADMISSION',
    effectiveDate: '2026-08-16',
    actor: 'P. Verma (Data Operator, DIT)',
    evidenceReference: 'AICTE_INTER_INST_MIGRATION_ORDER_2026_33',
    notes: 'Admitted on approved transfer under Lateral/Migration quota with verification of previous NOC.',
    timestamp: '2026-08-16T12:00:00Z',
  },
];

export const INITIAL_CONFLICT_CASES: ConflictCase[] = [
  {
    id: 'CASE-2026-042',
    title: 'Cross-Institution Simultaneous Active Enrolment Detected',
    conflictType: 'CROSS_INSTITUTION_OVERLAP',
    studentUuid: 'stu-9011-8842-004',
    apaarMasked: 'XXXX-XXXX-9901',
    studentName: 'Kabir Singhania',
    enrolments: [
      {
        enrolmentId: 'ENR-DIT-2026-004',
        institutionId: 'inst-dit-del-01',
        institutionName: 'Delhi Institute of Technology & Engineering',
        programmeName: 'B.Tech Computer Science & Engineering',
        academicYear: '2026-27',
        rollNumber: '24CSE104',
        admissionDate: '2026-08-12',
        status: 'ACTIVE',
      },
      {
        enrolmentId: 'ENR-MNCE-2026-099',
        institutionId: 'inst-mnce-pune-02',
        institutionName: 'Maharashtra National College of Engineering',
        programmeName: 'B.Tech Information Technology',
        academicYear: '2026-27',
        rollNumber: '24IT099',
        admissionDate: '2026-08-14',
        status: 'ACTIVE',
      },
    ],
    dateOverlap: '2026-08-14 to Present (Simultaneous Active Enrolment across two distinct States)',
    confidenceScore: 98,
    reasonCodes: ['RULE_CROSS_INSTITUTION_OVERLAP', 'MATCH_EXACT_APAAR_HMAC', 'UNRESOLVED_CONCURRENT_STATUS'],
    evidenceText: 'Exact APAAR HMAC match confirmed via authorized ABC provider. Both institutions submitted student as full-time regular active candidate within 48 hours of each other without a recorded transfer or withdrawal event.',
    state: 'OPEN',
    assignedReviewer: 'Vikram Nair (Regional Officer, AICTE)',
    history: [
      {
        actor: 'APAAR ONE Reconciliation Engine',
        action: 'CASE_FLAGGED',
        timestamp: '2026-08-14T15:25:00Z',
        notes: 'Automated conflict case generated after batch ingestion from MNCE.',
      },
    ],
  },
  {
    id: 'CASE-2026-043',
    title: 'Sanctioned Approved Intake Exceeded in B.Tech IT',
    conflictType: 'CAPACITY_EXCEEDED',
    enrolments: [],
    dateOverlap: 'Academic Year 2026-27 Admission Cycle',
    confidenceScore: 100,
    reasonCodes: ['RULE_CAPACITY_EXCEEDED', 'AICTE_APH_OVER_ENROLMENT'],
    evidenceText: 'Maharashtra National College of Engineering (MNCE) submitted 122 regular admissions against approved regular intake of 120. Supernumerary TFW seats are at 6/6 capacity. Net excess is +2 unapproved admissions.',
    state: 'UNDER_REVIEW',
    assignedReviewer: 'Vikram Nair (Regional Officer, AICTE)',
    history: [
      {
        actor: 'Seat Compliance Engine',
        action: 'CAPACITY_ALERT_TRIGGERED',
        timestamp: '2026-08-20T16:00:00Z',
        notes: 'Intake ledger calculation triggered over-capacity alert.',
      },
      {
        actor: 'Vikram Nair',
        action: 'CLARIFICATION_REQUESTED',
        timestamp: '2026-08-21T11:00:00Z',
        notes: 'Notice served to MNCE Principal seeking seat allotment list with government quota justification.',
      },
    ],
  },
  {
    id: 'CASE-2026-039',
    title: 'Inter-College Migration / Transfer Verification',
    conflictType: 'CROSS_INSTITUTION_OVERLAP',
    studentUuid: 'stu-9011-8842-005',
    apaarMasked: 'XXXX-XXXX-1122',
    studentName: 'Sneha Patel',
    enrolments: [
      {
        enrolmentId: 'ENR-BITS-2025-045',
        institutionId: 'inst-bits-blr-03',
        institutionName: 'Bengaluru Institute of Technology & Science',
        programmeName: 'B.Tech CSE',
        academicYear: '2025-26',
        rollNumber: '23CSE045',
        admissionDate: '2025-08-01',
        status: 'TRANSFERRED_OUT',
      },
      {
        enrolmentId: 'ENR-DIT-2026-005',
        institutionId: 'inst-dit-del-01',
        institutionName: 'Delhi Institute of Technology & Engineering',
        programmeName: 'B.Tech CSE (Lateral)',
        academicYear: '2026-27',
        rollNumber: '24CSE-LAT-01',
        admissionDate: '2026-08-16',
        status: 'ACTIVE',
      },
    ],
    dateOverlap: 'No overlap: Prior record status is TRANSFERRED_OUT with formal NOC',
    confidenceScore: 95,
    reasonCodes: ['LEGITIMATE_TRANSFER_DOCUMENTED'],
    evidenceText: 'Transfer certificate TC-2026-8819 issued by BITS on 2026-07-28 precedes admission date at DIT (2026-08-16). Valid migration under lateral entry rules.',
    state: 'LEGITIMATE_TRANSFER',
    assignedReviewer: 'Vikram Nair (AICTE)',
    resolutionNotes: 'Verified against state higher education migration order. Not a duplicate enrolment. Case marked Legitimate Transfer.',
    resolvedAt: '2026-08-18T14:30:00Z',
    history: [
      {
        actor: 'Reconciliation Engine',
        action: 'CASE_FLAGGED',
        timestamp: '2026-08-16T12:05:00Z',
      },
      {
        actor: 'Vikram Nair',
        action: 'MARKED_LEGITIMATE_TRANSFER',
        timestamp: '2026-08-18T14:30:00Z',
        notes: 'Attached BITS NOC and DIT admission letter. Validated.',
      },
    ],
  },
];

export const INITIAL_VALIDATION_ISSUES: ValidationIssue[] = [
  {
    id: 'ISSUE-001',
    institutionId: 'inst-dit-del-01',
    studentRollNumber: '24CSE106',
    apaarMasked: 'XXXX-XXXX-7721',
    ruleCode: 'APAAR_ATTR_MISMATCH_NAME_DOB',
    severity: 'ERROR',
    field: 'student_name / date_of_birth',
    message: 'Identity attribute conflict with ABC Registry mock response.',
    explanation: 'Name in institutional upload ("Vikrant Roy") differed phonetically from registered identity record ("Bikrant Ray") at external provider.',
    nextAction: 'Ask student to submit DigiLocker Aadhaar e-KYC correction or upload birth affidavit.',
    status: 'OPEN',
    createdAt: '2026-08-15T16:10:00Z',
  },
  {
    id: 'ISSUE-002',
    institutionId: 'inst-dit-del-01',
    studentRollNumber: '24CSE107',
    apaarMasked: 'XXXX-XXXX-5541',
    ruleCode: 'PROVIDER_GATEWAY_TIMEOUT',
    severity: 'WARNING',
    field: 'apaar_id',
    message: 'External ABC Identity verification gateway timeout (504).',
    explanation: 'Sandbox endpoint timed out during verification check. Record saved in PENDING state; not marked invalid.',
    nextAction: 'Auto-retry scheduled within 4 hours; or trigger manual retry from integration console.',
    status: 'OPEN',
    createdAt: '2026-08-16T10:00:00Z',
  },
  {
    id: 'ISSUE-003',
    institutionId: 'inst-dit-del-01',
    studentRollNumber: '24CSE103',
    apaarMasked: 'NOT_SUBMITTED',
    ruleCode: 'APAAR_PENDING_PROVISIONAL',
    severity: 'WARNING',
    field: 'apaar_id',
    message: 'APAAR ID not supplied at time of admission.',
    explanation: 'Admitted under provisional AICTE internal UUID. Permitted under 30-day grace period for APAAR creation.',
    nextAction: 'Institution nodal officer must collect APAAR registration acknowledgement from student before deadline.',
    status: 'OPEN',
    createdAt: '2026-08-11T09:30:00Z',
  },
  {
    id: 'ISSUE-004',
    institutionId: 'inst-mnce-pune-02',
    studentRollNumber: '24IT121',
    apaarMasked: 'XXXX-XXXX-8833',
    ruleCode: 'CAPACITY_OVERFLOW_BLOCKER',
    severity: 'BLOCKER',
    field: 'admission_category / intake',
    message: 'Admission exceeds approved capacity limit for B.Tech IT.',
    explanation: 'Sanctioned intake is 120 regular seats. Candidate #121 exceeds permitted capacity.',
    nextAction: 'Admission cannot be finalized until approved corrigendum or quota re-allocation order is uploaded.',
    status: 'OPEN',
    createdAt: '2026-08-20T16:00:00Z',
  },
];

export const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'ver-req-2026-091',
    opaqueToken: 'tok_v8f921ab90c34e7',
    requesterOrg: 'TechCorp Background Screening Services Pvt Ltd',
    requesterUser: 'P. Sengupta (Senior Background Investigator)',
    studentUuid: 'stu-9011-8842-001',
    studentName: 'Aarav Sharma',
    studentApaarMasked: 'XXXX-XXXX-4819',
    claimType: 'ENROLMENT_STATUS',
    purpose: 'EMPLOYMENT_BACKGROUND_CHECK',
    requestedAttributes: ['institution_name', 'programme_name', 'academic_year', 'admission_date', 'enrolment_status'],
    status: 'APPROVED',
    consentGrantedAt: '2026-09-02T11:45:00Z',
    expiresAt: '2026-11-02T23:59:59Z',
    createdAt: '2026-09-02T09:10:00Z',
    verifiedResult: {
      institutionName: 'Delhi Institute of Technology & Engineering (DIT-DEL-01)',
      programmeName: 'B.Tech Computer Science & Engineering (4-Year Degree)',
      academicYear: '2026-27',
      admissionDate: '2026-08-10',
      enrolmentStatus: 'ACTIVE_VERIFIED',
      cryptographicSignature: 'SHA256withRSA:4e7b8a1c90f23d4e8b91a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',
      issuerProvenance: 'AICTE Central Enrolment Repository & Delhi Institute of Technology Academic Registrar',
      limitationsDisclaimer: 'Notice: This verification confirms valid institutional enrolment status only. Academic awards (degree/diploma) must be verified separately via DigiLocker / NAD.',
    },
  },
  {
    id: 'ver-req-2026-092',
    opaqueToken: 'tok_pending_c87123aa',
    requesterOrg: 'Global Consulting HR Advisory',
    requesterUser: 'M. Iyer (Talent Acquisition Lead)',
    studentUuid: 'stu-9011-8842-001',
    studentName: 'Aarav Sharma',
    studentApaarMasked: 'XXXX-XXXX-4819',
    claimType: 'ENROLMENT_STATUS',
    purpose: 'EMPLOYMENT_BACKGROUND_CHECK',
    requestedAttributes: ['institution_name', 'programme_name', 'enrolment_status'],
    status: 'PENDING_STUDENT_CONSENT',
    expiresAt: '2026-11-15T23:59:59Z',
    createdAt: '2026-10-30T14:20:00Z',
  },
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'aud-001',
    actor: 'P. Verma (Operator, DIT)',
    actorRole: 'INSTITUTION_OPERATOR',
    action: 'BATCH_UPLOAD_SUBMIT',
    entity: 'SubmissionBatch',
    targetId: 'BATCH-2026-0891',
    requestCorrelationId: 'req_sub_99182371',
    ipAddress: '14.139.60.22',
    outcome: 'SUCCESS',
    details: 'Submitted 65 student records for B.Tech CSE (2026-27). 60 accepted, 3 warnings, 2 quarantined.',
    timestamp: '2026-08-10T09:45:00Z',
  },
  {
    id: 'aud-002',
    actor: 'Vikram Nair (Regional Officer)',
    actorRole: 'AICTE_REVIEWER',
    action: 'CASE_RESOLUTION_LEGITIMATE_TRANSFER',
    entity: 'ConflictCase',
    targetId: 'CASE-2026-039',
    requestCorrelationId: 'req_rev_44129980',
    ipAddress: '164.100.128.5',
    outcome: 'SUCCESS',
    details: 'Verified transfer certificate TC-2026-8819 for student Sneha Patel. Conflict cleared.',
    timestamp: '2026-08-18T14:30:00Z',
  },
  {
    id: 'aud-003',
    actor: 'Dr. S. K. Gupta (Policy Director)',
    actorRole: 'AICTE_POLICY_ADMIN',
    action: 'POLICY_RULE_PUBLISH',
    entity: 'PolicyRule',
    targetId: 'pol-rule-aph-4.2',
    requestCorrelationId: 'req_pol_11029482',
    ipAddress: '164.100.128.9',
    outcome: 'SUCCESS',
    details: 'Published version 1.4 of Tuition Fee Waiver (TFW) supernumerary seat entitlement policy.',
    timestamp: '2026-08-01T11:00:00Z',
  },
  {
    id: 'aud-004',
    actor: 'Aarav Sharma (Student)',
    actorRole: 'STUDENT',
    action: 'CONSENT_GRANTED_VERIFICATION',
    entity: 'VerificationRequest',
    targetId: 'ver-req-2026-091',
    requestCorrelationId: 'req_stu_55481920',
    ipAddress: '103.212.144.18',
    outcome: 'SUCCESS',
    details: 'Granted digital consent to TechCorp for employment background verification.',
    timestamp: '2026-09-02T11:45:00Z',
  },
  {
    id: 'aud-005',
    actor: 'P. Sengupta (Verifier)',
    actorRole: 'EXTERNAL_VERIFIER',
    action: 'RECORD_VERIFICATION_ACCESSED',
    entity: 'VerificationRequest',
    targetId: 'tok_v8f921ab90c34e7',
    requestCorrelationId: 'req_ver_88192301',
    ipAddress: '49.207.210.99',
    outcome: 'SUCCESS',
    details: 'Resolved cryptographic verification proof for token tok_v8f921ab90c34e7. Enrolment verified.',
    timestamp: '2026-09-02T11:46:12Z',
  },
];

export const INITIAL_BATCHES: SubmissionBatch[] = [
  {
    id: 'BATCH-2026-0891',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    programmeId: 'PRG-DIT-CSE-UG',
    programmeName: 'B.Tech Computer Science & Engineering',
    academicYear: '2026-27',
    filename: 'DIT_CSE_Admissions_2026_Batch1.csv',
    schemaVersion: '1.0',
    totalRows: 65,
    acceptedRows: 60,
    warningRows: 3,
    rejectedRows: 2,
    apaarVerifiedRows: 58,
    apaarPendingRows: 2,
    status: 'COMPLETED',
    submittedBy: 'P. Verma (Admissions Data Operator)',
    createdAt: '2026-08-10T09:45:00Z',
    rows: [
      {
        rowNumber: 1,
        institutionStudentId: '24CSE101',
        apaarMasked: 'XXXX-XXXX-4819',
        studentName: 'Aarav Sharma',
        admissionDate: '2026-08-10',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'ACCEPTED',
        apaarVerificationState: 'VERIFIED',
        correctable: false,
      },
      {
        rowNumber: 2,
        institutionStudentId: '24CSE102',
        apaarMasked: 'XXXX-XXXX-3190',
        studentName: 'Ananya Deshmukh',
        admissionDate: '2026-08-10',
        admissionCategory: 'OBC',
        seatBucket: 'TFW',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'ACCEPTED',
        apaarVerificationState: 'VERIFIED',
        correctable: false,
      },
      {
        rowNumber: 3,
        institutionStudentId: '24CSE103',
        apaarMasked: 'NOT_SUBMITTED',
        studentName: 'Rohan Mehra',
        admissionDate: '2026-08-11',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'WARNING',
        apaarVerificationState: 'NOT_SUBMITTED',
        reasonCode: 'APAAR_PENDING_PROVISIONAL',
        message: 'APAAR not supplied. Assigned provisional internal UUID. 30-day grace period active.',
        correctable: true,
      },
      {
        rowNumber: 4,
        institutionStudentId: '24CSE104',
        apaarMasked: 'XXXX-XXXX-9901',
        studentName: 'Kabir Singhania',
        admissionDate: '2026-08-12',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'WARNING',
        apaarVerificationState: 'VERIFIED',
        reasonCode: 'POTENTIAL_CROSS_INSTITUTION_DUPLICATE',
        message: 'Student also active at MNCE Pune. Case CASE-2026-042 opened for AICTE review.',
        correctable: true,
      },
      {
        rowNumber: 5,
        institutionStudentId: '24CSE106',
        apaarMasked: 'XXXX-XXXX-7721',
        studentName: 'Vikrant Roy',
        admissionDate: '2026-08-17',
        admissionCategory: 'SC',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'REJECTED',
        apaarVerificationState: 'MISMATCH',
        reasonCode: 'APAAR_ATTR_MISMATCH_NAME_DOB',
        message: 'Name and date-of-birth mismatch with ABC registry record.',
        correctable: true,
      },
      {
        rowNumber: 6,
        institutionStudentId: '24CSE107',
        apaarMasked: 'XXXX-XXXX-5541',
        studentName: 'Tanya Banerjee',
        admissionDate: '2026-08-18',
        admissionCategory: 'EWS',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'WARNING',
        apaarVerificationState: 'UNAVAILABLE',
        reasonCode: 'PROVIDER_GATEWAY_TIMEOUT',
        message: 'Provider timeout (504). Saved in PENDING state without declaring invalid.',
        correctable: true,
      },
      {
        rowNumber: 7,
        institutionStudentId: '24CSE108',
        apaarMasked: 'XXXX-XXXX-1122',
        studentName: 'Sneha Patel',
        admissionDate: '2026-08-16',
        admissionCategory: 'GENERAL',
        seatBucket: 'LATERAL_ENTRY',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'ACCEPTED',
        apaarVerificationState: 'VERIFIED',
        correctable: false,
      },
      {
        rowNumber: 8,
        institutionStudentId: '24CSE101', // Within-batch duplicate roll number!
        apaarMasked: 'XXXX-XXXX-4819',
        studentName: 'Aarav Sharma',
        admissionDate: '2026-08-10',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        nriStatus: false,
        ociStatus: false,
        foreignNationalStatus: false,
        status: 'REJECTED',
        apaarVerificationState: 'VERIFIED',
        reasonCode: 'DUPLICATE_WITHIN_BATCH',
        message: 'Duplicate institution roll number and APAAR within same upload batch. Blocked.',
        correctable: true,
      },
    ],
  },
];

// In-Memory Database Singleton with persistence capabilities
class MockDatabase {
  private state: DBState;

  constructor() {
    this.state = {
      institutions: [...INITIAL_INSTITUTIONS],
      programmes: [...INITIAL_PROGRAMMES],
      studentIdentities: [...INITIAL_STUDENTS],
      enrolments: [...INITIAL_ENROLMENTS],
      enrolmentEvents: [...INITIAL_EVENTS],
      validationIssues: [...INITIAL_VALIDATION_ISSUES],
      conflictCases: [...INITIAL_CONFLICT_CASES],
      policyRules: [...INITIAL_POLICY_RULES],
      verificationRequests: [...INITIAL_VERIFICATIONS],
      auditEvents: [...INITIAL_AUDIT_EVENTS],
      submissionBatches: [...INITIAL_BATCHES],
    };
  }

  // Institutions
  getInstitutions(): Institution[] {
    return this.state.institutions;
  }

  getInstitution(id: string): Institution | undefined {
    return this.state.institutions.find(i => i.id === id || i.aicteId === id);
  }

  updateInstitutionStatus(id: string, status: Institution['status']) {
    const inst = this.getInstitution(id);
    if (inst) {
      inst.status = status;
    }
  }

  // Programmes
  getProgrammes(institutionId?: string): Programme[] {
    if (institutionId) {
      return this.state.programmes.filter(p => p.institutionId === institutionId);
    }
    return this.state.programmes;
  }

  getProgramme(id: string): Programme | undefined {
    return this.state.programmes.find(p => p.id === id);
  }

  // Enrolments
  getEnrolments(institutionId?: string): Enrolment[] {
    if (institutionId) {
      return this.state.enrolments.filter(e => e.institutionId === institutionId);
    }
    return this.state.enrolments;
  }

  getEnrolment(id: string): Enrolment | undefined {
    return this.state.enrolments.find(e => e.id === id);
  }

  getStudent(uuid: string): StudentIdentity | undefined {
    return this.state.studentIdentities.find(s => s.uuid === uuid);
  }

  getStudentByHmac(hmac: string): StudentIdentity | undefined {
    return this.state.studentIdentities.find(s => s.apaarHmac === hmac);
  }

  // Add single enrolment
  addEnrolment(data: Partial<Enrolment> & { studentName: string; apaarIdRaw?: string }): { enrolment: Enrolment; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];
    const newStudentUuid = `stu-${Date.now().toString().slice(-8)}`;
    
    // Deterministic validation: Check APAAR format
    let verificationState: StudentIdentity['verificationState'] = 'NOT_SUBMITTED';
    let maskedApaar = 'NOT_SUBMITTED';
    let hmac = `provisional_${newStudentUuid}`;

    if (data.apaarIdRaw && data.apaarIdRaw.trim() !== '') {
      const cleanApaar = data.apaarIdRaw.replace(/[^0-9]/g, '');
      if (cleanApaar.length !== 12) {
        issues.push({
          id: `ISSUE-${Date.now()}-1`,
          institutionId: data.institutionId || 'inst-dit-del-01',
          studentRollNumber: data.institutionRollNumber,
          apaarMasked: 'INVALID',
          ruleCode: 'INVALID_APAAR_FORMAT',
          severity: 'BLOCKER',
          field: 'apaar_id',
          message: 'APAAR ID must be exactly 12 digits.',
          explanation: `Received ${cleanApaar.length} digits. APAAR format specification requires a 12-digit structural format.`,
          nextAction: 'Correct the APAAR ID or submit as provisional APAAR pending.',
          status: 'OPEN',
          createdAt: new Date().toISOString(),
        });
        verificationState = 'FORMAT_VALID'; // but blocked
      } else {
        maskedApaar = `XXXX-XXXX-${cleanApaar.slice(-4)}`;
        hmac = `hmac_sha256_${cleanApaar}`;
        verificationState = 'VERIFIED'; // Mock provider sandbox response
      }
    }

    // Check duplicate roll number within institution
    const rollCollision = this.state.enrolments.find(
      e => e.institutionId === data.institutionId &&
           e.programmeId === data.programmeId &&
           e.institutionRollNumber.toLowerCase() === data.institutionRollNumber?.toLowerCase()
    );

    if (rollCollision) {
      issues.push({
        id: `ISSUE-${Date.now()}-2`,
        institutionId: data.institutionId || 'inst-dit-del-01',
        studentRollNumber: data.institutionRollNumber,
        apaarMasked: maskedApaar,
        ruleCode: 'SAME_INSTITUTION_ROLL_COLLISION',
        severity: 'BLOCKER',
        field: 'institution_student_id',
        message: `Roll number ${data.institutionRollNumber} is already enrolled in this programme.`,
        explanation: 'Enrolment roll number must be unique within an institution programme cohort.',
        nextAction: 'Verify student ID / roll number before re-submitting.',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
      });
    }

    const student: StudentIdentity = {
      uuid: newStudentUuid,
      apaarIdMasked: maskedApaar,
      apaarHmac: hmac,
      verificationState,
      name: data.studentName,
      dobMasked: '10-XX-2005',
      gender: 'MALE',
      fatherName: 'Parent Guardian',
      guardianConsentRecorded: true,
      providerMetadata: verificationState === 'VERIFIED' ? {
        source: 'SANDBOX_APPLY_ABC',
        txRef: `TXN-ABC-SANDBOX-${Date.now().toString().slice(-6)}`,
        verifiedAt: new Date().toISOString(),
        providerResponseCode: 'ABC_SUCCESS_MATCH_200',
      } : undefined,
    };
    this.state.studentIdentities.push(student);

    const enrolment: Enrolment = {
      id: `ENR-${data.institutionId?.split('-')[1]?.toUpperCase() || 'INST'}-${Date.now().toString().slice(-5)}`,
      studentUuid: newStudentUuid,
      institutionId: data.institutionId || 'inst-dit-del-01',
      institutionName: this.getInstitution(data.institutionId || '')?.name || 'Delhi Institute of Technology',
      programmeId: data.programmeId || 'PRG-DIT-CSE-UG',
      programmeName: this.getProgramme(data.programmeId || '')?.branch || 'B.Tech CSE',
      academicYear: data.academicYear || '2026-27',
      institutionRollNumber: data.institutionRollNumber || `24CSE${Math.floor(100 + Math.random() * 899)}`,
      admissionDate: data.admissionDate || new Date().toISOString().split('T')[0],
      admissionCategory: data.admissionCategory || 'GENERAL',
      seatBucket: data.seatBucket || 'REGULAR',
      nriStatus: !!data.nriStatus,
      ociStatus: !!data.ociStatus,
      foreignNationalStatus: !!data.foreignNationalStatus,
      status: issues.some(i => i.severity === 'BLOCKER') ? 'QUARANTINED' : 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.enrolments.push(enrolment);

    // Record Admission event
    this.state.enrolmentEvents.push({
      id: `evt-${Date.now()}`,
      enrolmentId: enrolment.id,
      eventType: 'ADMISSION',
      effectiveDate: enrolment.admissionDate,
      actor: 'Institution Operator',
      evidenceReference: 'DIRECT_ENROLMENT_PORTAL_ENTRY',
      notes: `Single student admission record created. Status: ${enrolment.status}`,
      timestamp: new Date().toISOString(),
    });

    // Record audit event
    this.logAuditEvent({
      actor: 'Institution Operator',
      actorRole: 'INSTITUTION_OPERATOR',
      action: 'SINGLE_STUDENT_ENROLMENT',
      entity: 'Enrolment',
      targetId: enrolment.id,
      outcome: issues.length > 0 ? 'FLAGGED' : 'SUCCESS',
      details: `Enrolled ${data.studentName} (Roll: ${enrolment.institutionRollNumber}) in ${enrolment.programmeName}`,
    });

    issues.forEach(i => this.state.validationIssues.push(i));
    return { enrolment, issues };
  }

  // Update lifecycle event (Transfer, Withdraw, Complete, Correction)
  addEnrolmentLifecycleEvent(enrolmentId: string, eventType: EnrolmentEvent['eventType'], actor: string, notes: string, evidenceRef: string) {
    const enrolment = this.getEnrolment(enrolmentId);
    if (!enrolment) return false;

    let nextStatus: Enrolment['status'] = enrolment.status;
    if (eventType === 'TRANSFER_OUT') nextStatus = 'TRANSFERRED_OUT';
    if (eventType === 'WITHDRAWAL') nextStatus = 'WITHDRAWN';
    if (eventType === 'COMPLETION') nextStatus = 'COMPLETED';
    if (eventType === 'REOPEN') nextStatus = 'ACTIVE';

    enrolment.status = nextStatus;
    enrolment.updatedAt = new Date().toISOString();

    const event: EnrolmentEvent = {
      id: `evt-${Date.now()}`,
      enrolmentId,
      eventType,
      effectiveDate: new Date().toISOString().split('T')[0],
      actor,
      evidenceReference: evidenceRef || 'OFFICIAL_ORDER_RECORD',
      notes,
      timestamp: new Date().toISOString(),
    };
    this.state.enrolmentEvents.push(event);

    this.logAuditEvent({
      actor,
      actorRole: 'INSTITUTION_ADMIN',
      action: `LIFECYCLE_${eventType}`,
      entity: 'Enrolment',
      targetId: enrolmentId,
      outcome: 'SUCCESS',
      details: `Lifecycle transition to ${nextStatus}. Ref: ${evidenceRef}. Notes: ${notes}`,
    });

    return true;
  }

  // Batches
  getBatches(institutionId?: string): SubmissionBatch[] {
    if (institutionId) {
      return this.state.submissionBatches.filter(b => b.institutionId === institutionId);
    }
    return this.state.submissionBatches;
  }

  getBatch(id: string): SubmissionBatch | undefined {
    return this.state.submissionBatches.find(b => b.id === id);
  }

  addBatch(batch: SubmissionBatch) {
    this.state.submissionBatches.unshift(batch);
    this.logAuditEvent({
      actor: batch.submittedBy,
      actorRole: 'INSTITUTION_OPERATOR',
      action: 'BATCH_UPLOAD_SUBMIT',
      entity: 'SubmissionBatch',
      targetId: batch.id,
      outcome: 'SUCCESS',
      details: `Bulk uploaded ${batch.totalRows} rows for ${batch.programmeName}. Accepted: ${batch.acceptedRows}, Warnings: ${batch.warningRows}, Rejected: ${batch.rejectedRows}`,
    });
  }

  // Conflict cases
  getConflictCases(): ConflictCase[] {
    return this.state.conflictCases;
  }

  getConflictCase(id: string): ConflictCase | undefined {
    return this.state.conflictCases.find(c => c.id === id);
  }

  resolveConflictCase(caseId: string, state: ConflictCase['state'], reviewer: string, resolutionNotes: string) {
    const c = this.getConflictCase(caseId);
    if (!c) return false;

    c.state = state;
    c.resolutionNotes = resolutionNotes;
    c.resolvedAt = new Date().toISOString();
    c.history.push({
      actor: reviewer,
      action: `RESOLVED_AS_${state}`,
      timestamp: new Date().toISOString(),
      notes: resolutionNotes,
    });

    this.logAuditEvent({
      actor: reviewer,
      actorRole: 'AICTE_REVIEWER',
      action: `CASE_RESOLVE_${state}`,
      entity: 'ConflictCase',
      targetId: caseId,
      outcome: 'SUCCESS',
      details: `Resolved case ${caseId} as ${state}. Reason: ${resolutionNotes}`,
    });

    return true;
  }

  // Policy rules
  getPolicyRules(): PolicyRule[] {
    return this.state.policyRules;
  }

  getPolicyRule(id: string): PolicyRule | undefined {
    return this.state.policyRules.find(r => r.id === id);
  }

  addPolicyRule(rule: PolicyRule) {
    this.state.policyRules.unshift(rule);
    this.logAuditEvent({
      actor: rule.publishedBy,
      actorRole: 'AICTE_POLICY_ADMIN',
      action: 'POLICY_RULE_PUBLISH',
      entity: 'PolicyRule',
      targetId: rule.id,
      outcome: 'SUCCESS',
      details: `Published policy ${rule.code}: ${rule.title} (v${rule.version})`,
    });
  }

  // Verification requests
  getVerificationRequests(studentUuid?: string): VerificationRequest[] {
    if (studentUuid) {
      return this.state.verificationRequests.filter(v => v.studentUuid === studentUuid);
    }
    return this.state.verificationRequests;
  }

  getVerificationByToken(token: string): VerificationRequest | undefined {
    return this.state.verificationRequests.find(v => v.opaqueToken === token || v.id === token);
  }

  createVerificationRequest(req: VerificationRequest) {
    this.state.verificationRequests.unshift(req);
    this.logAuditEvent({
      actor: req.requesterUser,
      actorRole: 'EXTERNAL_VERIFIER',
      action: 'VERIFICATION_REQUEST_CREATED',
      entity: 'VerificationRequest',
      targetId: req.id,
      outcome: 'SUCCESS',
      details: `Created verification query for student ${req.studentName} (${req.studentApaarMasked}). Scope: ${req.claimType}`,
    });
  }

  respondToVerification(requestId: string, status: 'APPROVED' | 'DECLINED', actor: string) {
    const req = this.state.verificationRequests.find(v => v.id === requestId);
    if (!req) return false;

    req.status = status;
    if (status === 'APPROVED') {
      req.consentGrantedAt = new Date().toISOString();
      const enrolment = this.state.enrolments.find(e => e.studentUuid === req.studentUuid);
      req.verifiedResult = {
        institutionName: enrolment?.institutionName || 'AICTE Approved Institute',
        programmeName: enrolment?.programmeName || 'B.Tech Computer Science & Engineering',
        academicYear: enrolment?.academicYear || '2026-27',
        admissionDate: enrolment?.admissionDate || '2026-08-10',
        enrolmentStatus: enrolment?.status === 'ACTIVE' ? 'ACTIVE_VERIFIED' : (enrolment?.status || 'VERIFIED'),
        cryptographicSignature: `SHA256withRSA:signed_by_aicte_gov_in_${Date.now().toString(16)}`,
        issuerProvenance: 'AICTE Central Enrolment Repository & Official Academic Registrar',
        limitationsDisclaimer: 'Notice: This verification confirms valid institutional enrolment status only. Academic awards (degree/diploma) must be verified separately via DigiLocker / NAD.',
      };
    }

    this.logAuditEvent({
      actor,
      actorRole: 'STUDENT',
      action: status === 'APPROVED' ? 'CONSENT_GRANTED' : 'CONSENT_DECLINED',
      entity: 'VerificationRequest',
      targetId: requestId,
      outcome: 'SUCCESS',
      details: `Student ${actor} ${status.toLowerCase()} verification request from ${req.requesterOrg}`,
    });

    return true;
  }

  // Validation issues
  getValidationIssues(institutionId?: string): ValidationIssue[] {
    if (institutionId) {
      return this.state.validationIssues.filter(i => i.institutionId === institutionId);
    }
    return this.state.validationIssues;
  }

  resolveValidationIssue(id: string) {
    const issue = this.state.validationIssues.find(i => i.id === id);
    if (issue) {
      issue.status = 'RESOLVED';
    }
  }

  // Audit Events
  getAuditEvents(): AuditEvent[] {
    return this.state.auditEvents;
  }

  logAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp' | 'requestCorrelationId' | 'ipAddress'>) {
    const newEvent: AuditEvent = {
      ...event,
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      requestCorrelationId: `req_apaar_${Date.now().toString(36)}`,
      ipAddress: '164.100.128.5', // Gov subnet simulation
    };
    this.state.auditEvents.unshift(newEvent);
  }

  // Reset demo state
  resetToDefault() {
    this.state = {
      institutions: [...INITIAL_INSTITUTIONS],
      programmes: [...INITIAL_PROGRAMMES],
      studentIdentities: [...INITIAL_STUDENTS],
      enrolments: [...INITIAL_ENROLMENTS],
      enrolmentEvents: [...INITIAL_EVENTS],
      validationIssues: [...INITIAL_VALIDATION_ISSUES],
      conflictCases: [...INITIAL_CONFLICT_CASES],
      policyRules: [...INITIAL_POLICY_RULES],
      verificationRequests: [...INITIAL_VERIFICATIONS],
      auditEvents: [...INITIAL_AUDIT_EVENTS],
      submissionBatches: [...INITIAL_BATCHES],
    };
  }
}

// Global singleton for Next.js API routes & server components
declare global {
  var __mockDb: MockDatabase | undefined;
}

export const db: MockDatabase = global.__mockDb || new MockDatabase();
if (process.env.NODE_ENV !== 'production') {
  global.__mockDb = db;
}

