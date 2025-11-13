import React, { useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { BaseChart } from '../components/common/BaseChart.tsx';
import { CHART_COLORS } from '../constants.ts';
import type { Brand } from '../types.ts';

Chart.register(...registerables);

interface InsightsViewProps {
    brands: Brand[];
}

export const InsightsView: React.FC<InsightsViewProps> = ({ brands }) => {
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
        <>
            <div className="view-header">
                <h2>Show Insights</h2>
                <p>A high-level overview of statistics from Shark Tank India, visualizing deal trends, investments, and category popularity.</p>
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
                     <div className="chart-wrapper-full">
                       <BaseChart chartId="categoryDistribution" type="bar" data={categoryDistributionData} options={{...commonChartOptions, indexAxis: 'y'}} />
                    </div>
                </div>
            </div>
        </>
    );
};