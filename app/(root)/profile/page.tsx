"use client";

import { useGetProfileInfoQuery } from "@/app/store/services/user";

export default function Profile() {
  const { data, error, isLoading } = useGetProfileInfoQuery();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu</p>;

  return (
    <div className="flex flex-col gap-2">
      <h1>Profil Bilgileri</h1>
      <p>Ad: {data?.name}</p>
      <p>Soyad: {data?.surname}</p>
      <p>Email: {data?.email}</p>
      <p>Tel: {data?.phone}</p>
    </div>
  );
}
