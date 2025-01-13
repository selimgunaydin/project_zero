'use client';

import React, { useState, useEffect } from 'react';
import { Switch, Button } from "@nextui-org/react";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { LoaderSpinner } from '@/app/components/blocks/LoaderSpinner';

interface Widget {
  _id: string;
  name: string;
  type: string;
  isActive: boolean;
  order: number;
}

export default function WidgetManagement() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    try {
      const response = await fetch('/api/widgets');
      const data = await response.json();
      setWidgets(data.sort((a: Widget, b: Widget) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching widgets:', error);
      setLoading(false);
    }
  };

  const handleToggleWidget = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/widgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });
      fetchWidgets();
    } catch (error) {
      console.error('Error updating widget:', error);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setWidgets(updatedItems);

    try {
      const updatePromises = updatedItems.map((item) =>
        fetch(`/api/widgets/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: item.order }),
        })
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error updating order:', error);
      fetchWidgets();
    }
  };

  const updateSeedData = async () => {
    try {
      await fetch('/api/widgets/update-seed', {
        method: 'POST',
      });
      alert('Seed data başarıyla güncellendi!');
    } catch (error) {
      console.error('Error updating seed data:', error);
      alert('Seed data güncellenirken bir hata oluştu!');
    }
  };

  if (loading) {
    return <div className="flex-1">
      <LoaderSpinner />
    </div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Widget Yönetimi</h1>
        <Button 
          color="primary"
          onClick={updateSeedData}
        >
          Seed Data Güncelle
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided: DroppableProvided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="min-w-full bg-white rounded-lg shadow"
            >
              <div className="grid grid-cols-5 bg-gray-100 p-4 rounded-t-lg">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sıra</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Widget Adı</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tür</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</div>
              </div>
              {widgets.map((widget, index) => (
                <Draggable 
                  key={widget._id} 
                  draggableId={widget._id} 
                  index={index}
                >
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`grid grid-cols-5 p-4 border-b items-center ${
                        snapshot.isDragging ? 'bg-blue-50 shadow-lg' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div 
                        className="flex items-center space-x-2 cursor-move" 
                        {...provided.dragHandleProps}
                      >
                        <span className="text-gray-500">
                          {index + 1}
                        </span>
                        <svg 
                          className="w-4 h-4 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{widget.name}</div>
                      <div className="text-sm text-gray-500">{widget.type}</div>
                      <div>
                        <Switch
                          isSelected={widget.isActive}
                          onValueChange={() => handleToggleWidget(widget._id, !widget.isActive)}
                          className="ml-4"
                        />
                      </div>
                      <div>
                        <a
                          href={`/admin/components/${widget.type.toLowerCase()}`}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Düzenle
                        </a>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 