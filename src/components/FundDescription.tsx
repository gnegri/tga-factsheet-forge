
import React from 'react';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const FundDescription: React.FC = () => {
  const [description, setDescription] = useLocalStorage('tga-fundDescription', 
    `TGA Funds is a collective investment scheme organised as a multi-fund limited liability investment company with variable share capital under the laws of the Republic of Malta and licensed by the Malta Financial Services Authority.

TGA Funds appointed Replica SIM SpA as investment manager for the day by day activity according to investment objective of the fund and guidelines.

The fund's core investments revolve around fixed income markets, with a particular focus in long/short strategies and a strong presence across global government bond markets.`
  );

  return (
    <div className="bg-white shadow-tga rounded-lg mb-6 p-4 print:shadow-none">
      <h2 className="text-xl font-semibold text-tga-primary mb-3">Fund Description</h2>
      <EditableField 
        value={description}
        onChange={setDescription}
        className="text-sm whitespace-pre-wrap"
        multiline={true}
      />
    </div>
  );
};

export default FundDescription;
