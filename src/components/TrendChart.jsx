import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-ocean/20 bg-white/90 px-3 py-2 text-sm shadow-glow backdrop-blur-sm dark:bg-slate-900/90">
      <p className="font-bold text-ocean dark:text-cyan-400">{Number(payload[0].value).toFixed(4)}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

export default function TrendChart({ data }) {
  const avg = data.length
    ? data.reduce((s, d) => s + d.rate, 0) / data.length
    : null;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1f7a8c" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          {avg && (
            <ReferenceLine
              y={avg}
              stroke="#f6b73c"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{ value: 'avg', position: 'right', fill: '#f6b73c', fontSize: 10 }}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="url(#lineGrad)"
            strokeWidth={3}
            dot={{ r: 4, fill: '#1f7a8c', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#7c3aed', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
