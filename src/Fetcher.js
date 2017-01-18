// @flow
// import sha1 from 'sha1';

// import { isFileExists } from './utils';
import rp from 'request-promise-native';
import HtmlResponse from './models/HtmlResponse';

class Fetcher {
  fetch(url: string): Promise<*> {
    console.log('fetch', url);
    const p = new Promise((resolve: Function, reject: Function) => {
      HtmlResponse.findOne({ url }, (err: any, htmlResponse: any) => {
        if (err) {
          console.error('err', err);
          reject(err);
        } else if (!htmlResponse || !htmlResponse.body) {
          // it means not cached!
          rp('http://naver.com')
          .then((...a: any) => {
            console.error('err2', a);
            resolve(...a);
          }, (...a: any) => {
            console.error('err3', a);
            reject(...a);
          });
        } else {
          // cache hitda hit
          console.error('resolve', htmlResponse.body);
          resolve(htmlResponse.body);
        }
      });
    });
    return p;
  }
}

module.exports = new Fetcher();