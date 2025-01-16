'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LoaderSpinner } from './LoaderSpinner';
import { Input } from '@nextui-org/react';
import { Modal, Button, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { toast, Toaster } from 'sonner';

interface MediaItem {
  public_id: string;
  secure_url: string;
  format: string;
  created_at: string;
}

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  showSelect?: boolean;
}

export default function MediaLibrary({ onSelect, showSelect = true }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      setMedia(data.resources);
    } catch (error) {
      console.error('Medya yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Yükleme başarısız');
      
      fetchMedia();
    } catch (error) {
      console.error('Yükleme hatası:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    try {
      await fetch('/api/media', {
        method: 'DELETE',
        body: JSON.stringify({ publicId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      fetchMedia();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  if (loading) return <LoaderSpinner />;

  return (
    <div className="p-4">
      <Toaster position="top-center" />
      <div className="mb-4">
        <label className="block mb-2 space-y-2 text-sm font-medium text-gray-900">
          <span>Fotoğraf Yükle</span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </label>
        {uploading && <LoaderSpinner />}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div key={item.public_id} className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={item.secure_url}
                alt=""
                fill
                className="object-cover cursor-pointer"
                onClick={() => setPreviewImage(item.secure_url)}
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {showSelect && (
                <Button
                  size="sm"
                  color="primary"
                  className="w-full"
                  onClick={() => onSelect?.(item.secure_url)}
                >
                  Seç
                </Button>
              )}
                            <Button
                size="sm"
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(item.secure_url);
                  toast.success('Link kopyalandı!');
                }}
              >
                Linki Kopyala
              </Button>
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleDelete(item.public_id)}
              >
                Sil
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!previewImage} 
        onClose={() => setPreviewImage(null)}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Fotoğraf Önizleme</ModalHeader>
          <ModalBody>
            {previewImage && (
              <div className="relative w-full aspect-video">
                <Image
                  src={previewImage}
                  alt="Önizleme"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
} 