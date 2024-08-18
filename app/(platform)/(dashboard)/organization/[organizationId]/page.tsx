import { OrganizationSwitcher } from '@clerk/nextjs';

function OrganziationIdPage() {
  return (
    <h1>
      <OrganizationSwitcher hidePersonal />
    </h1>
  );
}

export default OrganziationIdPage;
