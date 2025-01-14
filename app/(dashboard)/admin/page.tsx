import type { NextPage } from "next";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconUsers, IconLayoutDashboard, IconSettings, IconArrowUpRight } from "@tabler/icons-react";
import { connectDB } from "@/app/lib/mongodb";
import { Log, ILog } from "@/app/models/Log";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Types } from "mongoose";

async function getRecentLogs(): Promise<ILog[]> {
  await connectDB();
  const logs = await Log.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()
    .exec();

  return logs.map(log => {
    // Here, ensure _id is correctly typed or converted
    const id = new Types.ObjectId(log._id as any);
    return {
      ...log,
      _id: id
    } as ILog;  // Type assertion here to ensure it matches ILog
  });
}

export default async function AdminPage() {
  const recentLogs = await getRecentLogs();

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Hoş Geldiniz, Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-default-500">Toplam Kullanıcı</p>
              <h3 className="text-2xl font-bold mt-2">1,234</h3>
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
              <h3 className="text-2xl font-bold mt-2">45</h3>
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
              <h3 className="text-2xl font-bold mt-2">Aktif</h3>
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
              <h3 className="text-2xl font-bold mt-2">892</h3>
            </div>
            <div className="bg-warning/10 p-3 rounded-full">
              <IconArrowUpRight className="h-6 w-6 text-warning" />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
            <div className="space-y-2">
              <Button 
                variant="bordered" 
                className="w-full justify-start" 
                startContent={<IconUsers className="h-5 w-5" />}
              >
                Kullanıcı Yönetimi
              </Button>
              <Button 
                variant="bordered" 
                className="w-full justify-start"
                startContent={<IconLayoutDashboard className="h-5 w-5" />}
              >
                Widget Yönetimi
              </Button>
              <Button 
                variant="bordered" 
                className="w-full justify-start"
                startContent={<IconSettings className="h-5 w-5" />}
              >
                Sistem Ayarları
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
            <div className="space-y-4">
              {recentLogs.map((log) => (
                <div key={log._id.toString()} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {log.action === 'create' && (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                    )}
                    {log.action === 'update' && (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </span>
                    )}
                    {log.action === 'delete' && (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.details}</p>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                      {log.documentId && (
                        <>
                          <span>&middot;</span>
                          <span>ID: {log.documentId}</span>
                        </>
                      )}
                      <span>&middot;</span>
                      <span>{format(new Date(log.createdAt), 'dd MMMM yyyy HH:mm', { locale: tr })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
