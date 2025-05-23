-- Üyeler tablosu
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uye_no VARCHAR(50),
  uyeyi_sunan VARCHAR(255),
  ad VARCHAR(255) NOT NULL,
  soyad VARCHAR(255) NOT NULL,
  dogum_ulkesi VARCHAR(255),
  dogum_sehri VARCHAR(255),
  dogum_yeri VARCHAR(255),
  dogum_tarihi DATE,
  cinsiyet VARCHAR(50),
  baba_adi VARCHAR(255),
  ana_adi VARCHAR(255),
  ev_telefonu VARCHAR(50),
  cep_telefonu VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  adres TEXT NOT NULL,
  posta_kodu VARCHAR(50),
  ulke VARCHAR(255),
  sehir VARCHAR(255),
  saglik_durumu VARCHAR(255),
  hastalik TEXT,
  bagli_bulundugu_konsolosluk VARCHAR(255),
  vatandaslik VARCHAR(255),
  hesap_numarasi VARCHAR(255),
  hesap_sahibi VARCHAR(255),
  banka VARCHAR(255),
  iletisim_tercihleri TEXT,
  notlar TEXT,
  fotograf_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extension oluştur
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- RLS (Row Level Security) politikaları
-- Herkesin okuma izni
CREATE POLICY "Herkes üyeleri görebilir" ON members
  FOR SELECT USING (true);

-- Sadece yetkili kullanıcıların yazma izni
CREATE POLICY "Sadece yetkili kullanıcılar üye ekleyebilir" ON members
  FOR INSERT WITH CHECK (true);

-- Sadece yetkili kullanıcıların güncelleme izni
CREATE POLICY "Sadece yetkili kullanıcılar üyeleri güncelleyebilir" ON members
  FOR UPDATE USING (true);

-- RLS'yi etkinleştir
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
