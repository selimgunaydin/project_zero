import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { componentName, code } = await request.json();

    // Bileşen adını düzenle
    const formattedName = componentName
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[a-z]/, (letter) => letter.toUpperCase());

    // Bileşen kodunu oluştur
    const componentCode = `import React from 'react';

interface ${formattedName}Props {
  data: Record<string, any>;
  styles?: Record<string, string>;
}

const ${formattedName}: React.FC<${formattedName}Props> = ({ data, styles = {} }) => {
  return (
    ${code}
  );
};

export default ${formattedName};`;

    // Dosya yolunu oluştur
    const filePath = path.join(process.cwd(), 'app', 'widgets', 'generated', `${formattedName}.tsx`);

    // generated klasörünü kontrol et ve yoksa oluştur
    const dirPath = path.join(process.cwd(), 'app', 'widgets', 'generated');
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }

    // Dosyayı oluştur
    await fs.writeFile(filePath, componentCode, 'utf-8');

    return NextResponse.json({
      success: true,
      componentName: formattedName,
      filePath: `/app/widgets/generated/${formattedName}.tsx`
    });
  } catch (error: any) {
    console.error('Widget bileşeni oluşturulurken hata:', error);
    return NextResponse.json(
      { error: 'Widget bileşeni oluşturulamadı', details: error.message },
      { status: 500 }
    );
  }
} 