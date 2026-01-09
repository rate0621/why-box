import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Webhookシークレットの検証
    const secret = request.headers.get('X-MICROCMS-Signature');
    const expectedSecret = process.env.MICROCMS_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // トップページのキャッシュをクリア
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
