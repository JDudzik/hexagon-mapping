/* eslint-disable */

const debugShallowCompare = (obj1, obj2) => {
  const lengthSame = Object.keys(obj1).length === Object.keys(obj2).length;
  const propsMatch = Object.keys(obj1).every(key => {
    const isSameValue = obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
    if (!isSameValue) {
      console.group();
      const compareAnnouncement = `--- Shallow Compare ---`;
			console.log('%c' + compareAnnouncement, 'color:red; font-weight:bold;');
      console.log('%c' + key, 'font-weight:bold;');
      console.groupEnd();
    }
    return isSameValue;
  });

  return lengthSame && propsMatch;
};

export default debugShallowCompare;
