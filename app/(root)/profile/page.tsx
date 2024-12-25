"use client";

import { useGetProfileInfoQuery } from "@/app/store/services/user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data, error, isLoading } = useGetProfileInfoQuery();
  const router = useRouter();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu</p>;

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-2">
        <h1>Profil Bilgileri</h1>
        <p>Ad: {data?.name}</p>
        <p>Email: {data?.email}</p>
        <div>
          <button
            className="flex items-center border border-solid border-black rounded px-4"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
