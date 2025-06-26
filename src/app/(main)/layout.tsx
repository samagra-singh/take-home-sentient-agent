import { getCurrentUser } from '@/actions/users';
import { MobileToolbar, Navbar, TabletSidebar } from '@/components/main';
import { UserProvider } from '@/contexts/user-context';

/**
 * All pages except auth require user validation.
 * And, so they should be dynamic.
 */
export const dynamic = 'force-dynamic';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  // Get current user info and validate it.
  const currentUser = await getCurrentUser();

  if (currentUser.error) {
    throw currentUser.error;
  }

  return (
    <div className="w-screen h-screen flex flex-col tablet:flex-row align-start justify-start items-stretch">
      <UserProvider value={currentUser.user}>
        <TabletSidebar />
        <MobileToolbar />
        <div
          className="grow relative overflow-y-auto max-h-[calc(100vh-80px-72px)] tablet:max-h-screen px-4 py-7 tablet:px-5.5 tablet:py-8.5"
        >
          <div className="w-full h-full flex justify-center">
            <div className="w-full h-full tablet:max-w-4xl flex flex-col items-stretch gap-3 tablet:gap-5">
              {children}
            </div>
          </div>
        </div>
        <Navbar forTablet={false} />
      </UserProvider>
    </div>
  );
};

export default MainLayout;
