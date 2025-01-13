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

export default function Accounts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setData(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Accounts</h1>
      <Table aria-label="Accounts table" className="min-w-full">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Surname</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Updated At</TableColumn>
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
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
