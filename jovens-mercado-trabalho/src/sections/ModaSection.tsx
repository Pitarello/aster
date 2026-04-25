import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell,
} from 'recharts';
import type { DashboardData } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface Props { data: DashboardData }

const REGIAO_COLORS: Record<string, string> = {
  Sudeste: '#60a5fa',
  Sul: '#34d399',
  Nordeste: '#fb923c',
  Norte: '#f87171',
  'Centro-Oeste': '#facc15',
};

function StatBox({ label, value, sub, color = '#a78bfa' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', flex: 1, minWidth: 120 }}>
      <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{label}</div>
      <div style={{ color, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: '#475569', fontSize: 11, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export function ModaSection({ data }: Props) {
  const totalJovens = data.modaFuncoes.reduce((s, f) => s + f.jovens, 0);

  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <SectionTitle icon="👗" title="Setor de Moda" subtitle="Análise aprofundada — jovens 18–25 anos no setor têxtil/vestuário (CNAE 13 e 14)" />

      {/* KPIs do setor */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <StatBox label="Jovens no setor" value="368 mil" sub="estimativa 2024" color="#a78bfa" />
        <StatBox label="Informalidade no setor" value="67,3%" sub="vs. 54,2% geral" color="#ef4444" />
        <StatBox label="Renda média jovem" value="R$ 1.280" sub="mulheres no setor" color="#f472b6" />
        <StatBox label="Predominância feminina" value="74,2%" sub="dos trabalhadores" color="#f472b6" />
        <StatBox label="Maior informalidade" value="91,6%" sub="costura domiciliar" color="#fb923c" />
        <StatBox label="Melhor remuneração" value="R$ 2.680" sub="estilistas jovens" color="#34d399" />
      </div>

      {/* Linha 1: Formal/Informal por segmento + Série temporal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Formal vs. informal por segmento (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.moda} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="tipo" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v) => `${Number(v)}%`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="formal" name="Formal" fill="#22c55e" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="informal" name="Informal" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Evolução de empregos e informalidade (2020–2024)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.modaSerie} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="ano" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[60, 80]} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v, name) => name === 'Empregos' ? Number(v).toLocaleString('pt-BR') : `${Number(v)}%`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Line yAxisId="left" type="monotone" dataKey="empregos" name="Empregos" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="informalidade" name="Informalidade" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Linha 2: Faixa etária + Gênero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Formal vs. informal por faixa etária (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.modaFaixaEtaria} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="faixa" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v) => `${Number(v)}%`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="formal" name="Formal" fill="#22c55e" stackId="a" />
              <Bar dataKey="informal" name="Informal" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {data.modaFaixaEtaria.map(f => (
              <div key={f.faixa} style={{ flex: 1, background: '#0f172a', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 10 }}>{f.faixa}</div>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: 14 }}>R$ {f.rendaMedia.toLocaleString('pt-BR')}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Composição por gênero e renda média</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
            {data.modaGenero.map(g => (
              <div key={g.categoria} style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 15 }}>{g.categoria}</span>
                  <span style={{ color: g.categoria === 'Mulheres' ? '#f472b6' : '#60a5fa', fontWeight: 800, fontSize: 22 }}>
                    {g.percentual}%
                  </span>
                </div>
                <div style={{ background: '#1e293b', borderRadius: 4, height: 10, marginBottom: 8 }}>
                  <div style={{
                    width: `${g.percentual}%`,
                    background: g.categoria === 'Mulheres' ? '#f472b6' : '#60a5fa',
                    height: '100%', borderRadius: 4,
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontSize: 12 }}>Renda média mensal</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>R$ {g.rendaMedia.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            ))}
            <div style={{ background: '#0f172a', borderRadius: 8, padding: 12, borderLeft: '3px solid #f472b6' }}>
              <div style={{ color: '#64748b', fontSize: 11 }}>Diferença salarial de gênero no setor</div>
              <div style={{ color: '#f472b6', fontWeight: 800, fontSize: 20 }}>
                −R$ {(data.modaGenero[1].rendaMedia - data.modaGenero[0].rendaMedia).toLocaleString('pt-BR')}
              </div>
              <div style={{ color: '#64748b', fontSize: 11 }}>mulheres ganham menos que homens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha 3: Funções + Escolaridade */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Principais funções — jovens no setor (mil pessoas)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[...data.modaFuncoes].sort((a, b) => b.jovens - a.jovens)}
              layout="vertical"
              margin={{ top: 4, right: 60, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="funcao" tick={{ fill: '#94a3b8', fontSize: 11 }} width={130} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                formatter={(v, name) => [
                  name === 'jovens' ? Number(v).toLocaleString('pt-BR') + ' pessoas' : `${Number(v)}%`,
                  name === 'jovens' ? 'Jovens' : 'Informalidade',
                ]}
              />
              <Bar dataKey="jovens" name="jovens" radius={[0, 4, 4, 0]}>
                {data.modaFuncoes.map((_, i) => (
                  <Cell key={i} fill={`hsl(${260 + i * 15}, 70%, 60%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ color: '#64748b', fontSize: 11, marginTop: 6, textAlign: 'right' }}>
            Total estimado: {totalJovens.toLocaleString('pt-BR')} jovens
          </div>
        </div>

        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Renda média e informalidade por função</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...data.modaFuncoes].sort((a, b) => b.rendaMedia - a.rendaMedia).map(f => (
              <div key={f.funcao} style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#e2e8f0', fontSize: 13 }}>{f.funcao}</span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 13 }}>R$ {f.rendaMedia.toLocaleString('pt-BR')}</span>
                    <span style={{
                      color: f.informalidade > 70 ? '#ef4444' : f.informalidade > 45 ? '#f59e0b' : '#22c55e',
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {f.informalidade}% inf.
                    </span>
                  </div>
                </div>
                <div style={{ background: '#1e293b', borderRadius: 3, height: 4 }}>
                  <div style={{
                    width: `${(f.rendaMedia / 2800) * 100}%`,
                    background: '#a78bfa', height: '100%', borderRadius: 3,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Linha 4: Escolaridade + Regiões */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Distribuição por escolaridade no setor (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.modaEscolaridade} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="escolaridade" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={40} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(v, name) => [
                  name === 'percentual' ? `${Number(v)}%` : `R$ ${Number(v).toLocaleString('pt-BR')}`,
                  name === 'percentual' ? 'Participação' : 'Renda média',
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="percentual" name="percentual" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 10, marginTop: 10 }}>
            <div style={{ color: '#64748b', fontSize: 11, marginBottom: 6 }}>Renda média por escolaridade (R$)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {data.modaEscolaridade.map(e => (
                <div key={e.escolaridade} style={{ background: '#1e293b', borderRadius: 6, padding: '4px 8px', fontSize: 11 }}>
                  <span style={{ color: '#64748b' }}>{e.escolaridade}: </span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>R$ {e.rendaMedia.toLocaleString('pt-BR')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Empregos e informalidade por região</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={data.modaRegiao} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="regiao" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} />
              <Radar name="Informalidade %" dataKey="informalidade" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {[...data.modaRegiao].sort((a, b) => b.empregos - a.empregos).map(r => (
              <div key={r.regiao} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: REGIAO_COLORS[r.regiao], flexShrink: 0 }} />
                <span style={{ color: '#e2e8f0', fontSize: 12, width: 90 }}>{r.regiao}</span>
                <span style={{ color: '#64748b', fontSize: 12, width: 60 }}>{(r.empregos / 1000).toFixed(0)}k empregos</span>
                <div style={{ flex: 1, background: '#334155', borderRadius: 3, height: 6 }}>
                  <div style={{ width: `${r.informalidade}%`, background: REGIAO_COLORS[r.regiao], height: '100%', borderRadius: 3 }} />
                </div>
                <span style={{ color: REGIAO_COLORS[r.regiao], fontSize: 12, fontWeight: 700, width: 40, textAlign: 'right' }}>
                  {r.informalidade}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nota de fonte */}
      <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px' }}>
        <span style={{ color: '#475569', fontSize: 12 }}>
          📌 Fontes: CNAE 13 (Fabricação de produtos têxteis), CNAE 14 (Confecção de artigos do vestuário e acessórios), PNADC Contínua — IBGE 2024. Dados de influenciadores/marketing digital estimados via RAIS/MTE.
        </span>
      </div>
    </div>
  );
}
