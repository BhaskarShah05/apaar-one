import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const type = searchParams.get('type');
    const search = searchParams.get('search')?.toLowerCase();

    let list = db.getInstitutions();

    if (state && state !== 'ALL') {
      list = list.filter(i => i.state.toLowerCase() === state.toLowerCase());
    }

    if (type && type !== 'ALL') {
      list = list.filter(i => i.type === type);
    }

    if (search) {
      list = list.filter(i => 
        i.name.toLowerCase().includes(search) || 
        i.aicteId.toLowerCase().includes(search) ||
        i.aisheCode.toLowerCase().includes(search) ||
        i.district.toLowerCase().includes(search)
      );
    }

    return successResponse(list, { total: list.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

