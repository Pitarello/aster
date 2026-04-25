import { useState, useEffect, useCallback } from 'react';
import type { Filters, DashboardData } from './types';
import { fetchDashboardData } from './ibgeApi';
import { KPICard } from './components/KPICard';
import { FilterBar } from './components/FilterBar';
import { ResumoAnalise } from './components/ResumoAnalise';
import { EmpregoSection } from './sections/EmpregSection';
import { EducacaoSection } from './sections/EducacaoSection';
import { InformalidadeSection } from './sections/InformalidadeSection';
import { DesigualdadeSection } from './sections/DesigualdadeSection';
import { NemNemSection } from './sections/NemNemSection';
import { ModaSection } from './sections/ModaSection';
import { LandingPage } from './pages/LandingPage';
import './App.css';

const DEFAULT_FILTERS: Filters = {
  faixaEtaria: 'Todas',
  genero: 'Todos',
  raca: 'Todas',
  regiao: 'Todas',
  escolaridade: 'Todas',
  tipoEmprego: 'Todos',
};

function Dashboard({ onBack }: { onBack: () => void }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [data, setData] = useState<DashboardData | null>(null);
  const [fromApi, setFromApi] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchDashboardData(filters as unknown as Record<string, string>);
    setData(result.data);
    setFromApi(result.fromApi);
    setLoading(false);
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: '#0f172a',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#6366f1';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#334155';
            }}
          >
            ← Início
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>
              🇧🇷 Jovens no Mercado de Trabalho Brasileiro
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>
              18–25 anos · PNADC Contínua + SIS 2025 · IBGE
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            background: fromApi ? '#14532d' : '#1c1917',
            border: `1px solid ${fromApi ? '#22c55e' : '#78716c'}`,
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 12,
            color: fromApi ? '#86efac' : '#a8a29e',
          }}>
            {fromApi ? '🟢 API IBGE' : '🟡 Dados mockados (IBGE 2024)'}
          </div>
          {loading && <div style={{ color: '#64748b', fontSize: 12 }}>Carregando...</div>}
        </div>
      </header>

      <main style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <FilterBar filters={filters} onChange={setFilters} />

        {data && (
          <>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <KPICard label="Desemprego jovem" value={`${data.kpis.desempregoJovem}%`} sub={`vs. ${data.kpis.desempregoNacional}% média nacional`} color="#ef4444" icon="📉" />
              <KPICard label="Taxa de ocupação" value={`${data.kpis.ocupacao}%`} sub="jovens 18–25 anos" color="#22c55e" icon="💼" />
              <KPICard label="Informalidade" value={`${data.kpis.informalidade}%`} sub="dos jovens ocupados" color="#f59e0b" icon="📋" />
              <KPICard label="Jovens nem-nem" value={`${data.kpis.nemNem}%`} sub="não estudam e não trabalham" color="#a78bfa" icon="🚫" />
              <KPICard label="Ensino superior" value={`${data.kpis.ensinoSuperior}%`} sub="com curso superior" color="#38bdf8" icon="🎓" />
            </div>
            <ResumoAnalise />
            <EmpregoSection data={data} />
            <EducacaoSection data={data} />
            <InformalidadeSection data={data} />
            <DesigualdadeSection data={data} />
            <NemNemSection data={data} />
            <ModaSection data={data} />
          </>
        )}

        <footer style={{ textAlign: 'center', color: '#334155', fontSize: 12, paddingBottom: 24 }}>
          Fontes: PNADC Contínua (SIDRA/IBGE) · SIS 2025 · Dados de referência: 2024
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (page === 'dashboard') {
    return <Dashboard onBack={() => setPage('landing')} />;
  }

  return <LandingPage onEnter={() => setPage('dashboard')} />;
}
