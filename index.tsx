import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// --- DATA ---
const SHARKS_DATA = [
    { id: 1, name: "Anupam Mittal", imageChar: "A", bio: "Founder and CEO of People Group (Shaadi.com). Known for his deep understanding of consumer internet businesses and brand building. He often acts as a mentor to young entrepreneurs.", imageUrl: "https://sharktankindia.com/wp-content/uploads/2023/12/Anupam-Mittal-1.webp" },
    { id: 2, name: "Aman Gupta", imageChar: "A", bio: "Co-founder and CMO of boAt. A marketing guru with a knack for creating viral brands. He looks for passionate founders and scalable D2C products.", imageUrl: "https://sharktankindia.com/wp-content/uploads/2023/12/Aman-Gupta-1.webp" },
    { id: 3, name: "Namita Thapar", imageChar: "N", bio: "Executive Director of Emcure Pharmaceuticals. With extensive experience in the healthcare sector, she seeks businesses with a strong social impact and clear profitability.", imageUrl: "https://sharktankindia.com/wp-content/uploads/2023/12/Namita-Thapar-1.webp" },
    { id: 4, name: "Vineeta Singh", imageChar: "V", bio: "Co-founder and CEO of SUGAR Cosmetics. A resilient entrepreneur who values grit and determination. She is drawn to consumer brands with strong female leadership.", imageUrl: "https://sharktankindia.com/wp-content/uploads/2023/12/Vineeta-Singh-1.webp" },
    { id: 5, name: "Peyush Bansal", imageChar: "P", bio: "Co-founder and CEO of Lenskart. A visionary with a focus on technology and large-scale problem-solving. He invests in mission-driven founders and tech-first companies.", imageUrl: "https://sharktankindia.com/wp-content/uploads/2023/12/Peyush-Bansal-1.webp" },
    { id: 6, name: "Ashneer Grover", imageChar: "A", bio: "Former Co-founder of BharatPe. Known for his blunt feedback and focus on numbers. He looks for clear business models and founders who are 'dhande ka aadmi' (business-savvy).", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Ashneer_Grover_photo.jpg/800px-Ashneer_Grover_photo.jpg"},
    { id: 7, name: "Kunal Bahl", imageChar: "K", bio: "Co-founder of Snapdeal and Titan Capital. Known for his expertise in e-commerce and as a prolific angel investor backing numerous startups.", imageUrl: "https://images.yourstory.com/cs/images/people/KunalBahl-1642158021171.jpg" }
];

const BRANDS_DATA = [
  {
    id: 1,
    name: "Boond",
    founders: ["Vishal Singh"],
    season: 3,
    episode: 1,
    category: "Food & Beverage",
    description: "Boond is a brand offering traditional Indian sweets with a modern twist, focusing on high-quality ingredients and hygienic packaging.",
    ask: { equity: 5, amount: 4000000, valuation: 80000000 },
    deal: {
      investors: ["Anupam Mittal", "Vineeta Singh"],
      equity: 10,
      amount: 4000000,
      valuation: 40000000
    },
    productUrl: "https://example.com/boond"
  },
  {
    id: 2,
    name: "Skippi Ice Pops",
    founders: ["Ravi Kabra", "Anuja Kabra"],
    season: 1,
    episode: 15,
    category: "Food & Beverage",
    description: "India's first ice popsicle brand, offering a fun, nostalgic treat made with natural flavors, colors, and sweeteners.",
    ask: { equity: 5, amount: 4500000, valuation: 90000000 },
    deal: {
      investors: ["Anupam Mittal", "Ashneer Grover", "Namita Thapar", "Vineeta Singh", "Aman Gupta"],
      equity: 15,
      amount: 10000000,
      valuation: 66700000
    },
    productUrl: "https://example.com/skippi",
    logoUrl: "https://cdn.dotpe.in/longtail/store-logo/824361/1666170668615.png"
  },
  {
    id: 3,
    name: "Hoovu Fresh",
    founders: ["Yeshoda Karuturi", "Rhea Karuturi"],
    season: 2,
    episode: 5,
    category: "Home & Lifestyle",
    description: "A subscription-based service delivering fresh, traditional puja flowers directly to customers' homes, ensuring quality and longevity.",
    ask: { equity: 1, amount: 8000000, valuation: 800000000 },
    deal: {
      investors: ["Aman Gupta", "Peyush Bansal"],
      equity: 2,
      amount: 10000000,
      valuation: 500000000
    },
    productUrl: "https://example.com/hoovu",
    logoUrl: "https://hoovufresh.com/cdn/shop/files/hoovu_logo.png?v=1678964352&width=240"
  },
  {
    id: 4,
    name: "Falhari",
    founders: ["Rahul Rohilla", "Gaurav Kumar"],
    season: 1,
    episode: 10,
    category: "Food & Beverage",
    description: "A health food brand that offers fruit-based meals, salads, and juices, catering to a health-conscious urban audience.",
    ask: { equity: 2, amount: 5000000, valuation: 250000000 },
    deal: null,
    productUrl: "https://example.com/falhari"
  },
  {
    id: 5,
    name: "AAS Vidyalaya",
    founders: ["Vikas Kakwani", "Leena Kakwani"],
    season: 1,
    episode: 20,
    category: "Education",
    description: "An ed-tech platform providing a complete virtual school experience for students from KG to 12th grade, accessible from anywhere.",
    ask: { equity: 3, amount: 15000000, valuation: 500000000 },
    deal: {
      investors: ["Peyush Bansal", "Namita Thapar", "Ashneer Grover"],
      equity: 15,
      amount: 15000000,
      valuation: 100000000
    },
    productUrl: "https://example.com/aasvidyalaya"
  },
  {
    id: 6,
    name: "Beyond Water",
    founders: ["Shachi Singhania", "Devang Singhania"],
    season: 1,
    episode: 2,
    category: "Health & Wellness",
    description: "Creates natural, zero-calorie, and zero-sugar liquid water enhancers packed with vitamins and electrolytes.",
    ask: { equity: 5, amount: 7500000, valuation: 150000000 },
    deal: {
        investors: ["Namita Thapar", "Aman Gupta"],
        equity: 15,
        amount: 7500000,
        valuation: 50000000
    },
    productUrl: "https://example.com/beyondwater"
  },
  {
    id: 7,
    name: "Qzense Labs",
    founders: ["Rubal Chib", "Dr. Srishti Batra"],
    season: 1,
    episode: 3,
    category: "Technology",
    description: "An IoT solution for fresh food quality assessment. Their device analyzes food spoilage and ripeness non-invasively.",
    ask: { equity: 0.5, amount: 10000000, valuation: 2000000000 },
    deal: null,
    productUrl: "https://example.com/qzense"
  },
  {
    id: 8,
    name: "FAE Beauty",
    founders: ["Karishma Kewalramani"],
    season: 4,
    episode: 1,
    category: "Beauty/Skincare",
    description: "Inclusive skincare for a diverse range of skin tones and types.",
    ask: { equity: 2, amount: 10000000, valuation: 500000000 },
    deal: {
      investors: ["Anupam Mittal", "Vineeta Singh"],
      equity: 3,
      amount: 10000000,
      valuation: 333333333
    },
    productUrl: "https://www.faebeauty.com/"
  },
  {
    id: 9,
    name: "Confect",
    founders: ["Unknown"],
    season: 4,
    episode: 1,
    category: "Food/Confectionery",
    description: "Premium cakes with innovative flavors and designs.",
    ask: { equity: 2, amount: 10000000, valuation: 500000000 },
    deal: {
      investors: ["Vineeta Singh"],
      equity: 2,
      amount: 10000000,
      valuation: 500000000
    },
    productUrl: "https://confect.in/"
  },
  {
    id: 10,
    name: "Induge",
    founders: ["Unknown"],
    season: 4,
    episode: 1,
    category: "Services/Luxury",
    description: "Concierge service for luxury experiences and lifestyle management.",
    ask: { equity: 0, amount: 0, valuation: 0 }, // Not specified
    deal: null,
    productUrl: "https://induge.com/"
  },
  {
    id: 11,
    name: "BL Fabric",
    founders: ["Mayur Gediya"],
    season: 4,
    episode: 2,
    category: "Fashion/Textiles",
    description: "Affordable ethnic wear for men and women using sustainable fabrics.",
    ask: { equity: 2, amount: 10000000, valuation: 500000000 },
    deal: {
      investors: ["Kunal Bahl"],
      equity: 3,
      amount: 10000000,
      valuation: 333333333
    },
    productUrl: "https://blfabric.com/"
  },
  {
    id: 12,
    name: "Culture Circle",
    founders: ["Abhijit Bhansali", "Dhruvin Shah"],
    season: 4,
    episode: 2,
    category: "Fashion/Sneakers",
    description: "Curated platform for authentic limited-edition sneakers and streetwear.",
    ask: { equity: 1, amount: 50000000, valuation: 5000000000 },
    deal: {
      investors: ["Kunal Bahl"],
      equity: 1,
      amount: 50000000,
      valuation: 5000000000
    },
    productUrl: "https://culturecircle.co/",
    logoUrl: "https://cdn.sanity.io/images/s79s68k4/production/12e8c25745155152862955518b5711689a7444bb-1080x1080.jpg"
  },
  {
    id: 13,
    name: "Nexera Health",
    founders: ["Unknown"],
    season: 4,
    episode: 2,
    category: "Health/Healthcare",
    description: "AI-powered platform for employee wellness and health management.",
    ask: { equity: 2, amount: 10000000, valuation: 500000000 },
    deal: null,
    productUrl: "https://nexerahealth.com/"
  },
  {
    id: 14,
    name: "Nooe",
    founders: ["Piyush Pandey", "Neetica Pandey"],
    season: 4,
    episode: 3,
    category: "Lifestyle/Stationery",
    description: "Sleek desk essentials and stationery for home offices, focusing on design and organization.",
    ask: { equity: 1, amount: 5000000, valuation: 500000000 },
    deal: {
      investors: ["Vineeta Singh"],
      equity: 2,
      amount: 5000000,
      valuation: 250000000
    },
    productUrl: "https://nooe.in/"
  },
  {
    id: 15,
    name: "Go Zero",
    founders: ["Kiran Shah"],
    season: 4,
    episode: 3,
    category: "Food & Beverage",
    description: "Guilt-free ice creams and frozen desserts made with natural ingredients.",
    ask: { equity: 1, amount: 10000000, valuation: 1000000000 },
    deal: {
      investors: ["Aman Gupta"],
      equity: 1.5,
      amount: 10000000,
      valuation: 666666667
    },
    productUrl: "https://gozero.in/",
    logoUrl: "https://gozero.in/cdn/shop/files/Go_Zero_Logo_-_White_2x_a7d7f7e9-a3b0-4a53-8378-c89b788a1b6a.png?v=1680511855&width=500"
  },
  {
    id: 16,
    name: "Curve Electric",
    founders: ["Zubair Bhatt", "Shaikh Yammeen"],
    season: 4,
    episode: 3,
    category: "Mobility/Sharing",
    description: "E-bike sharing system for sustainable urban transport in Srinagar.",
    ask: { equity: 2, amount: 5000000, valuation: 250000000 },
    deal: null,
    productUrl: "https://curveelectric.in/"
  },
  {
    id: 17,
    name: "Gudworld",
    founders: ["Unknown"],
    season: 4,
    episode: 4,
    category: "Food & Beverage",
    description: "Premium jaggery-based products promoting sustainable farming.",
    ask: { equity: 2, amount: 50000000, valuation: 2500000000 },
    deal: {
      investors: ["Peyush Bansal", "Aman Gupta"],
      equity: 2.5,
      amount: 50000000,
      valuation: 2000000000
    },
    productUrl: "https://gudworld.com/"
  },
  {
    id: 18,
    name: "Airth",
    founders: ["Unknown"],
    season: 4,
    episode: 4,
    category: "Health & Wellness",
    description: "Portable air purifiers for urban pollution control.",
    ask: { equity: 3, amount: 30000000, valuation: 1000000000 },
    deal: null,
    productUrl: "https://airth.in/"
  },
  {
    id: 19,
    name: "One Dios",
    founders: ["Nitin Chawla"],
    season: 4,
    episode: 4,
    category: "Tech/Services",
    description: "App for quick complaint resolution and warranty management.",
    ask: { equity: 1.5, amount: 7500000, valuation: 500000000 },
    deal: {
      investors: ["Anupam Mittal"],
      equity: 2,
      amount: 7500000,
      valuation: 375000000
    },
    productUrl: "https://onedios.com/"
  }
];

const CATEGORIES = [...new Set(BRANDS_DATA.map(brand => brand.category))];
const SEASONS = [...new Set(BRANDS_DATA.map(brand => brand.season))].sort((a,b) => a-b);
const CHART_COLORS = ['#8a63d2', '#34d399', '#f87171', '#facc15', '#9ca3af', '#c084fc', '#fb923c'];
const sharkInfoMap = new Map(SHARKS_DATA.map(shark => [shark.name, shark]));

// --- UTILS ---
const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount}`;
};

// --- BASE CHART COMPONENT ---
const BaseChart = ({ chartId, type, data, options }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && data) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, { type, data, options });
        }
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, type, options]);

    return <canvas ref={chartRef} id={chartId}></canvas>;
};


// --- COMPONENTS ---
const MarkdownRenderer = ({ text }) => {
  if (!text) return null;
  const processLine = (line) => line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  const elements = [];
  let currentList = null;
  text.split('\n').forEach((line, index) => {
    line = line.trim();
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!currentList) currentList = [];
      currentList.push(<li key={`${index}-li`} dangerouslySetInnerHTML={{ __html: processLine(line.substring(2)) }} />);
    } else {
      if (currentList) {
        elements.push(<ul key={`${index}-ul`}>{currentList}</ul>);
        currentList = null;
      }
      if (line) elements.push(<p key={index} dangerouslySetInnerHTML={{ __html: processLine(line) }} />);
    }
  });
  if (currentList) elements.push(<ul key="last-ul">{currentList}</ul>);
  return <div className="analysis-content">{elements}</div>;
};

const BrandCard: React.FC<{brand: any, onSelect: (brand: any) => void}> = ({ brand, onSelect }) => (
  <div className="brand-card" onClick={() => onSelect(brand)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect(brand)} aria-label={`View details for ${brand.name}`}>
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

const BrandDetailModal = ({ brand, onClose }) => {
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setAnalysis(''); setIsAnalyzing(false); setError(''); }, [brand]);

  if (!brand) return null;

  const handleAnalyzePitch = async () => {
    setIsAnalyzing(true); setError(''); setAnalysis('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const dealInfo = brand.deal ? `The final deal was ${formatCurrency(brand.deal.amount)} for ${brand.deal.equity}% equity with investors: ${brand.deal.investors.join(', ')}.` : `No deal was made.`;
      const prompt = `You are a venture capitalist analyzing a pitch from Shark Tank India.
        **Brand:** ${brand.name}
        **Description:** ${brand.description}
        **Original Ask:** ${formatCurrency(brand.ask.amount)} for ${brand.ask.equity}% equity.
        **Outcome:** ${dealInfo}
        Provide a concise analysis with sections: **Strengths:** (bulleted list), **Weaknesses:** (bulleted list), **Verdict:** (paragraph).`;
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      setAnalysis(response.text);
    } catch (e) {
      console.error(e); setError('Failed to get analysis. Please try again.');
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
            {isAnalyzing && <p>Analyzing pitch, please wait...</p>}
            {error && <p className="error-message">{error}</p>}
            {analysis && <MarkdownRenderer text={analysis} />}
          </div>
        )}
        <button className="analyze-button" onClick={handleAnalyzePitch} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Pitch'}
        </button>
        <a href={brand.productUrl} target="_blank" rel="noopener noreferrer" className="buy-button">Shop Products</a>
      </div>
    </div>
  );
};

const SharkProfile = ({ shark, allBrands, onBack, onSelectBrand }) => {
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
            const prompt = `You are a business analyst. Analyze the investment patterns of Shark Tank India investor ${shark.name}.
            
            **Investment History:**
            ${dealsSummary}

            Based on this data, generate a concise "Investment Thesis" for ${shark.name}. Focus on:
            - Preferred industries or business models.
            - Typical deal structures (e.g., equity, valuation preferences).
            - Key characteristics they likely look for in founders.`;
            
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
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
        <div className="shark-profile">
            <button onClick={onBack} className="back-button">&larr; Back to Sharks</button>
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
                        {(thesis || isGenerating || error) ? (
                            <>
                                {isGenerating && <p>Generating thesis...</p>}
                                {error && <p className="error-message">{error}</p>}
                                {thesis && <MarkdownRenderer text={thesis} />}
                            </>
                        ) : (
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
                         <div key={deal.id} className="deal-list-item" onClick={() => onSelectBrand(deal)}>
                           <h4>{deal.name}</h4>
                           <p>{deal.category}</p>
                           <span>{formatCurrency(deal.deal.amount)} for {deal.deal.equity}%</span>
                         </div>
                    )) : <p>This shark hasn't made any deals in our dataset yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SharkCard: React.FC<{shark: any, onSelect: () => void}> = ({ shark, onSelect }) => {
    const dealCount = BRANDS_DATA.filter(b => b.deal && b.deal.investors.includes(shark.name)).length;
    return (
        <div className="shark-card" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect()} aria-label={`View profile for ${shark.name}`}>
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
    );
};

// FIX: Add explicit type for the 'brands' prop to resolve type inference issues.
const InsightsView: React.FC<{ brands: typeof BRANDS_DATA }> = ({ brands }) => {
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#c9d1d9' } } },
        scales: {
            x: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(139, 148, 158, 0.2)' } },
            y: { ticks: { color: '#8b949e' }, grid: { color: 'rgba(139, 148, 158, 0.2)' } }
        }
    };

    const dealRatioData = useMemo(() => {
        const dealsMade = brands.filter(b => b.deal).length;
        const noDeals = brands.length - dealsMade;
        return {
            labels: ['Deal', 'No Deal'],
            datasets: [{
                data: [dealsMade, noDeals],
                backgroundColor: [CHART_COLORS[1], CHART_COLORS[2]],
                borderColor: '#161b22',
                borderWidth: 2,
            }]
        };
    }, [brands]);

    const investmentBySeasonData = useMemo(() => {
        // FIX: Type the initial value of reduce to ensure `seasonTotals` is correctly typed. This prevents downstream errors in the `sort` function.
        // FIX: Use generic parameter for `reduce` for better type inference of the accumulator.
        const seasonTotals = brands.reduce<Record<string, number>>((acc, brand) => {
            if (brand.deal) {
                acc[brand.season] = (acc[brand.season] || 0) + brand.deal.amount;
            }
            return acc;
        }, {});
        const sortedSeasons = Object.keys(seasonTotals).sort((a,b) => parseInt(a) - parseInt(b));
        return {
            labels: sortedSeasons.map(s => `Season ${s}`),
            datasets: [{
                label: 'Total Investment (INR)',
                data: sortedSeasons.map(s => seasonTotals[s]),
                backgroundColor: CHART_COLORS[0],
            }]
        };
    }, [brands]);

    const categoryDistributionData = useMemo(() => {
        // FIX: Type the initial value of reduce to ensure `categoryCounts` is correctly typed. This prevents downstream errors in the `sort` function.
        // FIX: Use generic parameter for `reduce` for better type inference of the accumulator.
        const categoryCounts = brands.reduce<Record<string, number>>((acc, brand) => {
            acc[brand.category] = (acc[brand.category] || 0) + 1;
            return acc;
        }, {});
        const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
        return {
            labels: sortedCategories.map(([cat]) => cat),
            datasets: [{
                label: 'Number of Pitches',
                data: sortedCategories.map(([, count]) => count),
                backgroundColor: CHART_COLORS,
            }]
        };
    }, [brands]);

    return (
        <div className="insights-view">
            <div className="view-header">
                <h2>Show Insights</h2>
                <p>A high-level overview of statistics from Shark Tank India.</p>
            </div>
            <div className="insights-grid">
                <div className="chart-card">
                    <h3>Deal vs. No Deal</h3>
                    <div className="chart-wrapper">
                        <BaseChart chartId="dealRatio" type="doughnut" data={dealRatioData} options={{...commonChartOptions, scales: {}}} />
                    </div>
                </div>
                 <div className="chart-card">
                    <h3>Total Investment by Season</h3>
                     <div className="chart-wrapper">
                       <BaseChart chartId="investmentBySeason" type="bar" data={investmentBySeasonData} options={commonChartOptions} />
                    </div>
                </div>
                 <div className="chart-card full-width">
                    <h3>Pitch Category Distribution</h3>
                     <div className="chart-wrapper" style={{height: '400px'}}>
                       <BaseChart chartId="categoryDistribution" type="bar" data={categoryDistributionData} options={{...commonChartOptions, indexAxis: 'y'}} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header = ({ view, setView }) => (
    <header className="app-header">
        <div className="header-content">
            <div className="logo">Shark Tank India Hub</div>
            <nav className="main-nav">
                <button className={`nav-button ${view === 'deals' ? 'active' : ''}`} onClick={() => setView('deals')}>Deals</button>
                <button className={`nav-button ${(view === 'sharks' || view === 'sharkProfile') ? 'active' : ''}`} onClick={() => setView('sharks')}>Sharks</button>
                <button className={`nav-button ${view === 'insights' ? 'active' : ''}`} onClick={() => setView('insights')}>Insights</button>
            </nav>
        </div>
    </header>
);

const Footer = () => (
    <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Shark Tank India Hub. All rights reserved.</p>
        <p>Data is for informational purposes only.</p>
    </footer>
);

const Hero = ({ totalInvestment, totalDeals, mostActiveShark }) => (
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


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [view, setView] = useState('deals'); // 'deals', 'sharks', 'insights'
  const [selectedSharkId, setSelectedSharkId] = useState(null);

  const filteredBrands = useMemo(() => {
    return BRANDS_DATA.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || brand.founders.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || brand.season === parseInt(selectedSeason);
      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchQuery, selectedCategory, selectedSeason]);
  
  const { totalInvestment, totalDeals, mostActiveShark } = useMemo(() => {
    const investment = BRANDS_DATA.reduce((acc, brand) => acc + (brand.deal ? brand.deal.amount : 0), 0);
    const deals = BRANDS_DATA.filter(brand => brand.deal).length;
    
    // FIX: Type the initial value of reduce to ensure `investorCounts` is correctly typed. This prevents downstream errors in the `sort` function.
    // FIX: Use generic parameter for `reduce` for better type inference of the accumulator, which resolves the error on the sort operation below.
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

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') setSelectedBrand(null); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedShark = SHARKS_DATA.find(s => s.id === selectedSharkId);

  const renderContent = () => {
    if (view === 'sharkProfile' && selectedShark) {
      return <SharkProfile shark={selectedShark} allBrands={BRANDS_DATA} onBack={() => setView('sharks')} onSelectBrand={setSelectedBrand} />;
    }
    
    if (view === 'sharks') {
      return (
        <>
            <div className="view-header">
                <h2>Meet the Sharks</h2>
                <p>Click on a shark to view their profile and investment portfolio.</p>
            </div>
            <div className="shark-grid">
                {SHARKS_DATA.map(shark => <SharkCard key={shark.id} shark={shark} onSelect={() => { setSelectedSharkId(shark.id); setView('sharkProfile'); }} />)}
            </div>
        </>
      );
    }
    
    if (view === 'insights') {
        return <InsightsView brands={BRANDS_DATA} />;
    }

    // Default view: 'deals'
    return (
        <>
            <Hero totalInvestment={totalInvestment} totalDeals={totalDeals} mostActiveShark={mostActiveShark} />
            <div className="controls">
                <input type="text" className="search-input" placeholder="Search by brand or founder..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search by brand or founder" />
                <select className="filter-select" value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} aria-label="Filter by season">
                    <option value="all">All Seasons</option>
                    {SEASONS.map(season => <option key={season} value={season}>Season {season}</option>)}
                </select>
                <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} aria-label="Filter by category">
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="brand-grid">
                {filteredBrands.length > 0 ? (
                    filteredBrands.map(brand => <BrandCard key={brand.id} brand={brand} onSelect={setSelectedBrand} />)
                ) : <p>No brands match your criteria.</p>}
            </div>
        </>
    );
  };
  
  return (
    <>
      <Header view={view} setView={setView} />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <BrandDetailModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}