const fs = require("node:fs");

function deepMerge(obj1, obj2) {
  const mergedObj = {...obj1, ...obj2};

  for (const key of Object.keys(mergedObj)) {
    if (typeof mergedObj[key] === 'object' && mergedObj[key] !== null) {
      mergedObj[key] = deepMerge(obj1[key], obj2[key]);
    }
  }
  return mergedObj;
}

const pl = JSON.parse(fs.readFileSync('src/assets/i18n/pl.json', "utf-8"));
const en = JSON.parse(fs.readFileSync('src/assets/i18n/en.json', "utf-8"));

const enNew = deepMerge(pl, en);

fs.writeFileSync('src/assets/i18n/en.json', JSON.stringify(enNew, undefined, 2));
