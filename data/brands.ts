import { Brand } from '../types.ts';

export const BRANDS_DATA: Brand[] = [
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

export const CATEGORIES = [...new Set(BRANDS_DATA.map(brand => brand.category))];
export const SEASONS = [...new Set(BRANDS_DATA.map(brand => brand.season))].sort((a,b) => a-b);