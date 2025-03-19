"use client";
import { Button } from "@/components/ui/button";

export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      variant="outline"
      className="w-full flex gap-2"
      type="button"
      onClick={handleGoogleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path
          d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.835 0 3.456.989 4.518 2.468l3.12-3.12A9.975 9.975 0 0012.545 2C7.019 2 2.545 6.474 2.545 12s4.474 10 10 10c5.523 0 10-4.477 10-10a9.93 9.93 0 00-1.667-5.555l-3.324 3.324z"
          fill="#EA4335"
        />
      </svg>
      Continuar con Google
    </Button>
  );
}