import { getStatusData } from '@/lib/uptimeRobotAPI';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const statusData = await getStatusData();
    return NextResponse.json(statusData);
  } catch (error) {
    console.error('Error in status API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status data' },
      { status: 500 }
    );
  }
}
