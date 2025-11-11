import fs from 'fs/promises';
import path from 'path';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RiskSection from '@/components/dashboard/risk-section';
import MetricsGrid from '@/components/dashboard/metrics-grid';
import Charts from '@/components/dashboard/charts';
import BalanceSheet from '@/components/dashboard/balance-sheet';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ piva: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { piva } = await params;

  const filePath = path.join(
    process.cwd(),
    'data',
    'reports',
    `${piva}.json`
  );

  let data;
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(content);
  } catch (error) {
    notFound();
  }

  // Trova la sezione del bilancio nelle note tecniche
  const bilancioSection = data.noteTecniche?.find((section: any) => section.id === 'bilancio');

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-1">{data.company.name}</h1>
            <p className="text-gray-600 text-lg">P.IVA: {data.company.piva}</p>
            <p className="text-sm text-gray-500 mt-1">
              Report generato il {data.reportInfo.date}
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="hover:bg-gray-100">
              ← Lista Report
            </Button>
          </Link>
        </div>

        {/* Risk Assessment */}
        <RiskSection data={data.riskAssessment} />

        {/* Key Metrics */}
        <MetricsGrid metrics={data.keyMetrics} />

        {/* Charts */}
        <Charts charts={data.charts} />

        {/* Executive Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-green-800 mb-3 text-xl flex items-center gap-2">
              ✅ Punti di Forza
            </h3>
            <ul className="space-y-2">
              {data.executiveSummary.strengths.map((s: string, i: number) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
            <h3 className="font-bold text-red-800 mb-3 text-xl flex items-center gap-2">
              ⚠️ Criticità
            </h3>
            <ul className="space-y-2">
              {data.executiveSummary.weaknesses.map((w: string, i: number) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Sections (excluding bilancio) */}
        {data.noteTecniche
          ?.filter((section: any) => section.id !== 'bilancio')
          .map((section: any) => (
            <DetailSection key={section.id} {...section} />
          ))}

        {/* Balance Sheet */}
        {bilancioSection && <BalanceSheet data={bilancioSection} />}

        {/* Outlook */}
        {data.outlook && (
          <div className="bg-white p-8 rounded-lg shadow border-2">
            <h3 className="text-2xl font-bold mb-4">Outlook e Raccomandazioni</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{data.outlook.outlook}</p>

            <h4 className="font-semibold mb-3 text-lg">Raccomandazioni:</h4>
            <ul className="space-y-2">
              {data.outlook.raccomandazioni.map((r: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Detail Section Component
function DetailSection({ title, subtitle, icon, formula, values, assumptions, result }: any) {
  return (
    <div className="bg-white p-8 rounded-lg shadow border-2 hover:border-blue-300 transition-all">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}

      {formula && (
        <div className="bg-slate-100 p-4 rounded mb-6 font-mono text-sm border-l-4 border-blue-500">
          {formula}
        </div>
      )}

      {values && values.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {values.map((v: any, i: number) => (
            <div key={i} className="border-l-4 pl-4" style={{ borderColor: getValueColor(v.color) }}>
              <p className="text-sm text-gray-600">{v.label}</p>
              <p className="text-xl font-bold" style={{ color: getValueColor(v.color) }}>
                {v.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {assumptions && assumptions.length > 0 && (
        <div className="bg-amber-50 p-4 rounded mb-6 border-l-4 border-amber-500">
          <h4 className="font-semibold mb-2">Assunzioni:</h4>
          <ul className="space-y-1 text-sm">
            {assumptions.map((a: string, i: number) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: a }} />
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <p className="font-mono text-sm text-gray-700 mb-2">
            {result.calculation}
          </p>
          <p className="text-4xl font-bold text-blue-600 mb-3">
            {result.value}
          </p>
          <p className="text-gray-700">{result.interpretation}</p>
        </div>
      )}
    </div>
  );
}

function getValueColor(color: string) {
  const colors: Record<string, string> = {
    'green': '#10b981',
    'yellow': '#eab308',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'text': '#374151',
  };
  return colors[color] || '#6b7280';
}
