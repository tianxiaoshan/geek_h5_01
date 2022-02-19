import * as apis from './apis';
import request from '@/utils/request';
// 发送验证码
export async function sendCode(mobile) {
  return request.get(apis.code + mobile);
}
// 用户登录注册
export async function login(data) {
  return request.post(apis.login, data);
}
// 获得用户自己的信息
export async function getProfile() {
  return request.get(apis.profile);
}
// 获取用户个人信息页面的信息
export async function getProfileUser() {
  return request.get(apis.user);
}
// 修改用户的信息
export async function getUploadInfo(data) {
  return request.patch(apis.upload, data);
}
// 上传用户的头像
export async function getUploadPhoto(data) {
  return request.patch(apis.photo, data);
}
// 删除token
export async function removeToken() {}

// 获得用户频道
export async function getChannels() {
  return request.get(apis.channels);
}

// 获取所有频道
export async function getAllChannels() {
  return request.get(apis.allchannels);
}

// 删除指定用户的频道数据
export async function delChannels(data) {
  return request.delete(apis.delchannels + data);
}

// 添加指定用户的频道数据
export async function addChannels(data) {
  return request.patch(apis.addchannels, { channels: [data] });
}

// 获取文章列表
export async function getArticles(params) {
  return request.get(apis.articles, { params });
}

// 点击madle显示隐藏
export const moreArticle = () => {};

// 文章不喜欢
export async function dislikesArticle(data) {
  return request.post(apis.dislikes, { target: data });
}

// 举报文章
export async function reportsArticle(data) {
  return request.post(apis.reports, data);
}
