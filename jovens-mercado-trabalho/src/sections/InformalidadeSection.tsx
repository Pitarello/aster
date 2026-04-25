import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

export function InformalidadeSection({ data }: Props) {
  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
      <SectionTitle icon="📊" title="Informalidade" subtitle="Formal vs. informal por faixa etária" />
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data.formalInformalFaixa} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="faixa" tick={{ fill: '#94a3b8', fontSize: 13 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#f1f5f9' }}
            formatter={(v) => `${Number(v)}%`}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Bar dataKey="formal" name="Formal" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="informal" name="Informal" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
        {data.formalInformalFaixa.map(d => (
          <div key={d.faixa} style={{ flex: 1, background: '#0f172a', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{d.faixa}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 20 }}>{d.formal}%</span>
                <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>formal</span>
              </div>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 20 }}>{d.informal}%</span>
                <span style={{ color: '#64748b', fontSize: 11, marginLeft: 4 }}>informal</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
