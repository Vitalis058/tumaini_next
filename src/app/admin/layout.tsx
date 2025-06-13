"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface Admin {
  id: string;
  email: string;
  name: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch("/api/admin/verify");

        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        } else {
          if (pathname !== "/admin/login") {
            toast.error("Please login to access admin panel");
            router.push("/admin/login");
          }
        }
      } catch {
        if (pathname !== "/admin/login") {
          toast.error("Authentication error");
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, [router, pathname]);

  // Show loading spinner while verifying
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If on login page, show login page without sidebar
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  // If not authenticated and not on login page, redirect
  if (!admin) {
    return null;
  }

  // Show admin dashboard with sidebar
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
