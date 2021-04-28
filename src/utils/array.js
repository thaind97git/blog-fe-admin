const arrayMoveMutate = (array, from, to) => {
  const startIndex = from < 0 ? array.length + from : from;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to;

    const [item] = array.splice(from, 1);
    array.splice(endIndex, 0, item);
  }
};

const arrayMove = (array, from, to) => {
  array = [...array];
  arrayMoveMutate(array, from, to);
  return array;
};

const arrayRemoveByIndex = (array, index, count = 1) => {
  if (isNaN(index) || isNaN(count)) {
    return;
  }
  const mutateArray = [...array];
  mutateArray.splice(index, count);
  return mutateArray;
};

const arrayRemoveByValue = (array, value, count = 1) => {
  if (isNaN(count)) {
    return;
  }
  const index = array.indexOf(5);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const ensureArray = data => (Array.isArray(data) ? data : []);

export default {
  arrayMove,
  arrayRemoveByIndex,
  arrayRemoveByValue,
  ensureArray,
};
