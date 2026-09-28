export const blockTypes = ['heading', 'paragraph', 'image', 'chart', 'callout', 'warning', 'takeaway', 'list', 'orderedList', 'quote', 'example', 'video', 'resource', 'quiz', 'divider'];

export function normalizeBlocks(blocks) {
  return Array.isArray(blocks) ? blocks.filter(block => block && block.type && blockTypes.includes(block.type)) : [];
}

export function externalImageUrl(value) {
  const url = String(value || '').trim();
  return /^https:\/\//i.test(url) ? url : '';
}
