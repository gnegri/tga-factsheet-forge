
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import FundDescription from '@/components/FundDescription';
import KeyInformation from '@/components/KeyInformation';
import RiskIndicators from '@/components/RiskIndicators';
import MonthlyPerformance from '@/components/MonthlyPerformance';
import PortfolioAllocation from '@/components/PortfolioAllocation';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'TGA Fund SICAV | Factsheet';
  }, []);

  return (
    <div className="min-h-screen bg-tga-background py-8 print:py-0 print:bg-white">
      <div className="factsheet-container">
        <Header />
        <FundDescription />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KeyInformation />
          <RiskIndicators />
        </div>
        <MonthlyPerformance />
        <PortfolioAllocation />
        <Footer />
        
        <div className="text-center text-xs text-gray-400 mt-8 no-print">
          <p>© {new Date().getFullYear()} TGA SICAV. All rights reserved.</p>
          <p className="mt-1">
            This factsheet was last updated on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Reset Data Button - only visible in development */}
      <div className="fixed bottom-4 right-4 no-print">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all data to default values?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Reset Data
        </button>
      </div>
    </div>
  );
};

export default Index;
