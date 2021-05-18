const compareTwoObject = (object1 = {}, object2 = {}) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};

const isEmptyObject = object => {
  !object ||
    (Object.keys(object).length === 0 && object.constructor === Object);
};

export default {
  compareTwoObject,
  isEmptyObject,
};
