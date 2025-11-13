import React from 'react';
import { sharkInfoMap } from '../constants.ts';
import type { Brand } from '../types.ts';

interface BrandCardProps {
  brand: Brand;
  onSelect: (brand: Brand) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, onSelect }) => (
  <div 
    className="brand-card" 
    onClick={() => onSelect(brand)} 
    role="button" 
    tabIndex={0} 
    onKeyDown={(e) => e.key === 'Enter' && onSelect(brand)} 
    aria-label={`View details for ${brand.name}`}
  >
    <div className="card-header">
      <div className="brand-logo">
        {brand.logoUrl ? <img src={brand.logoUrl} alt={`${brand.name} logo`} /> : brand.name.charAt(0)}
      </div>
      <div className="brand-info">
        <h2>{brand.name}</h2>
        <p>{brand.category}</p>
      </div>
    </div>
    <div className="card-body"><p>{brand.description}</p></div>
    <div className="card-footer">
      <span>Season {brand.season}</span>
      <div className="investors-wrapper">
        {brand.deal && (
            <div className="card-investors">
            {brand.deal.investors.map(investorName => {
                const shark = sharkInfoMap.get(investorName);
                return shark ? <div key={shark.id} className="investor-avatar" title={shark.name}>{shark.imageChar}</div> : null;
            })}
            </div>
        )}
        <span className={`deal-status ${brand.deal ? 'deal' : 'no-deal'}`}>{brand.deal ? 'Deal' : 'No Deal'}</span>
      </div>
    </div>
  </div>
);