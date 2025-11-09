'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes get no navbar/footer - they have their own layout
    return <>{children}</>;
  }

  // Regular routes get navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}