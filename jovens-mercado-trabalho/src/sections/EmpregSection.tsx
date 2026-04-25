import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

export function EmpregoSection({ data }: Props) {
  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
      <SectionTitle icon="💼" title="Emprego" subtitle="PNADC Contínua — jovens 18–25 anos" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Indicadores por ano (2020–2024)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.serieAnual} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="ano" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v: number) => `${v}%`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="desemprego" name="Desemprego" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ocupacao" name="Ocupação" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Série temporal — informalidade (%)</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.serieAnual} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="ano" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" domain={[45, 65]} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v: number) => `${v}%`}
              />
              <Line type="monotone" dataKey="informalidade" name="Informalidade" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
