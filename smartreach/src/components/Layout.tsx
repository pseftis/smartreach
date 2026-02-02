import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import styles from './Layout.module.css'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/campaigns', label: 'Campaigns', icon: '📧' },
  { to: '/workflows', label: 'Workflows', icon: '⚡' },
  { to: '/segments', label: 'Segments', icon: '🎯' },
  { to: '/analytics', label: 'Analytics', icon: '📈' },
]

export default function Layout() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>◆</span>
          <span className={styles.brandName}>SmartReach</span>
        </div>
        <nav className={styles.nav}>
          {nav.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')
              }
            >
              <span className={styles.navIcon}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.kpiPill}>
            <span>Engagement</span>
            <strong>+45%</strong>
          </div>
          <div className={styles.kpiPill}>
            <span>Setup time</span>
            <strong>-60%</strong>
          </div>
          <div className={styles.kpiPill}>
            <span>Visibility</span>
            <strong>+70%</strong>
          </div>
          <div className={styles.kpiPill}>
            <span>Conversion</span>
            <strong>+35%</strong>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Campaign Intelligence</h1>
          <div className={styles.headerActions}>
            <span className={styles.liveBadge}>● Live</span>
            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
