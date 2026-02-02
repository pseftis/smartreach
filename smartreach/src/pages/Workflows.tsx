import { useState } from 'react'
import { useWorkflows } from '../lib/data'
import styles from './Workflows.module.css'

export default function Workflows() {
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all')
  const { data: workflows, loading, error } = useWorkflows()

  const filtered = workflows.filter((w) => {
    if (filter === 'all') return true
    return w.status.toLowerCase() === filter
  })

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h2 className={styles.title}>Rule-based workflows</h2>
        <p className={styles.subtitle}>
          Reduce manual campaign setup time by ~60% with triggers, conditions, and automated steps.
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
          <button className={styles.primaryBtn}>+ New workflow</button>
        </div>
      </section>

      {error && <p className={styles.errorMsg}>{error}</p>}
      {loading ? (
        <p className={styles.loading}>Loading workflows…</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((w) => (
            <div key={w.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{w.name}</h3>
                <span className={w.status === 'Active' ? styles.badgeActive : styles.badgeDraft}>{w.status}</span>
              </div>
              <dl className={styles.meta}>
                <dt>Trigger</dt>
                <dd>{w.triggers}</dd>
                <dt>Steps</dt>
                <dd>{w.steps}</dd>
                <dt>Time saved</dt>
                <dd className={w.saved && w.saved !== '—' ? styles.saved : ''}>{w.saved ?? '—'}</dd>
              </dl>
              <div className={styles.cardActions}>
                <button type="button" className={styles.editBtn}>Edit</button>
                <button type="button" className={styles.dupeBtn}>Duplicate</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
