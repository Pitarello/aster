interface InsightCardProps {
  icon: string;
  title: string;
  text: string;
  color: string;
  highlight?: string;
}

function InsightCard({ icon, title, text, color, highlight }: InsightCardProps) {
  return (
    <div style={{
      background: '#0f172a',
      borderRadius: 10,
      padding: '16px 18px',
      borderTop: `3px solid ${color}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{title}</span>
      </div>
      {highlight && (
        <div style={{ color, fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{highlight}</div>
      )}
      <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

export function ResumoAnalise() {
  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 28 }}>
      {/* Header do resumo */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          📝 Resumo da Análise
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>
          O que os dados dizem — em linguagem simples, sem jargões
        </p>
      </div>

      {/* Parágrafo introdutório */}
      <div style={{
        background: '#0f172a',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 20,
        borderLeft: '4px solid #3b82f6',
      }}>
        <p style={{ margin: 0, fontSize: 14, color: '#cbd5e1', lineHeight: 1.8 }}>
          No Brasil, jovens entre 18 e 25 anos enfrentam um mercado de trabalho muito mais difícil do que os adultos.
          Enquanto a taxa de desemprego geral do país é de <strong style={{ color: '#f1f5f9' }}>6,2%</strong>, entre os jovens esse número chega a{' '}
          <strong style={{ color: '#ef4444' }}>18,3%</strong> — quase 3 vezes mais. Isso significa que, de cada 10 jovens que querem trabalhar,
          quase 2 não conseguem. Os dados abaixo explicam por quê isso acontece e quem sofre mais.
        </p>
      </div>

      {/* Grid de insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        <InsightCard
          icon="📉"
          title="O desemprego jovem é quase 3x maior"
          highlight="18,3%"
          color="#ef4444"
          text="A taxa de desemprego entre jovens de 18 a 25 anos é quase três vezes maior que a média nacional (6,2%). Isso acontece porque muitos jovens estão entrando no mercado pela primeira vez, sem experiência, e as empresas preferem contratar quem já tem histórico profissional."
        />
        <InsightCard
          icon="📋"
          title="Mais da metade trabalha sem carteira assinada"
          highlight="54,2%"
          color="#f59e0b"
          text="Mais da metade dos jovens que trabalham estão na informalidade — sem carteira assinada, sem FGTS, sem férias remuneradas e sem acesso ao seguro-desemprego. Isso deixa esses jovens muito vulneráveis a qualquer crise econômica."
        />
        <InsightCard
          icon="🚫"
          title="Quase 1 em cada 4 jovens não estuda nem trabalha"
          highlight="22,7%"
          color="#a78bfa"
          text='São os chamados "jovens nem-nem": não estão empregados e também não estão estudando. Isso representa cerca de 4,8 milhões de pessoas que estão fora tanto do mercado de trabalho quanto do sistema educacional — um sinal de alerta para o futuro do país.'
        />
        <InsightCard
          icon="🎓"
          title="Estudar faz diferença — mas não resolve tudo"
          highlight="82,4%"
          color="#38bdf8"
          text="Jovens com ensino superior completo têm taxa de ocupação de 82,4%, contra apenas 38,2% de quem não tem instrução. Ou seja, estudar aumenta muito as chances de conseguir emprego. Mas mesmo com diploma, muitos ainda enfrentam informalidade e salários baixos."
        />
        <InsightCard
          icon="⚖️"
          title="Mulheres e negros são os mais prejudicados"
          color="#f472b6"
          text="Mulheres jovens têm desemprego de 21,8%, contra 15,2% dos homens. Jovens pretos e indígenas chegam a 22–24% de desemprego, enquanto jovens brancos ficam em 13,1%. Isso mostra que raça e gênero ainda determinam muito quem consegue uma oportunidade no Brasil."
        />
        <InsightCard
          icon="🗺️"
          title="Norte e Nordeste concentram as maiores dificuldades"
          color="#fb923c"
          text="As regiões Norte (22,4%) e Nordeste (24,1%) têm os maiores índices de desemprego jovem. O Sul do país tem o menor índice (12,8%). Essa diferença reflete desigualdades históricas de investimento, infraestrutura e oportunidades entre as regiões brasileiras."
        />
        <InsightCard
          icon="👗"
          title="O setor de moda concentra precariedade e desigualdade"
          highlight="368 mil"
          color="#34d399"
          text="Cerca de 368 mil jovens trabalham no setor têxtil e de moda — e 67,3% deles estão na informalidade, acima da média geral. O setor é majoritariamente feminino (74,2%), mas as mulheres ganham R$ 360 a menos que os homens. Costureiras domiciliares chegam a 91,6% de informalidade com renda de R$ 980/mês, enquanto estilistas jovens podem ganhar R$ 2.680 — uma diferença de quase 3x dentro do mesmo setor."
        />
        <InsightCard
          icon="📈"
          title="Houve melhora nos últimos anos, mas ainda é insuficiente"
          color="#22c55e"
          text="O desemprego jovem caiu de 31,2% em 2021 para 18,3% em 2024 — uma melhora real. Mas ainda está longe de ser aceitável. A informalidade praticamente não mudou nesse período, o que indica que os empregos criados são, em sua maioria, precários."
        />
      </div>

      {/* Conclusão */}
      <div style={{
        background: '#0f172a',
        borderRadius: 10,
        padding: '16px 20px',
        marginTop: 20,
        borderLeft: '4px solid #22c55e',
      }}>
        <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
          <strong style={{ color: '#f1f5f9' }}>O que isso significa na prática?</strong> O Brasil tem um problema estrutural com o emprego jovem.
          Não basta criar vagas — é preciso criar vagas de qualidade, com proteção trabalhista. Políticas públicas que combinem
          educação profissional, combate à discriminação racial e de gênero, e incentivos à formalização são essenciais para
          mudar esse cenário. Os dados mostram que o problema existe, é mensurável e pode ser resolvido com as políticas certas.
        </p>
      </div>
    </div>
  );
}
