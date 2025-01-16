import React from 'react';
import dynamic from 'next/dynamic';
import { IWidget } from '@/app/models/Widget';


interface WidgetRendererProps {
  widgets: IWidget[];
}

interface DynamicComponentProps {
  data: Record<string, any>;
  styles?: Record<string, string>;
}

const WidgetRenderer: React.FC<WidgetRendererProps> = ({ widgets }) => {
  const renderWidget = (widget: IWidget) => {
    if (!widget.isActive) return null;
    if (widget.type === 'Custom' && widget.data.generatedComponent) {
      const DynamicComponent = dynamic<DynamicComponentProps>(
        () => import(`../widgets/generated/${widget.data.generatedComponent}`),
        {
          loading: () => <div>Yükleniyor...</div>,
          ssr: true
        }
      );
      return <DynamicComponent key={widget._id.toString()} data={widget.data} styles={widget.styles} />;
    }
  };

  return (
    <div className="w-full">
      {widgets.sort((a, b) => (a.order || 0) - (b.order || 0)).map(renderWidget)}
    </div>
  );
};

export default WidgetRenderer; 