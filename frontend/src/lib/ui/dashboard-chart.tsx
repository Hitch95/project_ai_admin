'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function DashboardChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex items-center justify-center h-[350px] w-full bg-muted/20 rounded-md'>
        <p className='text-muted-foreground'>Loading chart...</p>
      </div>
    );
  }

  return (
    <div className='h-[350px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <Tooltip
            formatter={(value) => [`${value}`, 'Users']}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Bar
            dataKey='total'
            fill='hsl(var(--primary))'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const data = [
  {
    name: 'Jan',
    total: 450,
  },
  {
    name: 'Feb',
    total: 635,
  },
  {
    name: 'Mar',
    total: 582,
  },
  {
    name: 'Apr',
    total: 728,
  },
  {
    name: 'May',
    total: 856,
  },
  {
    name: 'Jun',
    total: 924,
  },
  {
    name: 'Jul',
    total: 1052,
  },
  {
    name: 'Aug',
    total: 910,
  },
  {
    name: 'Sep',
    total: 975,
  },
  {
    name: 'Oct',
    total: 1108,
  },
  {
    name: 'Nov',
    total: 1425,
  },
  {
    name: 'Dec',
    total: 1680,
  },
];
