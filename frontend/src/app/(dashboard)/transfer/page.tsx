"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function TransferPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await fetch("/api/transactions/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nueva Transferencia</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Select {...register("fromAccount")}>
          <SelectTrigger>
            Cuenta Origen
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Cuenta Principal (ARS)</SelectItem>
          </SelectContent>
        </Select>

        <Select {...register("toAccount")}>
          <SelectTrigger>
            Cuenta Destino
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Cuenta USD</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Monto"
          {...register("amount", { required: true })}
        />

        <Button type="submit" className="w-full">
          Transferir
        </Button>
      </form>
    </div>
  );
}