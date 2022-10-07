/**
 * @returns h1-h3 => 'brand'. h4-h6 => 'primary'. Otherwise => 'default'
 */
const getDefaultTextColor = (tag) => {
  if (['h1', 'h2', 'h3'].includes(tag)) return 'brand';
  if (['h4', 'h5', 'h6'].includes(tag)) return 'primary';
  return 'default';
};

export default getDefaultTextColor;
