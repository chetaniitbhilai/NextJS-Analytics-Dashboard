"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { DataTable } from "@/components/dashboard/data-table";
import {
  generateMetrics,
  generateLineChartData,
  generateBarChartData,
  generateDonutChartData,
  generateTableData,
  generateTrendingMetrics,
  generateTrendingLineChartData,
  generateTrendingBarChartData,
} from "@/lib/mock-data";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(generateMetrics());
  const [lineChartData, setLineChartData] = useState(generateLineChartData());
  const [barChartData, setBarChartData] = useState(generateBarChartData());
  const [donutChartData, setDonutChartData] = useState(generateDonutChartData());
  const [tableData, setTableData] = useState(generateTableData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setMetrics(prevMetrics => generateTrendingMetrics(prevMetrics));
      setLineChartData(generateTrendingLineChartData());
      setBarChartData(generateTrendingBarChartData());
      setLastUpdated(new Date());
    }, 15000); // Update every 15 seconds for more dynamic feel

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRefresh = () => {
    setMetrics(generateMetrics());
    setLineChartData(generateLineChartData());
    setBarChartData(generateBarChartData());
    setDonutChartData(generateDonutChartData());

    setTableData(generateTableData());
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader 
          onRefresh={handleRefresh} 
          lastUpdated={lastUpdated} 
          exportData={tableData} // 👈 Pass the table data here
        />
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} data={metric} isLoading={isLoading} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <AnalyticsChart
            title="Revenue & Users Trend"
            description="Monthly performance over time"
            data={lineChartData}
            type="line"
            isLoading={isLoading}
          />
          <AnalyticsChart
            title="Revenue by Platform"
            description="Performance across different channels"
            data={barChartData}
            type="bar"
            isLoading={isLoading}
          />
          <AnalyticsChart
            title="Traffic by Device"
            description="User distribution across devices"
            data={donutChartData}
            type="donut"
            isLoading={isLoading}
          />
        </div>

        {/* Data Table */}
        <div className="mb-8">
          <DataTable data={tableData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}