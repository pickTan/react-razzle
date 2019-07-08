import assign from 'core-js/library/fn/object/assign'

/**
 * 链接json
 * @param json1
 * @param json2
 * @returns {*}
 */
export const concatJson = (json1, json2) => {
  for (let key in json2) {
    json1[key] = json2[key];
  }
  return json1;
};
/**
 * 得到object类型
 * @param obj
 * @returns {*}
 */
export const objType = obj => typeof obj === 'object' || typeof obj === 'function' ? (() => {
  if (typeof obj === 'function') return 'function'
  const objStr = JSON.stringify(obj);
  switch (objStr.slice(0, 1)) {
  case  '{' :
    return 'json';
  case  '[' :
    return 'array';
  case  'n' :
    return 'null';
  }
})() : 0;
/**
 * style转化成reactStyle形式
 * @param styles
 * @returns {any}
 */
export const styleMapRstyle = styles => {
  if (!styles) return {};
  if (typeof styles === 'object') return styles;
  const arrs = styles.split(';'),
    arr2 = arrs.filter(it => {
      return !!it
    }).map(item => {
      const obj = {},
        lst = item.split(":"),
        cssType = lst[0],
        key = ~cssType.indexOf('-') ? cssType.split('-').map((it, i) => i ? it.substr(0, 1).toLocaleUpperCase() + it.slice(1) : it).join('') : cssType;
      obj[key] = lst[1];
      return obj;

    });
  return arr2.reduce((val1, val2) => {
    return assign({}, val1, val2);
  }, {})
};
/**
 * 安全得到json
 * @param json
 * @param arr
 * @returns {*}
 */
export const safeGetJson = (json, str) => {
  try {
    const arr = str.split('.');
    return arr.reduce((totle, para) => totle[para], json)
  } catch (e) {
    return 0;
  }
};
/**
 * 安全插入json
 * @param json
 * @param arr
 * @returns {*}
 */
export const safeSetJson = (json, value, ...arr) => {
  const maxI = arr.length - 1;
  arr.reduce((totle, para, i) => {
    const str = JSON.stringify(totle[para]);
    totle[para] = typeof totle[para] === 'object' && str.slice(0, 1) == '{' ? totle[para] : {};
    if (i == maxI) totle[para] = value;
    return totle[para];
  }, json);
  return json;
};


/**
 *
 * 判断系统以及浏览器，返回一个二位数字
 * 首位:1:安卓 2:苹果 3:ipad
 * 第二位: 1.酷狗内嵌 2.微信内嵌 3.qq内嵌页 4.微博内嵌  5.繁星内嵌内,6短酷
 *    example: 11 安卓酷狗内嵌页
 * @returns {number}
 */
export const getSysBowser = () => {
  const ls = new Array(2),
    ua = navigator.userAgent.toLocaleLowerCase(),
    uaMatch = (reg) => ua.match(reg);
    //判断系统
  if (uaMatch(/android/i)) ls[0] = 1;
  else if (uaMatch(/iphone/i) || uaMatch(/KGBrowser/i)) ls[0] = 2;
  else if (uaMatch(/ipad/i)) ls[0] = 3;
  else ls[0] = 4;
  //判断浏览器
  if (uaMatch(/kgbrowser/gi) || safeGetJson(window, 'external', 'superCall')) ls[1] = 1; //酷狗app
  else if (uaMatch(/micromessenger/gi)) ls[1] = 2; //微信
  else if (uaMatch(/qq/gi) && !uaMatch(/mqqbrowser/gi)) ls[1] = 3; //qq内置
  else if (uaMatch(/weibo/gi)) ls[1] = 4; //微博
  else if (uaMatch(/fanxing/gi)) ls[1] = 5; //繁星
  else if (uaMatch(/kgshortvideo/gi)) ls[1] = 6; //短酷
  else ls[1] = 100; //其他
  return ls;
}


/**
 * 获取cookie中的值
 * @param name
 * @returns {*}
 */
export const getCookieParam = (name) => {
  let cookieValue = "";
  const arrStr = document.cookie.split("; ");
  for (let i = 0; i < arrStr.length; i++) {
    const temp = arrStr[i].match(/^(\w+)=(.+)$/);
    if (temp && temp.length > 1 && temp[1] == name) {
      cookieValue = temp[2];
      break;
    }
  }

  return (...ars) => {
    if (!ars.length) {
      return cookieValue;
    } else {
      const obj = {};
      cookieValue.split('&').forEach((item) => {
        const list = item.split("="),
          key = list[0],
          value = list[1];
        ~ars.indexOf(key) && (obj[key] = unescape(value));
      });
      return obj;
    }
  }
}
/**
 * 网站支持webp
 * @param fn
 */
export const supportWebp = (fn) => {
  const img = new Image(),
    src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  img.onload = () => {
    fn && fn(true);
  }
  img.onerror = () => fn && fn(0)
  img.src = src
};

/**
 * 判断条件是否成立
 * @param global //默认取stateGlobal
 * @param term
 * @returns {boolean|*}
 */
let timeAdd = 0;

export const isTerm = (global, term) => {
  const time1 = new Date().getTime();
  if (!term) return true;
  try {
    const str = `with(${JSON.stringify(global)}){return (${term})}`;
    const flag =   new Function(str)()
    console.log(timeAdd +=(new Date().getTime() - time1));
    return flag;
  } catch (e) {
    console.error(e)
    return 0
  }


}


export const newIsTerm = (global, term)=>{
  const isNumber = (str) =>{

  }

  const isStr = (str) =>{

  }

  const isObj = (str)=>{

  }


  const leftbracke ='(',
    rightbracke = ')',
    logicalOperator = ['&&','||','!'],
    comparisonOperator = ['==','===','!=','!==','>','<','>=','<='],
    arithmetic = ['+','-','*','/','%','~~','~','!!'];








}




/**
 * 解析模版
 * @param global
 * @param key
 * @returns {string}
 */
export const setAspect = (global, temp, value) => {
  if (!temp) return '';
  const key = `${temp}`.trim()
  return safeSetJson(global, value, ...key.split('.'))
}

/**
 * 获取一个对象的值
 * @param global
 * @param obj
 * @param getType 1,解析数组某一项 默认解析{}
 * @returns {*}
 */
export const getAspects = (global, obj,getType=0) => {
  let newData = null
  const type = objType(obj);
  if (!type) {
    newData = getAspect(global, obj,getType)
  } else if (type == 'json') {
    newData = {}
    Object.entries(obj).forEach(item => {
      if (item[0] == 'children' && !getType) newData[item[0]] = item[1] //过滤children关键字
      else if (~item[0].indexOf('styles')) newData[item[0]] = styleMapRstyle(item[1]) //过滤styles关键字
      else (newData[item[0]] = getAspects(global, item[1],getType))
    })
  }
  else if (type == 'array') {
    newData = []
    obj.forEach(item => newData.push(getAspects(global, item,getType)))
  } else {
    newData = obj
  }
  return newData
}

/**
 * md5
 * @param string
 * @returns {string}
 * @constructor
 */
export const MD5 = (string) => {
  const md5_RotateLeft = (lValue, iShiftBits) => (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  const md5_AddUnsigned = (lX, lY) => {
    let lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);

    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    }
    else return (lResult ^ lX8 ^ lY8);

  }

  const md5_F = (x, y, z) => (x & y) | ((~x) & z);

  const md5_G = (x, y, z) => (x & z) | (y & (~z));

  const md5_H = (x, y, z) => (x ^ y ^ z);

  const md5_I = (x, y, z) => (y ^ (x | (~z)));

  const md5_FF = (a, b, c, d, x, s, ac) => {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };

  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }

  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }

  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }

  function md5_ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function md5_WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }

  function md5_Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();

}

/**
 * 适配
 * @param adaptation
 * @returns {number}
 */
export const adap = adaptation => {
  const clienWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    scale = clienWidth / adaptation;
  return scale;
}
/**
 * 保留2位消暑
 * @param price
 * @returns {string}
 */
export const fomatPrice = price => {
  const n = 2,
    s = parseFloat(`${price}`.replace(/[^\d\.-]/g, '')).toFixed(n) + '',
    l = s.split(".")[0].split('').reverse(),
    r = s.split(".")[1],
    t = l.join('');
  return `${t.split("").reverse().join("")}.${r}`;
}

/**
 * 深Clonejson
 * @param json
 * @param arr
 * @returns {*}
 */
export const deepClone = json => JSON.parse(JSON.stringify(json))

/**
 *
 * @param list
 * @param key
 * @param type
 * @returns {*}
 */
export const fastSort = (list, key = 0, type = 1) => {
  if (objType(list) != 'array') return 0;
  const sortFun = (arr) => {
    const length = arr.length;
    if(length<2) return arr;
    const middleNum = Math.floor(length / 2),
      middleItem = arr.splice(middleNum, 1)[0],
      leftArr = [], rightArr = [];
    if (key) {
      arr.forEach(item => {
        parseFloat(item[key]) <= parseFloat(middleItem[key]) ? leftArr.push(item) : rightArr.push(item)
      })
    } else {
      arr.forEach(item => {
        parseFloat(item) <= parseFloat(middleItem) ? leftArr.push(item) : rightArr.push(item)
      })
    }
    return  sortFun(leftArr).concat(middleItem,sortFun(rightArr));
  }
  return type ? sortFun(list) :sortFun(list).reverse()
}



/**
 * @method strJson
 *
 * @param { String } jsonStr
 * @return { Object } json
 */
export const strJsonFun = jsonStr => {
  let json = {}
  try {
    Object.prototype.toString.call(jsonStr) === "[object String]" &&( json = JSON.parse(jsonStr));
  } catch (ex) {
  }
  return json
}
/**
 *
 * @param json
 * @returns {string}
 */
export const jsonStrFun =  json =>{
  let jsonStr = ""
  try {
    typeof json !== "string" &&  (jsonStr = JSON.stringify(json));
  } catch (e) {
  }
  return jsonStr
}

//使用iFrame去请求url代替location.href，防止iOS端过于密集的调用mobilecall导致后发起的请求被忽略和app未安装通用链直接报错
export const loadURL =url => {
  let iFrame = document.createElement("iframe");
  iFrame.setAttribute("src", url);
  iFrame.setAttribute("style", "display:none;");
  iFrame.setAttribute("height", "0px");
  iFrame.setAttribute("width", "0px");
  iFrame.setAttribute("frameborder", "0");
  document.body.appendChild(iFrame);
  // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
  iFrame.parentNode.removeChild(iFrame);
  iFrame = null;
}
