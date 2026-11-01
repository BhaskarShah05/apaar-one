import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institution = db.getInstitution(params.id);
    if (!institution) {
      return errorResponse('INSTITUTION_NOT_FOUND', `Institution ${params.id} not found.`, 404);
    }

    const programmes = db.getProgrammes(institution.id);
    
    // Build capacity ledger and summary
    const ledger = programmes.map(p => {
      const regularBucket = p.entitlements.find(e => e.bucketCode === 'REGULAR');
      const tfwBucket = p.entitlements.find(e => e.bucketCode === 'TFW');
      const lateralBucket = p.entitlements.find(e => e.bucketCode === 'LATERAL_ENTRY');
      
      const totalApprovedIntake = p.baseApprovedIntake;
      const supernumeraryApproved = p.entitlements
        .filter(e => e.basis === 'SUPERNUMERARY')
        .reduce((sum, e) => sum + e.approvedQuantity, 0);

      const totalPermittedCapacity = totalApprovedIntake + supernumeraryApproved;
      const totalActiveEnrolled = p.currentActiveEnrolment;
      const regularEnrolled = regularBucket?.consumedQuantity || 0;
      const isOverEnrolled = regularEnrolled > totalApprovedIntake || totalActiveEnrolled > totalPermittedCapacity;

      return {
        programmeId: p.id,
        programmeName: `${p.degree} ${p.branch}`,
        academicYear: p.academicYear,
        approvalReference: p.approvalReference,
        baseApprovedIntake: totalApprovedIntake,
        supernumeraryApproved,
        permittedCapacity: totalPermittedCapacity,
        currentActiveEnrolment: totalActiveEnrolled,
        utilizationRate: Math.round((totalActiveEnrolled / totalPermittedCapacity) * 100),
        status: isOverEnrolled ? 'EXCEEDED_CAPACITY' : 'COMPLIANT',
        overflowAmount: Math.max(0, totalActiveEnrolled - totalPermittedCapacity),
        entitlements: p.entitlements,
        policyCitation: 'AICTE Approval Process Handbook (APH 2024-25 to 2026-27) Chapter IV & Annexures',
        calculationArithmetic: `Permitted Capacity (${totalPermittedCapacity}) = Base Approved Intake (${totalApprovedIntake}) + Approved Supernumerary Entitlements (${supernumeraryApproved})`,
      };
    });

    return successResponse({
      institutionId: institution.id,
      institutionName: institution.name,
      programmes: ledger,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

