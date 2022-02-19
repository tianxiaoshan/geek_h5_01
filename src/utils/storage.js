// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast-1';
const CHANNEL_KEY = 'geek-itcast-channels';
// 将 Token 信息存入缓存中
// @param{Object}getTokenInfo 从后端获取到的 Token 信息存入缓存中
export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo)); // 单词写错 写错
};

// 从本地缓存中获取Token信息
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
};

// 删除本地缓存中的 Token 信息
export const removeTokenInfo = () => {
  // localStorage.removeTokenInfo(TOKEN_KEY);
  // localStorage.removeTokenInfo(TOKEN_KEY, JSON.stringify(tokenInfo)); // 单词写错 写错
  localStorage.removeItem(TOKEN_KEY);
};

// 判断本地缓存中是否存在 Token 信息

export const hasToken = () => {
  return !!getTokenInfo().token;
};

// 保存频道数据到本地
export const setLocalChannels = (channels) => {
  console.log(123);
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels));
};
// 获取本地的频道数据。。。。 没有数据就不要默认为空
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY));
};
// 删除本地的频道数据
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY);
};
