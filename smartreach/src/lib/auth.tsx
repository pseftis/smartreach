import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from './supabase'

const AUTH_KEY = 'smartreach_auth'

// Demo mode: localStorage
export function setAuthenticated(value: boolean): void {
  if (value) localStorage.setItem(AUTH_KEY, '1')
  else localStorage.removeItem(AUTH_KEY)
}

function getDemoAuthenticated(): boolean {
  return !!localStorage.getItem(AUTH_KEY)
}

type AuthContextValue = {
  loading: boolean
  authenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthState] = useState(false)

  const refreshAuth = useCallback(() => {
    if (hasSupabaseConfig) {
      supabase.auth.getSession().then((res) => {
        setAuthState(!!res.data.session)
      })
    } else {
      setAuthState(getDemoAuthenticated())
    }
  }, [])

  useEffect(() => {
    if (hasSupabaseConfig) {
      supabase.auth.getSession().then((res) => {
        setAuthState(!!res.data.session)
        setLoading(false)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(() => refreshAuth())
      return () => subscription.unsubscribe()
    } else {
      setAuthState(getDemoAuthenticated())
      setLoading(false)
    }
  }, [refreshAuth])

  const signOut = useCallback(async () => {
    if (hasSupabaseConfig) {
      await supabase.auth.signOut()
    } else {
      setAuthenticated(false)
      setAuthState(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ loading, authenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
