import React from 'react';

const SVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} data-testid={'mock-svg-icon'} />
  );
};

export default SVG;
