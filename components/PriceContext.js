import React from 'react';

export const priceDetails = {
    petrol: 0,
    diesel: 0,
    oilPacket: 0
}
const PriceContext = React.createContext({
    priceDetails: priceDetails,
    getLatestPriceDetails: () => {}
}); 
export default PriceContext;