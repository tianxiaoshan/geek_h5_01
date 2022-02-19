import * as services from '@/services/login';
import { setTokenInfo, getTokenInfo, getLocalChannels, setLocalChannels } from '@/utils/storage';
import { removeTokenInfo, hasToken } from '@/utils/storage';

export default {
  namespace: 'login',
  state: {
    loginToken: getTokenInfo(),
    getUserInfo: {},
    getUser: {},
    channelsInfo: [],
    allchannelsinfo: [],
    getArticlesItem: {},
    moreArticle: {
      channelId: '',
      articleId: '',
      visible: false,
    },
  },
  effects: {
    *sendCode({ payload }, { call }) {
      yield call(services.sendCode, payload);
    },
    *login({ payload }, { call, put }) {
      const { data } = yield call(services.login, payload);
      // 把token保存在本地
      setTokenInfo(data);
      yield put({
        type: 'save',
        payload: { loginToken: data },
      });
    },
    *getProfile({ payload }, { call, put }) {
      const { data } = yield call(services.getProfile, payload);
      yield put({
        type: 'save',
        payload: { getUserInfo: data },
      });
    },
    *getProfileUser({ payload }, { call, put }) {
      const { data } = yield call(services.getProfileUser, payload);
      yield put({
        type: 'save',
        payload: { getUser: data },
      });
    },
    *getUploadInfo({ payload }, { call, put }) {
      try {
        yield call(services.getUploadInfo, payload);
        yield put({
          type: 'getProfileUser',
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *getUploadPhoto({ payload }, { call, put }) {
      try {
        yield call(services.getUploadPhoto, payload);
        yield put({
          type: 'getProfileUser',
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *removeToken({ payload }, { call, put }) {
      yield call(services.removeToken, payload);
      removeTokenInfo();
      yield put({
        type: 'save',
        payload: { loginToken: {} },
      });
    },
    *getChannels({ payload }, { call, put }) {
      // 判断是否有token
      if (hasToken()) {
        const {
          data: { channels },
        } = yield call(services.getChannels, payload);
        yield put({
          type: 'save',
          payload: { channelsInfo: channels },
        });
      } else {
        // 没有token 且本地有数据
        const channels = getLocalChannels();
        if (channels) {
          yield put({
            type: 'save',
            payload: { channelsInfo: channels },
          });
        } else {
          // 没有token 且本地没有channels数据
          const {
            data: { channels },
          } = yield call(services.getChannels, payload);
          // console.log(channels, 'data2');
          setLocalChannels(channels);
          yield put({
            type: 'save',
            payload: { channelsInfo: channels },
          });
        }
      }
    },
    *getAllChannels({ payload }, { call, put }) {
      const {
        data: { channels },
      } = yield call(services.getAllChannels, payload);
      yield put({
        type: 'save',
        payload: { allchannelsinfo: channels },
      });
    },
    *delChannels({ payload }, { call, put }) {
      try {
        // 如果有token
        if (hasToken()) {
          // 发送请求
          yield call(services.delChannels, payload);
          // console.log(channelsInfo, 'channelsInfo');
          //同步数据到redux里
          yield put({
            type: 'getChannels',
            payload: { channelsInfo: payload },
          });
        } else {
          // 没有登录
          // 修改本地，修改redux
          yield put({
            type: 'getChannels',
            payload: { channelsInfo: payload },
          });
          setLocalChannels(payload);
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *addChannels({ payload }, { call, put }) {
      try {
        // 如果有token
        if (hasToken()) {
          // console.log(payload, 'addChannels');

          yield call(services.addChannels, payload);
          // 把数据同步redux里
          yield put({
            type: 'getChannels',
            payload: { channelsInfo: payload },
          });
          // console.log(111);
        } else {
          // 没有登录 没有token
          // 修改本地 修改redux
          yield put({
            type: 'getChannels',
            payload: { channelsInfo: payload },
          });
          setLocalChannels(payload);
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *getArticles({ payload }, { call, put, select }) {
      try {
        // console.log({ channel_id: payload.channel_id, timestamp: payload.timestamp });
        const { data } = yield call(services.getArticles, { channel_id: payload.channel_id, timestamp: payload.timestamp });
        // console.log(payload, 'payload11');
        const { getArticlesItem } = yield select((state) => state.login);
        const { pre_timestamp, results } = data;
        console.log(getArticlesItem, 'getArticlesItem');
        const { loadMore, channel_id } = payload;
        // const oldList = state.getArticlesItem[channel_id]?.itemList;
        yield put({
          type: 'saveArticles',
          payload: {
            [channel_id]: {
              pre_timestamp,
              itemList: results,
              loadMore,
              itemList: loadMore ? [...getArticlesItem[channel_id].itemList, ...results] : results,
            },
          },
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *MoreArticle({ payload }, { put }) {
      const { articleId, visible, channelId } = payload;
      yield put({
        type: 'save',
        payload: {
          moreArticle: {
            channelId: channelId,
            articleId: articleId,
            visible: visible,
          },
        },
      });
    },
    *dislikesArticle({ payload }, { call }) {
      try {
        yield call(services.dislikesArticle, payload);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *reportsArticle({ payload }, { call }) {
      try {
        yield call(services.reportsArticle, payload);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveArticles(state, { payload }) {
      const { getArticlesItem } = state;

      return {
        ...state,
        getArticlesItem: { ...getArticlesItem, ...payload },
      };
    },
  },
};
