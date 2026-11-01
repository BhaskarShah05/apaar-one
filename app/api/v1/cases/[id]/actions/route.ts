import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';
import { ConflictState } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { action, reviewer, notes, evidenceDoc } = body;

    if (!action || !reviewer) {
      return errorResponse('VALIDATION_FAILED', 'action and reviewer are required.', 422);
    }

    let nextState: ConflictState = 'UNDER_REVIEW';
    if (action === 'MARK_LEGITIMATE_TRANSFER') nextState = 'LEGITIMATE_TRANSFER';
    if (action === 'CONFIRM_DUPLICATE') nextState = 'CONFIRMED_DUPLICATE';
    if (action === 'MARK_INCONCLUSIVE') nextState = 'INCONCLUSIVE';
    if (action === 'REQUEST_CLARIFICATION') nextState = 'UNDER_REVIEW';
    if (action === 'REOPEN') nextState = 'OPEN';

    const fullNotes = notes + (evidenceDoc ? ` [Evidence Ref: ${evidenceDoc}]` : '');
    const success = db.resolveConflictCase(params.id, nextState, reviewer, fullNotes);

    if (!success) {
      return errorResponse('NOT_FOUND', `Case ${params.id} not found.`, 404);
    }

    const updated = db.getConflictCase(params.id);
    return successResponse({ success: true, case: updated });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

