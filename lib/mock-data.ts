export interface MetricData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableRow {
  id: string;
  campaign: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  status: 'active' | 'paused' | 'ended';
  date: string;
}

// Generate realistic mock data
export const generateMetrics = (): MetricData[] => {
  const randomValue = (min: number, max: number, prefix = '', suffix = '') =>
    `${prefix}${Math.floor(Math.random() * (max - min + 1) + min).toLocaleString()}${suffix}`;

  const randomPercent = (): { change: string; changeType: 'positive' | 'negative' } => {
    const percent = (Math.random() * 20 - 10).toFixed(1); // -10% to +10%
    const isPositive = parseFloat(percent) >= 0;

    return {
      change: `${isPositive ? '+' : ''}${percent}%`,
      changeType: isPositive ? 'positive' : 'negative',
    };
  };

  return [
    {
      title: 'Total Revenue',
      value: randomValue(500000, 1000000, '$'),
      ...randomPercent(),
      icon: 'TrendingUp',
    },
    {
      title: 'Active Users',
      value: randomValue(100000, 300000),
      ...randomPercent(),
      icon: 'Users',
    },
    {
      title: 'Conversions',
      value: randomValue(5000, 20000),
      ...randomPercent(),
      icon: 'Target',
    },
    {
      title: 'Growth Rate',
      value: randomValue(10, 40, '', '%'),
      ...randomPercent(),
      icon: 'BarChart3',
    },
  ];
};


export const generateLineChartData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    name: month,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    users: Math.floor(Math.random() * 20000) + 15000,
    conversions: Math.floor(Math.random() * 2000) + 800,
    value: Math.floor(Math.random() * 50000) + 30000,
  }));
};

export const generateBarChartData = (): ChartDataPoint[] => [
  { name: 'Google Ads', value: 48293, revenue: 48293 },
  { name: 'Facebook', value: 35742, revenue: 35742 },
  { name: 'Instagram', value: 29834, revenue: 29834 },
  { name: 'LinkedIn', value: 18529, revenue: 18529 },
  { name: 'Twitter', value: 12847, revenue: 12847 },
  { name: 'TikTok', value: 9235, revenue: 9235 },
];

export const generateDonutChartData = (): ChartDataPoint[] => [
  { name: 'Desktop', value: 45, revenue: 385920 },
  { name: 'Mobile', value: 35, revenue: 298473 },
  { name: 'Tablet', value: 20, revenue: 169236 },
];

export const generateTableData = (): TableRow[] => {
  const campaigns = [
    'Summer Sale Campaign',
    'Black Friday Blast',
    'Product Launch',
    'Brand Awareness',
    'Retargeting Campaign',
    'Holiday Special',
    'New Customer Acquisition',
    'Customer Retention',
    'Flash Sale Event',
    'Newsletter Signup',
    'App Install Campaign',
    'Video Ad Campaign',
    'End of Season Sale',
    'Clearance Countdown',
    'Buy One Get One Free',
    'Mega Discount Drive',
    'Weekend Price Drop',
    'Early Bird Deals',
    'Exclusive VIP Offers',
    'Free Shipping Frenzy',
    'Feature Highlight Campaign',
    'Rebranding Launch',
    'Product Upgrade Push',
    'New Collection Reveal',
    'Limited Edition Drop',
    'Beta Access Promotion',
    'Brand Storytelling Series',
    'Cart Abandonment Recovery',
    'Welcome Series for New Users',
    'Win-Back Inactive Users',
    'Loyalty Rewards Program',
    'Upsell/Cross-sell Offer',
    'First-Time Buyer Promo',
    'Referral Program Push',
    'Instagram Engagement Boost',
    'TikTok Influencer Collab',
    'Google Shopping Ads',
    'LinkedIn Lead Generation',
    'YouTube Pre-Roll Campaign',
    'Email Re-Engagement Blast',
    'SMS Flash Deal Alert',
    'Back to School Promo',
    'Valentine’s Day Special',
    'Diwali Dhamaka Deals',
    'Christmas Countdown',
    'New Year’s Resolution Drive',
    'Summer Essentials Push',
    'Monsoon Madness'
  ];
  
  const statuses: Array<'active' | 'paused' | 'ended'> = ['active', 'paused', 'ended'];
  
  return campaigns.map((campaign, index) => ({
    id: `campaign-${index + 1}`,
    campaign,
    impressions: Math.floor(Math.random() * 100000) + 10000,
    clicks: Math.floor(Math.random() * 5000) + 500,
    conversions: Math.floor(Math.random() * 500) + 50,
    revenue: Math.floor(Math.random() * 10000) + 1000,
    ctr: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    cpc: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));
};

// Real-time data simulation
export const updateMetricValue = (currentValue: string): string => {
  const numericValue = parseFloat(currentValue.replace(/[$,%]/g, ''));
  const change = Math.random() * 0.05 + 0.01; // +1% to +6% increase
  const newValue = numericValue * (1 + change);
  
  if (currentValue.includes('$')) {
    return `$${Math.floor(newValue).toLocaleString()}`;
  } else if (currentValue.includes('%')) {
    return `${newValue.toFixed(1)}%`;
  } else {
    return Math.floor(newValue).toLocaleString();
  }
};

// Generate trending data that increases over time
export const generateTrendingMetrics = (baseMetrics: MetricData[]): MetricData[] => {
  return baseMetrics.map(metric => ({
    ...metric,
    value: updateMetricValue(metric.value),
    change: `+${(Math.random() * 10 + 2).toFixed(1)}%`,
    changeType: 'positive' as const,
  }));
};

// Generate dynamic chart data with growth trends
export const generateTrendingLineChartData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let baseRevenue = 30000;
  let baseUsers = 15000;
  let baseConversions = 800;
  
  return months.map((month, index) => {
    // Add growth trend over months
    const growthFactor = 1 + (index * 0.08) + (Math.random() * 0.15);
    baseRevenue = Math.floor(baseRevenue * growthFactor);
    baseUsers = Math.floor(baseUsers * (1 + (index * 0.05) + (Math.random() * 0.1)));
    baseConversions = Math.floor(baseConversions * (1 + (index * 0.03) + (Math.random() * 0.08)));
    
    return {
      name: month,
      revenue: baseRevenue,
      users: baseUsers,
      conversions: baseConversions,
      value: baseRevenue,
    };
  });
};

// Generate dynamic bar chart data with realistic growth
export const generateTrendingBarChartData = (): ChartDataPoint[] => {
  const platforms = [
    { name: 'Google Ads', base: 48293 },
    { name: 'Facebook', base: 35742 },
    { name: 'Instagram', base: 29834 },
    { name: 'LinkedIn', base: 18529 },
    { name: 'Twitter', base: 12847 },
    { name: 'TikTok', base: 9235 },
  ];
  
  return platforms.map(platform => {
    const growthFactor = 1 + (Math.random() * 0.3 + 0.1); // 10-40% growth
    const newValue = Math.floor(platform.base * growthFactor);
    return {
      name: platform.name,
      value: newValue,
      revenue: newValue,
    };
  });
};
