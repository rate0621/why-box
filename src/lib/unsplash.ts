// Utility function to generate Unsplash image URLs
export function unsplash_tool(query: string): string {
  const formattedQuery = query.replace(/\s+/g, '-');
  return `https://source.unsplash.com/800x600/?${formattedQuery}`;
}
