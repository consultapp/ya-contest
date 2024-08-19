// const {
//   translate, // (key: string) => string;
//   changeLanguage, // (lang: string) => void;
// } = require("translate");

// const options = {
//   key1: translate("key1"),
//   key2: translate("key2"),
//   key3: translate("key3"),
// };

// console.log(options.key1); // Выводит 'ru:key1',

// changeLanguage("en");

// console.log(options.key1); // Все еще выводит 'ru:key1', а должно 'en:key1'

// const {
//   changeLanguage,
//   dynamicTranslate,
//   makeDynamicTranslations,
// } = require("dynamic-translate");

const LANG = {
  ru: "ru",
  en: "en",
};

let CURRENT_LANG = LANG.ru;

changeLanguage = (l) => {
  console.log("changed to:", l);
  CURRENT_LANG = l;
};

const makeDynamicTranslations = (e) => {
  const prox = {};
  for (let k in e) {
    if (e[k]?.type === "dinamik" || Array.isArray(e[k])) {
      prox[k] = e[k];
    } else if (typeof e[k] === "object") {
      prox[k] = makeDynamicTranslations(e[k]);
    } else {
      prox[k] = e[k];
    }
  }
  const result = new Proxy(prox, {
    get: function (obj, prop, _) {
      if (Array.isArray(obj[prop])) {
        return obj[prop].map((item) => {
          if (item?.type === "dinamik") {
            return item.fn();
          }
          return item;
        });
      }

      if (obj[prop]?.type === "dinamik") {
        return obj[prop].fn();
      }
      return obj[prop];
    },
  });

  return result;
};

const dynamicTranslate = (key) => {
  return { type: "dinamik", fn: () => `${CURRENT_LANG}:${key}` };
};

const options = makeDynamicTranslations({
  key1: dynamicTranslate("key1111"),
  key2: dynamicTranslate("key2222"),
  key3: dynamicTranslate("key3333"),
});

console.log(options.key1); // Выводит 'ru:key1',

changeLanguage("en");

console.log(options.key1); // Выводит 'en:key1'

const object1 = makeDynamicTranslations({
  key: dynamicTranslate("key"),
  key2: dynamicTranslate("key2"),
  key3: 10,
  key4: {
    innerKey: "innerKey",
    innerObj: {
      test: 123,
      key: null,
      someOtherKey: [],
    },
  },
  array: [
    dynamicTranslate("array1"),
    dynamicTranslate("array2"),
    dynamicTranslate("array3"),
    {
      key: dynamicTranslate("array4"),
    },
  ],
});

// const object2 = makeDynamicTranslations({
//   options: object1,
//   key: dynamicTranslate("object2key"),
// });

console.log(object1.array); // Выводит 'ru:key1',
console.log(object1.key); // Выводит 'ru:key1',

changeLanguage("ru");

console.log(object1.array); // Выводит 'en:key1'
console.log(object1.key); // Выводит 'en:key1'
console.log(object1.array[3]); // Выводит 'en:key1'
