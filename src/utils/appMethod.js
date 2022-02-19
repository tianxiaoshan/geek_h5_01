import { setErrorLog } from '@/acting/utils/utils';

export function backApp() {
  console.log('backApp');
  try {
    window.goBack.postMessage('');
    setErrorLog('goback app', '🔷');
  } catch (err) {
    // Dialog.alert({ content: `backApp: ${err}` });
    console.log('backApp error>>', err);
    setErrorLog({ code: 'goback app', error: err.message }, '🔴');
  }
}

// 跳转去使用的详情页面
export function goAppDetail() {
  try {
    window.commodity.postMessage('');
    setErrorLog('commodity app', '🔷');
  } catch (err) {
    console.log('goAppDetail error>>', err);
    setErrorLog({ code: 'commodity app', error: err.message }, '🔴');
  }
}

export function refreshAppToken() {
  console.log('refreshAppToken');

  try {
    window.refreshToken.postMessage('');
    setErrorLog('refreshToken app', '🔷');
  } catch (err) {
    console.log('refreshAppToken error>>', err);
    setErrorLog({ code: 'refreshToken app', error: err.message }, '🔴');
  }
}

export function trackApp(id, detail) {
  const data = JSON.stringify({ id, detail });
  console.log('trackApp', data);
  try {
    window.track.postMessage(data);
    setErrorLog('track app', '🔷');
  } catch (err) {
    console.log('trackApp error>>', err);
    setErrorLog({ code: 'track app', error: err.message }, '🔴');
  }
}

export function bindWayApp() {
  try {
    window.oauth.postMessage('');
    setErrorLog('oauth app', '🔷');
  } catch (err) {
    console.log('oauth error>>', err);
    setErrorLog({ code: 'oauth app', error: err.message }, '🔴');
  }
}
