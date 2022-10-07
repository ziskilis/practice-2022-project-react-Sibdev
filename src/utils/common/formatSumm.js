const formatSum = (sum) => {
  sum = +sum;
  return sum.toLocaleString('ru-RU');
};

export default formatSum;
