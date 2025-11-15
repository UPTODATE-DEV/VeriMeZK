import { useState } from 'react';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { Switch } from '@/components/ui/switch';
import { FaWallet } from 'react-icons/fa';
import type { SettingsSectionProps } from '@/pages/Settings';

interface WalletCardProps {
  name: string;
  color: string;
  bgColor: string;
}

function WalletCard({ name, color, bgColor }: WalletCardProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-black/10 dark:border-white/10`}
      style={{ backgroundColor: bgColor }}
    >
      <FaWallet className="text-lg" style={{ color }} />
      <span className="text-sm font-medium" style={{ color }}>
        {name}
      </span>
    </div>
  );
}

export function WalletSettings({ onChangesMade }: SettingsSectionProps) {
  const { connected, name: walletName, address, disconnect } = useWalletConnection();
  const [autoConnect, setAutoConnect] = useState(true);

  const handleDisconnect = () => {
    disconnect();
    onChangesMade();
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Wallet Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your connected wallet and preferences
        </p>
      </div>

      <div className="space-y-4">
        {/* Connected Wallet */}
        {connected && address ? (
          <div className="p-4 rounded-lg border border-black/20 dark:border-white/20 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-1">Connected Wallet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {walletName || 'Unknown Wallet'}
                </p>
              </div>
              <span className="px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 rounded-full">
                Connected
              </span>
            </div>
            <div className="p-3 rounded bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 mb-3">
              <p className="text-sm font-mono text-black dark:text-white break-all">
                {formatAddress(address)}
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-lg border border-black/20 dark:border-white/20">
            <h3 className="font-semibold text-black dark:text-white mb-1">No Wallet Connected</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Connect a Cardano wallet to use VeriMeZK
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg hover:opacity-90 transition-all"
            >
              Go to Home to Connect
            </button>
          </div>
        )}

        {/* Auto-Connect */}
        <div className="flex items-start justify-between p-4 rounded-lg border border-black/20 dark:border-white/20">
          <div className="flex-1">
            <h3 className="font-semibold text-black dark:text-white mb-1">
              Auto-Connect on Launch
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically connect to your wallet when opening the app
            </p>
          </div>
          <Switch
            checked={autoConnect}
            onCheckedChange={checked => {
              setAutoConnect(checked);
              onChangesMade();
            }}
            className="ml-4"
          />
        </div>

        {/* Supported Wallets */}
        <div className="p-4 rounded-lg border border-black/20 dark:border-white/20">
          <h3 className="font-semibold text-black dark:text-white mb-3">Supported Wallets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <WalletCard name="Nami" color="#1E40AF" bgColor="#DBEAFE" />
            <WalletCard name="Eternl" color="#059669" bgColor="#D1FAE5" />
            <WalletCard name="Flint" color="#7C3AED" bgColor="#EDE9FE" />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>ℹ️ Note:</strong> Your wallet is only used to sign transactions. Private keys
            never leave your wallet extension.
          </p>
        </div>
      </div>
    </div>
  );
}
