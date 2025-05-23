import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üye Kayıt Formu - Cenaze Fonu',
  description: 'Cenaze fonu üye kayıt formu',
};

export default function UyeKayitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
