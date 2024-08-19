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
            },
            cardBox: {
              boxShadow: 'none',
            },

            scrollBox: {
              borderRadius: '0',
            },
          },
        }}
      />
    </div>
  );
}

export default SettingsPage;
