import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

const RACA_COLORS: Record<string, string> = {
  Branca: '#60a5fa',
  Preta: '#a78bfa',
  Parda: '#fb923c',
  Amarela: '#facc15',
  Indígena: '#34d399',
};

const REGIAO_COLORS: Record<string, string> = {
  Norte: '#f87171',
  Nordeste: '#fb923c',
  'Centro-Oeste': '#facc15',
  Sudeste: '#4ade80',
  Sul: '#60a5fa',
};

export function DesigualdadeSection({ data }: Props) {
  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
      <SectionTitle icon="⚖️" title="Desigualdade" subtitle="Desemprego por raça, gênero e região" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {/* Por raça */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Por raça/cor (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.desigualdadeRaca} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="raca" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                formatter={(v: number) => `${v}%`}
              />
              <Bar dataKey="desemprego" name="Desemprego" radius={[4, 4, 0, 0]}>
                {data.desigualdadeRaca.map(d => (
                  <Cell key={d.raca} fill={RACA_COLORS[d.raca] ?? '#60a5fa'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Por gênero */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Por gênero (%)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
            {data.desigualdadeGenero.map(d => (
              <div key={d.genero}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#e2e8f0', fontSize: 14 }}>{d.genero}</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>{d.desemprego}%</span>
                </div>
                <div style={{ background: '#334155', borderRadius: 4, height: 10 }}>
                  <div style={{
                    width: `${(d.desemprego / 30) * 100}%`,
                    background: d.genero === 'Feminino' ? '#f472b6' : '#60a5fa',
                    height: '100%',
                    borderRadius: 4,
                    transition: 'width 0.5s',
                  }} />
                </div>
              </div>
            ))}
            <div style={{ background: '#0f172a', borderRadius: 8, padding: 12, marginTop: 8 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Diferença de gênero</div>
              <div style={{ color: '#f472b6', fontWeight: 700, fontSize: 22 }}>
                +{(data.desigualdadeGenero[1].desemprego - data.desigualdadeGenero[0].desemprego).toFixed(1)} p.p.
              </div>
              <div style={{ color: '#64748b', fontSize: 11 }}>mulheres vs. homens</div>
            </div>
          </div>
        </div>

        {/* Por região */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Por região (%)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            {[...data.regioes].sort((a, b) => b.desemprego - a.desemprego).map(r => (
              <div key={r.regiao}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ color: '#e2e8f0', fontSize: 13 }}>{r.regiao}</span>
                  <span style={{ color: REGIAO_COLORS[r.regiao], fontWeight: 700 }}>{r.desemprego}%</span>
                </div>
                <div style={{ background: '#334155', borderRadius: 4, height: 8 }}>
                  <div style={{
                    width: `${(r.desemprego / 30) * 100}%`,
                    background: REGIAO_COLORS[r.regiao],
                    height: '100%',
                    borderRadius: 4,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
