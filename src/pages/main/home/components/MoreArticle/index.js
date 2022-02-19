import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Toast } from 'antd-mobile';
import Icon from '@/pages/components/Icon';
import { useDispatch, useSelector } from 'dva';

const reportsList = [
  {
    id: 0,
    title: '其他问题',
  },
  {
    id: 1,
    title: '标题夸张',
  },
  {
    id: 2,
    title: '低俗色情',
  },
  {
    id: 3,
    title: '错别字多',
  },
  {
    id: 4,
    title: '旧闻重复',
  },
  {
    id: 5,
    title: '广告软文',
  },
  {
    id: 6,
    title: '内容不实',
  },
  {
    id: 7,
    title: '涉嫌违法犯罪',
  },
  {
    id: 8,
    title: '侵权',
  },
];

export default function MoreArticle({ articleId }) {
  const [type, setType] = useState('normal');
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.login.moreArticle?.visible);
  const onClose = () => {
    dispatch({
      type: 'login/MoreArticle',
      payload: {
        channelId: '',
        articleId: '',
        visible: false,
      },
    });
  };
  const unLike = async () => {
    await dispatch({
      type: 'login/dislikesArticle',
      payload: articleId,
    });
    Toast.show({
      icon: 'success',
      content: '修改成功',
    });
    onClose();
  };
  const onReports = async (id) => {
    await dispatch({
      type: 'login/reportsArticle',
      payload: {
        target: articleId,
        type: id,
      },
    });
    Toast.show({
      icon: 'success',
      content: '举报成功',
    });
    onClose();
  };
  return (
    <>
      <Modal
        visible={visible}
        content={
          <div className={styles.root}>
            <div className="more-action">
              {/* normal 类型时的菜单内容 */}
              {type === 'normal' && (
                <>
                  <div className="action-item" onClick={unLike}>
                    <Icon type="iconicon_unenjoy1" /> 不感兴趣
                  </div>
                  <div className="action-item" onClick={() => setType('junk')}>
                    <Icon type="iconicon_feedback1" />
                    <span className="text">反馈垃圾内容</span>
                    <Icon type="iconbtn_right" />
                  </div>
                  <div className="action-item">
                    <Icon type="iconicon_blacklist" /> 拉黑作者
                  </div>
                </>
              )}

              {/* junk 类型时的菜单内容 */}
              {type === 'junk' && (
                <>
                  <div className="action-item" onClick={() => setType('normal')}>
                    <Icon type="iconfanhui" />
                    <span className="back-text">反馈垃圾内容</span>
                  </div>
                  {reportsList.map((item) => (
                    <div className="action-item" key={item.id} onClick={() => onReports(item.id)}>
                      {item.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        }
        closeOnAction
        onClose={onClose}
        closeOnMaskClick={true}
        maskStyle={{ opacity: 0.05 }}
      />
    </>
  );
}
