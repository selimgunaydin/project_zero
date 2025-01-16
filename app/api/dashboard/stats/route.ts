import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { User } from '@/app/models/User';
import { Widget } from '@/app/models/Widget';

export async function GET() {
  try {
    await connectDB();

    // Toplam kullanıcı sayısı
    const totalUsers = await User.countDocuments();

    // Aktif widget sayısı
    const activeWidgets = await Widget.countDocuments({ isActive: true });

    // Sistem durumu - Burada gerçek bir sistem durumu kontrolü yapılabilir
    const systemStatus = 'Aktif';

    // Günlük ziyaret - Burada gerçek bir analytics entegrasyonu yapılabilir
    const dailyVisits = Math.floor(Math.random() * 1000); // Örnek veri

    return NextResponse.json({
      totalUsers,
      activeWidgets,
      systemStatus,
      dailyVisits
    });
  } catch (error) {
    console.error('Dashboard istatistikleri yüklenirken hata:', error);
    return NextResponse.json(
      { error: 'İstatistikler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 