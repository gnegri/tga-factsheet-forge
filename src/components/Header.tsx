
import React from 'react';
import { format } from 'date-fns';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HeaderProps {
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const [fundName, setFundName] = useLocalStorage('tga-fundName', 'TGA Fund SICAV');
  const [reportDate, setReportDate] = useLocalStorage('tga-reportDate', format(new Date(), 'MMM yyyy'));

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 p-4 print:shadow-none">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src={logo} 
            alt="TGA Logo" 
            className="h-16 mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-tga-primary">
              <EditableField 
                value={fundName} 
                onChange={setFundName}
                className="font-bold text-tga-primary"
              />
            </h1>
            <div className="text-sm text-tga-gray">
              Fund Factsheet | <EditableField 
                value={reportDate}
                onChange={setReportDate}
                className="inline-block"
              />
            </div>
          </div>
        </div>
        <div className="flex no-print">
          <button 
            onClick={() => window.print()}
            className="bg-tga-primary text-white px-4 py-2 rounded hover:bg-tga-secondary transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4"></div>
    </div>
  );
};

export default Header;
