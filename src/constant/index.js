const LOCAL = 'localhost:8000'; // 项目地址
const PAAS = 'hicar-ecall-h5-get-coupon.paas.pateo.com.cn';
const PERF = 'hicar-ecall-h5-get-coupon.perf.pateo.com.cn';
const PERF2 = 'coupon202201-perf.pateo.com.cn';
const UAT = 'coupon202201-uat.pateo.com.cn';
const PRO = 'coupon202201-pro.pateo.com.cn';

//  这里是设置网关
const requestConfig = {
  [LOCAL]: 'http://qing2gw-bdperf.pateo.com.cn',
  [PAAS]: 'https://hicargw-perf.pateo.com.cn',
  [PERF]: 'https://hicargw-perf.pateo.com.cn',
  [PERF2]: 'https://hicargw-perf.pateo.com.cn',
  [UAT]: 'https://hicargw-uat.pateo.com.cn',
  [PRO]: 'https://hicargw-pro.pateo.com.cn',
};

let { host } = window.location;
host = LOCAL;

const isProduction = process.env.NODE_ENV === 'production';

const requestUrl = requestConfig[host]; // 必须，接口 base_url

const imageUploadUrl = `${requestUrl}/api/content/upload/file`;

export { imageUploadUrl, requestUrl, isProduction };
