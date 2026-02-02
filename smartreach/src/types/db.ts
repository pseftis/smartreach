export type Campaign = {
  id: string
  user_id: string
  name: string
  type: string
  status: string
  segment: string | null
  sent: string | null
  engagement: string | null
  created_at?: string
}

export type Workflow = {
  id: string
  user_id: string
  name: string
  triggers: string
  steps: number
  status: string
  saved: string | null
  created_at?: string
}

export type Segment = {
  id: string
  user_id: string
  name: string
  type: string
  rules: string
  size: string | null
  conv_lift: string | null
  created_at?: string
}
