import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';
import { PolicyRule } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const rules = db.getPolicyRules();
    return successResponse(rules, { total: rules.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      code,
      title,
      programmeLevel,
      seatBucket,
      capacityBasis,
      ruleFormula,
      sourceAuthority,
      version,
      publishedBy,
    } = body;

    if (!code || !title || !ruleFormula || !sourceAuthority) {
      return errorResponse('VALIDATION_FAILED', 'Code, title, ruleFormula and sourceAuthority are required.', 422);
    }

    const newRule: PolicyRule = {
      id: `pol-rule-${Date.now().toString(36)}`,
      code,
      title,
      programmeLevel: programmeLevel || 'UNDERGRADUATE',
      seatBucket: seatBucket || 'REGULAR',
      capacityBasis: capacityBasis || 'WITHIN_APPROVED_INTAKE',
      ruleFormula,
      sourceAuthority,
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: '2027-03-31',
      version: version || '1.0',
      status: 'PUBLISHED',
      publishedBy: publishedBy || 'AICTE Policy Bureau Administrator',
      publishedAt: new Date().toISOString(),
    };

    db.addPolicyRule(newRule);
    return successResponse(newRule, {}, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

