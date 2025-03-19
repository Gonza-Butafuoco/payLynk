"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountsPage() {
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await fetch("/api/accounts");
      return res.json();
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mis Cuentas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ) : (
          accounts?.map((account: any) => (
            <Card key={account.id}>
              <CardHeader className="font-medium">
                {account.currency} - {account.name}
              </CardHeader>
              <CardContent>
                <p className="text-2xl">${account.balance}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}