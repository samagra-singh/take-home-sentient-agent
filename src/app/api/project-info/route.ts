import { NextResponse } from 'next/server';

import { getProjectInfo } from '@/actions/getProjectInfo';

/**
 * Handles GET requests to the /api/project-info endpoint.
 * This API uses the getProjectInfo server action to read and validate package.json data.
 */
export async function GET() {
  try {
    const projectInfo = await getProjectInfo();
    return NextResponse.json(projectInfo, { status: 200 });
  } catch (error) {
    console.error('Failed to get project info:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 },
    );
  }
}
