import React from 'react';
import { IWidget } from '@/app/models/Widget';
import { Editor } from '@monaco-editor/react';
import { Input } from '@nextui-org/react';
import { validateReactCode } from '@/app/utils/validate-react-code';

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

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Kod doğrulama
    if (formData.data.code) {
      const validation = await validateReactCode(formData.data.code);
      if (!validation.isValid && validation.error) {
        setError(validation.error);
        return;
      }
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Widget Adı
        </label>
        <Input
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
        <Input
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

        <Editor
        height="400px"
        defaultLanguage="html"
        value={formData.data.code}
        onChange={(value) => setFormData(prev => ({ 
          ...prev, 
          data: { ...prev.data, code: value }
        }))}
        theme="vs-dark"
        className="mb-4"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          formatOnPaste: true,
          formatOnType: true,
        }}
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