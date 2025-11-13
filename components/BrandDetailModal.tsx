import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { formatCurrency } from '../utils/formatCurrency.ts';
import { MarkdownRenderer } from './common/MarkdownRenderer.tsx';
import { ErrorDisplay } from './common/ErrorDisplay.tsx';
import type { Brand } from '../types.ts';

interface BrandDetailModalProps {
  brand: Brand;
  onClose: () => void;
}

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({ brand, onClose }) => {
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  // Reset state when brand changes
  useEffect(() => { 
      setAnalysis(''); 
      setIsAnalyzing(false); 
      setError(''); 
  }, [brand]);

  if (!brand) return null;

  const handleAnalyzePitch = async () => {
    setIsAnalyzing(true); 
    setError(''); 
    setAnalysis('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const dealInfo = brand.deal ? `The final deal was ${formatCurrency(brand.deal.amount)} for ${brand.deal.equity}% equity with investors: ${brand.deal.investors.join(', ')}.` : `No deal was made.`;
      const prompt = `**Brand:** ${brand.name}
        **Description:** ${brand.description}
        **Original Ask:** ${formatCurrency(brand.ask.amount)} for ${brand.ask.equity}% equity.
        **Outcome:** ${dealInfo}
        Provide a concise analysis with sections: **Strengths:** (bulleted list), **Weaknesses:** (bulleted list), **Verdict:** (paragraph).`;
        
      const response = await ai.models.generateContent({ 
        model: 'gemini-2.5-flash', 
        contents: prompt,
        config: {
            systemInstruction: 'You are a venture capitalist analyzing a pitch from Shark Tank India.'
        }
      });
      setAnalysis(response.text);
    } catch (e) {
      console.error(e); 
      setError('Failed to get analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        <div className="modal-header">
          <div className="brand-logo">
            {brand.logoUrl ? <img src={brand.logoUrl} alt={`${brand.name} logo`} /> : brand.name.charAt(0)}
          </div>
          <div><h2>{brand.name}</h2><p>{brand.founders.join(', ')}</p></div>
        </div>
        <div className="modal-section"><h3>Description</h3><p>{brand.description}</p></div>
        <div className="modal-section">
          <h3>Pitch Details</h3>
          <div className="details-grid">
            <div className="detail-item"><p>Season / Episode</p><span>{brand.season} / {brand.episode}</span></div>
            <div className="detail-item"><p>Category</p><span>{brand.category}</span></div>
            <div className="detail-item"><p>Original Ask</p><span>{formatCurrency(brand.ask.amount)} for {brand.ask.equity}%</span></div>
            <div className="detail-item"><p>Implied Valuation</p><span>{formatCurrency(brand.ask.valuation)}</span></div>
          </div>
        </div>
        <div className="modal-section">
          <h3>Outcome</h3>
          {brand.deal ? (
            <div className="deal-highlight">
              <h4>Deal Secured!</h4>
              <div className="details-grid">
                <div className="detail-item"><p>Investment</p><span>{formatCurrency(brand.deal.amount)} for {brand.deal.equity}%</span></div>
                <div className="detail-item"><p>Final Valuation</p><span>{formatCurrency(brand.deal.valuation)}</span></div>
              </div>
              <div className="detail-item" style={{ marginTop: '1rem' }}><p>Investors</p><span>{brand.deal.investors.join(', ')}</span></div>
            </div>
          ) : (
            <div className="no-deal-highlight"><h4>No Deal</h4><p>The founders did not secure a deal from the sharks.</p></div>
          )}
        </div>
        {(analysis || isAnalyzing || error) && (
          <div className="modal-section">
            <h3>AI Pitch Analysis</h3>
            {isAnalyzing && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Analyzing pitch, please wait...</p>
              </div>
            )}
            {error && <ErrorDisplay error={error} />}
            {analysis && <MarkdownRenderer text={analysis} />}
          </div>
        )}
        <button className="analyze-button" onClick={handleAnalyzePitch} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Pitch with Gemini'}
        </button>
        <a href={brand.productUrl} target="_blank" rel="noopener noreferrer" className="buy-button">Shop Products</a>
      </div>
    </div>
  );
};