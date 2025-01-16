import React from 'react';
import { IWidget } from '@/app/models/Widget';
import WidgetForm from './WidgetForm';

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  widget?: IWidget;
  onSubmit: (data: any) => Promise<void>;
}

const WidgetModal: React.FC<WidgetModalProps> = ({
  isOpen,
  onClose,
  widget,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Kapat</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-3 sm:mt-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {widget ? 'Widget Düzenle' : 'Yeni Widget Ekle'}
            </h3>
            <div className="mt-6">
              <WidgetForm
                widget={widget}
                onSubmit={onSubmit}
                onCancel={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal; 