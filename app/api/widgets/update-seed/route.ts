import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { WidgetList } from '@/app/models/widgets';
import fs from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    await connectDB();
    
    // Aktif widget'ları al
    const widgets = await WidgetList.find({ isActive: true }).sort({ order: 1 });
    
    // Her widget türü için mockData dosyalarını güncelle
    for (const widget of widgets) {
      const mockDataPath = path.join(process.cwd(), 'app', 'components', 'widgets', widget.type.toLowerCase(), 'mockData.ts');
      
      try {
        // Dosya içeriğini oku
        const fileContent = await fs.readFile(mockDataPath, 'utf-8');
        
        // Yeni veriyi oluştur
        const newData = `export const mockData = ${JSON.stringify(widget.data, null, 2)};`;
        
        // Dosyayı güncelle
        await fs.writeFile(mockDataPath, newData);
      } catch (error) {
        console.error(`Error updating mockData for ${widget.type}:`, error);
      }
    }
    
    return NextResponse.json({ message: 'Seed data updated successfully' });
  } catch (error) {
    console.error('Error updating seed data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 