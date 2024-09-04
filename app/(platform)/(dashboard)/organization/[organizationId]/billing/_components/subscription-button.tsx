'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui';
import { useAction } from '@/hooks/use-action';
import { stripeRedirect } from '@/actions/stripe-redirect';
import { useProModal } from '@/hooks/use-pro-modal';

interface SubscriptionButtonProps {
  isPro: boolean;
}
function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const onOpen = useProModal((state) => state.onOpen);
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleClick = () => {
    if (isPro) {
      execute({});
    } else {
      onOpen();
    }
  };
  return (
    <Button disabled={isLoading} onClick={handleClick}>
      {isPro ? 'Manage subscription' : 'Upgrade to Pro'}
    </Button>
  );
}

export default SubscriptionButton;
