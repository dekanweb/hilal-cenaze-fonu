export interface Member {
  id?: string;
  uye_no?: string;
  uyeyi_sunan?: string;
  ad: string;
  soyad: string;
  dogum_ulkesi?: string;
  dogum_sehri?: string;
  dogum_yeri?: string;
  dogum_tarihi?: string;
  cinsiyet?: string;
  baba_adi?: string;
  ana_adi?: string;
  ev_telefonu?: string;
  cep_telefonu: string;
  email?: string;
  adres: string;
  posta_kodu?: string;
  ulke?: string;
  sehir?: string;
  saglik_durumu?: string;
  hastalik?: string;
  bagli_bulundugu_konsolosluk?: string;
  vatandaslik?: string;
  hesap_numarasi?: string;
  hesap_sahibi?: string;
  banka?: string;
  iletisim_tercihleri?: string;
  notlar?: string;
  fotograf_url?: string;
  created_at?: string;
  status?: string;
}

export type MemberFormData = Omit<Member, 'id' | 'created_at' | 'status'>;
