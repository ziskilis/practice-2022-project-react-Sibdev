/**
 * @returns h1-h3 => 700. h4-h6 => 500. Otherwise => 400
 */
const getDefaultTextWeight = (tag) => {
  if (['h1', 'h2', 'h3'].includes(tag)) return 700;
  if (['h4', 'h5', 'h6'].includes(tag)) return 500;
  return 400;
};

export default getDefaultTextWeight;
