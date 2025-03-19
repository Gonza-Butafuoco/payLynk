"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Resumen" },
    { href: "/dashboard/accounts", label: "Cuentas" },
    { href: "/dashboard/transactions", label: "Transacciones" },
    { href: "/dashboard/transfer", label: "Transferir" },
  ];

  return (
    <div className="w-64 bg-white border-r p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={pathname === item.href ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}