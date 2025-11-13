import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { formatCurrency } from '../utils/formatCurrency.ts';
import { MarkdownRenderer } from './common/MarkdownRenderer.tsx';
import { BaseChart } from './common/BaseChart.tsx';
import { CHART_COLORS } from '../constants.ts';
import { ErrorDisplay } from './common/ErrorDisplay.tsx';
import type { Shark, Brand } from '../types.ts';

interface SharkProfileProps {
    shark: Shark;
    allBrands: Brand[];
    onSelectBrand: (brand: Brand) => void;
}

export const SharkProfile: React.FC<SharkProfileProps> = ({ shark, allBrands, onSelectBrand }) => {
    const [thesis, setThesis] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const sharkDeals = useMemo(() => {
        return allBrands.filter(brand => brand.deal && brand.deal.investors.includes(shark.name));
    }, [shark, allBrands]);

    const handleGenerateThesis = async () => {
        setIsGenerating(true); setError(''); setThesis('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const dealsSummary = sharkDeals.map(d => `- ${d.name} (${d.category}): Invested ${formatCurrency(d.deal.amount)} for ${d.deal.equity}%`).join('\n');
            const prompt = `Analyze the investment patterns of Shark Tank India investor ${shark.name}.
            
            **Investment History:**
            ${dealsSummary}

            Based on this data, generate a concise "Investment Thesis" for ${shark.name}. Focus on:
            - Preferred industries or business models.
            - Typical deal structures (e.g., equity, valuation preferences).
            - Key characteristics they likely look for in founders.`;
            
            const response = await ai.models.generateContent({ 
                model: 'gemini-2.5-flash', 
                contents: prompt,
                config: {
                    systemInstruction: 'You are a sharp business analyst summarizing an investor\'s strategy based on their portfolio.'
                }
            });
            setThesis(response.text);
        } catch (e) {
            console.error(e); setError('Failed to generate thesis. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const categoryData = useMemo(() => {
        const counts = sharkDeals.reduce((acc: Record<string, number>, deal) => {
            acc[deal.category] = (acc[deal.category] || 0) + 1;
            return acc;
        }, {});
        return {
            labels: Object.keys(counts),
            datasets: [{
                data: Object.values(counts),
                backgroundColor: CHART_COLORS,
                borderColor: '#161b22',
                borderWidth: 2,
            }]
        };
    }, [sharkDeals]);

    return (
        <>
            <a href="#/sharks" className="back-link">&larr; Back to Sharks</a>
            <div className="profile-header">
                <div className="brand-logo shark-logo">
                    {shark.imageUrl ? <img src={shark.imageUrl} alt={shark.name} /> : shark.imageChar}
                </div>
                <div>
                    <h2>{shark.name}</h2>
                    <p>{shark.bio}</p>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-info">
                    <div className="modal-section">
                        <h3>AI Investment Thesis</h3>
                        {isGenerating && (
                            <div className="loading-container">
                                <div className="spinner"></div>
                                <p>Generating thesis...</p>
                            </div>
                        )}
                        {error && <ErrorDisplay error={error} />}
                        {thesis && <MarkdownRenderer text={thesis} />}
                        {!isGenerating && !thesis && (
                           <p>Click the button to generate an AI-powered analysis of {shark.name}'s investment strategy.</p>
                        )}
                         <button className="analyze-button" onClick={handleGenerateThesis} disabled={isGenerating}>
                            {isGenerating ? 'Generating...' : 'Generate Investment Thesis'}
                        </button>
                    </div>

                    <div className="modal-section">
                        <h3>Investment Distribution</h3>
                        {sharkDeals.length > 0 ? (
                           <div className="chart-container">
                             <BaseChart chartId={`shark-${shark.id}-pie`} type="pie" data={categoryData} options={{ responsive: true, plugins: { legend: { position: 'top', labels: { color: '#c9d1d9' } } } }} />
                           </div>
                        ) : <p>No deals to visualize yet.</p>}
                    </div>
                </div>
                <div className="profile-deals">
                    <h3>Deals on Shark Tank ({sharkDeals.length})</h3>
                    <div className="deal-list">
                    {sharkDeals.length > 0 ? sharkDeals.map(deal => (
                         <div 
                            key={deal.id} 
                            className="deal-list-item" 
                            onClick={() => onSelectBrand(deal)} 
                            role="button" 
                            tabIndex={0} 
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectBrand(deal)}
                            aria-label={`View details for ${deal.name}`}
                        >
                             <div className="brand-logo">
                                {deal.logoUrl ? <img src={deal.logoUrl} alt={`${deal.name} logo`} /> : deal.name.charAt(0)}
                            </div>
                            <div className="deal-list-item-info">
                                <h4>{deal.name}</h4>
                                <p>{deal.category}</p>
                            </div>
                            <div className="deal-list-item-investment">
                                <span>{formatCurrency(deal.deal.amount)}</span>
                                <p>for {deal.deal.equity}%</p>
                            </div>
                         </div>
                    )) : <p>This shark hasn't made any deals in our dataset yet.</p>}
                    </div>
                </div>
            </div>
        </>
    );
};