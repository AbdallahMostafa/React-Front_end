import React from 'react';

const MockProductFormWithTooltips = ({ title, children }) => {
  return (
    <div className="mocked-input-group">
      {children}
      <div data-testid="mock-tooltip">{title}</div>
    </div>
  );
};

export default MockProductFormWithTooltips;
