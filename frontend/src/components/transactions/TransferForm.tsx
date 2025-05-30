'use client';
import { useForm } from 'react-hook-form';

export const TransferForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await fetch('/api/transactions/transfer', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input 
        {...register('amount')}
        type="number" 
        placeholder="Monto"
        className="border p-2 w-full rounded"
      />
      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Transferir
      </button>
    </form>
  );
};