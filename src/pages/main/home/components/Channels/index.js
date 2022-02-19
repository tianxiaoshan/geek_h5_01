import React, { memo, useState } from 'react';
import styles from './index.less';
import Icon from '@/pages/components/Icon';
import { connect, useDispatch } from 'dva';
import classNames from 'classnames';
import { Toast } from 'antd-mobile';

const Channels = ({ onClose, login, allchannelsinfo, index, onChange }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const userChannlsInfo = login.channelsInfo;
  const allChannelsInfo = allchannelsinfo;
  const selectChannelsInfo = allChannelsInfo.filter((item) => {
    return userChannlsInfo.findIndex((v) => v.id === item.id) === -1;
  });
  const changeChannels = (i) => {
    if (edit) return;
    onChange(i || 0);
    onClose();
  };
  const onDel = async (channels, i) => {
    // console.log(channels.id);
    if (userChannlsInfo.length <= 4) {
      Toast.show({
        content: '至少保留4个哟',
      });
      return;
    }
    await dispatch({
      type: 'login/delChannels',
      payload: channels.id,
    });
    Toast.show({
      icon: 'success',
      content: '删除成功',
    });
    // 解决删除高亮的问题
    if (index === i) {
      onChange(0);
    } else if (i < index) {
      onChange(index - 1);
    }
  };
  const onAdd = async (channels) => {
    await dispatch({
      type: 'login/addChannels',
      payload: channels,
    });
    Toast.show({
      icon: 'success',
      content: '添加成功',
    });
  };
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        <div className={classNames('channel-item', { edit: edit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{edit ? '点击删除频道' : '点击进入频道'}</span>
            <span className="channel-item-edit" onClick={() => setEdit(!edit)}>
              {edit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannlsInfo.map((item, i) => (
              <span className={classNames('channel-list-item', index === i ? 'selected' : null)} key={item.id} onClick={() => changeChannels(i)}>
                {item.name}
                {item.id !== 0 && <Icon type="iconbtn_tag_close" onClick={() => onDel(item, i)} />}
              </span>
            ))}

            {/* <span className="channel-list-item">开发者资讯</span> */}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
            {/* <span className="channel-item-edit">编辑</span> */}
          </div>
          <div className="channel-list">
            {selectChannelsInfo.map((item) => (
              <span className="channel-list-item" key={item.id} onClick={() => onAdd(item)}>
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(({ login }) => ({
  allchannelsinfo: login.allchannelsinfo,
}))(memo(Channels));
