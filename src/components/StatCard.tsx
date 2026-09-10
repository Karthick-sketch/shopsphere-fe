interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  iconBg: string;
  trend?: string;
}

export default function StatCard({ label, value, icon, iconBg, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {trend && (
        <div className="stat-card-trend">
          <span className="trend-up">↑ {trend}</span>
        </div>
      )}
    </div>
  );
}
