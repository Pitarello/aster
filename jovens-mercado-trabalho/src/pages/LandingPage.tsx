import { useState, useEffect } from 'react';

interface Props {
  onEnter: () => void;
}

const STATS = [
  { value: '18,3%', label: 'desemprego jovem', color: '#ef4444' },
  { value: '54,2%', label: 'informalidade', color: '#f59e0b' },
  { value: '22,7%', label: 'jovens nem-nem', color: '#a78bfa' },
  { value: '368 mil', label: 'jovens no setor de moda', color: '#34d399' },
];

const SECTIONS = [
  {
    icon: '📊',
    title: 'Condição dos jovens',
    text: 'Apenas 25% conseguem conciliar estudo e trabalho. Um grupo relevante está completamente fora do sistema — nem estudando, nem trabalhando.',
  },
  {
    icon: '🎓',
    title: 'Educação e empregabilidade',
    text: 'A escolaridade aumenta a taxa de ocupação, mas não elimina desigualdades estruturais. Jovens com ensino superior ainda enfrentam subocupação e informalidade.',
  },
  {
    icon: '⚖️',
    title: 'Desigualdade estrutural',
    text: 'Gênero, raça e região determinam oportunidades. Mulheres negras têm desemprego de 31,4% no setor de moda. O Sul emprega 2x mais formalmente que o Norte.',
  },
  {
    icon: '👗',
    title: 'Setor de moda',
    text: 'Alta informalidade (67,3%), predominância feminina (74,2%) e diferença salarial de R$ 360 entre homens e mulheres. Costureiras domiciliares chegam a 91,6% de informalidade.',
  },
];

const FINDINGS = [
  { num: '01', title: 'Educação melhora acesso, mas não resolve desigualdade', desc: 'O aumento da escolaridade reduz o desemprego, porém fatores como origem social, raça e localização continuam determinando oportunidades de forma estrutural.' },
  { num: '02', title: 'Informalidade é parcialmente transitória, mas estrutural para muitos', desc: 'A informalidade reduz com a escolaridade, mas permanece relevante mesmo entre jovens com ensino superior — especialmente em setores como moda e serviços.' },
  { num: '03', title: 'Existe desalinhamento entre educação e mercado', desc: 'Jovens estudam mais, mas nem sempre entram em empregos qualificados. O mercado não absorve proporcionalmente o aumento da escolaridade.' },
  { num: '04', title: 'Setores criativos concentram maior vulnerabilidade', desc: 'O setor de moda exemplifica como setores não estruturados combinam baixa formalização, menor retorno educacional e maior desigualdade de gênero.' },
];

export function LandingPage({ onEnter }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'Inter, system-ui, sans-serif',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        borderBottom: '1px solid #1e293b',
        padding: '80px 32px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative blobs */}
        <div style={{ position: 'absolute', top: -80, left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #3b82f620 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #a78bfa18 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#1e293b', border: '1px solid #334155',
            borderRadius: 20, padding: '6px 16px', fontSize: 12,
            color: '#94a3b8', marginBottom: 28,
          }}>
            🇧🇷 Pesquisa acadêmica · IBGE · PNADC Contínua + SIS 2025
          </div>

          <h1 style={{
            margin: '0 0 20px',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #f1f5f9 30%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Jovens no Mercado de<br />Trabalho Brasileiro
          </h1>

          <p style={{
            margin: '0 auto 16px',
            maxWidth: 640,
            fontSize: 17,
            color: '#94a3b8',
            lineHeight: 1.7,
          }}>
            Análise da inserção de jovens de <strong style={{ color: '#e2e8f0' }}>18 a 25 anos</strong> no mercado de trabalho,
            com foco em educação, informalidade, desigualdade de gênero e raça, e o setor de moda.
          </p>

          <p style={{ margin: '0 auto 40px', maxWidth: 580, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
            A relação entre educação e inserção no mercado de trabalho é um dos principais determinantes
            da mobilidade socioeconômica no Brasil. Dados do IBGE mostram que jovens enfrentam maiores
            dificuldades de inserção — e que o aumento da escolaridade não elimina desigualdades estruturais.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: '#1e293b',
                border: `1px solid ${s.color}30`,
                borderRadius: 12,
                padding: '16px 24px',
                minWidth: 130,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onEnter}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '16px 40px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 32px #6366f140',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 48px #6366f160';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 32px #6366f140';
            }}
          >
            Ver Dashboard Completo →
          </button>
          <div style={{ marginTop: 12, fontSize: 12, color: '#334155' }}>
            Dados interativos com filtros por gênero, raça, região e escolaridade
          </div>
        </div>
      </section>

      {/* ── O QUE ANALISAMOS ── */}
      <section style={{ padding: '64px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: '#f1f5f9' }}>O que esta pesquisa analisa</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Quatro eixos temáticos baseados nos dados do IBGE</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {SECTIONS.map(s => (
            <div key={s.title} style={{
              background: '#1e293b',
              borderRadius: 12,
              padding: '24px 20px',
              borderTop: '3px solid #334155',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#6366f1')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONDIÇÃO DOS JOVENS (tabela visual) ── */}
      <section style={{ padding: '0 32px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>
            📈 Condição dos jovens brasileiros
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: 13, color: '#64748b' }}>Distribuição por situação de estudo e trabalho — IBGE</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Apenas trabalham', pct: 35, color: '#22c55e', desc: 'Priorizam renda, sem formação em curso' },
              { label: 'Apenas estudam', pct: 30, color: '#38bdf8', desc: 'Dedicação exclusiva à formação' },
              { label: 'Estudam e trabalham', pct: 25, color: '#a78bfa', desc: 'Conciliam — mas com sobrecarga' },
              { label: 'Nem estudam nem trabalham', pct: 10, color: '#ef4444', desc: '"Nem-nem" — fora do sistema' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: '#475569', fontSize: 12, marginLeft: 10 }}>{item.desc}</span>
                  </div>
                  <span style={{ color: item.color, fontWeight: 800, fontSize: 18 }}>~{item.pct}%</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: 6, height: 12 }}>
                  <div style={{
                    width: `${item.pct}%`, background: item.color,
                    height: '100%', borderRadius: 6,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: '20px 0 0', fontSize: 13, color: '#475569', borderTop: '1px solid #334155', paddingTop: 16 }}>
            💡 <strong style={{ color: '#94a3b8' }}>Interpretação:</strong> Apenas uma parcela consegue conciliar estudo e trabalho.
            O grupo "nem-nem" representa uma ruptura com o sistema — sem renda e sem formação, com baixíssima perspectiva de mobilidade social.
          </p>
        </div>
      </section>

      {/* ── PRINCIPAIS ACHADOS ── */}
      <section style={{ padding: '0 32px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: '#f1f5f9' }}>Principais achados da pesquisa</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Análise integrada com base nos dados do IBGE</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: 16 }}>
          {FINDINGS.map(f => (
            <div key={f.num} style={{
              background: '#1e293b',
              borderRadius: 12,
              padding: '22px 24px',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 900, color: '#6366f1',
                background: '#1e1b4b', borderRadius: 8,
                padding: '6px 10px', flexShrink: 0, lineHeight: 1,
              }}>{f.num}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9', marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCUSSÃO ── */}
      <section style={{ padding: '0 32px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: '#1e293b', borderRadius: 16, padding: '28px 24px' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>📄 Discussão</h2>
            <p style={{ margin: '0 0 14px', fontSize: 13, color: '#94a3b8', lineHeight: 1.75 }}>
              Os dados do IBGE demonstram que a educação desempenha papel central na inserção no mercado de trabalho,
              mas não atua isoladamente. A persistência de desigualdades sugere que fatores estruturais continuam
              determinando oportunidades.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Origem social', 'Acesso à educação de qualidade', 'Localização geográfica', 'Raça e gênero'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: '#94a3b8', lineHeight: 1.75 }}>
              A análise do setor de moda reforça que a educação formal não é suficiente — fatores informais
              têm maior peso em setores não estruturados.
            </p>
          </div>

          <div style={{ background: '#1e293b', borderRadius: 16, padding: '28px 24px' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>📄 Conclusão</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '✅', text: 'A educação aumenta a empregabilidade', color: '#22c55e' },
                { icon: '⚠️', text: 'A informalidade é um problema estrutural', color: '#f59e0b' },
                { icon: '🚧', text: 'Jovens enfrentam barreiras de entrada significativas', color: '#ef4444' },
                { icon: '👗', text: 'O setor de moda apresenta maior vulnerabilidade', color: '#a78bfa' },
              ].map(c => (
                <div key={c.text} style={{
                  background: '#0f172a', borderRadius: 8, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  borderLeft: `3px solid ${c.color}`,
                }}>
                  <span style={{ fontSize: 16 }}>{c.icon}</span>
                  <span style={{ fontSize: 13, color: '#e2e8f0' }}>{c.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '12px 14px', background: '#0f172a', borderRadius: 8, fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
              <strong style={{ color: '#64748b' }}>Referência:</strong> IBGE. <em>Educação e Trabalho</em>.
              Disponível em: ibge.gov.br/estatisticas/sociais/trabalho/9342. Acesso em: 2026.
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)',
        borderTop: '1px solid #334155',
        padding: '56px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#f1f5f9' }}>
          Explore os dados interativos
        </h2>
        <p style={{ margin: '0 auto 32px', maxWidth: 500, fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>
          Filtre por gênero, raça, região, escolaridade e faixa etária. Veja como cada recorte
          revela uma realidade diferente para os jovens brasileiros.
        </p>
        <button
          onClick={onEnter}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 36px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 32px #6366f140',
          }}
        >
          Acessar o Dashboard →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#0f172a',
        borderTop: '1px solid #1e293b',
        padding: '20px 32px',
        textAlign: 'center',
        fontSize: 12,
        color: '#334155',
      }}>
        Fontes: PNADC Contínua (SIDRA/IBGE) · SIS 2025 · CNAE 13 e 14 · Dados de referência: 2024
      </footer>
    </div>
  );
}
