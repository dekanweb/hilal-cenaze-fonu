"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Login sayfasındaysa kontrol etme
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // LocalStorage'dan admin giriş durumunu kontrol et
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (!adminLoggedIn || adminLoggedIn !== 'true') {
      // Giriş yapılmamışsa login sayfasına yönlendir
      router.push('/admin/login');
    } else {
      // Giriş yapılmışsa içeriği göster
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [pathname, router]);

  // Yükleniyor durumu
  if (isLoading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Login sayfasında veya giriş yapılmışsa içeriği göster
  if (pathname === '/admin/login' || isAuthenticated) {
    return <>{children}</>;
  }

  // Diğer durumlar için boş içerik
  return null;
}
