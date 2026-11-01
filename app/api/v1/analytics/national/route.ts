import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const institutions = db.getInstitutions();
    const enrolments = db.getEnrolments();
    const cases = db.getConflictCases();
    const rules = db.getPolicyRules();

    const totalInstitutions = institutions.length;
    const totalEnrolments = enrolments.length;
    const activeEnrolments = enrolments.filter(e => e.status === 'ACTIVE').length;

    let totalVerified = 0;
    let totalPending = 0;
    let totalMismatch = 0;

    enrolments.forEach(e => {
      const student = db.getStudent(e.studentUuid);
      if (student?.verificationState === 'VERIFIED') totalVerified++;
      else if (student?.verificationState === 'NOT_SUBMITTED' || student?.verificationState === 'PENDING') totalPending++;
      else if (student?.verificationState === 'MISMATCH') totalMismatch++;
    });

    const nationalApaarCoverage = totalEnrolments > 0 ? Math.round((totalVerified / totalEnrolments) * 100) : 0;
    const openConflicts = cases.filter(c => c.state === 'OPEN' || c.state === 'UNDER_REVIEW').length;
    const resolvedTransfers = cases.filter(c => c.state === 'LEGITIMATE_TRANSFER').length;
    const confirmedDuplicates = cases.filter(c => c.state === 'CONFIRMED_DUPLICATE').length;

    // State-wise breakdown
    const stateStats: Record<string, { institutions: number; approvedIntake: number; enrolled: number }> = {};
    institutions.forEach(i => {
      if (!stateStats[i.state]) {
        stateStats[i.state] = { institutions: 0, approvedIntake: 0, enrolled: 0 };
      }
      stateStats[i.state].institutions++;
      stateStats[i.state].approvedIntake += i.intakeApprovedTotal;
      stateStats[i.state].enrolled += i.enrolmentCurrentTotal;
    });

    const stateBreakdown = Object.entries(stateStats).map(([state, data]) => ({
      state,
      ...data,
      utilization: Math.round((data.enrolled / data.approvedIntake) * 100),
    }));

    return successResponse({
      kpis: {
        totalInstitutions,
        activeEnrolments,
        totalEnrolments,
        nationalApaarCoverage,
        totalVerified,
        totalPending,
        totalMismatch,
        openConflicts,
        resolvedTransfers,
        confirmedDuplicates,
        publishedPolicyRulesCount: rules.length,
      },
      stateBreakdown,
      institutionsSummary: institutions.map(i => ({
        id: i.id,
        name: i.name,
        aicteId: i.aicteId,
        state: i.state,
        type: i.type,
        intakeApproved: i.intakeApprovedTotal,
        enrolled: i.enrolmentCurrentTotal,
        apaarVerifiedRate: i.apaarVerifiedRate,
        unresolvedIssuesCount: i.unresolvedIssuesCount,
        status: i.status,
      })),
      recentCases: cases.slice(0, 5),
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

