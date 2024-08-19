module.exports = function (translate /* (key: string) => string */) {
  const LANG = {
    ru: "ru",
    en: "en",
  };

  let CURRENT_LANG = LANG.ru;

  const translate = (key) => `${CURRENT_LANG}:${key}`;

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
    return new Proxy(prox, {
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
  };

  const dynamicTranslate = (key) => {
    return { type: "dinamik", fn: () => translate(key) };
  };

  changeLanguage = (l) => {
    CURRENT_LANG = l;
  };

  return {
    makeDynamicTranslations,
    dynamicTranslate,
  };
};
