import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from './supabase'
import type { Campaign, Workflow, Segment } from '../types/db'

// Mock data for demo mode (no Supabase config)
const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', user_id: '', name: 'Welcome series', type: 'Email', status: 'Active', segment: 'New signups', sent: '12.4k', engagement: '+48%' },
  { id: '2', user_id: '', name: 'Cart abandonment', type: 'Email', status: 'Active', segment: 'Abandoned cart', sent: '8.2k', engagement: '+52%' },
  { id: '3', user_id: '', name: 'Product recommendations', type: 'Push', status: 'Active', segment: 'High intent', sent: '24.1k', engagement: '+41%' },
  { id: '4', user_id: '', name: 'Re-engagement', type: 'Email', status: 'Draft', segment: 'Inactive 30d', sent: '—', engagement: '—' },
]

const MOCK_WORKFLOWS: Workflow[] = [
  { id: '1', user_id: '', name: 'Signup → Welcome email', triggers: 'User signs up', steps: 3, status: 'Active', saved: '~58% time' },
  { id: '2', user_id: '', name: 'Cart abandon → Reminder', triggers: 'Cart idle 1h', steps: 4, status: 'Active', saved: '~62% time' },
  { id: '3', user_id: '', name: 'Purchase → Thank you + upsell', triggers: 'Order completed', steps: 5, status: 'Active', saved: '~55% time' },
  { id: '4', user_id: '', name: 'Inactive → Re-engage', triggers: 'No activity 14d', steps: 2, status: 'Draft', saved: '—' },
]

const MOCK_SEGMENTS: Segment[] = [
  { id: '1', user_id: '', name: 'New signups', type: 'Behavior', rules: 'Signed up in last 7 days', size: '2.4k', conv_lift: '+38%' },
  { id: '2', user_id: '', name: 'Abandoned cart', type: 'Behavior', rules: 'Added to cart, no purchase in 24h', size: '1.1k', conv_lift: '+52%' },
  { id: '3', user_id: '', name: 'High intent', type: 'Behavior', rules: 'Viewed product 3+ times, no purchase', size: '3.2k', conv_lift: '+44%' },
  { id: '4', user_id: '', name: 'Inactive 30d', type: 'Behavior', rules: 'No login or click in 30 days', size: '8.1k', conv_lift: '+28%' },
  { id: '5', user_id: '', name: 'VIP customers', type: 'Value', rules: 'LTV > $500, last 90 days', size: '420', conv_lift: '+61%' },
]

export function useCampaigns() {
  const [data, setData] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setData(MOCK_CAMPAIGNS)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          setError(res.error.message)
          setData([])
        } else {
          setData((res.data as Campaign[]) ?? [])
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}

export function useWorkflows() {
  const [data, setData] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setData(MOCK_WORKFLOWS)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false })
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          setError(res.error.message)
          setData([])
        } else {
          setData((res.data as Workflow[]) ?? [])
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}

export function useSegments() {
  const [data, setData] = useState<Segment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setData(MOCK_SEGMENTS)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('segments')
      .select('*')
      .order('created_at', { ascending: false })
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          setError(res.error.message)
          setData([])
        } else {
          setData((res.data as Segment[]) ?? [])
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
