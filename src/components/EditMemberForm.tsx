"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Member, MemberFormData } from '@/lib/types';
import { useRouter } from 'next/navigation';

// Form şeması
const memberSchema = z.object({
  ad: z.string().min(1, { message: 'Ad gereklidir' }),
  soyad: z.string().min(1, { message: 'Soyad gereklidir' }),
  dogum_tarihi: z.string().optional(),
  dogum_yeri: z.string().optional(),
  dogum_ulkesi: z.string().optional(),
  cinsiyet: z.string().optional(),
  medeni_durum: z.string().optional(),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }).optional().or(z.literal('')),
  cep_telefonu: z.string().min(1, { message: 'Cep telefonu gereklidir' }),
  ev_telefonu: z.string().optional(),
  adres: z.string().min(1, { message: 'Adres gereklidir' }),
  posta_kodu: z.string().optional(),
  sehir: z.string().optional(),
  ulke: z.string().optional(),
  meslek: z.string().optional(),
  saglik_durumu: z.string().optional(),
  hastalik: z.string().optional(),
  bagli_bulundugu_konsolosluk: z.string().optional(),
  vatandaslik: z.string().optional(),
  hesap_numarasi: z.string().optional(),
  hesap_sahibi: z.string().optional(),
  banka: z.string().optional(),
  iletisim_tercihleri: z.string().optional(),
  notlar: z.string().optional(),
  uye_no: z.string().optional(),
  status: z.string().optional(),
});

type FormData = z.infer<typeof memberSchema>;

interface EditMemberFormProps {
  member: Member;
}

export default function EditMemberForm({ member }: EditMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      ad: member.ad,
      soyad: member.soyad,
      dogum_tarihi: member.dogum_tarihi,
      dogum_yeri: member.dogum_yeri,
      dogum_ulkesi: member.dogum_ulkesi,
      cinsiyet: member.cinsiyet,
      medeni_durum: member.medeni_durum,
      email: member.email,
      cep_telefonu: member.cep_telefonu,
      ev_telefonu: member.ev_telefonu,
      adres: member.adres,
      posta_kodu: member.posta_kodu,
      sehir: member.sehir,
      ulke: member.ulke,
      meslek: member.meslek,
      saglik_durumu: member.saglik_durumu,
      hastalik: member.hastalik,
      bagli_bulundugu_konsolosluk: member.bagli_bulundugu_konsolosluk,
      vatandaslik: member.vatandaslik,
      hesap_numarasi: member.hesap_numarasi,
      hesap_sahibi: member.hesap_sahibi,
      banka: member.banka,
      iletisim_tercihleri: member.iletisim_tercihleri,
      notlar: member.notlar,
      uye_no: member.uye_no,
      status: member.status,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Üye verilerini güncelle
      const memberData: MemberFormData = {
        ...data,
      };
      
      console.log('Güncellenecek veriler:', memberData);
      
      const { error } = await supabase
        .from('members')
        .update(memberData)
        .eq('id', member.id)
        .select();
        
      if (error) {
        console.error('Üye güncelleme hatası:', JSON.stringify(error, null, 2));
        throw new Error(`Üye güncelleme hatası: ${error.message}`);
      }
      
      // Başarılı
      setSubmitSuccess(true);
      
      // 2 saniye sonra üye detay sayfasına yönlendir
      setTimeout(() => {
        router.push(`/admin/uyeler/${member.id}`);
        router.refresh();
      }, 2000);
      
    } catch (error: any) {
      console.error('Form gönderme hatası:', error);
      setSubmitError(error.message || 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>Üye bilgileri başarıyla güncellendi! Yönlendiriliyorsunuz...</p>
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{submitError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <input
              type="text"
              {...register('ad')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.ad && <p className="mt-1 text-sm text-red-600">{errors.ad.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyad
            </label>
            <input
              type="text"
              {...register('soyad')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.soyad && <p className="mt-1 text-sm text-red-600">{errors.soyad.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              {...register('dogum_tarihi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Yeri
            </label>
            <input
              type="text"
              {...register('dogum_yeri')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Ülkesi
            </label>
            <input
              type="text"
              {...register('dogum_ulkesi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cinsiyet
            </label>
            <select
              {...register('cinsiyet')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value="erkek">Erkek</option>
              <option value="kadın">Kadın</option>
              <option value="diğer">Diğer</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medeni Durum
            </label>
            <select
              {...register('medeni_durum')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value="bekar">Bekar</option>
              <option value="evli">Evli</option>
              <option value="boşanmış">Boşanmış</option>
              <option value="dul">Dul</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cep Telefonu
            </label>
            <input
              type="tel"
              {...register('cep_telefonu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.cep_telefonu && <p className="mt-1 text-sm text-red-600">{errors.cep_telefonu.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ev Telefonu
            </label>
            <input
              type="tel"
              {...register('ev_telefonu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Adres
            </label>
            <input
              type="text"
              {...register('adres')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.adres && <p className="mt-1 text-sm text-red-600">{errors.adres.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Posta Kodu
            </label>
            <input
              type="text"
              {...register('posta_kodu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şehir
            </label>
            <input
              type="text"
              {...register('sehir')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ülke
            </label>
            <input
              type="text"
              {...register('ulke')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meslek
            </label>
            <input
              type="text"
              {...register('meslek')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sağlık Durumu
            </label>
            <select
              {...register('saglik_durumu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value="iyi">İyi</option>
              <option value="orta">Orta</option>
              <option value="kötü">Kötü</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hastalık
            </label>
            <input
              type="text"
              {...register('hastalik')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bağlı Bulunduğu Konsolosluk
            </label>
            <input
              type="text"
              {...register('bagli_bulundugu_konsolosluk')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vatandaşlık
            </label>
            <input
              type="text"
              {...register('vatandaslik')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Üye No
            </label>
            <input
              type="text"
              {...register('uye_no')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hesap Numarası
            </label>
            <input
              type="text"
              {...register('hesap_numarasi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hesap Sahibi
            </label>
            <input
              type="text"
              {...register('hesap_sahibi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banka
            </label>
            <input
              type="text"
              {...register('banka')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              İletişim Tercihleri
            </label>
            <select
              {...register('iletisim_tercihleri')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value="email">E-posta</option>
              <option value="telefon">Telefon</option>
              <option value="her ikisi">Her İkisi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Durum
            </label>
            <select
              {...register('status')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="pending">Beklemede</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notlar
          </label>
          <textarea
            {...register('notlar')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push(`/admin/uyeler/${member.id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
