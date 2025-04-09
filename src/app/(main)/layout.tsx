import MainNav from '@/src/components/common/mainNav';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div style={{ background: 'rgb(247, 244, 244)', minHeight: '100vh' }}>
        <MainNav />
        <Toast />
        {children}
      </div>
    </QueryProvider>
  );
};

export default MainLayout;
