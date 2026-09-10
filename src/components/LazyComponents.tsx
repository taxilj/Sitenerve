import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
  </div>
);

// Dynamically import heavy components to improve initial page load
export const LazyShowcase = dynamic(() => import('@/page/Showcase').then(mod => ({ default: mod.Showcase })), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export const LazyOurwork = dynamic(() => import('@/page/Ourwork').then(mod => ({ default: mod.Ourwork })), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export const LazyClientsreviews = dynamic(() => import('@/page/Clientsreviews').then(mod => ({ default: mod.Clientsreviews })), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export const LazyModelprice = dynamic(() => import('@/page/Modelprice').then(mod => ({ default: mod.Modelprice })), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// Wrapper component for Suspense
export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);
