import React from 'react';

// --- Iconos SVG ---
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: 'trending' | 'check';
  color: 'green' | 'blue';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, color }) => {
  const colorClasses = {
    green: 'bg-tech-green/10 text-tech-green border-tech-green/30',
    blue: 'bg-tech-blue/10 text-tech-blue border-tech-blue/30'
  };

  return (
    <div className={`bg-card rounded-lg p-6 shadow-lg border ${colorClasses[color]}`} style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="font-semibold text-foreground">{title}</span>
        {icon === 'trending' ? <TrendingUpIcon /> : <CheckCircleIcon />}
      </div>
      <p className="text-4xl font-bold mt-2 text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default StatsCard;