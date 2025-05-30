'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  
  const { data: rates } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      const response = await fetch('/api/currency/rates');
      return response.json();
    }
  });

  return (
    <div className="mb-4">
      <label className="block mb-2">Monto en USD</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="border p-2 rounded w-full"
      />
      
      {rates && (
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            EUR: {(amount * rates.EUR).toFixed(2)}
          </div>
          <div className="bg-gray-100 p-4 rounded">
            UYU: {(amount * rates.UYU).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};