
import React from 'react';
import EditableField from './EditableField';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Footer: React.FC = () => {
  const [contacts, setContacts] = useLocalStorage('tga-contacts', {
    phone: '+44 123 4567890',
    email: 'info@tgafunds.com',
    website: 'www.tgafunds.com'
  });

  const [disclaimer, setDisclaimer] = useLocalStorage('tga-disclaimer', 
    `This document is for information purposes only and does not constitute an offer to sell or a solicitation of an offer to buy shares in the Fund. Any such offer will be made solely by means of the Fund's offering documents.

The information contained herein is confidential and proprietary to TGA SICAV and is not to be reproduced, modified, or distributed without prior written permission. Past results are not necessarily indicative of future results and no representation is made that an investor will or is likely to achieve results similar to those shown.

Investment in the fund involves risk, including the possible loss of principal. The value of investments and the income from them may fall as well as rise and is not guaranteed. Investors may not get back the amount originally invested.`
  );

  const updateContact = (key: keyof typeof contacts, value: string) => {
    setContacts({
      ...contacts,
      [key]: value
    });
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg mb-6 p-4 print:shadow-none">
        <h2 className="text-xl font-semibold text-tga-primary mb-3">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-tga-gray">Phone</h3>
            <EditableField
              value={contacts.phone}
              onChange={(val) => updateContact('phone', val)}
              className="text-sm"
            />
          </div>
          <div>
            <h3 className="font-semibold text-tga-gray">Email</h3>
            <EditableField
              value={contacts.email}
              onChange={(val) => updateContact('email', val)}
              className="text-sm"
            />
          </div>
          <div>
            <h3 className="font-semibold text-tga-gray">Website</h3>
            <EditableField
              value={contacts.website}
              onChange={(val) => updateContact('website', val)}
              className="text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 shadow-md rounded-lg mb-6 p-4 print:bg-white print:shadow-none">
        <h2 className="text-lg font-semibold text-tga-primary mb-3">Disclaimer</h2>
        <div className="text-xs text-gray-600">
          <EditableField
            value={disclaimer}
            onChange={setDisclaimer}
            className="text-xs text-gray-600 whitespace-pre-wrap"
            multiline={true}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
