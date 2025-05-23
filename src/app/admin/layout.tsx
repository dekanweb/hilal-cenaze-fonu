import { Metadata } from 'next';
import AdminProtected from '@/components/AdminProtected';

export const metadata: Metadata = {
  title: 'Admin Paneli - Cenaze Fonu',
  description: 'Cenaze fonu admin paneli',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtected>
      {children}
    </AdminProtected>
  );
}
