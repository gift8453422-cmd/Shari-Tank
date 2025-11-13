import React, { useState, useEffect, useMemo } from 'react';
import { BRANDS_DATA } from './data/brands.ts';
import { SHARKS_DATA } from './data/sharks.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { BrandDetailModal } from './components/BrandDetailModal.tsx';
import { DealsView } from './views/DealsView.tsx';
import { SharksView } from './views/SharksView.tsx';
import { InsightsView } from './views/InsightsView.tsx';
import { SharkProfile } from './components/SharkProfile.tsx';
import { BackToTopButton } from './components/common/BackToTopButton.tsx';
import type { Brand } from './types.ts';

interface Route {
  path: string;
  param?: string;
}

const parseRoute = (hash: string): Route => {
  const parts = hash.replace(/^#\/?/, '').split('/');
  return {
    path: parts[0] || 'deals',
    param: parts[1],
  };
};

export const App = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [route, setRoute] = useState<Route>(parseRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBrand(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedShark = useMemo(() => {
    if (route.path === 'sharks' && route.param) {
      const sharkId = parseInt(route.param, 10);
      return SHARKS_DATA.find(s => s.id === sharkId);
    }
    return null;
  }, [route]);

  const renderContent = () => {
    let content;
    const currentView = selectedShark ? 'sharkProfile' : route.path;

    switch (currentView) {
      case 'sharkProfile':
        content = selectedShark ? (
          <SharkProfile 
            shark={selectedShark} 
            allBrands={BRANDS_DATA} 
            onSelectBrand={setSelectedBrand}
          />
        ) : (
          // Fallback if ID is invalid
          <SharksView />
        );
        break;
      case 'sharks':
        content = <SharksView />;
        break;
      case 'insights':
        content = <InsightsView brands={BRANDS_DATA} />;
        break;
      case 'deals':
      default:
        content = <DealsView brands={BRANDS_DATA} onSelectBrand={setSelectedBrand} />;
        break;
    }
    return <div className="main-content" key={currentView}>{content}</div>;
  };

  return (
    <>
      <Header currentPath={route.path} />
      <main>
        {renderContent()}
      </main>
      <Footer />
      {selectedBrand && <BrandDetailModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />}
      <BackToTopButton />
    </>
  );
};