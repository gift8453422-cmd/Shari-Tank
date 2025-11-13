import React from 'react';

interface EmptyStateProps {
    message?: string;
    details?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
    message = "No Results Found", 
    details = "Try adjusting your search or filter criteria." 
}) => {
    return (
        <div className="empty-state">
            <span className="empty-state-icon" role="img" aria-label="Magnifying glass">🔍</span>
            <h3>{message}</h3>
            <p>{details}</p>
        </div>
    );
};
