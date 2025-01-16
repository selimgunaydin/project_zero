'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody } from "@nextui-org/card";
import { IconUsers, IconLayoutDashboard, IconSettings, IconArrowUpRight } from "@tabler/icons-react";
import { toast } from 'react-hot-toast';
import { LoaderSpinner } from '@/app/components/LoaderSpinner';

interface DashboardStats {
  totalUsers: number;
  activeWidgets: number;
  systemStatus: string;
  dailyVisits: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error('İstatistikler yüklenemedi');
        const data = await response.json();
        setStats(data);
        toast.success('İstatistikler başarıyla yüklendi');
      } catch (error) {
        console.error('İstatistikler yüklenemedi:', error);
        toast.error('İstatistikler yüklenirken bir hata oluştu');
        // Hata durumunda varsayılan değerler göster
        setStats({
          totalUsers: 0,
          activeWidgets: 0,
          systemStatus: 'Hata',
          dailyVisits: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <LoaderSpinner />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm text-default-500">Toplam Kullanıcı</p>
            <h3 className="text-2xl font-bold mt-2">{stats.totalUsers.toLocaleString('tr-TR')}</h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <IconUsers className="h-6 w-6 text-primary" />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm text-default-500">Aktif Widgetlar</p>
            <h3 className="text-2xl font-bold mt-2">{stats.activeWidgets}</h3>
          </div>
          <div className="bg-success/10 p-3 rounded-full">
            <IconLayoutDashboard className="h-6 w-6 text-success" />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm text-default-500">Sistem Durumu</p>
            <h3 className="text-2xl font-bold mt-2">{stats.systemStatus}</h3>
          </div>
          <div className="bg-secondary/10 p-3 rounded-full">
            <IconSettings className="h-6 w-6 text-secondary" />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm text-default-500">Günlük Ziyaret</p>
            <h3 className="text-2xl font-bold mt-2">{stats.dailyVisits.toLocaleString('tr-TR')}</h3>
          </div>
          <div className="bg-warning/10 p-3 rounded-full">
            <IconArrowUpRight className="h-6 w-6 text-warning" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 