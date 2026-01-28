import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl);

// Helper function to save a paste
export async function savePaste(id: string, content: string, expiryInSeconds?: number, viewLimit?: number) {
  const pipeline = redis.pipeline();
  
  // Store the content
  const data: Record<string, string | number> = { content };
  if (viewLimit) {
    data.viewLimit = viewLimit;
    data.views = 0;
  }
  
  pipeline.hset(`paste:${id}`, data);
  
  if (expiryInSeconds) {
    pipeline.expire(`paste:${id}`, expiryInSeconds);
  }
  
  await pipeline.exec();
}

// Helper function to get a paste
export async function getPaste(id: string) {
  const paste = await redis.hgetall(`paste:${id}`);
  
  if (!paste || Object.keys(paste).length === 0) {
    return null;
  }
  
  // Check view limit
  if (paste.viewLimit) {
    const currentViews = parseInt(paste.views || '0');
    const limit = parseInt(paste.viewLimit);
    
    if (currentViews >= limit) {
      await redis.del(`paste:${id}`);
      return null;
    }
    
    // Increment views
    await redis.hincrby(`paste:${id}`, 'views', 1);
    
    // If this was the last view, we might want to delete it or just let the next check handle it.
    // However, the requirement is usually "burn after reading", so if limit is 1, it deletes AFTER reading?
    // Or it allows READ 1 time?
    // If limit is 1:
    // Read 1: views becomes 1. 1 >= 1 is true for NEXT read.
    // So this logic allows the current read, and increments.
    // Next read (2nd time): views is 1. 1 >= 1. Paste deleted. Return null.
    // Correct.
  }
  
  return paste;
}
