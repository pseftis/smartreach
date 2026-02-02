import { useState } from 'react'
import { useSegments } from '../lib/data'
import styles from './Segments.module.css'

export default function Segments() {
  const [filter, setFilter] = useState<'all' | 'behavior' | 'value'>('all')
  const { data: segments, loading, error } = useSegments()

  const filtered = segments.filter((s) => {
    if (filter === 'all') return true
    return s.type.toLowerCase() === filter
  })

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h2 className={styles.title}>Behavior-based segmentation</h2>
        <p className={styles.subtitle}>
          Boost conversion efficiency by ~35% with segments built on behavior, intent, and value.
        </p>
        <div className={styles.actions}>
          <div className={styles.filters}>
            {(['all', 'behavior', 'value'] as const).map((f) => (
              <button
                key={f}
                className={filter === f ? styles.filterActive : styles.filterBtn}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'behavior' ? 'Behavior' : 'Value'}
              </button>
            ))}
          </div>
          <button className={styles.primaryBtn}>+ New segment</button>
        </div>
      </section>

      {error && <p className={styles.errorMsg}>{error}</p>}
      {loading ? (
        <p className={styles.loading}>Loading segments…</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Segment</th>
                <th>Type</th>
                <th>Rules</th>
                <th>Size</th>
                <th>Conversion lift</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.name}</strong>
                  </td>
                  <td>
                    <span className={styles.typeBadge}>{s.type}</span>
                  </td>
                  <td className={styles.rules}>{s.rules}</td>
                  <td>{s.size ?? '—'}</td>
                  <td className={styles.convLift}>{s.conv_lift ?? '—'}</td>
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
