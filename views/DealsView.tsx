import React, { useState, useMemo } from 'react';
import { BrandCard } from '../components/BrandCard.tsx';
import { Hero } from '../components/Hero.tsx';
import { CATEGORIES, SEASONS } from '../data/brands.ts';
import { EmptyState } from '../components/common/EmptyState.tsx';
import type { Brand } from '../types.ts';

interface DealsViewProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({ brands, onSelectBrand }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredBrands = useMemo(() => {
    return brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            brand.founders.some((f: string) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || brand.season === parseInt(selectedSeason);
      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [brands, searchQuery, selectedCategory, selectedSeason]);

  return (
    <>
      <Hero />
      <div className="controls">
        <input 
            type="text" 
            className="search-input" 
            placeholder="Search by brand or founder..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            aria-label="Search by brand or founder" 
        />
        <select 
            className="filter-select" 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(e.target.value)} 
            aria-label="Filter by season"
        >
          <option value="all">All Seasons</option>
          {SEASONS.map(season => <option key={season} value={season}>Season {season}</option>)}
        </select>
        <select 
            className="filter-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="brand-grid">
        {filteredBrands.length > 0 ? (
          filteredBrands.map(brand => <BrandCard key={brand.id} brand={brand} onSelect={onSelectBrand} />)
        ) : <EmptyState />}
      </div>
    </>
  );
};