import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

function OrganziationIdPage() {
  const { userId, orgId } = auth();
  return (
    <h1>
      Organization: {orgId}
      <OrganizationSwitcher />
    </h1>
  );
}

export default OrganziationIdPage;
