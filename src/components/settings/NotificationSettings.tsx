import { useState } from 'react';
import type { SettingsSectionProps } from '@/pages/Settings';
import { SettingsCard } from './SettingsCard';

export function NotificationSettings({ onChangesMade }: SettingsSectionProps) {
  const [settings, setSettings] = useState({
    verificationComplete: true,
    expiryWarnings: true,
    transactionUpdates: true,
    systemAlerts: true,
    soundEnabled: false,
    desktopNotifications: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    onChangesMade();
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        handleToggle('desktopNotifications');
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
    </label>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Notifications</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage notification preferences and alerts
        </p>
      </div>

      <div className="space-y-4">
        <SettingsCard
          title="Verification Complete"
          description="Get notified when verification proof is generated"
        >
          <div className="flex justify-end">
            <ToggleSwitch
              checked={settings.verificationComplete}
              onChange={() => handleToggle('verificationComplete')}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Document Expiry Warnings"
          description="Alert me when my document is about to expire"
        >
          <div className="flex justify-end">
            <ToggleSwitch
              checked={settings.expiryWarnings}
              onChange={() => handleToggle('expiryWarnings')}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Transaction Updates"
          description="Notify me about blockchain transaction status"
        >
          <div className="flex justify-end">
            <ToggleSwitch
              checked={settings.transactionUpdates}
              onChange={() => handleToggle('transactionUpdates')}
            />
          </div>
        </SettingsCard>

        <SettingsCard title="System Alerts" description="Important updates and security notices">
          <div className="flex justify-end">
            <ToggleSwitch
              checked={settings.systemAlerts}
              onChange={() => handleToggle('systemAlerts')}
            />
          </div>
        </SettingsCard>

        <hr className="border-black/10 dark:border-white/10" />

        <SettingsCard title="Sound Effects" description="Play sounds for notifications">
          <div className="flex justify-end">
            <ToggleSwitch
              checked={settings.soundEnabled}
              onChange={() => handleToggle('soundEnabled')}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Desktop Notifications"
          description="Show system notifications outside the browser"
        >
          <div className="flex justify-end">
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 text-sm font-medium text-black dark:text-white border border-black/20 dark:border-white/20 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              {settings.desktopNotifications ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
