'use client';

import { V3Monitor } from '@/lib/uptimeRobotAPI';
import { getMonitorStatus, getStatusColor } from '@/lib/uptimeRobotAPI';

interface MonitorCardProps {
  monitor: V3Monitor;
}

export const MonitorCard: React.FC<MonitorCardProps> = ({ monitor }) => {
  const statusText = getMonitorStatus(monitor.status);
  const statusColor = getStatusColor(statusText);

  // Calculate uptime from histogram
  let uptimeText = '0.00';
  if (
    monitor.lastDayUptimes &&
    monitor.lastDayUptimes.histogram &&
    monitor.lastDayUptimes.histogram.length > 0
  ) {
    const totalUptime = monitor.lastDayUptimes.histogram.reduce(
      (sum, h) => sum + h.uptime,
      0
    );
    const averageUptime = totalUptime / monitor.lastDayUptimes.histogram.length;
    uptimeText = averageUptime.toFixed(2);
  }

  const createdDate = monitor.createDateTime
    ? new Date(monitor.createDateTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 break-words">{monitor.friendlyName}</h3>
          <p className="text-sm text-gray-500 mt-1">Monitor ID: {monitor.id}</p>
          <p className="text-xs text-gray-400 mt-1 break-all">{monitor.url}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border whitespace-nowrap ml-2 ${statusColor}`}>
          {statusText.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">Uptime (24h)</p>
          <p className="text-2xl font-bold text-green-600">{uptimeText}%</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Status</p>
          <p className="text-sm text-gray-700 font-semibold">{monitor.status || 'Unknown'}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Created: {createdDate}
        </p>
      </div>
    </div>
  );
};
