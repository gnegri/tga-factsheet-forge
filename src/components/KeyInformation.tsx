
import React from 'react';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface KeyInfoItem {
  field: string;
  value: string;
}

const KeyInformation: React.FC = () => {
  const [keyInfo, setKeyInfo] = useLocalStorage<KeyInfoItem[]>('tga-keyInfo', [
    { field: 'Fund Type', value: 'Professional Investor Fund (PIF)' },
    { field: 'Sector', value: 'Fixed Income' },
    { field: 'Vehicle Name', value: 'TGA SICAV' },
    { field: 'Regulatory Regime', value: 'Close Ended Multi-Fund SICAV' },
    { field: 'Administrator', value: 'CC Fund Services Ltd' },
    { field: 'Auditor', value: 'Deloitte Malta' },
    { field: 'AuM', value: 'EUR 17.62MM' },
    { field: 'Management Fee', value: '1% (minimum EUR 1,500,000)' },
    { field: 'Performance Fee', value: '30%' },
    { field: 'Liquidity', value: 'Quarterly' },
    { field: 'ISIN', value: 'MT7000000485' },
    { field: 'Bloomberg Ticker', value: '' },
  ]);

  const updateKeyInfo = (index: number, value: string) => {
    const updated = [...keyInfo];
    updated[index] = { ...updated[index], value };
    setKeyInfo(updated);
  };

  return (
    <div className="bg-white shadow-tga rounded-lg mb-6 p-4 print:shadow-none">
      <h2 className="text-xl font-semibold text-tga-primary mb-3">Fund Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyInfo.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="text-sm font-semibold text-tga-accent">{item.field}</div>
            <EditableField
              value={item.value}
              onChange={(value) => updateKeyInfo(index, value)}
              className="text-sm"
              placeholder={`Enter ${item.field}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyInformation;
