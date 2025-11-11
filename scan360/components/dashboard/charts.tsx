'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor?: string | string[];
}

interface ChartData {
  title: string;
  labels: string[];
  datasets: Dataset[];
}

interface ChartsProps {
  charts: {
    economicTrend: ChartData;
    debtSustainability: ChartData;
    workingCapital: ChartData;
  };
}

export default function Charts({ charts }: ChartsProps) {
  return (
    <div className="space-y-6">
      {/* Economic Trend */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">
          {charts.economicTrend.title}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transformChartData(charts.economicTrend)}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            {charts.economicTrend.datasets.map((ds, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={`dataset${i}`}
                stroke={ds.borderColor}
                strokeWidth={2}
                name={ds.label}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Debt Sustainability */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">
          {charts.debtSustainability.title}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transformChartData(charts.debtSustainability)}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            {charts.debtSustainability.datasets.map((ds, i) => (
              <Bar
                key={i}
                dataKey={`dataset${i}`}
                fill={Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : ds.borderColor}
                name={ds.label}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Working Capital */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">
          {charts.workingCapital.title}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transformChartData(charts.workingCapital)}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            {charts.workingCapital.datasets.map((ds, i) => (
              <Bar
                key={i}
                dataKey={`dataset${i}`}
                fill={Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : ds.borderColor}
                name={ds.label}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function transformChartData(chart: ChartData) {
  return chart.labels.map((label, i) => ({
    label,
    ...chart.datasets.reduce((acc, ds, idx) => ({
      ...acc,
      [`dataset${idx}`]: ds.data[i]
    }), {})
  }));
}
