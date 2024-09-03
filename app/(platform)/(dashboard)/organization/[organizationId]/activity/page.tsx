import { Separator } from '@/components/ui';
import Info from '../_components/info';
import { Suspense } from 'react';
import ActivityList from './_components/activity-list';
import { checkSubscription } from '@/lib/subscription';

async function ActivityPage() {
  const isPro = await checkSubscription();
  return (
    <div className='w-full'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}

export default ActivityPage;
