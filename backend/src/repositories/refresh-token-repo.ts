import redis from "../config/redis";

const expiryTime = 60 * 60 * 24 * 7;

export async function cacheRefreshToken(
  hashedToken: string,
  userId: string,
): Promise<void> {
  await redis.set(`refresh:${hashedToken}`, userId, { EX: expiryTime });
}

export async function getRefreshTokenUserId(
  hashedToken: string,
): Promise<string | null> {
  return redis.get(`refresh:${hashedToken}`);
}

export async function deleteRefreshToken(tokenToDelete: string): Promise<void> {
  await redis.del(`refresh:${tokenToDelete}`);
}
