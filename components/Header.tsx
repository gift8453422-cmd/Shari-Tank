import React from 'react';

interface HeaderProps {
    currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => (
    <header className="app-header">
        <div className="header-content">
            <div className="logo">Shark Tank India Hub</div>
            <nav className="main-nav">
                <a 
                    href="#/deals"
                    className={`nav-link ${currentPath === 'deals' ? 'active' : ''}`} 
                >
                    Deals
                </a>
                <a 
                    href="#/sharks"
                    className={`nav-link ${currentPath === 'sharks' ? 'active' : ''}`}
                >
                    Sharks
                </a>
                <a 
                    href="#/insights"
                    className={`nav-link ${currentPath === 'insights' ? 'active' : ''}`} 
                >
                    Insights
                </a>
            </nav>
        </div>
    </header>
);