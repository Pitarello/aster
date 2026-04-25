interface SectionTitleProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{icon}</span> {title}
      </h2>
      {subtitle && <p style={{ margin: '4px 0 0 28px', fontSize: 13, color: '#64748b' }}>{subtitle}</p>}
    </div>
  );
}
