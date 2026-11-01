import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  data?: T;
  meta?: {
    requestId: string;
    timestamp: string;
    total?: number;
    page?: number;
    pageSize?: number;
    environment: 'SANDBOX_DEMO' | 'PRODUCTION';
  };
  error?: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
}

export function successResponse<T>(data: T, meta?: Record<string, any>, status = 200) {
  const body: ApiResponse<T> = {
    data,
    meta: {
      requestId: `req_${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      environment: 'SANDBOX_DEMO',
      ...meta,
    },
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(code: string, message: string, status = 400, fieldErrors?: Record<string, string>) {
  const body: ApiResponse = {
    meta: {
      requestId: `err_${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      environment: 'SANDBOX_DEMO',
    },
    error: {
      code,
      message,
      fieldErrors,
    },
  };
  return NextResponse.json(body, { status });
}

