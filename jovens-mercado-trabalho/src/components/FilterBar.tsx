import type { Filters } from '../types';

interface FilterBarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const OPTIONS = {
  faixaEtaria: ['Todas', '18–21 anos', '22–25 anos'],
  genero: ['Todos', 'Masculino', 'Feminino'],
  raca: ['Todas', 'Branca', 'Preta', 'Parda', 'Amarela', 'Indígena'],
  regiao: ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
  escolaridade: ['Todas', 'Sem instrução', 'Fund. incompleto', 'Fund. completo', 'Médio incompleto', 'Médio completo', 'Superior incompleto', 'Superior completo'],
  tipoEmprego: ['Todos', 'Formal CLT', 'Informal', 'Autônomo', 'Estágio'],
};

const LABELS: Record<keyof Filters, string> = {
  faixaEtaria: 'Faixa etária',
  genero: 'Gênero',
  raca: 'Raça/Cor',
  regiao: 'Região',
  escolaridade: 'Escolaridade',
  tipoEmprego: 'Tipo de emprego',
};

const selectStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  border: '1px solid #334155',
  borderRadius: 8,
  padding: '6px 10px',
  fontSize: 13,
  cursor: 'pointer',
  outline: 'none',
};

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onChange({
      faixaEtaria: 'Todas',
      genero: 'Todos',
      raca: 'Todas',
      regiao: 'Todas',
      escolaridade: 'Todas',
      tipoEmprego: 'Todos',
    });
  };

  const isFiltered = Object.values(filters).some(v => !['Todas', 'Todos'].includes(v));

  return (
    <div style={{
      background: '#1e293b',
      borderRadius: 12,
      padding: '14px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'center',
    }}>
      <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>🔍 Filtros</span>
      {(Object.keys(OPTIONS) as Array<keyof Filters>).map(key => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label style={{ fontSize: 11, color: '#64748b' }}>{LABELS[key]}</label>
          <select
            style={selectStyle}
            value={filters[key]}
            onChange={e => handleChange(key, e.target.value)}
          >
            {OPTIONS[key].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
      {isFiltered && (
        <button
          onClick={clearAll}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 13,
            cursor: 'pointer',
            alignSelf: 'flex-end',
          }}
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
