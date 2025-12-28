import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Artwork } from '../types/artwork';

ChartJS.register(ArcElement, Tooltip, Legend);

interface VisualizationChartProps {
  artworks: Artwork[];
}

const VisualizationChart: React.FC<VisualizationChartProps> = ({ artworks }) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (artworks.length === 0) return;

    // Compter les départements
    const departmentCount: Record<string, number> = {};
    
    artworks.forEach((artwork) => {
      const department = artwork.department || 'Non spécifié';
      departmentCount[department] = (departmentCount[department] || 0) + 1;
    });

    // Convertir en format pour le graphique
    const departments = Object.keys(departmentCount);
    const counts = departments.map((dept) => departmentCount[dept]);
    
    // Générer des couleurs
    const backgroundColors = departments.map(() => 
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
    );
    
    const borderColors = backgroundColors.map((color) => 
      color.replace('0.6', '1')
    );

    setChartData({
      labels: departments,
      datasets: [
        {
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  }, [artworks]);

  if (artworks.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <h3>Répartition des œuvres par département</h3>
      <div className="pie-chart-wrapper">
        <Pie 
          data={chartData} 
          options={{
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default VisualizationChart;
