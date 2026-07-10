export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; issues?: Record<string, string[] | undefined> };
