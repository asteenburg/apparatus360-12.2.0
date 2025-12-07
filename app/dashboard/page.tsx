'use client';

import Nav from '../Nav';
import { useState, useEffect, useMemo } from 'react';
// 1. Import the Bar component and required Chart.js features
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// --- TYPE DEFINITIONS (Ensure these are available globally or defined here) ---
interface InspectionItem {
    status: "Defect" | "OK";
    notes: string;
    checkTimestamp: string | null;
}
interface TruckInspection {
    truck_id: number;
    inspector_name: string;
    timestamp: string;
    results: Record<string, InspectionItem>; 
}
// --- END TYPE DEFINITIONS ---

export default function InspectionDashboard() {
    const [inspections, setInspections] = useState<TruckInspection[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Load data from LocalStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedInspections = localStorage.getItem("inspections");
            if (storedInspections) {
                try {
                    const parsed: TruckInspection[] = JSON.parse(storedInspections);
                    // Sort by timestamp descending
                    parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                    setInspections(parsed);
                } catch (e) {
                    console.error("Error parsing inspections from localStorage:", e);
                }
            }
        }
        setIsLoading(false);
    }, []);

    // 2. Process data for table and chart using useMemo
    const processedData = useMemo(() => {
        const labels: string[] = [];
        const okCounts: number[] = [];
        const defectCounts: number[] = [];
        let totalOk: number = 0;
        let totalDefects: number = 0;

        inspections.forEach((i) => {
            let ok = 0, defects = 0;
            
            // Loop through all inspection results (items) to count status
            Object.values(i.results).forEach((item) => {
                if (item.status === "OK") ok++;
                else if (item.status === "Defect") defects++;
            });

            okCounts.push(ok);
            defectCounts.push(defects);
            labels.push(`Truck ${i.truck_id}`);

            totalOk += ok;
            totalDefects += defects;
        });

        return { labels, okCounts, defectCounts, totalOk, totalDefects };
    }, [inspections]);

    // 3. Prepare Chart Data Object (React-Chartjs-2 Format)
    const chartData = {
        labels: processedData.labels,
        datasets: [
            { 
                label: "OK", 
                data: processedData.okCounts, 
                backgroundColor: "rgba(16, 185, 129, 0.7)", // Tailwind green-500 equivalent
            },
            { 
                label: "Defect", 
                data: processedData.defectCounts, 
                backgroundColor: "rgba(239, 68, 68, 0.7)", // Tailwind red-500 equivalent
            },
        ],
    };

    // 4. Chart Options
    const chartOptions = {
        responsive: true,
        plugins: { 
            legend: { 
                position: 'top' as const, // Chart.js type fix
                labels: { font: { size: 14 } }
            },
            title: {
                display: true,
                text: 'Inspection Status by Truck',
                font: { size: 16 }
            }
        },
        scales: { 
            y: { 
                beginAtZero: true,
                title: { display: true, text: 'Count' }
            },
        },
    };

    if (isLoading) {
        return <div className="p-4 text-center">Loading inspection data...</div>;
    }

    if (inspections.length === 0) {
        return (
            <div id="no-data-message" className="p-4 text-center text-xl text-gray-500">
                No inspections saved yet.
            </div>
        );
    }

    // 5. JSX Rendering (Using the <Bar> component)
    return (
        <div className="p-6 max-w-5xl mt-10 mx-auto">
            <h2 className="text-3xl font-bold my-6 text-gray-800">📊 Inspection Dashboard</h2>

            {/* Chart Area */}
            <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 border border-gray-100">
                {/* Replaced <canvas> with the <Bar> component */}
                <Bar options={chartOptions} data={chartData} /> 
            </div>
            
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">📋 Recent Inspections</h3>
            
            {/* Table Area */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-100">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left border-b">Truck ID</th>
                            <th className="py-3 px-6 text-left border-b">OK Items</th>
                            <th className="py-3 px-6 text-left border-b">Defects</th>
                            <th className="py-3 px-6 text-left border-b">Inspector</th>
                            <th className="py-3 px-6 text-left border-b">Date/Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {inspections.map((i, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{i.truck_id}</td>
                                <td className="py-3 px-6 text-left text-green-600">{processedData.okCounts[index]}</td>
                                <td className="py-3 px-6 text-left text-red-600">{processedData.defectCounts[index]}</td>
                                <td className="py-3 px-6 text-left">{i.inspector_name}</td>
                                <td className="py-3 px-6 text-left">
                                    {new Date(i.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {/* Totals Row */}
                        <tr className="bg-gray-200 font-extrabold text-gray-800 border-t-4 border-gray-300">
                            <td className="py-3 px-6 text-left">TOTALS</td>
                            <td className="py-3 px-6 text-left text-green-800" id="total-ok">
                                {processedData.totalOk}
                            </td>
                            <td className="py-3 px-6 text-left text-red-800" id="total-defects">
                                {processedData.totalDefects}
                            </td>
                            <td className="py-3 px-6 text-left" colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}