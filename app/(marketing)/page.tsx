import { Button } from '@/components/ui';

function MarketingPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
      <h1 className='font-epilogue mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl'>
        Seamless teamwork automated
      </h1>
      <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 '>
        Keep everything in one place - even if your team isn&apos;t
      </p>

      <div className='mt-10 flex justify-center gap-x-6'>
        <Button>Sign up - it&apos;s free!</Button>
      </div>
    </div>
  );
}

export default MarketingPage;
