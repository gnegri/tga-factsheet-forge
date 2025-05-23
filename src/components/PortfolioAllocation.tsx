
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import EditableField from './EditableField';

interface AllocationItem {
  name: string;
  value: number;
  color: string;
}

const PortfolioAllocation: React.FC = () => {
  const [allocation, setAllocation] = useLocalStorage<AllocationItem[]>('tga-allocation', [
    { name: 'BTPs (Nominal)', value: 93, color: '#2E6B6A' },
    { name: 'Interest Rate Derivatives', value: 7, color: '#4A4A4A' },
  ]);

  const updateAllocation = (index: number, value: number) => {
    const updated = [...allocation];
    updated[index].value = value;
    setAllocation(updated);
  };

  return (
    <div className="bg-white shadow-tga rounded-lg mb-6 p-4 print:shadow-none">
      <h2 className="text-xl font-semibold text-tga-primary mb-3">Portfolio Allocation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-tga-accent">Allocation Breakdown</h3>
            <table className="min-w-full">
              <thead>
                <tr className="bg-tga-primary text-white">
                  <th className="py-2 px-4 text-left rounded-tl-md">Asset Type</th>
                  <th className="py-2 px-4 text-right rounded-tr-md">Allocation %</th>
                </tr>
              </thead>
              <tbody>
                {allocation.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-left">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <EditableField
                        value={`${item.value}%`}
                        onChange={(val) => {
                          const numVal = parseFloat(val.replace('%', ''));
                          if (!isNaN(numVal)) {
                            updateAllocation(index, numVal);
                          }
                        }}
                        type="percentage"
                        className="text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-semibold text-sm mb-1">Allocation Note:</h4>
            <p className="text-xs text-tga-accent">
              Portfolio allocation represents the distribution of all risk capital currently being deployed. 
              Values shown are approximations and may vary slightly from official fund records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocation;
