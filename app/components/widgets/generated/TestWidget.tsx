import React from 'react';

interface TestWidgetProps {
  data: Record<string, any>;
  styles?: Record<string, string>;
}

const TestWidget: React.FC<TestWidgetProps> = ({ data, styles = {} }) => {
  return (
    <div className="bg-black">TestWidget61</div>
  );
};

export default TestWidget;