import { OrganizationProfile } from '@clerk/nextjs';

function SettingsPage() {
  return (
    <div className='w-full'>
      <OrganizationProfile
        routing='hash'
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
            },
            card: {
              border: '1px solid #E5E7EB',
              boxShadow: 'none',
              width: '100%',
            },
          },
        }}
      />
    </div>
  );
}

export default SettingsPage;
