export async function generateShortId(length = 10): Promise<string> {
  const { nanoid } = await import('nanoid');
  return nanoid(length);
}
