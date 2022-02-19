import React, { useEffect, memo, useState } from 'react';
import styles from './index.less';
import ArticleItem from '@/pages/main/home/components/ArticleItem';
import { connect, useDispatch } from 'dva';
import { PullToRefresh, InfiniteScroll } from 'antd-mobile';

const ArticleList = ({ channelsId, activeId, getArticlesItem }) => {
  // 是否有更多数据
  const [hasMore, setHasMore] = useState(true);
  // 代表是否正在加载数据  默认是 否 表示能继续加载
  const [loading, setLoading] = useState(false);
  const artList = getArticlesItem[channelsId];

  const dispatch = useDispatch();

  useEffect(() => {
    const dataFn = async () => {
      if (artList) return;
      if (channelsId === activeId) {
        await dispatch({
          type: 'login/getArticles',
          payload: {
            channel_id: channelsId,
            timestamp: Date.now(),
          },
        });
      }
    };
    dataFn();
  }, [channelsId, activeId, dispatch, artList]);
  if (!artList) return null;
  const onRefresh = async () => {
    await dispatch({
      type: 'login/getArticles',
      payload: {
        channel_id: channelsId,
        timestamp: Date.now(),
      },
    });
  };
  const loadMore = async () => {
    if (loading) return;
    if (channelsId !== activeId) return;
    setLoading(true);
    // console.log('1212');
    if (!artList.pre_timestamp) {
      setHasMore(false);

      return;
    }
    try {
      await dispatch({
        type: 'login/getArticles',
        payload: {
          channel_id: channelsId,
          timestamp: artList.pre_timestamp,
          loadMore: true,
        },
      });
    } finally {
      // console.log('3333');
      setLoading(false);
    }
    // console.log('load end');
  };
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        <div className="articles">
          {artList.itemList.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem articleItem={item} channelsId={channelsId} />
            </div>
          ))}
        </div>
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};
export default connect(({ login }) => ({
  getArticlesItem: login.getArticlesItem,
}))(memo(ArticleList));
