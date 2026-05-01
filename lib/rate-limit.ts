const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
}

/**
 * In-memory rate limiter (fica no processo).
 *
 * Limitação: em deploy serverless/edge, cada região/instância tem o próprio
 * counter. Suficiente pra reduzir spam óbvio; pra produção séria com volume,
 * trocar por Upstash Redis.
 */
export function rateLimit(
  key: string,
  config: RateLimitConfig = { windowMs: 30_000, max: 1 },
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.max - 1, resetIn: config.windowMs };
  }

  if (bucket.count >= config.max) {
    return { allowed: false, remaining: 0, resetIn: bucket.resetAt - now };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: config.max - bucket.count,
    resetIn: bucket.resetAt - now,
  };
}

/** Limpeza periódica pra não vazar memória em long-running. */
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now >= bucket.resetAt) buckets.delete(key);
    }
  }, 60_000).unref?.();
}
