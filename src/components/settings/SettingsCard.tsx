import { ReactNode } from 'react';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'warning' | 'danger' | 'success' | 'info';
}

export function SettingsCard({
  title,
  description,
  children,
  variant = 'default',
}: SettingsCardProps) {
  const variants = {
    default: 'border-black/20 dark:border-white/20 bg-transparent',
    warning: 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20',
    danger: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
    success: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20',
    info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]}`}>
      <div className="mb-3">
        <h3 className="font-semibold text-black dark:text-white mb-1">{title}</h3>
        {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
      </div>
      {children}
    </div>
  );
}
