
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import FundDescription from '@/components/FundDescription';
import KeyInformation from '@/components/KeyInformation';
import RiskIndicators from '@/components/RiskIndicators';
import MonthlyPerformance from '@/components/MonthlyPerformance';
import PortfolioAllocation from '@/components/PortfolioAllocation';
import Footer from '@/components/Footer';

const Index = () => {
  // Create base64 TGA logo
  const tgaLogo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwIDIwSDQxLjk3TDMwLjk3IDgwSDEwTDIwIDIwWiIgZmlsbD0iIzJDNUY1RCIvPgogIDxwYXRoIGQ9Ik01MCAxMEMzMC42NSAxMCAxNSAyNS42NSAxNSA0NUMxNSA2NC4zNSAzMC42NSA4MCA1MCA4MEM2OS4zNSA4MCA4NSA2NC4zNSA4NSA0NUM4NSAyNS42NSA2OS4zNSAxMCA1MCAxMFpNNTAgNzBDMzYuMTkgNzAgMjUgNTguODEgMjUgNDVDMjUgMzEuMTkgMzYuMTkgMjAgNTAgMjBDNjMuODEgMjAgNzUgMzEuMTkgNzUgNDVDNzUgNTguODEgNjMuODEgNzAgNTAgNzBaIiBmaWxsPSIjMkM1RjVEIi8+CiAgPHBhdGggZD0iTTU5IDU1TDcwIDIwSDkwTDgwIDgwSDYwTDcwIDU1SDU5WiIgZmlsbD0iIzRBNEE0QSIvPgo8L3N2Zz4=`;

  useEffect(() => {
    // Update document title
    document.title = 'TGA Fund SICAV | Factsheet';
  }, []);

  return (
    <div className="min-h-screen bg-tga-background py-8 print:py-0 print:bg-white">
      <div className="factsheet-container">
        <Header logo={tgaLogo} />
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
