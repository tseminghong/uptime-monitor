import axios from 'axios';

export interface V3Monitor {
  id: number;
  friendlyName: string;
  status: string | null;
  url: string;
  lastDayUptimes: {
    bucketSize: number;
    histogram: Array<{ timestamp: number; uptime: number }>;
  };
  createDateTime: string | null;
}

export interface V3MonitorResponse {
  data: V3Monitor[];
  nextLink?: string;
}

interface StatusData {
  name: string;
  monitorId: string;
  monitors: V3Monitor[];
  status: 'online' | 'offline' | 'error';
  lastUpdated: string;
  uptimePercentage: number;
}

const API_BASE_URL = 'https://api.uptimerobot.com/v3/monitors';

// Get the API token from environment
const getApiToken = (): string => {
  return process.env.NEXT_PUBLIC_UPTIME_ROBOT_TOKEN || '';
};

const getMonitorById = async (monitorId: string): Promise<V3Monitor | null> => {
  try {
    const token = getApiToken();
    if (!token) {
      throw new Error('API token not configured');
    }

    const response = await axios.get<{ data: V3Monitor[] }>(
      `${API_BASE_URL}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.data && Array.isArray(response.data.data)) {
      // Find monitor matching the ID
      const monitor = response.data.data.find((m) => m.id === parseInt(monitorId));
      return monitor || null;
    }
    throw new Error('Invalid API response');
  } catch (error) {
    console.error('Error fetching monitor:', error);
    throw error;
  }
};

export const getStatusData = async (): Promise<StatusData[]> => {
  const statusConfigs = [
    {
      name: 'Main API',
      monitorId: process.env.NEXT_PUBLIC_MAIN_API_KEY || '',
    },
    {
      name: 'DSE Website',
      monitorId: process.env.NEXT_PUBLIC_DSE_WEBSITE_API_KEY || '',
    },
    {
      name: 'HPCCSS Site',
      monitorId: process.env.NEXT_PUBLIC_HPCCSS_SITE_API_KEY || '',
    },
    {
      name: 'ICT Website',
      monitorId: process.env.NEXT_PUBLIC_ICT_WEBSITE_API_KEY || '',
    },
  ];

  const results: StatusData[] = [];

  for (const config of statusConfigs) {
    try {
      const monitor = await getMonitorById(config.monitorId);

      if (!monitor) {
        throw new Error('Monitor not found');
      }

      // Determine status (online/offline)
      const overallStatus: 'online' | 'offline' | 'error' =
        monitor.status === 'ACTIVE' ? 'online' : 'offline';

      // Calculate average uptime from histogram
      let uptimePercentage = 0;
      if (
        monitor.lastDayUptimes &&
        monitor.lastDayUptimes.histogram &&
        monitor.lastDayUptimes.histogram.length > 0
      ) {
        const totalUptime = monitor.lastDayUptimes.histogram.reduce(
          (sum, h) => sum + h.uptime,
          0
        );
        uptimePercentage =
          totalUptime / monitor.lastDayUptimes.histogram.length;
      }

      results.push({
        name: config.name,
        monitorId: config.monitorId,
        monitors: monitor ? [monitor] : [],
        status: overallStatus,
        lastUpdated: new Date().toISOString(),
        uptimePercentage,
      });
    } catch (error) {
      console.error(`Error fetching status for ${config.name}:`, error);
      results.push({
        name: config.name,
        monitorId: config.monitorId,
        monitors: [],
        status: 'error',
        lastUpdated: new Date().toISOString(),
        uptimePercentage: 0,
      });
    }
  }

  return results;
};

export const getMonitorStatus = (statusCode: string | null): string => {
  if (!statusCode) return 'unknown';
  
  switch (statusCode.toUpperCase()) {
    case 'ACTIVE':
      return 'online';
    case 'PAUSED':
      return 'paused';
    case 'INACTIVE':
      return 'offline';
    default:
      return 'unknown';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'online':
    case 'active':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'down':
    case 'offline':
    case 'inactive':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'error':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};
