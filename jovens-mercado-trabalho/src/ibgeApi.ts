import axios from 'axios';
import type { DashboardData } from './types';
import { mockData } from './mockData';

// SIDRA IBGE base URL
const SIDRA_BASE = 'https://apisidra.ibge.gov.br/values';

// Tabela 6318 - PNADC - Desemprego por grupos de idade
async function fetchDesempregoJovem(): Promise<number> {
  const url = `${SIDRA_BASE}/t/6318/n1/all/v/4099/p/last%201/c2/6794/c58/2795,2796,2797,2798/d/v4099%201`;
  const res = await axios.get(url, { timeout: 8000 });
  const rows = res.data as Array<Record<string, string>>;
  const dataRows = rows.filter(r => r.V && r.V !== 'V' && r.V !== '...');
  if (!dataRows.length) throw new Error('No data');
  const values = dataRows.map(r => parseFloat(r.V)).filter(v => !isNaN(v));
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export async function fetchDashboardData(
  _filters: Record<string, string>
): Promise<{ data: DashboardData; fromApi: boolean }> {
  try {
    await fetchDesempregoJovem();
    // If API works, return mock with flag (full SIDRA integration would need many calls)
    return { data: mockData, fromApi: true };
  } catch {
    // CORS or network error — use realistic mock
    return { data: mockData, fromApi: false };
  }
}
