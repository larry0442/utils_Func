/**
 * 主要为存储方面的工具函数
 * 感谢主要来源作者： 火狼1-掘金（https://juejin.im/post/5de5be53f265da05c33fcbb4）
 */

/**
 * localStorage 存贮
 * 目前对象值如果是函数 、RegExp等特殊对象存贮会被忽略
 * @param { String } key  属性
 * @param { string } value 值
 */
export const localStorageSet = (key, value) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value)
};

/**
 * localStorage 获取
 * @param {String} key  属性
 */
export const localStorageGet = (key) => {
    return localStorage.getItem(key)
};

/**
 * localStorage 移除
 * @param {String} key  属性
 */
export const localStorageRemove = (key) => {
    localStorage.removeItem(key)
};

/**
 * localStorage 存贮某一段时间失效
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param { number } expire 过期时间,毫秒数
 */
export const localStorageSetExpire = (key, value, expire) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value);
    setTimeout(() => {
        localStorage.removeItem(key)
    }, expire)
};

/**
 * sessionStorage 存贮
 * @param {String} key  属性
 * @param {*} value 值
 */
export const sessionStorageSet = (key, value) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value)
};

/**
 * sessionStorage 获取
 * @param {String} key  属性
 */
export const sessionStorageGet = (key) => {
    return sessionStorage.getItem(key)
};

/**
 * sessionStorage 删除
 * @param {String} key  属性
 */
export const sessionStorageRemove = (key) => {
    sessionStorage.removeItem(key)
};

/**
 * sessionStorage 存贮某一段时间失效
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param {String} expire 过期时间,毫秒数
 */
export const sessionStorageSetExpire = (key, value, expire) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
    setTimeout(() => {
        sessionStorage.removeItem(key)
    }, expire)
};

/**
 * cookie 存贮
 * @param {String} key  属性
 * @param {*} value  值
 * @param { String } expire  过期时间,单位天
 */
export const cookieSet = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};

/**
 * cookie 获取
 * @param {String} key  属性
 */
export const cookieGet = (key) => {
    const cookieStr = unescape(document.cookie);
    const arr = cookieStr.split('; ');
    let cookieValue = '';
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i].split('=');
        if (temp[0] === key) {
            cookieValue = temp[1];
            break
        }
    }
    return cookieValue
};

/**
 * cookie 删除
 * @param {String} key  属性
 */
export const cookieRemove = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};



// 大概是一个简化版的ajax请求

/*
知识点
  - xhr请求过程
  - xhr请求的方法/参数
  onreadyStateChange
*/ 

export function ajax(options){
  // url type data success fail
  let { url, type, data, success, fail } = options;
  type = type.toUpperCase();

  const xhr = new XMLHttpRequest();
   
  // 处理请求数据
  let dataStr = '';
  if(typeof data === 'object') {
    for(let key in data) {
      dataStr += `key=${encodeURIComponent(data[key])}&`
    }
  }
  dataStr += 't=' + Math.random().replace('.', '');

  // 根据请求方式处理
  // get 数据随url
  // data 数据在body
  if(type === 'GET') {
    xhr.open('GET', url + '?' + data, true);
    xhr.send();
  } else {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded');
    xhr.send(dataStr);
  }

  // 监听回调
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        // 成功的回调,将请求信息返回
        success && success(xhr.responseText);
      } else {
        // 失败的回调
        fail && fail(xhr.status); 
      }
    }
  }
}