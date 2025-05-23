
import React from 'react';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface RiskMetric {
  metric: string;
  value: string;
}

const RiskIndicators: React.FC = () => {
  const [riskMetrics, setRiskMetrics] = useLocalStorage<RiskMetric[]>('tga-riskMetrics', [
    { metric: 'Sharpe Ratio', value: '9.94' },
    { metric: 'Periods Up', value: '89.22%' },
    { metric: 'Periods Down', value: '10.78%' },
    { metric: 'Max Monthly Drawdown', value: '-5.38%' },
  ]);

  const updateRiskMetric = (index: number, value: string) => {
    const updated = [...riskMetrics];
    updated[index] = { ...updated[index], value };
    setRiskMetrics(updated);
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 p-4 print:shadow-none">
      <h2 className="text-xl font-semibold text-tga-primary mb-3">Risk and Return Indicators</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-tga-primary text-white">
              <th className="py-2 px-4 border text-left">Metric</th>
              <th className="py-2 px-4 border text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {riskMetrics.map((item, index) => (
              <tr key={index} className="table-row-alternate">
                <td className="py-2 px-4 border text-left">
                  {item.metric}
                </td>
                <td className="py-2 px-4 border text-right">
                  <EditableField
                    value={item.value}
                    onChange={(value) => updateRiskMetric(index, value)}
                    className="text-right"
                    type={item.value.includes('%') ? 'percentage' : 'number'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskIndicators;
