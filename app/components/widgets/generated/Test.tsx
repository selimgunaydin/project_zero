import React from 'react';

interface TestProps {
  data: Record<string, any>;
  styles?: Record<string, string>;
}

const Test: React.FC<TestProps> = ({ data, styles = {} }) => {
  return (
    <div>test widget</div>
  );
};

export default Test;