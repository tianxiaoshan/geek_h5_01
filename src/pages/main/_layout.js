import React, { useEffect, memo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'dva';
import { history, useLocation } from 'umi';
import styles from './index.less';
import Icon from '@/pages/components/Icon';

const tabBar = [
  { title: '首页', icon: 'iconbtn_home', path: '/main/home' },
  { title: '问答', icon: 'iconbtn_qa', path: '/main/qa' },
  { title: '视频', icon: 'iconbtn_video', path: '/main/video' },
  { title: '我的', icon: 'iconbtn_mine', path: '/main/profile' },
];
const Home = ({ children }) => {
  // console.log(children.props.location.pathname, 'children');
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: 'login/getProfile',
    });
    dispatch({
      type: 'login/getChannels',
    });
    dispatch({
      type: 'login/getAllChannels',
    });
  }, []);

  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">{children}</div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {/* tabbar-item-active */}
        {tabBar.map((item) => (
          <div
            className={classNames('tabbar-item', location.pathname === item.path ? 'tabbar-item-active' : null)}
            key={item.title}
            onClick={() => history.push(item.path)}
          >
            <Icon type={location.pathname === item.path ? item.icon + '_sel' : item.icon} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
