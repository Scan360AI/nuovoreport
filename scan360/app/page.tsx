'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Report {
  piva: string;
  name: string;
  score: number;
  category: string;
  rating: string;
  revenue: string;
}

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(r => r.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading reports:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <p className="text-gray-600">Caricamento report...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SCAN360 Financial Reports</h1>
          <p className="text-gray-600">Dashboard di analisi finanziaria aziendale</p>
        </div>

        {reports.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">Nessun report disponibile</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Link key={report.piva} href={`/dashboard/${report.piva}`}>
                <Card className="p-6 hover:shadow-xl transition-all duration-200 cursor-pointer border-2 hover:border-blue-500">
                  <h2 className="text-xl font-bold mb-2">{report.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">P.IVA: {report.piva}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getRiskBadgeColor(report.category)}>
                      {report.category} - {report.rating}
                    </Badge>
                    <span className="text-2xl font-bold text-blue-600">{report.score.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Ricavi</p>
                    <p className="text-lg font-semibold">{report.revenue}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getRiskBadgeColor(category: string) {
  const colors: Record<string, string> = {
    'A': 'bg-green-100 text-green-700 border-green-300',
    'B': 'bg-blue-100 text-blue-700 border-blue-300',
    'C': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'D': 'bg-orange-100 text-orange-700 border-orange-300',
    'E': 'bg-red-100 text-red-700 border-red-300',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
}
