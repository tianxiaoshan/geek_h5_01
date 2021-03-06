import { setErrorLog } from '@/acting/utils/utils';

export function backApp() {
  console.log('backApp');
  try {
    window.goBack.postMessage('');
    setErrorLog('goback app', '๐ท');
  } catch (err) {
    // Dialog.alert({ content: `backApp: ${err}` });
    console.log('backApp error>>', err);
    setErrorLog({ code: 'goback app', error: err.message }, '๐ด');
  }
}

// ่ทณ่ฝฌๅปไฝฟ็จ็่ฏฆๆ้กต้ข
export function goAppDetail() {
  try {
    window.commodity.postMessage('');
    setErrorLog('commodity app', '๐ท');
  } catch (err) {
    console.log('goAppDetail error>>', err);
    setErrorLog({ code: 'commodity app', error: err.message }, '๐ด');
  }
}

export function refreshAppToken() {
  console.log('refreshAppToken');

  try {
    window.refreshToken.postMessage('');
    setErrorLog('refreshToken app', '๐ท');
  } catch (err) {
    console.log('refreshAppToken error>>', err);
    setErrorLog({ code: 'refreshToken app', error: err.message }, '๐ด');
  }
}

export function trackApp(id, detail) {
  const data = JSON.stringify({ id, detail });
  console.log('trackApp', data);
  try {
    window.track.postMessage(data);
    setErrorLog('track app', '๐ท');
  } catch (err) {
    console.log('trackApp error>>', err);
    setErrorLog({ code: 'track app', error: err.message }, '๐ด');
  }
}

export function bindWayApp() {
  try {
    window.oauth.postMessage('');
    setErrorLog('oauth app', '๐ท');
  } catch (err) {
    console.log('oauth error>>', err);
    setErrorLog({ code: 'oauth app', error: err.message }, '๐ด');
  }
}
