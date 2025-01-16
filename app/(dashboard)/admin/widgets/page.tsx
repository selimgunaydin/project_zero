'use client';

import React from 'react';
import { IWidget } from '@/app/models/Widget';
import WidgetModal from '@/app/components/widgets/WidgetModal';
import WidgetPreview from '@/app/components/widgets/WidgetPreview';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-hot-toast';
import { WidgetSchema } from '@/app/lib/validations/widget';

export default function WidgetsPage() {
  const [widgets, setWidgets] = React.useState<IWidget[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedWidget, setSelectedWidget] = React.useState<IWidget | undefined>();
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchWidgets = async () => {
    try {
      const response = await fetch('/api/widgets');
      if (!response.ok) throw new Error('Widget\'lar yüklenemedi');
      const data = await response.json();
      setWidgets(data);
    } catch (error) {
      toast.error('Widget\'lar yüklenirken hata oluştu');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWidgets();
  }, []);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Yeni sıralamayı uygula
    const updatedWidgets = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setWidgets(updatedWidgets);

    // Sunucuya güncelleme gönder
    try {
      await Promise.all(
        updatedWidgets.map((widget) =>
          fetch('/api/widgets', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: widget._id,
              order: widget.order
            })
          })
        )
      );
      toast.success('Sıralama güncellendi');
    } catch (error) {
      toast.error('Sıralama güncellenirken hata oluştu');
      console.error(error);
      fetchWidgets(); // Hata durumunda orijinal sıralamayı geri yükle
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      // Form verilerini doğrula
      await WidgetSchema.validate(data, { abortEarly: false });

      // Eğer özel bileşen ise, önce bileşeni oluştur
      if (data.type === 'Custom') {
        const response = await fetch('/api/widgets/component', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            componentName: data.data.componentName,
            code: data.data.code
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || 'Bileşen oluşturulamadı');
        }

        const result = await response.json();
        // Bileşen adını güncelle
        data.data.generatedComponent = result.componentName;
      }

      const method = selectedWidget ? 'PUT' : 'POST';
      const body = selectedWidget
        ? JSON.stringify({ id: selectedWidget._id, ...data })
        : JSON.stringify(data);

      const response = await fetch('/api/widgets', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });

      if (!response.ok) throw new Error('İşlem başarısız');

      await fetchWidgets();
      setIsModalOpen(false);
      setSelectedWidget(undefined);
      toast.success(selectedWidget ? 'Widget güncellendi' : 'Widget eklendi');
    } catch (error: any) {
      if (error.inner) {
        // Yup validasyon hataları
        error.inner.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Widget kaydedilirken hata oluştu');
      }
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu widget\'ı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/widgets?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Silme işlemi başarısız');

      await fetchWidgets();
      toast.success('Widget silindi');
    } catch (error) {
      toast.error('Widget silinirken hata oluştu');
      console.error(error);
    }
  };

  const handleToggleActive = async (widget: IWidget) => {
    try {
      const response = await fetch('/api/widgets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: widget._id,
          isActive: !widget.isActive
        })
      });

      if (!response.ok) throw new Error('Güncelleme başarısız');

      await fetchWidgets();
      toast.success(
        widget.isActive ? 'Widget pasif yapıldı' : 'Widget aktif yapıldı'
      );
    } catch (error) {
      toast.error('Widget durumu güncellenirken hata oluştu');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Widget Yönetimi</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          onClick={() => {
            setSelectedWidget(undefined);
            setIsModalOpen(true);
          }}
        >
          Yeni Widget Ekle
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-white rounded-lg shadow"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sıra
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İsim
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tip
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {widgets.map((widget, index) => (
                      <Draggable
                        key={widget._id.toString()}
                        draggableId={widget._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {widget.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {widget.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleToggleActive(widget)}
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  widget.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {widget.isActive ? 'Aktif' : 'Pasif'}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                onClick={() => {
                                  setSelectedWidget(widget);
                                  setIsModalOpen(true);
                                }}
                              >
                                Düzenle
                              </button>
                              <button
                                className="text-green-600 hover:text-green-900 mr-3"
                                onClick={() => {
                                  setSelectedWidget(widget);
                                  setIsPreviewOpen(true);
                                }}
                              >
                                Önizle
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDelete(widget._id.toString())}
                              >
                                Sil
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <WidgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWidget(undefined);
        }}
        widget={selectedWidget}
        onSubmit={handleSubmit}
      />

      {selectedWidget && (
        <WidgetPreview
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedWidget(undefined);
          }}
          widget={selectedWidget}
        />
      )}
    </div>
  );
} 