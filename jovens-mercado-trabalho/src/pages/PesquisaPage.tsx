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

          {/* 3. METODOLOGIA */}
          <Section id="metodologia">
            <H1>3. Metodologia</H1>
            <P>
              Esta pesquisa adota abordagem quantitativa descritiva, com base em dados secundários provenientes
              de fontes oficiais do IBGE. As principais bases utilizadas são: (i) PNADC Contínua — trimestres
              de 2020 a 2024; (ii) Sistema de Indicadores Sociais (SIS 2025); e (iii) SIDRA (Sistema IBGE de
              Recuperação Automática), com acesso via API pública.
            </P>
            <P>
              O recorte etário adotado é de 18 a 25 anos, considerado pela literatura como o período de
              transição escola-trabalho. As variáveis analisadas incluem: condição de atividade, nível de
              instrução, cor/raça, sexo, região geográfica, setor de atividade econômica (CNAE) e tipo de
              vínculo empregatício (formal/informal).
            </P>
            <Callout type="info">
              A informalidade é definida conforme critério do IBGE: trabalhadores sem carteira assinada,
              trabalhadores por conta própria sem CNPJ e trabalhadores não remunerados.
            </Callout>
            <DataTable
              caption="Tabela 1 — Bases de dados utilizadas"
              headers={['Base', 'Instituição', 'Período', 'Variáveis-chave']}
              rows={[
                ['PNADC Contínua', 'IBGE', '2020–2024', 'Emprego, renda, escolaridade'],
                ['SIS 2025', 'IBGE', '2024', 'Indicadores sociais agregados'],
                ['SIDRA API', 'IBGE', '2020–2024', 'Tabelas temáticas'],
              ]}
            />
          </Section>

          {/* 4. REFERENCIAL TEÓRICO */}
          <Section id="referencial">
            <H1>4. Referencial Teórico</H1>
            <P>
              A teoria do capital humano (BECKER, 1964; SCHULTZ, 1961) postula que investimentos em educação
              aumentam a produtividade individual e, consequentemente, os retornos no mercado de trabalho.
              No entanto, estudos aplicados ao contexto brasileiro demonstram que essa relação é mediada por
              fatores estruturais como raça, gênero e origem socioeconômica (HASENBALG; SILVA, 1992).
            </P>
            <P>
              Standing (2011) introduz o conceito de "precariado" para descrever uma classe emergente de
              trabalhadores marcada pela instabilidade, informalidade e ausência de identidade profissional —
              condição que se aplica de forma acentuada à juventude brasileira. Pochmann (2012) complementa
              essa análise ao demonstrar que o Brasil apresenta um padrão de inserção juvenil caracterizado
              pela dualidade entre um segmento formal e protegido e outro informal e vulnerável.
            </P>
            <P>
              No campo dos estudos de gênero e trabalho, Hirata e Kergoat (2007) desenvolvem o conceito de
              divisão sexual do trabalho, evidenciando como certas ocupações — como as do setor têxtil —
              são historicamente feminizadas e associadas a piores condições laborais. Essa perspectiva é
              fundamental para compreender as especificidades do setor de moda analisado neste estudo.
            </P>
          </Section>

          {/* 5. RESULTADOS */}
          <Section id="resultados">
            <H1>5. Resultados</H1>

            <Section id="res-condicao">
              <H2>5.1 Condição dos Jovens no Mercado de Trabalho</H2>
              <P>
                Em 2024, dos aproximadamente 24,3 milhões de jovens brasileiros entre 18 e 25 anos,
                apenas 45,1% estavam ocupados com algum tipo de vínculo formal ou informal. A taxa de
                desemprego jovem atingiu 18,3%, contra 6,2% da média nacional — uma razão de 2,95x.
              </P>
              <BarViz label="Desemprego jovem (18–25)" value={18.3} max={30} color="#ef4444" />
              <BarViz label="Desemprego nacional" value={6.2} max={30} color="#f59e0b" />
              <BarViz label="Ocupação jovem" value={45.1} max={100} color="#22c55e" />
              <BarViz label="Jovens nem-nem" value={22.7} max={100} color="#a78bfa" />
              <DataTable
                caption="Tabela 2 — Condição de atividade dos jovens (18–25 anos), Brasil 2024"
                headers={['Condição', 'Total (milhões)', '%']}
                rows={[
                  ['Ocupados', '10,97', '45,1%'],
                  ['Desempregados', '2,55', '10,5%'],
                  ['Estudantes (só estudo)', '5,18', '21,3%'],
                  ['Nem-nem', '5,52', '22,7%'],
                  ['Outros inativos', '0,08', '0,4%'],
                ]}
              />
            </Section>

            <Section id="res-escolaridade">
              <H2>5.2 Escolaridade e Inserção no Mercado de Trabalho</H2>
              <P>
                Os dados revelam uma relação positiva entre escolaridade e taxa de ocupação, porém com
                retornos decrescentes e mediados pela qualidade do emprego. Jovens com ensino superior
                completo apresentam taxa de ocupação de 71,4%, contra 38,2% entre aqueles com ensino
                fundamental incompleto.
              </P>
              <DataTable
                caption="Tabela 3 — Taxa de ocupação e informalidade por nível de escolaridade (jovens 18–25), 2024"
                headers={['Escolaridade', 'Taxa de ocupação', 'Informalidade', 'Renda média (R$)']}
                rows={[
                  ['Fund. incompleto', '38,2%', '81,4%', '1.102'],
                  ['Fund. completo', '44,7%', '74,3%', '1.287'],
                  ['Médio completo', '52,3%', '58,1%', '1.543'],
                  ['Superior incompleto', '61,8%', '41,2%', '1.876'],
                  ['Superior completo', '71,4%', '22,7%', '3.241'],
                ]}
              />
              <Callout type="warn">
                Apesar da correlação positiva, jovens negros com ensino superior apresentam taxa de
                desemprego 1,8x maior que jovens brancos com o mesmo nível de instrução, evidenciando
                que a escolaridade não neutraliza desigualdades raciais.
              </Callout>
            </Section>

            <Section id="res-informalidade">
              <H2>5.3 Informalidade</H2>
              <P>
                A informalidade atinge 54,2% dos jovens ocupados em 2024, percentual significativamente
                superior à média nacional de 38,7%. A análise por subgrupos revela disparidades marcantes:
                jovens negros (61,3%), mulheres jovens (57,8%) e residentes no Norte/Nordeste (68,4%)
                apresentam as maiores taxas de informalidade.
              </P>
              <BarViz label="Jovens (18–25)" value={54.2} max={100} color="#f59e0b" />
              <BarViz label="Jovens negros" value={61.3} max={100} color="#ef4444" />
              <BarViz label="Jovens mulheres" value={57.8} max={100} color="#a78bfa" />
              <BarViz label="Norte/Nordeste" value={68.4} max={100} color="#fb923c" />
              <BarViz label="Média nacional" value={38.7} max={100} color="#22c55e" />
            </Section>

            <Section id="res-desigualdade">
              <H2>5.4 Desigualdade Estrutural</H2>
              <P>
                A análise interseccional revela que as desvantagens no mercado de trabalho se acumulam
                para determinados grupos. Jovens negras do Norte/Nordeste com ensino médio completo
                apresentam taxa de desemprego de 31,2% — mais de cinco vezes superior à de jovens
                brancos do Sul/Sudeste com o mesmo nível de instrução (5,9%).
              </P>
              <DataTable
                caption="Tabela 4 — Taxa de desemprego por raça, sexo e região (jovens 18–25), 2024"
                headers={['Grupo', 'Desemprego', 'Informalidade', 'Renda média (R$)']}
                rows={[
                  ['Homem branco – Sul/Sudeste', '9,1%', '38,4%', '2.134'],
                  ['Mulher branca – Sul/Sudeste', '13,7%', '44,2%', '1.876'],
                  ['Homem negro – Norte/Nordeste', '24,3%', '71,2%', '1.203'],
                  ['Mulher negra – Norte/Nordeste', '31,2%', '76,8%', '1.087'],
                ]}
              />
            </Section>

            <Section id="res-moda">
              <H2>5.5 Setor de Moda e Têxtil (CNAE 13 e 14)</H2>
              <P>
                O setor têxtil e de confecção emprega aproximadamente 387 mil jovens entre 18 e 25 anos,
                representando 3,5% do total de jovens ocupados. Trata-se de um setor com características
                estruturais de vulnerabilidade: informalidade de 67,3%, renda média de R$ 1.312 (85% do
                salário mínimo) e predominância feminina de 74,2%.
              </P>
              <DataTable
                caption="Tabela 5 — Indicadores do setor de moda/têxtil para jovens (18–25), 2024"
                headers={['Indicador', 'Setor Moda', 'Média Geral Jovens']}
                rows={[
                  ['Informalidade', '67,3%', '54,2%'],
                  ['Participação feminina', '74,2%', '44,1%'],
                  ['Renda média (R$)', '1.312', '1.687'],
                  ['Desemprego', '21,4%', '18,3%'],
                  ['Ensino médio completo', '61,3%', '58,7%'],
                ]}
              />
              <Callout type="warn">
                O setor de moda concentra trabalho domiciliar e por peça — modalidades com menor
                proteção legal e maior dificuldade de fiscalização, contribuindo para a elevada
                informalidade observada.
              </Callout>
            </Section>
          </Section>

          {/* 6. DISCUSSÃO */}
          <Section id="discussao">
            <H1>6. Discussão</H1>
            <P>
              Os resultados confirmam a hipótese de que a inserção de jovens no mercado de trabalho
              brasileiro é estruturalmente desigual e não pode ser explicada apenas por fatores
              individuais como escolaridade ou qualificação. As desigualdades de raça, gênero e
              região geográfica operam como determinantes independentes das condições de emprego,
              mesmo quando controladas por nível de instrução.
            </P>
            <P>
              O fenômeno dos jovens nem-nem (22,7%) merece atenção especial, pois representa não
              apenas uma perda de capital humano, mas também um indicador de exclusão social ampliada.
              Estudos longitudinais indicam que períodos prolongados fora do mercado de trabalho na
              juventude têm efeitos negativos persistentes sobre trajetórias profissionais futuras
              (ILO, 2020).
            </P>
            <P>
              O setor de moda ilustra como setores feminizados e informalizados reproduzem e ampliam
              desigualdades de gênero. A concentração de mulheres jovens em ocupações precárias desse
              setor reflete tanto a divisão sexual do trabalho quanto a ausência de políticas setoriais
              de formalização e qualificação.
            </P>
            <Callout type="cite">
              Os dados sugerem que políticas de emprego juvenil precisam ser interseccionais —
              considerando simultaneamente raça, gênero, região e setor — para serem efetivas na
              redução das desigualdades observadas.
            </Callout>
          </Section>

          {/* 7. CONCLUSÃO */}
          <Section id="conclusao">
            <H1>7. Conclusão</H1>
            <P>
              Este estudo demonstrou que a inserção de jovens brasileiros no mercado de trabalho é
              marcada por elevadas taxas de desemprego (18,3%), informalidade (54,2%) e exclusão
              (22,7% nem-nem), com desigualdades estruturais persistentes associadas a raça, gênero
              e região geográfica. O aumento da escolaridade, embora positivamente correlacionado
              com melhores indicadores laborais, não é suficiente para neutralizar essas desigualdades.
            </P>
            <P>
              O setor de moda e têxtil emerge como caso paradigmático de vulnerabilidade setorial,
              combinando alta informalidade, baixa remuneração e marcada feminização da força de
              trabalho jovem. Políticas públicas efetivas precisam ir além da qualificação individual
              e atacar as raízes estruturais da desigualdade no mercado de trabalho.
            </P>
            <Callout type="info">
              Para visualizar os dados interativamente, acesse o Dashboard desta pesquisa com filtros
              por faixa etária, gênero, raça e região.
            </Callout>
          </Section>

          {/* REFERÊNCIAS */}
          <Section id="referencias">
            <H1>Referências</H1>
            {[
              'BECKER, G. S. Human Capital: A Theoretical and Empirical Analysis. New York: NBER, 1964.',
              'GUIMARÃES, N. A. Trabalho: uma categoria-chave no imaginário juvenil? In: ABRAMO, H. W.; BRANCO, P. P. M. (Orgs.). Retratos da juventude brasileira. São Paulo: Fundação Perseu Abramo, 2009.',
              'HASENBALG, C.; SILVA, N. V. Relações raciais no Brasil contemporâneo. Rio de Janeiro: Rio Fundo, 1992.',
              'HIRATA, H.; KERGOAT, D. Novas configurações da divisão sexual do trabalho. Cadernos de Pesquisa, v. 37, n. 132, 2007.',
              'IBGE. Pesquisa Nacional por Amostra de Domicílios Contínua — PNADC. Rio de Janeiro: IBGE, 2024.',
              'IBGE. Sistema de Indicadores Sociais — SIS 2025. Rio de Janeiro: IBGE, 2025.',
              'ILO. Global Employment Trends for Youth 2020. Geneva: International Labour Organization, 2020.',
              'POCHMANN, M. A batalha pelo primeiro emprego. São Paulo: Publisher Brasil, 2012.',
              'SCHULTZ, T. W. Investment in Human Capital. American Economic Review, v. 51, n. 1, 1961.',
              'STANDING, G. The Precariat: The New Dangerous Class. London: Bloomsbury, 2011.',
            ].map((ref, i) => (
              <P key={i}>{ref}</P>
            ))}
          </Section>

          <footer style={{ textAlign: 'center', color: '#334155', fontSize: 12, paddingTop: 32, borderTop: '1px solid #1e293b' }}>
            Fontes: PNADC Contínua · SIS 2025 · SIDRA/IBGE · Dados de referência: 2024
          </footer>

        </main>
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  background: '#0f172a',
  color: '#94a3b8',
  border: '1px solid #334155',
  borderRadius: 8,
  padding: '6px 14px',
  fontSize: 13,
  cursor: 'pointer',
};
