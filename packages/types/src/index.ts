/**
 * @beactive/types — shared TypeScript types across the monorepo.
 *
 * Types only. No runtime logic. These mirror the backend database models and the
 * WebSocket protocol so the web app and any tooling share one source of truth.
 */

// ---------------------------------------------------------------------------
// Domain models (mirror apps/backend database models)
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Event {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  /** 6-character unique join code, e.g. "X4K9P2". */
  code: string;
  is_active: boolean;
  created_at: string;
}

export type InteractionType =
  | 'poll'
  | 'qa'
  | 'quiz'
  | 'idea_wall'
  | 'multiple_choice';

/**
 * Free-form options payload. Shape varies per interaction type (poll options,
 * quiz questions with timers, etc.) and is stored as JSONB on the backend.
 */
export type InteractionOptions = Record<string, unknown>;

export interface Interaction {
  id: string;
  event_id: string;
  type: InteractionType;
  title: string;
  options: InteractionOptions;
  is_live: boolean;
  order_index: number;
  created_at: string;
}

/**
 * Free-form answer payload. Shape varies per interaction type (selected option id,
 * free text, quiz choice + timing, etc.) and is stored as JSONB on the backend.
 */
export type ResponseAnswer = Record<string, unknown>;

export interface ParticipantResponse {
  id: string;
  interaction_id: string;
  session_id: string;
  participant_name: string | null;
  answer: ResponseAnswer;
  score: number | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Aggregated results (returned by GET /interactions/{id}/results)
// ---------------------------------------------------------------------------

/** Generic results payload broadcast over the channel. Shape is per-interaction. */
export type InteractionResults = Record<string, unknown>;

// ---------------------------------------------------------------------------
// WebSocket protocol (/ws/{event_code})
// ---------------------------------------------------------------------------

/** Messages sent from a client (host or audience) to the server. */
export type ClientMessage =
  | { type: 'activate_interaction'; interaction: Interaction }
  | { type: 'response_submitted'; interaction_id: string; results: InteractionResults }
  | { type: 'end_interaction' };

/** Messages broadcast from the server to all connected clients. */
export type ServerMessage =
  | { type: 'interaction_activated'; interaction: Interaction }
  | { type: 'results_updated'; interaction_id: string; results: InteractionResults }
  | { type: 'interaction_ended' };

export type WebSocketMessage = ClientMessage | ServerMessage;
