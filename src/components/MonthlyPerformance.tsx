
import React from 'react';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type PerformanceData = {
  [year: string]: {
    [month: string]: string;
  };
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'YTD'];
const YEARS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

const MonthlyPerformance: React.FC = () => {
  const defaultData: PerformanceData = {};
  
  // Generate default data
  YEARS.forEach((year) => {
    defaultData[year] = {};
    MONTHS.forEach((month) => {
      // Generate random performance between -2% and 3%
      const value = month === 'YTD' && year === '2024' 
        ? '3.14%' 
        : `${(Math.random() * 5 - 2).toFixed(2)}%`;
      defaultData[year][month] = value;
    });
  });

  const [performanceData, setPerformanceData] = useLocalStorage<PerformanceData>(
    'tga-performanceData', 
    defaultData
  );

  const updateCell = (year: string, month: string, value: string) => {
    setPerformanceData((prev) => ({
      ...prev,
      [year]: {
        ...prev[year],
        [month]: value,
      },
    }));
  };

  // Function to determine cell color based on value
  const getCellColor = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'bg-white';
    if (numValue > 0) return 'text-green-700';
    if (numValue < 0) return 'text-red-700';
    return '';
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 p-4 print:shadow-none">
      <h2 className="text-xl font-semibold text-tga-primary mb-3">Monthly Performance (%)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="bg-tga-primary text-white">
              <th className="py-2 px-2 border">YEAR</th>
              {MONTHS.map((month) => (
                <th key={month} className="py-2 px-2 border text-center">{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {YEARS.map((year) => (
              <tr key={year} className="table-row-alternate">
                <td className="py-1 px-2 border font-semibold">{year}</td>
                {MONTHS.map((month) => (
                  <td key={`${year}-${month}`} className="py-1 px-2 border text-center">
                    <EditableField
                      value={performanceData[year]?.[month] || '0.00%'}
                      onChange={(value) => updateCell(year, month, value)}
                      className={`text-center ${getCellColor(performanceData[year]?.[month] || '0.00%')}`}
                      type="percentage"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyPerformance;
