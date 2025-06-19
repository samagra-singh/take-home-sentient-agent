import React from 'react';

const SvgMock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} data-testid={'mock-svg-icon'} />
  );
};

export default SvgMock;
