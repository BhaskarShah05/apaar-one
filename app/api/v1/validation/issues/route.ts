import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get('institutionId') || undefined;
    const severity = searchParams.get('severity') || undefined;
    const status = searchParams.get('status') || undefined;

    let issues = db.getValidationIssues(institutionId);

    if (severity && severity !== 'ALL') {
      issues = issues.filter(i => i.severity === severity);
    }

    if (status && status !== 'ALL') {
      issues = issues.filter(i => i.status === status);
    }

    return successResponse(issues, { total: issues.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { issueId } = body;

    if (!issueId) {
      return errorResponse('VALIDATION_FAILED', 'issueId is required.', 422);
    }

    db.resolveValidationIssue(issueId);
    return successResponse({ success: true, issueId, status: 'RESOLVED' });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

