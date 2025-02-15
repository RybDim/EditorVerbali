"use client";
import { LoginForm } from "@/components/auth/login_form";
import { authClient } from "@/lib/auth_client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data) {
          router.replace("/dashboard");
        } else {
          setLoading(false);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setLoading(false);
      }
    };

    checkSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}