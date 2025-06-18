import React from 'react';

/**
 * A mock SVG component for Jest tests.
 * When Jest encounters an SVG import, it will use this component.
 * This prevents Jest from trying to parse SVG XML or requiring
 * a browser environment to render it.
 *
 * It forwards className, width, height, fill, and stroke props,
 * making it suitable for basic visual testing (e.g., checking if
 * the mock component is rendered with the correct props).
 */
const SvgMock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    // You can customize this return. A simple svg or even just a div
    // is often sufficient. Using an <svg> tag makes it closer to reality.
    <svg {...props} data-testid="mock-svg-icon" />
  );
};

export default SvgMock;
