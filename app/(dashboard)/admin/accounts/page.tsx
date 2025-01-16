"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LoaderSpinner } from "@/app/components/LoaderSpinner";

export default function Accounts() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error('Kullanıcılar yüklenemedi');
        const data = await res.json();
        setData(data);
        toast.success('Kullanıcılar başarıyla yüklendi');
      } catch (error) {
        console.error('Kullanıcılar yüklenemedi:', error);
        toast.error('Kullanıcılar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Hesaplar</h1>
      <Table aria-label="Accounts table" className="min-w-full">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>İsim</TableColumn>
          <TableColumn>Soyisim</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Telefon</TableColumn>
          <TableColumn>Oluşturulma Tarihi</TableColumn>
          <TableColumn>Güncellenme Tarihi</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString('tr-TR')}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString('tr-TR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
