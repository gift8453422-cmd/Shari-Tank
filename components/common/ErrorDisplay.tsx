import React from 'react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="error-display">
      <span>{error}</span>
    </div>
  );
};
