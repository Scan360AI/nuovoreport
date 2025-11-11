import { Card } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface BalanceRow {
  voce: string;
  '2023': string;
  '2024': string;
  trend: string;
  trendColor: string;
  highlight?: boolean;
}

interface BalanceSheetProps {
  data: any;
}

export default function BalanceSheet({ data }: BalanceSheetProps) {
  if (!data?.statoPatrimoniale) return null;

  const { statoPatrimoniale, contoEconomico } = data;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6">Stato Patrimoniale</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ATTIVO */}
          <div>
            <h4 className="font-bold text-lg mb-3 text-blue-600">ATTIVO</h4>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Immobilizzazioni
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voce</TableHead>
                    <TableHead className="text-right">2023</TableHead>
                    <TableHead className="text-right">2024</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statoPatrimoniale.attivo.immobilizzazioni.map((row: BalanceRow) => (
                    <TableRow key={row.voce}>
                      <TableCell className="font-medium">{row.voce}</TableCell>
                      <TableCell className="text-right">{row['2023']}</TableCell>
                      <TableCell className="text-right font-bold">{row['2024']}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={row.trendColor === 'green' ? 'default' : 'destructive'}>
                          {row.trend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Attivo Circolante
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voce</TableHead>
                    <TableHead className="text-right">2023</TableHead>
                    <TableHead className="text-right">2024</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statoPatrimoniale.attivo.circolante.map((row: BalanceRow) => (
                    <TableRow key={row.voce}>
                      <TableCell className="font-medium">{row.voce}</TableCell>
                      <TableCell className="text-right">{row['2023']}</TableCell>
                      <TableCell className="text-right font-bold">{row['2024']}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={row.trendColor === 'green' ? 'default' : 'destructive'}>
                          {row.trend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="pt-4 border-t-2">
              <div className="flex justify-between items-center font-bold bg-blue-50 p-3 rounded">
                <span>TOTALE ATTIVO</span>
                <div className="flex gap-4 items-center">
                  <span className="text-gray-600">
                    {statoPatrimoniale.attivo.totaleAttivo['2023']}
                  </span>
                  <span className="text-xl">
                    {statoPatrimoniale.attivo.totaleAttivo['2024']}
                  </span>
                  <Badge>
                    {statoPatrimoniale.attivo.totaleAttivo.trend}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* PASSIVO */}
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-600">PASSIVO</h4>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Patrimonio Netto
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voce</TableHead>
                    <TableHead className="text-right">2023</TableHead>
                    <TableHead className="text-right">2024</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statoPatrimoniale.passivo.patrimonioNetto.map((row: BalanceRow) => (
                    <TableRow key={row.voce}>
                      <TableCell className="font-medium">{row.voce}</TableCell>
                      <TableCell className="text-right">{row['2023']}</TableCell>
                      <TableCell className="text-right font-bold">{row['2024']}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={row.trendColor === 'green' ? 'default' : 'secondary'}>
                          {row.trend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Debiti
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voce</TableHead>
                    <TableHead className="text-right">2023</TableHead>
                    <TableHead className="text-right">2024</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statoPatrimoniale.passivo.debiti.map((row: BalanceRow) => (
                    <TableRow key={row.voce}>
                      <TableCell className="font-medium">{row.voce}</TableCell>
                      <TableCell className="text-right">{row['2023']}</TableCell>
                      <TableCell className="text-right font-bold">{row['2024']}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={row.trendColor === 'green' ? 'default' : 'destructive'}>
                          {row.trend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="pt-4 border-t-2">
              <div className="flex justify-between items-center font-bold bg-green-50 p-3 rounded">
                <span>TOTALE PASSIVO</span>
                <div className="flex gap-4 items-center">
                  <span className="text-gray-600">
                    {statoPatrimoniale.passivo.totalePassivo['2023']}
                  </span>
                  <span className="text-xl">
                    {statoPatrimoniale.passivo.totalePassivo['2024']}
                  </span>
                  <Badge>
                    {statoPatrimoniale.passivo.totalePassivo.trend}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Conto Economico */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Conto Economico</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voce</TableHead>
              <TableHead className="text-right">2023</TableHead>
              <TableHead className="text-right">2024</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contoEconomico.map((row: BalanceRow) => (
              <TableRow key={row.voce} className={row.highlight ? 'bg-blue-50 font-semibold' : ''}>
                <TableCell className="font-medium">{row.voce}</TableCell>
                <TableCell className="text-right">{row['2023']}</TableCell>
                <TableCell className="text-right font-bold">{row['2024']}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={row.trendColor === 'green' ? 'default' : 'destructive'}>
                    {row.trend}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
