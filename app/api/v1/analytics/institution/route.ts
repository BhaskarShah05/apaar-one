import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get('institutionId') || 'inst-dit-del-01';

    const institution = db.getInstitution(institutionId);
    if (!institution) {
      return errorResponse('NOT_FOUND', 'Institution not found', 404);
    }

    const programmes = db.getProgrammes(institutionId);
    const enrolments = db.getEnrolments(institutionId);
    const issues = db.getValidationIssues(institutionId);
    const batches = db.getBatches(institutionId);

    // Compute metrics
    const totalApprovedIntake = programmes.reduce((sum, p) => sum + p.baseApprovedIntake, 0);
    const totalPermittedCapacity = programmes.reduce((sum, p) => sum + p.effectiveCapacity, 0);
    const totalActiveEnrolment = enrolments.filter(e => e.status === 'ACTIVE').length;

    let apaarVerified = 0;
    let apaarPending = 0;
    let apaarUnavailable = 0;
    let apaarMismatch = 0;

    enrolments.forEach(e => {
      const student = db.getStudent(e.studentUuid);
      if (student?.verificationState === 'VERIFIED') apaarVerified++;
      else if (student?.verificationState === 'NOT_SUBMITTED' || student?.verificationState === 'PENDING') apaarPending++;
      else if (student?.verificationState === 'UNAVAILABLE') apaarUnavailable++;
      else if (student?.verificationState === 'MISMATCH') apaarMismatch++;
    });

    const seatUtilization = totalPermittedCapacity > 0 
      ? Math.round((totalActiveEnrolment / totalPermittedCapacity) * 100) 
      : 0;

    const apaarVerifiedRate = enrolments.length > 0 
      ? Math.round((apaarVerified / enrolments.length) * 100) 
      : 0;

    const blockerIssues = issues.filter(i => i.severity === 'BLOCKER' && i.status === 'OPEN').length;
    const errorIssues = issues.filter(i => i.severity === 'ERROR' && i.status === 'OPEN').length;
    const warningIssues = issues.filter(i => i.severity === 'WARNING' && i.status === 'OPEN').length;

    // Check conflict cases relevant to this institution
    const conflictCases = db.getConflictCases().filter(c => 
      c.enrolments.some(e => e.institutionId === institutionId) && c.state !== 'RESOLVED' && c.state !== 'LEGITIMATE_TRANSFER'
    ).length;

    // Category distribution
    const categoryCounts: Record<string, number> = { GENERAL: 0, OBC: 0, SC: 0, ST: 0, EWS: 0 };
    enrolments.forEach(e => {
      if (categoryCounts[e.admissionCategory] !== undefined) {
        categoryCounts[e.admissionCategory]++;
      }
    });

    // Programme cards
    const programmeMetrics = programmes.map(p => {
      const progEnrolments = enrolments.filter(e => e.programmeId === p.id && e.status === 'ACTIVE');
      return {
        id: p.id,
        name: `${p.degree} ${p.branch}`,
        level: p.level,
        intake: p.baseApprovedIntake,
        capacity: p.effectiveCapacity,
        enrolled: progEnrolments.length,
        utilization: Math.round((progEnrolments.length / p.effectiveCapacity) * 100),
        status: progEnrolments.length > p.effectiveCapacity ? 'OVER_CAPACITY' : 'COMPLIANT',
      };
    });

    return successResponse({
      institution: {
        id: institution.id,
        name: institution.name,
        aicteId: institution.aicteId,
        aisheCode: institution.aisheCode,
        state: institution.state,
      },
      kpis: {
        approvedIntake: totalApprovedIntake,
        permittedCapacity: totalPermittedCapacity,
        actualEnrolment: totalActiveEnrolment,
        seatUtilization,
        apaarVerifiedCount: apaarVerified,
        apaarVerifiedRate,
        apaarPendingCount: apaarPending,
        apaarUnavailableCount: apaarUnavailable,
        apaarMismatchCount: apaarMismatch,
        validationIssuesTotal: issues.filter(i => i.status === 'OPEN').length,
        blockerIssues,
        errorIssues,
        warningIssues,
        potentialConflictCases: conflictCases,
      },
      categoryDistribution: categoryCounts,
      programmeMetrics,
      recentBatches: batches.slice(0, 5),
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

