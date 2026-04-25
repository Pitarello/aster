import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

const HEATMAP_COLORS: Record<string, string> = {
  'Informal': '#ef4444',
  'Formal CLT': '#22c55e',
  'Autônomo': '#f59e0b',
};

const ESCOLARIDADES = ['Sem instrução', 'Médio completo', 'Superior completo'];
const TIPOS = ['Informal', 'Formal CLT', 'Autônomo'];

export function EducacaoSection({ data }: Props) {
  const heatmapMatrix = ESCOLARIDADES.map(esc => {
    const row: Record<string, number> = { escolaridade: 0 };
    TIPOS.forEach(tipo => {
      const found = data.heatmap.find(h => h.escolaridade === esc && h.tipo === tipo);
      row[tipo] = found?.valor ?? 0;
    });
    return { escolaridade: esc, ...row };
  });

  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
      <SectionTitle icon="🎓" title="Educação" subtitle="Ocupação por nível de escolaridade — SIS 2025" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Taxa de ocupação por escolaridade (%)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.ocupacaoPorEscolaridade} layout="vertical" margin={{ top: 4, right: 16, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[0, 100]} />
              <YAxis type="category" dataKey="escolaridade" tick={{ fill: '#94a3b8', fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                formatter={(v) => `${Number(v)}%`}
              />
              <Bar dataKey="taxa" name="Ocupação" radius={[0, 4, 4, 0]}>
                {data.ocupacaoPorEscolaridade.map((_, i) => (
                  <Cell key={i} fill={`hsl(${200 + i * 18}, 70%, 55%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Heatmap: Escolaridade × Tipo de emprego (%)</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ color: '#64748b', textAlign: 'left', padding: '6px 8px', fontWeight: 500 }}>Escolaridade</th>
                  {TIPOS.map(t => (
                    <th key={t} style={{ color: '#64748b', textAlign: 'center', padding: '6px 8px', fontWeight: 500 }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapMatrix.map(row => (
                  <tr key={row.escolaridade}>
                    <td style={{ color: '#e2e8f0', padding: '8px', borderBottom: '1px solid #334155' }}>{row.escolaridade}</td>
                    {TIPOS.map(tipo => {
                      const val = (row as unknown as Record<string, number>)[tipo];
                      const opacity = val / 100;
                      return (
                        <td key={tipo} style={{
                          textAlign: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #334155',
                          background: `${HEATMAP_COLORS[tipo]}${Math.round(opacity * 200).toString(16).padStart(2, '0')}`,
                          color: '#f1f5f9',
                          fontWeight: 600,
                          borderRadius: 4,
                        }}>
                          {val}%
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {TIPOS.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: HEATMAP_COLORS[t] }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
