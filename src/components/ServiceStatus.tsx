'use client';

import React from 'react';
import { getStatusColor } from '@/lib/uptimeRobotAPI';
import { MonitorCard } from './MonitorCard';
import type { V3Monitor } from '@/lib/uptimeRobotAPI';

interface ServiceStatusProps {
  name: string;
  status: 'online' | 'offline' | 'error';
  uptimePercentage: number;
  monitors: V3Monitor[];
  lastUpdated: string;
}

export const ServiceStatus: React.FC<ServiceStatusProps> = ({
  name,
  status,
  uptimePercentage,
  monitors,
  lastUpdated,
}) => {
  const statusColor = getStatusColor(status);
  const lastUpdatedTime = new Date(lastUpdated).toLocaleString();

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600 mt-1">Last updated: {lastUpdatedTime}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-600 text-sm">Uptime (24h)</p>
              <p className="text-3xl font-bold text-green-600">{uptimePercentage.toFixed(2)}%</p>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${statusColor}`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitors.length > 0 ? (
          monitors.map((monitor) => <MonitorCard key={monitor.id} monitor={monitor} />)
        ) : (
          <div className="col-span-full bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 font-semibold">No monitors found or error loading data</p>
            <p className="text-yellow-700 text-sm mt-2">Make sure NEXT_PUBLIC_UPTIME_ROBOT_TOKEN is set in .env.local</p>
          </div>
        )}
      </div>
    </div>
  );
};
