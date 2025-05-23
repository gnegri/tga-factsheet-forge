
import React from 'react';
import { format } from 'date-fns';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ArrowDownToLine } from 'lucide-react';

interface HeaderProps {
  logo?: string;
}

const TgaLogo = () => {
  return (
    <svg width="120" height="60" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tgaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#2E6B6A", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#1A4847", stopOpacity:1}} />
        </linearGradient>
      </defs>
      {/* T Letter */}
      <path d="M10 20 L70 20 L70 35 L50 35 L50 80 L30 80 L30 35 L10 35 Z" fill="#2E6B6A"/>
      {/* G Letter (Circle + Gap) */}
      <circle cx="105" cy="50" r="30" fill="url(#tgaGradient)" stroke="#fff" strokeWidth="2"/>
      <path d="M105 35 L105 20 L135 20 L135 35" fill="#2E6B6A"/>
      <path d="M120 50 L135 50 L135 65 L120 65" fill="#2E6B6A"/>
      <text x="105" y="58" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" fill="#fff" textAnchor="middle">G</text>
      {/* A Letter */}
      <path d="M150 80 L160 50 L170 50 L180 80 L175 80 L173 72 L157 72 L155 80 Z M160 62 L170 62 L168 58 L162 58 Z" fill="#4A4A4A"/>
    </svg>
  );
};

const Header: React.FC<HeaderProps> = () => {
  const [fundName, setFundName] = useLocalStorage('tga-fundName', 'TGA Fund SICAV');
  const [reportDate, setReportDate] = useLocalStorage('tga-reportDate', format(new Date(), 'MMM yyyy'));

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-tga rounded-lg mb-6 p-4 print:shadow-none">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <TgaLogo />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-tga-primary">
              <EditableField 
                value={fundName} 
                onChange={setFundName}
                className="font-bold text-tga-primary"
              />
            </h1>
            <div className="text-sm text-tga-lightgray">
              Fund Factsheet | <EditableField 
                value={reportDate}
                onChange={setReportDate}
                className="inline-block"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 no-print">
          <button 
            onClick={handleExportPDF}
            className="bg-tga-primary text-white px-4 py-2 rounded hover:bg-tga-secondary transition-colors flex items-center gap-2"
          >
            <ArrowDownToLine className="h-4 w-4" /> 
            Export PDF
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4"></div>
    </div>
  );
};

export default Header;
