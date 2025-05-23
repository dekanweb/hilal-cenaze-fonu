"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { MemberFormData } from '@/lib/types';

const memberSchema = z.object({
  ad: z.string().min(1, { message: 'Ad gereklidir' }),
  soyad: z.string().min(1, { message: 'Soyad gereklidir' }),
  dogum_ulkesi: z.string().optional(),
  dogum_sehri: z.string().optional(),
  dogum_yeri: z.string().optional(),
  dogum_tarihi: z.string().optional(),
  cinsiyet: z.string().optional(),
  baba_adi: z.string().optional(),
  ana_adi: z.string().optional(),
  ev_telefonu: z.string().optional(),
  cep_telefonu: z.string().min(1, { message: 'Cep telefonu gereklidir' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }).optional(),
  adres: z.string().min(1, { message: 'Adres gereklidir' }),
  posta_kodu: z.string().optional(),
  ulke: z.string().optional(),
  sehir: z.string().optional(),
  saglik_durumu: z.string().optional(),
  hastalik: z.string().optional(),
  bagli_bulundugu_konsolosluk: z.string().optional(),
  vatandaslik: z.string().optional(),
  hesap_numarasi: z.string().optional(),
  hesap_sahibi: z.string().optional(),
  banka: z.string().optional(),
  iletisim_tercihleri: z.string().optional(),
  notlar: z.string().optional(),

});

type FormData = z.infer<typeof memberSchema>;

export default function MembershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      cinsiyet: '',
      saglik_durumu: '',
      iletisim_tercihleri: '',
    }
  });



  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {

      
      // Üye verilerini kaydet
      const memberData: MemberFormData = {
        ...data,

      };
      
      console.log('Gönderilecek veriler:', memberData);
      
      const { error, data: insertedData } = await supabase
        .from('members')
        .insert([memberData])
        .select();
        
      if (error) {
        console.error('Form gönderme hatası:', JSON.stringify(error, null, 2));
        throw new Error(`Üye kaydı hatası: ${error.message}`);
      }
      
      console.log('Başarıyla kaydedildi:', insertedData);
      
      // Başarılı
      setSubmitSuccess(true);
      reset();

      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      console.error('Form gönderme hatası:', error);
      setSubmitError(errorMessage);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {submitSuccess && (
        <div className="mb-6 bg-accent border-l-4 border-primary text-primary-dark p-4">
          <p>Üyelik başvurunuz başarıyla alınmıştır. Teşekkür ederiz!</p>
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{submitError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('ad')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.ad && (
              <p className="mt-1 text-sm text-red-600">{errors.ad.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyad<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('soyad')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.soyad && (
              <p className="mt-1 text-sm text-red-600">{errors.soyad.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Ülkesi
            </label>
            <input
              type="text"
              {...register('dogum_ulkesi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Şehri
            </label>
            <input
              type="text"
              {...register('dogum_sehri')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Yeri
            </label>
            <input
              type="text"
              {...register('dogum_yeri')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              {...register('dogum_tarihi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cinsiyet
            </label>
            <select
              {...register('cinsiyet')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Seç</option>
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Baba Adı
            </label>
            <input
              type="text"
              {...register('baba_adi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ana Adı
            </label>
            <input
              type="text"
              {...register('ana_adi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cep Telefonu<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('cep_telefonu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.cep_telefonu && (
              <p className="mt-1 text-sm text-red-600">{errors.cep_telefonu.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta Adresi
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adres<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('adres')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          ></textarea>
          {errors.adres && (
            <p className="mt-1 text-sm text-red-600">{errors.adres.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Posta Kodu
            </label>
            <input
              type="text"
              {...register('posta_kodu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ülke
            </label>
            <input
              type="text"
              {...register('ulke')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şehir
            </label>
            <input
              type="text"
              {...register('sehir')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sağlık Durumu
            </label>
            <select
              {...register('saglik_durumu')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Seç</option>
              <option value="İyi">İyi</option>
              <option value="Orta">Orta</option>
              <option value="Kötü">Kötü</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hastalık
            </label>
            <input
              type="text"
              {...register('hastalik')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bağlı Bulunduğu Konsolosluk
            </label>
            <input
              type="text"
              {...register('bagli_bulundugu_konsolosluk')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vatandaşlık
            </label>
            <input
              type="text"
              {...register('vatandaslik')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hesap Sahibi
            </label>
            <input
              type="text"
              {...register('hesap_sahibi')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banka
            </label>
            <input
              type="text"
              {...register('banka')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            İletişim Tercihleri
          </label>
          <select
            {...register('iletisim_tercihleri')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Seç</option>
            <option value="E-posta">E-posta</option>
            <option value="SMS">SMS</option>
            <option value="Telefon">Telefon</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Hepsi">Hepsi</option>
            <option value="Hiçbiri">Hiçbiri</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Not
          </label>
          <textarea
            {...register('notlar')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
