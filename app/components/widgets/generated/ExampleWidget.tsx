import React from 'react';

interface ExampleWidgetProps {
  data?: Record<string, any>;
  styles?: Record<string, string>;
}

const ExampleWidget: React.FC<ExampleWidgetProps> = ({ data, styles }) => {
  return (
    <div className={styles?.container || 'p-8 bg-white rounded-lg shadow-lg'}>
      <h2 className={styles?.title || 'text-3xl font-bold mb-4'}>
        {data?.title || 'Örnek Widget'}
      </h2>
      <p className={styles?.description || 'text-gray-600'}>
        {data?.description || 'Bu bir örnek widget bileşenidir. Kendi özel bileşenlerinizi oluşturmak için bu yapıyı kullanabilirsiniz.'}
      </p>
    </div>
  );
};

ExampleWidget.displayName = 'ExampleWidget';

export default ExampleWidget; 