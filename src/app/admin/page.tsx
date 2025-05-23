"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

export default function AdminPage() {
  const [adminEmail, setAdminEmail] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Client tarafında olduğumuzdan emin olalım
    setIsClient(true);
    // LocalStorage'dan admin e-posta adresini al
    const email = localStorage.getItem('adminEmail');
    if (email) {
      setAdminEmail(email);
    }
  }, []);

  const handleLogout = () => {
    // Admin oturumunu sonlandır
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    // Login sayfasına yönlendir
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Paneli</h1>
            {isClient && adminEmail && (
              <p className="text-sm text-gray-500">Giriş yapan: {adminEmail}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Çıkış Yap
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Yönetim Menüsü
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Cenaze fonu yönetim işlemleri
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Üye Yönetimi
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <Link href="/admin/uyeler" className="text-blue-600 hover:text-blue-800">
                        Üyeleri Görüntüle
                      </Link>
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Ayarlar
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <Link href="/admin/ayarlar" className="text-blue-600 hover:text-blue-800">
                        Sistem Ayarları
                      </Link>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Raporlar
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <Link href="/admin/raporlar" className="text-blue-600 hover:text-blue-800">
                        Raporları Görüntüle
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
