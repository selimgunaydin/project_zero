import cloudinary, { deleteImage, uploadImage } from '@/app/lib/cloudinary';
import { NextResponse } from 'next/server';
import { logModelOperation } from '@/app/lib/logMiddleware';

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'widgets',
      max_results: 100
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Medya listesi alınamadı:', error);
    await logModelOperation(
      'create',
      'Error',
      undefined,
      `Medya listesi alınırken hata: ${error}`
    );
    return NextResponse.json({ error: 'Medya listesi alınamadı' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    const result = await uploadImage(base64Image);
    
    await logModelOperation(
      'create',
      'Media',
      result.public_id,
      `Yeni medya yüklendi: ${file.name}`
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Yükleme hatası:', error);
    await logModelOperation(
      'create',
      'Error',
      undefined,
      `Medya yükleme hatası: ${error}`
    );
    return NextResponse.json({ error: 'Dosya yüklenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { publicId } = await request.json();
    
    if (!publicId) {
      return NextResponse.json({ error: 'Public ID gerekli' }, { status: 400 });
    }

    const result = await deleteImage(publicId);
    
    await logModelOperation(
      'delete',
      'Media',
      publicId,
      `Medya silindi: ${publicId}`
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Silme hatası:', error);
    await logModelOperation(
      'create',
      'Error',
      undefined,
      `Medya silme hatası: ${error}`
    );
    return NextResponse.json({ error: 'Dosya silinemedi' }, { status: 500 });
  }
} 