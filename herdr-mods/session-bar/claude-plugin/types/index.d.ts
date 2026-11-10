export type Meter = { label: string; percent: number }

export type Info = { model: string; effort: string | null; window: number | null; branch: string | null; dirty: boolean; meters: Meter[]; isRouted: boolean; router: 'on' | 'off' | null }

declare module 'claude-code' {
  interface PluginState {
    'session-bar': { info: Info | null }
  }
}
