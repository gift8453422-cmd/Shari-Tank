import React from 'react';
import { SharkCard } from '../components/SharkCard.tsx';
import { SHARKS_DATA } from '../data/sharks.ts';

export const SharksView: React.FC = () => {
  return (
    <>
      <div className="view-header">
        <h2>Meet the Sharks</h2>
        <p>Click on a shark to view their profile and investment portfolio.</p>
      </div>
      <div className="shark-grid">
        {SHARKS_DATA.map(shark => (
          <SharkCard 
            key={shark.id} 
            shark={shark}
          />
        ))}
      </div>
    </>
  );
};