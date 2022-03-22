exports.validateInput = (input) => {
  const undefinedValues = [];
  for (const [key, value] of Object.entries(input)) {
    if (typeof value == "undefined") undefinedValues.push(key);
  }
  return undefinedValues
};