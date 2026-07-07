export const THEMES = [
  { bg: '#F1F1F1', shape: '#CFCFCF', shapeType: 'square', text: '#1c1c1c' },
  { bg: '#FFB4B4', shape: '#F14C4C', shapeType: 'blob', text: '#3a1414' },
  { bg: '#9FEAD1', shape: '#17C9A0', shapeType: 'dome', text: '#0d3327' },
  { bg: '#FCE9A8', shape: '#F0C419', shapeType: 'peak', text: '#4a3b06' },
  { bg: '#2B3A67', shape: '#5B7CFA', shapeType: 'hex', text: '#EDEFFA' },
];

export function getTheme(id) {
  const index = Math.abs(Number(id)) % THEMES.length;
  return THEMES[index];
}
