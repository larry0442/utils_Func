const mPromise = require('./promiseA+');

const test = new mPromise(
  (fulfill, reject) => {
    if (Math.random() > 0.5) {
      fulfill(1);
    } else {
      reject(0);
    }
  }
);

test.then((value) => { console.log(value) }, (value) => { console.log(value) })