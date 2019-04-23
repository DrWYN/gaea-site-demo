
const glypyMapMaker = (glypyObj) => Object.keys(glypyObj).map((key) => {
  return {
    key,
    value: String.fromCharCode(parseInt(glypyObj[key], 16))
  };
}).reduce((map, glypyObj) => {
  map[glypyObj.key] = glypyObj.value;
  return map;
}, {})

const glypy = glypyMapMaker({
  'back': 'e603',
  'close-full': 'e63a',
  'arrow-down': 'e634',
  'arrow-up': 'e633',
  'search': 'e611',
  'cart': 'e628',
  'trash': 'e617',
  'add': 'e625',
  'reduce': 'e623',
  'qualityicon-qu': 'e647',
  'next': 'e632',
  'shoucang': 'e653',
  'headseticon': 'e608',
  'close': 'e636',
  'circle': 'e60a',
  'circle2': 'e64a',
  'check2': 'e61e',
  'check3': 'e64b',
  'location': 'e657',
  'warn': 'e65a',
  'edit': 'e607',
  'up': 'e621',
  'refresh': 'e63f',
  'card': 'e6b2',
  'tip': 'e624',
})

export default glypy;
