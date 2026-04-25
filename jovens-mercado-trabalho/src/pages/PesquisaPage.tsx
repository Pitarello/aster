import { useState, useEffect, useRef } from 'react';

interface Props {
  onBack: () => void;
  onDashboard: () => void;
}

interface TocItem {
  id: string;
  label: string;
  level: number;
}

const TOC: TocItem[] = [
  { id: 'resumo', label: 'Resumo', level: 1 },
  { id: 'abstract', label: 'Abstract', level: 1 },
  { id: 'introducao', label: '1. Introdução', level: 1 },
  { id: 'objetivos', label: '2. Objetivos', level: 1 },
  { id: 'metodologia', label: '3. Metodologia', level: 1 },
  { id: 'referencial', label: '4. Referencial Teórico', level: 1 },
  { id: 'resultados', label: '5. Resultados', level: 1 },
  { id: 'res-condicao', label: '5.1 Condição dos jovens', level: 2 },
  { id: 'res-escolaridade', label: '5.2 Escolaridade e emprego', level: 2 },
  { id: 'res-informalidade', label: '5.3 Informalidade', level: 2 },
  { id: 'res-desigualdade', label: '5.4 Desigualdade', level: 2 },
  { id: 'res-moda', label: '5.5 Setor de moda', level: 2 },
  { id: 'discussao', label: '6. Discussão', level: 1 },
  { id: 'conclusao', label: '7. Conclusão', level: 1 },
  { id: 'referencias', label: 'Referências', level: 1 },
];

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 48, scrollMarginTop: 80 }}>
      {children}
    </section>
  );
}

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 20, fontWeight: 800, color: '#f1f5f9',
      borderBottom: '2px solid #334155', paddingBottom: 10,
      marginBottom: 20, marginTop: 0,
    }}>{children}</h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: '#e2e8f0',
      borderLeft: '3px solid #6366f1', paddingLeft: 12,
      marginBottom: 14, marginTop: 28,
    }}>{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 14, color: '#94a3b8', lineHeight: 1.9,
      margin: '0 0 14px', textAlign: 'justify',
    }}>{children}</p>
  );
}

function DataTable({ caption, headers, rows }: {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <figure style={{ margin: '24px 0' }}>
      <figcaption style={{ fontSize: 12, color: '#64748b', marginBottom: 8, fontStyle: 'italic' }}>
        {caption}
      </figcaption>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              {headers.map(h => (
                <th key={h} style={{
                  padding: '10px 14px', textAlign: 'left',
                  color: '#94a3b8', fontWeight: 600,
                  borderBottom: '2px solid #334155',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#0f172a' : '#111827' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: '9px 14px', color: '#cbd5e1',
                    borderBottom: '1px solid #1e293b', fontSize: 13,
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Callout({ type, children }: { type: 'info' | 'warn' | 'cite'; children: React.ReactNode }) {
  const styles = {
    info:  { border: '#38bdf8', bg: '#0c1a2e', icon: 'ℹ️' },
    warn:  { border: '#f59e0b', bg: '#1c1400', icon: '⚠️' },
    cite:  { border: '#6366f1', bg: '#13111f', icon: '📌' },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg, borderLeft: `4px solid ${s.border}`,
      borderRadius: '0 8px 8px 0', padding: '12px 16px',
      margin: '16px 0', fontSize: 13, color: '#94a3b8', lineHeight: 1.7,
    }}>
      <span style={{ marginRight: 8 }}>{s.icon}</span>{children}
    </div>
  );
}

function BarViz({ label, value, max, color, suffix = '%' }: {
  label: string; value: number; max: number; color: string; suffix?: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: '#cbd5e1' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}{suffix}</span>
      </div>
      <div style={{ background: '#1e293b', borderRadius: 4, height: 8 }}>
        <div style={{ width: `${(value / max) * 100}%`, background: color, height: '100%', borderRadius: 4, transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

export function PesquisaPage({ onBack, onDashboard }: Props) {
  const [activeSection, setActiveSection] = useState('resumo');
  const [tocOpen, setTocOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* ── HEADER ── */}
      <header style={{
        background: '#1e293b', borderBottom: '1px solid #334155',
        padding: '14px 32px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', position: 'sticky', top: 0, zIndex: 200,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={navBtn}>← Início</button>
          <button onClick={onDashboard} style={{ ...navBtn, background: '#1e1b4b', borderColor: '#6366f1', color: '#a5b4fc' }}>
            📊 Dashboard
          </button>
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, system-ui, sans-serif' }}>
          Pesquisa Científica · IBGE 2024
        </div>
        <button
          onClick={() => setTocOpen(o => !o)}
          style={{ ...navBtn, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {tocOpen ? '◀ Ocultar índice' : '▶ Mostrar índice'}
        </button>
      </header>

      <div style={{ display: 'flex', maxWidth: 1300, margin: '0 auto' }}>

        {/* ── SUMÁRIO LATERAL ── */}
        {tocOpen && (
          <aside style={{
            width: 240, flexShrink: 0, padding: '32px 0 32px 24px',
            position: 'sticky', top: 57, height: 'calc(100vh - 57px)',
            overflowY: 'auto', fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>
              Sumário
            </div>
            {TOC.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: activeSection === item.id ? '#1e1b4b' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${activeSection === item.id ? '#6366f1' : 'transparent'}`,
                  color: activeSection === item.id ? '#a5b4fc' : '#64748b',
                  padding: `6px 10px 6px ${item.level === 2 ? 20 : 10}px`,
                  fontSize: item.level === 2 ? 12 : 13,
                  cursor: 'pointer',
                  borderRadius: '0 6px 6px 0',
                  marginBottom: 2,
                  transition: 'all 0.15s',
                }}
              >
                {item.label}
              </button>
            ))}
          </aside>
        )}

        {/* ── CONTEÚDO ── */}
        <main ref={contentRef} style={{ flex: 1, padding: '48px 48px 80px', maxWidth: 860 }}>

          {/* Cabeçalho do artigo */}
          <div style={{ textAlign: 'center', marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid #1e293b' }}>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'Inter, system-ui, sans-serif', marginBottom: 16, letterSpacing: 1 }}>
              ARTIGO DE PESQUISA · CIÊNCIAS SOCIAIS APLICADAS
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#f1f5f9', lineHeight: 1.3, margin: '0 0 16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
              Educação, Informalidade e Desigualdade:<br />
              <span style={{ color: '#a78bfa' }}>A Inserção de Jovens no Mercado de Trabalho Brasileiro</span>
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
              Com análise aprofundada do setor têxtil e de moda (CNAE 13 e 14)
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 12, color: '#475569', fontFamily: 'Inter, system-ui, sans-serif' }}>
              <span>📅 Ano-base: 2024</span>
              <span>📊 Fonte: IBGE / PNADC Contínua / SIS 2025</span>
              <span>🗂️ Área: Sociologia do Trabalho</span>
            </div>
          </div>

          {/* RESUMO */}
          <Section id="resumo">
            <H1>Resumo</H1>
            <P>
              Este estudo analisa a inserção de jovens brasileiros entre 18 e 25 anos no mercado de trabalho,
              com base nos dados da Pesquisa Nacional por Amostra de Domicílios Contínua (PNADC) e do Sistema
              de Indicadores Sociais (SIS 2025) do Instituto Brasileiro de Geografia e Estatística (IBGE).
              Os resultados indicam que a taxa de desemprego jovem (18,3%) é aproximadamente três vezes superior
              à média nacional (6,2%), e que 54,2% dos jovens ocupados encontram-se em situação de informalidade.
              A análise revela desigualdades estruturais persistentes associadas a gênero, raça e região geográfica,
              bem como um desalinhamento entre o aumento da escolaridade e a qualidade da inserção laboral.
              O setor têxtil e de moda é examinado como caso ilustrativo de vulnerabilidade setorial, com
              informalidade de 67,3% e predominância feminina de 74,2% da força de trabalho jovem.
            </P>
            <Callout type="cite">
              <strong>Palavras-chave:</strong> mercado de trabalho; juventude; informalidade; desigualdade; educação; setor de moda; IBGE; PNADC.
            </Callout>
          </Section>

          {/* ABSTRACT */}
          <Section id="abstract">
            <H1>Abstract</H1>
            <P>
              This study analyzes the labor market insertion of young Brazilians aged 18 to 25, based on data
              from the Continuous National Household Sample Survey (PNADC) and the Social Indicators System
              (SIS 2025) from IBGE. Results indicate that the youth unemployment rate (18.3%) is approximately
              three times higher than the national average (6.2%), and that 54.2% of employed youth are in
              informal arrangements. The analysis reveals persistent structural inequalities associated with
              gender, race, and geographic region, as well as a misalignment between rising educational
              attainment and the quality of labor market insertion. The textile and fashion sector is examined
              as an illustrative case of sectoral vulnerability, with 67.3% informality and 74.2% female
              predominance among young workers.
            </P>
            <Callout type="cite">
              <strong>Keywords:</strong> labor market; youth; informality; inequality; education; fashion sector; IBGE; PNADC.
            </Callout>
          </Section>

          {/* 1. INTRODUÇÃO */}
          <Section id="introducao">
            <H1>1. Introdução</H1>
            <P>
              A relação entre educação e inserção no mercado de trabalho constitui um dos principais
              determinantes da mobilidade socioeconômica no Brasil. Segundo dados do IBGE (2024), jovens
              entre 18 e 25 anos enfrentam dificuldades estruturais de inserção laboral que vão além da
              simples falta de qualificação — refletindo desigualdades históricas de acesso, raça, gênero
              e localização geográfica.
            </P>
            <P>
              O período de transição da escola para o trabalho é reconhecido pela literatura internacional
              como uma fase crítica para a trajetória profissional dos indivíduos (STANDING, 2011; ILO, 2020).
              No contexto brasileiro, essa transição é marcada por elevadas taxas de desemprego, informalidade
              e pelo fenômeno dos jovens que não estudam nem trabalham — os chamados "nem-nem" —, que
              representam 22,7% da população jovem em 2024.
            </P>
            <P>
              Além disso, há evidências robustas de que o aumento da escolaridade não elimina desigualdades
              estruturais, especialmente quando analisados fatores interseccionais como gênero, raça e setor
              de atuação (POCHMANN, 2012; GUIMARÃES, 2009). O setor de moda e vestuário, em particular,
              apresenta características que o tornam um caso paradigmático de vulnerabilidade laboral juvenil:
              alta informalidade, baixa remuneração e marcada desigualdade de gênero.
            </P>
            <Callout type="info">
              Este estudo utiliza dados secundários do IBGE (PNADC Contínua e SIS 2025) para mapear
              a situação dos jovens no mercado de trabalho brasileiro, com recorte especial para o setor
              têxtil e de moda (CNAE 13 e 14).
            </Callout>
          </Section>

          {/* 2. OBJETIVOS */}
          <Section id="objetivos">
            <H1>2. Objetivos</H1>
            <H2>2.1 Objetivo Geral</H2>
            <P>
              Analisar a inserção de jovens brasileiros de 18 a 25 anos no mercado de trabalho, identificando
              os principais fatores que determinam empregabilidade, qualidade do emprego e desigualdades
              de acesso, com base nos dados do IBGE referentes ao período 2020–2024.
            </P>
            <H2>2.2 Objetivos Específicos</H2>
            <div style={{ paddingLeft: 20 }}>
              {[
                'Mapear a distribuição dos jovens segundo condição de atividade (estudo, trabalho, nem-nem)',
                'Analisar a relação entre nível de escolaridade e taxa de ocupação',
                'Mensurar a informalidade por faixa etária, gênero, raça e região',
                'Identificar desigualdades estruturais no acesso ao emprego formal',
                'Examinar as especificidades do setor de moda como caso de vulnerabilidade setorial',
                'Avaliar a evolução temporal dos indicadores entre 2020 e 2024',
              ].map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 13, flexShrink: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <P>{obj}</P>
                </div>
              ))}
            </div>
          </Section>
