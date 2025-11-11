import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const reportsDir = path.join(process.cwd(), 'data', 'reports');
    const files = await fs.readdir(reportsDir);

    const reports = await Promise.all(
      files
        .filter(f => f.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(
            path.join(reportsDir, file),
            'utf-8'
          );
          const data = JSON.parse(content);

          const revenueMetric = data.keyMetrics.find((m: any) => m.id === 'revenues');

          return {
            piva: data.company.piva,
            name: data.company.name,
            score: data.riskAssessment.score,
            category: data.riskAssessment.category,
            rating: data.riskAssessment.rating,
            revenue: revenueMetric?.value || 'N/A',
          };
        })
    );

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error reading reports:', error);
    return NextResponse.json({ error: 'Failed to read reports' }, { status: 500 });
  }
}
