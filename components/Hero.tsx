import React from 'react';
import { useMemo } from 'react';
import { formatCurrency } from '../utils/formatCurrency.ts';
import { BRANDS_DATA } from '../data/brands.ts';

export const Hero: React.FC = () => {
    const { totalInvestment, totalDeals, mostActiveShark } = useMemo(() => {
        const investment = BRANDS_DATA.reduce((acc, brand) => acc + (brand.deal ? brand.deal.amount : 0), 0);
        const deals = BRANDS_DATA.filter(brand => brand.deal).length;
        
        const investorCounts = BRANDS_DATA.reduce<Record<string, number>>((acc, brand) => {
            if (brand.deal) {
                brand.deal.investors.forEach(investor => {
                    acc[investor] = (acc[investor] || 0) + 1;
                });
            }
            return acc;
        }, {});

        const mostActive = Object.entries(investorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
        
        return { totalInvestment: investment, totalDeals: deals, mostActiveShark: mostActive };
    }, []);

    return (
        <div className="hero">
            <h2>The Ultimate Shark Tank India Database</h2>
            <p className="subtitle">Explore every pitch, deal, and shark from the show.</p>
            <div className="stats-container">
                <div className="stat-box">
                    <p>Total Capital Invested</p>
                    <span>{formatCurrency(totalInvestment)}</span>
                </div>
                <div className="stat-box">
                    <p>Total Deals Made</p>
                    <span>{totalDeals}</span>
                </div>
                <div className="stat-box">
                    <p>Most Active Shark</p>
                    <span>{mostActiveShark}</span>
                </div>
            </div>
        </div>
    );
}