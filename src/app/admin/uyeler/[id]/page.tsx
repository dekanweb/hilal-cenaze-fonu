"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

import { Member } from '@/lib/types';

export default function MemberDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchMember() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Üye verilerini alma hatası:', error);
          setError('Üye verilerini alırken bir hata oluştu');
          setMember(null);
        } else {
          setMember(data);
          setError('');
        }
      } catch (err) {
        console.error('Beklenmeyen hata:', err);
        setError('Beklenmeyen bir hata oluştu');
        setMember(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error || 'Üye bulunamadı'}</p>
        </div>
        <button
          onClick={() => router.push('/admin/uyeler')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Üye Listesine Dön
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Üye Detayı</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin/uyeler" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Üye Listesine Dön
            </Link>
            <Link 
              href={`/admin/uyeler/${member.id}/duzenle`} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Düzenle
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {member.ad} {member.soyad}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Üye No: {member.uye_no || 'Belirtilmemiş'}
                  </p>
                </div>
                <div className="flex items-center">
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
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                      {member.fotograf_url ? (
                        <Image
                          className="h-32 w-32 rounded-full object-cover mb-4"
                          src={member.fotograf_url}
                          alt={`${member.ad} ${member.soyad}`}
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                          <span className="text-gray-600 text-2xl font-medium">
                            {member.ad.charAt(0)}{member.soyad.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="text-lg font-medium">{member.ad} {member.soyad}</h4>
                      <p className="text-sm text-gray-500">Üye No: {member.uye_no || 'Belirtilmemiş'}</p>
                      <p className="text-sm text-gray-500 mt-2">Kayıt Tarihi: {member.created_at ? new Date(member.created_at).toLocaleDateString('tr-TR') : '-'}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Üyeyi Sunan</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.uyeyi_sunan || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Doğum Tarihi</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {member.dogum_tarihi ? new Date(member.dogum_tarihi).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                        </dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Doğum Yeri</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {member.dogum_yeri ? `${member.dogum_yeri}, ${member.dogum_sehri || ''}, ${member.dogum_ulkesi || ''}` : 'Belirtilmemiş'}
                        </dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Cinsiyet</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.cinsiyet || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Baba Adı</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.baba_adi || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Ana Adı</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.ana_adi || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Ev Telefonu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.ev_telefonu || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Cep Telefonu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.cep_telefonu}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.email || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Adres</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.adres}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Posta Kodu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.posta_kodu || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Şehir / Ülke</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {member.sehir ? `${member.sehir}, ${member.ulke || ''}` : (member.ulke || 'Belirtilmemiş')}
                        </dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Sağlık Durumu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.saglik_durumu || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Hastalık</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.hastalik || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Bağlı Bulunduğu Konsolosluk</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.bagli_bulundugu_konsolosluk || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Vatandaşlık</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.vatandaslik || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Hesap Numarası</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.hesap_numarasi || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Hesap Sahibi</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.hesap_sahibi || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Banka</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.banka || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">İletişim Tercihleri</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.iletisim_tercihleri || 'Belirtilmemiş'}</dd>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Not</dt>
                        <dd className="mt-1 text-sm text-gray-900">{member.notlar || 'Belirtilmemiş'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
