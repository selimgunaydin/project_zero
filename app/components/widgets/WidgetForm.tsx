import React from 'react';
import { IWidget } from '@/app/models/Widget';

interface WidgetFormProps {
  widget?: IWidget;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const WidgetForm: React.FC<WidgetFormProps> = ({ widget, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    name: widget?.name || '',
    type: 'Custom',
    isActive: widget?.isActive ?? true,
    data: {
      componentName: widget?.data?.componentName || '',
      code: widget?.data?.code || '',
      generatedComponent: widget?.data?.generatedComponent || ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Widget Adı
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bileşen Adı
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.data.componentName}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            data: { ...prev.data, componentName: e.target.value }
          }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          JSX/TSX Kodu
        </label>
        <textarea
          className="mt-1 block w-full h-64 font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.data.code}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            data: { ...prev.data, code: e.target.value }
          }))}
          placeholder="<div>Bileşen kodunuzu buraya yazın</div>"
          required
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          />
          <span className="ml-2 text-sm text-gray-600">Aktif</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onCancel}
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default WidgetForm; 