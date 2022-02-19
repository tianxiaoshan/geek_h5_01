import Tabs from '@/pages/components/Tabs';
import { connect } from 'dva';
import styles from './index.less';
import React, { memo, useState, useEffect } from 'react';
import { Popup } from 'antd-mobile';
import Icon from '@/pages/components/Icon';
import { useDispatch } from 'dva';
import Channels from './components/Channels';
import { set } from 'lodash';
import ArticleList from './components/ArticleList';

const Home = ({ login }) => {
  // const [tab, setTab] = useState(login.channelsInfo);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(5);

  // const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
  };
  const tabs = login.channelsInfo;
  // const tabs = [{ id: 1, name: '首页' }];

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={(e) => setActive(e)}>
        {tabs.map((item) => (
          <ArticleList channelsId={item.id} key={item.id} activeId={active} />
        ))}
      </Tabs>

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={() => setVisible(true)} />
      </div>
      {/* 弹出层 */}
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        position="left"
        bodyStyle={{ minWidth: '100vw' }}
      >
        {visible && <Channels onClose={onClose} login={login} index={active} onChange={(e) => setActive(e)} />}
      </Popup>
    </div>
  );
};

export default connect(({ login }) => ({
  login,
}))(memo(Home));
