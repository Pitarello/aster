interface KPICardProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  icon?: string;
}

export function KPICard({ label, value, sub, color = '#3b82f6', icon }: KPICardProps) {
  return (
    <div style={{
      background: '#1e293b',
      borderRadius: 12,
      padding: '20px 24px',
      borderLeft: `4px solid ${color}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 160,
      flex: 1,
    }}>
      <div style={{ fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon && <span>{icon}</span>}
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: '#64748b' }}>{sub}</div>}
    </div>
  );
}
