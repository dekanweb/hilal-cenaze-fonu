"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Member } from '@/lib/types';
import Link from 'next/link';
// import Image from 'next/image';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  // loading ve error değişkenleri UI'da kullanılıyor
  const [, setLoading] = useState(true);
  const [, setError] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Üye verilerini alma hatası:', JSON.stringify(error, null, 2));
          setError(`Üye verilerini alırken bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
          setMembers([]);
        } else {
          setMembers(data || []);
          setError('');
        }
      } catch (err) {
        console.error('Beklenmeyen hata:', err);
        setError('Beklenmeyen bir hata oluştu');
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Üye Yönetimi</h1>
          <Link 
            href="/admin" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Admin Paneline Dön
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Üye Listesi
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Toplam {members.length} üye bulunmaktadır
                  </p>
                </div>
                <Link
                  href="/uye-kayit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Yeni Üye Ekle
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Üye No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ad Soyad
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İletişim
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kayıt Tarihi
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.length > 0 ? (
                        members.map((member) => (
                          <tr key={member.id}>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.uye_no || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {member.ad} {member.soyad}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.dogum_tarihi ? new Date(member.dogum_tarihi).toLocaleDateString('tr-TR') : '-'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.cep_telefonu}</div>
                              <div className="text-sm text-gray-500">{member.email || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                member.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : member.status === 'inactive' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {member.status === 'active' 
                                  ? 'Aktif' 
                                  : member.status === 'inactive' 
                                  ? 'Pasif' 
                                  : 'Beklemede'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.created_at ? new Date(member.created_at).toLocaleDateString('tr-TR') : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Link href={`/admin/uyeler/${member.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                Görüntüle
                              </Link>
                              <Link href={`/admin/uyeler/${member.id}/duzenle`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                Düzenle
                              </Link>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => {
                                  // Silme işlemi için modal gösterilecek
                                  console.log('Silme işlemi', member.id);
                                }}
                              >
                                Sil
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            Henüz üye kaydı bulunmamaktadır.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
