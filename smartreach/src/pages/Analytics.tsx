import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import styles from './Analytics.module.css'

const channelData = [
  { channel: 'Email', opens: 42, clicks: 18, conv: 8 },
  { channel: 'Push', opens: 38, clicks: 22, conv: 12 },
  { channel: 'In-app', opens: 55, clicks: 28, conv: 14 },
  { channel: 'SMS', opens: 72, clicks: 35, conv: 18 },
]

const segmentPie = [
  { name: 'New signups', value: 24, color: 'var(--accent)' },
  { name: 'Abandoned cart', value: 18, color: 'var(--success)' },
  { name: 'High intent', value: 22, color: 'var(--warning)' },
  { name: 'Inactive', value: 20, color: 'var(--text-muted)' },
  { name: 'VIP', value: 16, color: '#a78bfa' },
]

export default function Analytics() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h2 className={styles.title}>Real-time analytics</h2>
        <p className={styles.subtitle}>
          Improved campaign visibility by ~70% with live performance by channel and segment.
        </p>
      </section>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Performance by channel</h3>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={channelData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="channel" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                />
                <Bar dataKey="opens" fill="var(--accent)" name="Opens %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="var(--success)" name="Clicks %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conv" fill="var(--warning)" name="Conv %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Reach by segment</h3>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={segmentPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {segmentPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                  formatter={(value: number | undefined) => [value != null ? `${value}%` : '—', 'Reach']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Total campaigns</span>
          <span className={styles.metricValue}>24</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Active workflows</span>
          <span className={styles.metricValue}>12</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Segments</span>
          <span className={styles.metricValue}>8</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Avg. visibility lift</span>
          <span className={styles.metricValueGreen}>+70%</span>
        </div>
      </div>
    </div>
  )
}
