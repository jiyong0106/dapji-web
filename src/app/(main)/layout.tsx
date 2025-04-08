import FooterBar from '@/src/components/common/footerBar';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <Toast />
        {children}
        <FooterBar />
      </QueryProvider>
    </>
  );
};

export default MainLayout;
