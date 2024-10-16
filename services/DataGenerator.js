function generateRandomArray(arrayNumber) {
  const array = [];
  for (let i = 0; i < arrayNumber; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

module.exports = { generateRandomArray };
