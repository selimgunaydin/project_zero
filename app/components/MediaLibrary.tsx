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
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; publicId: string | null }>({
    isOpen: false,
    publicId: null,
  });
  const [uploadModal, setUploadModal] = useState<{ isOpen: boolean; file: File | null }>({
    isOpen: false,
    file: null,
  });

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (!response.ok) {
        throw new Error('Medya yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setMedia(data.resources);
    } catch (error) {
      console.error('Medya yüklenemedi:', error);
      toast.error('Medya yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploadModal({ isOpen: true, file: e.target.files[0] });
  };

  const confirmUpload = async () => {
    if (!uploadModal.file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', uploadModal.file);

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Yükleme başarısız');
      
      toast.success('Dosya başarıyla yüklendi');
      fetchMedia();
    } catch (error) {
      console.error('Yükleme hatası:', error);
      toast.error('Dosya yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
      setUploadModal({ isOpen: false, file: null });
    }
  };

  const handleDelete = async (publicId: string) => {
    setDeleteModal({ isOpen: true, publicId });
  };

  const confirmDelete = async () => {
    if (!deleteModal.publicId) return;

    try {
      const response = await fetch('/api/media', {
        method: 'DELETE',
        body: JSON.stringify({ publicId: deleteModal.publicId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');
      
      toast.success('Dosya başarıyla silindi');
      fetchMedia();
    } catch (error) {
      console.error('Silme hatası:', error);
      toast.error('Dosya silinirken bir hata oluştu');
    } finally {
      setDeleteModal({ isOpen: false, publicId: null });
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

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ isOpen: false, publicId: null })}
      >
        <ModalContent>
          <ModalHeader>Dosyayı Sil</ModalHeader>
          <ModalBody>
            <p>Bu dosyayı silmek istediğinizden emin misiniz?</p>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                color="danger"
                variant="light"
                onPress={() => setDeleteModal({ isOpen: false, publicId: null })}
              >
                İptal
              </Button>
              <Button
                color="danger"
                onPress={confirmDelete}
              >
                Sil
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Upload Confirmation Modal */}
      <Modal 
        isOpen={uploadModal.isOpen} 
        onClose={() => setUploadModal({ isOpen: false, file: null })}
      >
        <ModalContent>
          <ModalHeader>Dosya Yükle</ModalHeader>
          <ModalBody>
            <p>Bu dosyayı yüklemek istediğinizden emin misiniz?</p>
            <p className="text-sm text-gray-500">
              Dosya: {uploadModal.file?.name}
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                color="danger"
                variant="light"
                onPress={() => setUploadModal({ isOpen: false, file: null })}
              >
                İptal
              </Button>
              <Button
                color="primary"
                onPress={confirmUpload}
                isLoading={uploading}
              >
                Yükle
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
} 