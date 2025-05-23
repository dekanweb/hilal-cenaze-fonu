"use client";

import React from 'react';
import MembershipForm from '@/components/MembershipForm';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cenaze Fonu Üye Kayıt Formu
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lütfen aşağıdaki formu doldurarak üyelik başvurunuzu tamamlayın.
          </p>
        </div>
        
        <MembershipForm />
      </div>
    </div>
  );
}
