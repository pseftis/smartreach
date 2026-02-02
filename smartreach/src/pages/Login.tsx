import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { supabase, hasSupabaseConfig } from '../lib/supabase'
import { setAuthenticated } from '../lib/auth'
import { useAuth } from '../lib/auth'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const { authenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please enter email and password.')
      return
    }
    setSubmitting(true)
    try {
      if (hasSupabaseConfig) {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (err) {
          setError(err.message ?? 'Sign in failed.')
          return
        }
        navigate('/dashboard', { replace: true })
      } else {
        setAuthenticated(true)
        navigate('/dashboard', { replace: true })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>◆</span>
          <span className={styles.brandName}>SmartReach</span>
        </div>
        <p className={styles.tagline}>Marketing Automation & Campaign Intelligence</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footer}>
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
