import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/';

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

function Hint({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className='text-sm max-w-[220px] break-words'
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Hint;
