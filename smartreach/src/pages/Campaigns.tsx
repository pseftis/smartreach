import { useState } from 'react'
import { useCampaigns } from '../lib/data'
import styles from './Campaigns.module.css'

export default function Campaigns() {
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all')
  const { data: campaigns, loading, error } = useCampaigns()

  const filtered = campaigns.filter((c) => {
    if (filter === 'all') return true
    return c.status.toLowerCase() === filter
  })

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h2 className={styles.title}>Personalized campaigns</h2>
        <p className={styles.subtitle}>
          Automated personalized campaigns increasing engagement by ~45%. Create and manage email, push, and in-app flows.
        </p>
        <div className={styles.actions}>
          <div className={styles.filters}>
            {(['all', 'active', 'draft'] as const).map((f) => (
              <button
                key={f}
                className={filter === f ? styles.filterActive : styles.filterBtn}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Draft'}
              </button>
            ))}
          </div>
          <button className={styles.primaryBtn}>+ New campaign</button>
        </div>
      </section>

      {error && <p className={styles.errorMsg}>{error}</p>}
      {loading ? (
        <p className={styles.loading}>Loading campaigns…</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Status</th>
                <th>Segment</th>
                <th>Sent</th>
                <th>Engagement</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>{c.type}</td>
                  <td>
                    <span className={c.status === 'Active' ? styles.badgeActive : styles.badgeDraft}>{c.status}</span>
                  </td>
                  <td>{c.segment ?? '—'}</td>
                  <td>{c.sent ?? '—'}</td>
                  <td className={c.engagement && c.engagement !== '—' ? styles.engagementUp : ''}>{c.engagement ?? '—'}</td>
                  <td>
                    <button type="button" className={styles.rowBtn}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
