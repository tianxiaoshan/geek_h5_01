import React from 'react';
import classNames from 'classnames';
import Icon from '@/pages/components/Icon';
import Img from '@/pages/components/Img';
import MoreArticle from '../MoreArticle';

import styles from './index.less';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { useDispatch } from 'dva';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const ArticleItem = ({ articleItem, channelId }) => {
  // console.log(channelId, 'channelId');
  const dispatch = useDispatch();
  const {
    cover: { type, images },
    title,
    pubdate,
    aut_name,
    comm_count,
    art_id,
  } = articleItem;
  const onMoreArticle = () => {
    dispatch({
      type: 'login/MoreArticle',
      payload: {
        channelId: channelId,
        articleId: art_id,
        visible: true,
      },
    });
  };
  return (
    <div className={styles.root}>
      <div className={classNames('article-content', type === 3 ? 't3' : '', type === 0 ? 'none-mt' : '')}>
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classNames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).locale('zh-cn').fromNow()}</span>

        <span className="close" onClick={onMoreArticle}>
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
      <MoreArticle articleId={art_id} />
    </div>
  );
};

export default ArticleItem;
