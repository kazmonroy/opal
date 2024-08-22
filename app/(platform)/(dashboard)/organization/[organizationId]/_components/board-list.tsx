import FormPopover from '@/components/form/form-popover';
import Hint from '@/components/hint';
import { HelpCircle, User2 } from 'lucide-react';

function BoardList() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold font-lg text-slate-700'>
        <User2 className='h-6 w-6 mr-2' />
        <p>Your boards!</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 '>
        {/* Serves as the trigger for the popover */}
        <FormPopover sideoffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center p-4 hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-sm'>5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade to Pro`}
            >
              <HelpCircle className='bottom-2 right-2 h-[14px] w-[14px] absolute' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

export default BoardList;
