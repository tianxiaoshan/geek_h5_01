import { Toast } from 'antd-mobile';
import axios from 'axios';
import { getTokenInfo, setTokenInfo, removeTokenInfo } from './storage';
import { history } from 'umi';
import store from '@/models/login';

const baseURL = 'http://toutiao.itheima.net/v1_0/';
// 创建instance实例
const instance = axios.create({
  timeout: 5000,
  baseURL,
});
// 配置拦截器
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    // 对config做点什么
    // 在请求拦截器统一配置token
    // 获取token ---> 通用配置token
    const token = getTokenInfo().token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    // 对错误做点什么
    return Promise.reject(error);
  },
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    //  对响应做点什么
    Toast.clear();
    return response.data;
  },
  async (err) => {
    // 如果没有err里的值 就网络繁忙
    if (!err.response) {
      Toast.show({
        content: '网络繁忙，请稍后再试',
      });

      return Promise.reject(err);
    }
    // 如果有 并且不等于 401
    const { response, config } = err;
    console.log(config);
    if (response.status !== 401) {
      Toast.show({
        content: err.response.data.message,
      });
      return Promise.reject(err);
    }
    // 网络没问题，且是401 token失效的问题
    const { token, refresh_token } = getTokenInfo();
    if (!refresh_token) {
      // 没有refresh_token
      // 跳转到登录页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      });
      return Promise.reject(err);
    }
    // 是401 错误，且有刷新token
    // 尝试发请求，获取新的token，注意：刷新token发请求， 不能使用封装的instance
    try {
      const res = await axios({
        method: 'put',
        url: baseURL + 'authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token,
        },
      });
      // debugger;
      // console.log(res);
      // 刷新token成功
      // 把token保存起来
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token,
      };
      console.log(tokenInfo);
      // 保存在redux中
      // store.dispatch({
      //   type: 'login/login',
      //   payload: tokenInfo,
      // });
      console.log(1212);
      // 保存在本地
      setTokenInfo(tokenInfo);
      // 刷新token成功后 重新把最开始的失败请求重新发一次  相当于 无感刷新
      return instance(config);
    } catch {
      // 刷新token 失败
      // 退出登录
      // store.dispatch({
      //   type: 'login/removeToken',
      // });
      removeTokenInfo();
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      });
      Toast.show({
        content: '登录信息失效，请重新登录',
      });
      return Promise.reject(err);
    }
  },
);
export default instance;
