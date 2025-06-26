'use client';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import { TooltipIds } from '@/utils/constants/global';

const TooltipContainers: React.FC<Record<string, never>> = () => (
  <>
    {/* Default tooltip */}
    <ReactTooltip
      id={TooltipIds.CLICKABLE_NO_FOCUS}
      /**
       * Any new content on hover should be clickable.
       * https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
       * https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
       */
      clickable
      delayShow={300}
      globalCloseEvents={{
        escape: true,
        scroll: true,
        resize: true,
      }}
    />
  </>
);

export default TooltipContainers;
