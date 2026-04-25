import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

export function NemNemSection({ data }: Props) {
  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
      <SectionTitle icon="🚫" title="Jovens Nem-Nem" subtitle="Não estudam e não trabalham — por gênero e raça (%)" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data.nemNem} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="categoria" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#f1f5f9' }}
              formatter={(v: number) => `${v}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
            <Bar dataKey="masculino" name="Masculino" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="feminino" name="Feminino" fill="#f472b6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#64748b', fontSize: 12 }}>Total jovens nem-nem</div>
            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 36 }}>22.7%</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>≈ 4,8 milhões de jovens</div>
          </div>
          <div style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#64748b', fontSize: 12 }}>Maior concentração</div>
            <div style={{ color: '#f472b6', fontWeight: 700, fontSize: 22 }}>Mulheres pretas/pardas</div>
            <div style={{ color: '#f472b6', fontSize: 18, fontWeight: 600 }}>31.4%</div>
          </div>
          <div style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#64748b', fontSize: 12 }}>Menor concentração</div>
            <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: 22 }}>Homens brancos</div>
            <div style={{ color: '#60a5fa', fontSize: 18, fontWeight: 600 }}>14.2%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
