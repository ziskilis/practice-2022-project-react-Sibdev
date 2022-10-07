const classnames = (classes) => {
  const processedClasses = [];

  classes.forEach((item) => {
    if (Array.isArray(item)) {
      if (item[1]) processedClasses.push(item[0]);
      return;
    }
    processedClasses.push(item);
  });

  return processedClasses.join(' ');
};

export default classnames;
