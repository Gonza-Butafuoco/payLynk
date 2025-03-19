"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await login(
        formData.get('email') as string,
        formData.get('password') as string
      );
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            type="email" 
            name="email"
            placeholder="Correo electrónico" 
            required 
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>
          
          <GoogleAuthButton />
          
          <p className="text-center text-sm mt-4">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}