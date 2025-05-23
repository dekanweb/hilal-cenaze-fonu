import React from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditMemberForm from '@/components/EditMemberForm';

// Bu sayfa sunucu tarafında çalışacak
export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    id: string;
  };
};

async function getMember(id: string) {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Üye verilerini alma hatası:', error);
    return null;
  }
  
  return data;
}

export default async function EditMemberPage(props: PageProps) {
  const id = props.params.id;
  const member = await getMember(id);
  
  if (!member) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Üye Düzenle</h1>
          <div className="flex space-x-4">
            <Link 
              href={`/admin/uyeler/${member.id}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Üye Detayına Dön
            </Link>
            <Link 
              href="/admin/uyeler" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Üye Listesine Dön
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <EditMemberForm member={member} />
          </div>
        </div>
      </div>
    </div>
  );
}
