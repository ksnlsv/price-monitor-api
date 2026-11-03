import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils';

export const PriceChart = ({ data }) => {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" className="dark:stroke-neutral-800" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
          <Tooltip content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 rounded shadow-lg text-xs font-mono">
                  <p className="font-semibold mb-1">{label}</p>
                  <p>Мин: {formatCurrency(payload[0].value)}</p>
                </div>
              );
            }
            return null;
          }} />
          <Area type="monotone" dataKey="minPrice" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorMin)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};