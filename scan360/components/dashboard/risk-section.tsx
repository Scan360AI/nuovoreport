import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface RiskSectionProps {
  data: {
    score: number;
    maxScore: number;
    category: string;
    categoryLabel: string;
    rating: string;
    previousRating: string;
    description: string;
  };
}

export default function RiskSection({ data }: RiskSectionProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-12 h-12 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">Valutazione Rischio</h2>
          <p className="text-gray-600">{data.categoryLabel}</p>
        </div>
      </div>

      <div className="text-5xl font-bold mb-3">
        {data.score.toFixed(2)}
        <span className="text-2xl text-gray-500"> / {data.maxScore}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(data.score / data.maxScore) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Badge className={getRiskColor(data.category)}>
          Categoria {data.category}
        </Badge>
        <span className="font-semibold">Rating: {data.rating}</span>
        <span className="text-sm text-gray-600">
          (precedente: {data.previousRating})
        </span>
      </div>

      <p className="text-gray-700">{data.description}</p>
    </Card>
  );
}

function getRiskColor(category: string) {
  const colors: Record<string, string> = {
    'A': 'bg-green-100 text-green-700 border-green-300',
    'B': 'bg-blue-100 text-blue-700 border-blue-300',
    'C': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'D': 'bg-orange-100 text-orange-700 border-orange-300',
    'E': 'bg-red-100 text-red-700 border-red-300',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
}
