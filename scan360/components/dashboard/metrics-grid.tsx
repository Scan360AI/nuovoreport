import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string;
  icon?: string;
  colorClass: string;
  trend?: {
    value: number;
    label: string;
    direction: string;
    unit?: string;
  };
  benchmark: string;
  badge?: {
    label: string;
    class: string;
  };
}

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className="p-6 border-l-4 hover:shadow-lg transition-shadow"
          style={{ borderLeftColor: getColorForClass(metric.colorClass) }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: `${getColorForClass(metric.colorClass)}20` }}>
              <div className="text-2xl" style={{ color: getColorForClass(metric.colorClass) }}>
                {getIconForMetric(metric.id)}
              </div>
            </div>
            {metric.trend && metric.trend.direction !== 'neutral' && (
              <Badge
                variant={metric.trend.direction === 'up' ? 'default' : 'destructive'}
                className="flex items-center gap-1"
              >
                {metric.trend.direction === 'up' ?
                  <TrendingUp className="w-3 h-3" /> :
                  <TrendingDown className="w-3 h-3" />
                }
                {metric.trend.value > 0 ? '+' : ''}{metric.trend.value}{metric.trend.unit || '%'}
              </Badge>
            )}
            {metric.badge && (
              <Badge variant="secondary">{metric.badge.label}</Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
          <p className="text-3xl font-bold mb-3">{metric.value}</p>

          {metric.trend && (
            <p className="text-xs text-gray-500 mb-3">
              {metric.trend.label}
            </p>
          )}

          <p className="text-xs text-gray-600 border-t pt-2">
            {metric.benchmark}
          </p>
        </Card>
      ))}
    </div>
  );
}

function getColorForClass(colorClass: string) {
  const map: Record<string, string> = {
    'blue': '#3b82f6',
    'green': '#10b981',
    'yellow': '#eab308',
    'red': '#ef4444',
    'light-green': '#10b981',
    'secondary': '#6b7280',
  };
  return map[colorClass] || '#6b7280';
}

function getIconForMetric(id: string) {
  const icons: Record<string, string> = {
    'risk-index': '🛡️',
    'revenues': '💰',
    'ebitda-margin': '📊',
    'pfn-ebitda': '⚖️',
    'dso': '📅',
    'cash-flow': '💵',
    'roe': '📈',
    'liquidity': '💧',
    'dscr': '✅',
    'fido': '💳',
  };
  return icons[id] || '📄';
}
