/**
 * @file types/index — Complete shared type system.
 */

// ─── Puck ───────────────────────────────────────────────────────────────
export interface PuckPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  puck_data: PuckData;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PuckData {
  content: PuckBlock[];
  root: { props: Record<string, unknown> };
  zones?: Record<string, PuckBlock[]>;
}

export interface PuckBlock {
  type: string;
  props: Record<string, unknown> & { id: string };
}

// ─── Design Tokens ────────────────────────────────────────────────────────
export interface DesignTokens {
  '--pm-bg': string;
  '--pm-bg-2': string;
  '--pm-bg-3': string;
  '--pm-border': string;
  '--pm-accent': string;
  '--pm-accent-fg': string;
  '--pm-text': string;
  '--pm-text-muted': string;
  '--pm-radius': string;
  '--pm-font': string;
}

export interface GeneratedTheme {
  name: string;
  description: string;
  tokens: DesignTokens;
  darkMode: boolean;
  previewGradient: string;
}

// ─── AI ───────────────────────────────────────────────────────────────────
export type AIStyle = 'luxury' | 'casual' | 'professional' | 'airbnb';
export type AILanguage = 'en' | 'de' | 'fr' | 'it' | 'mt';

export interface AIGenerateBlocksRequest {
  prompt: string;
  pageContext?: string;
  existingBlockTypes?: string[];
}

export interface AIGenerateChatRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  context?: string;
}

// ─── API Responses ────────────────────────────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
