import React from 'react';
import { BRANDS_DATA } from '../data/brands.ts';
import type { Shark } from '../types.ts';

interface SharkCardProps {
    shark: Shark;
}

export const SharkCard: React.FC<SharkCardProps> = ({ shark }) => {
    // Calculate deal count for this specific shark
    const dealCount = BRANDS_DATA.filter(b => b.deal && b.deal.investors.includes(shark.name)).length;
    
    return (
        <a href={`#/sharks/${shark.id}`} className="shark-card-link">
            <div className="shark-card">
                <div className="card-header">
                    <div className="brand-logo shark-logo">
                        {shark.imageUrl ? <img src={shark.imageUrl} alt={shark.name} /> : shark.imageChar}
                    </div>
                    <div className="brand-info">
                        <h2>{shark.name}</h2>
                        <p>Investor</p>
                    </div>
                </div>
                <div className="card-body">
                    <p>{shark.bio}</p>
                </div>
                <div className="card-footer">
                    <span>{dealCount} Deals</span>
                </div>
            </div>
        </a>
    );
};