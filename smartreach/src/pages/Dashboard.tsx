import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import styles from './Dashboard.module.css'

const engagementData = [
  { day: 'Mon', open: 42, click: 18, conv: 8 },
  { day: 'Tue', open: 48, click: 22, conv: 10 },
  { day: 'Wed', open: 45, click: 20, conv: 9 },
  { day: 'Thu', open: 52, click: 25, conv: 12 },
  { day: 'Fri', open: 55, click: 28, conv: 14 },
  { day: 'Sat', open: 38, click: 15, conv: 6 },
  { day: 'Sun', open: 44, click: 19, conv: 8 },
]

const realtimeData = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 95 },
  { time: '08:00', value: 210 },
  { time: '12:00', value: 340 },
  { time: '16:00', value: 280 },
  { time: '20:00', value: 190 },
  { time: '24:00', value: 150 },
]

const kpis = [
  { label: 'Engagement lift', value: '+45%', sub: 'vs manual campaigns', trend: 'up' },
  { label: 'Setup time saved', value: '-60%', sub: 'rule-based workflows', trend: 'up' },
  { label: 'Campaign visibility', value: '+70%', sub: 'real-time analytics', trend: 'up' },
  { label: 'Conversion efficiency', value: '+35%', sub: 'behavior segmentation', trend: 'up' },
]

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Marketing Automation & Campaign Intelligence</h2>
        <p className={styles.subtitle}>
          Automated personalized campaigns, real-time analytics, and behavior-based segmentation.
        </p>
      </section>

      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpiCard}>
            <span className={styles.kpiLabel}>{k.label}</span>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiSub}>{k.sub}</span>
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Campaign performance (last 7 days)</h3>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={engagementData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="open" stroke="var(--accent)" strokeWidth={2} name="Opens %" dot={{ fill: 'var(--accent)' }} />
                <Line type="monotone" dataKey="click" stroke="var(--success)" strokeWidth={2} name="Clicks %" dot={{ fill: 'var(--success)' }} />
                <Line type="monotone" dataKey="conv" stroke="var(--warning)" strokeWidth={2} name="Conversions %" dot={{ fill: 'var(--warning)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Real-time activity (today)</h3>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={realtimeData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" fill="url(#areaGrad)" strokeWidth={2} name="Events" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <p>Create your first personalized campaign or set up a rule-based workflow from Campaigns and Workflows.</p>
      </div>
    </div>
  )
}
