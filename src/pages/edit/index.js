import React, { useState, memo, useRef, useEffect } from 'react';
import { List, Popup, DatePicker, Toast, Modal } from 'antd-mobile';
import classNames from 'classnames';
import { connect, history } from 'umi';
import { useDispatch } from 'dva';
import styles from './index.less';
import NavBar from '@/pages/components/NavBar';
import EditInput from './components/EditInput';
import EditList from './components/EditList';
import dayjs from 'dayjs';

const { Item } = List;
const now = new Date();
const sex = {
  0: '男',
  1: '女',
};
const Edit = ({ getUser }) => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState({
    visible: false,
    type: '',
  });
  const [dateHide, setDateHide] = useState(false);
  const [leftHide, setLeftHide] = useState({
    visible: false,
    type: '',
  });
  useEffect(() => {
    dispatch({
      type: 'login/getProfileUser',
    });
  }, []);
  const onPopupClose = () => {
    setLeftHide({
      visible: false,
      type: '',
    });
    setVisible({
      visible: false,
      type: '',
    });
  };
  const onCommit = async (type, value) => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    await dispatch({
      type: 'login/getUploadInfo',
      payload: { [type]: value },
    });
    Toast.show({
      icon: 'success',
      content: '修改成功',
    });
    onPopupClose();
  };
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('拍照');
        },
      },
      {
        title: '上传',
        onClick: () => {
          fileRef.current.click();
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 0);
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1);
        },
      },
    ],
  };
  const onFileChange = async (e) => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('photo', file);
    await dispatch({
      type: 'login/getUploadPhoto',
      payload: fd,
    });
    Toast.show({
      icon: 'success',
      content: '修改成功',
    });
    onPopupClose();
  };
  const onBirthday = (e) => {
    // console.log(e);
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'));
  };
  const onLogout = () => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    Modal.confirm({
      content: '是否退出登录',
      onConfirm: () => {
        dispatch({
          type: 'login/removeToken',
        });
        history.push('/login');
        Toast.show({
          icon: 'success',
          content: '退出成功',
          position: 'bottom',
        });
      },
    });
  };
  return (
    <div className={styles.root}>
      <NavBar>个人信息</NavBar>
      <div className="wrapper">
        <List className="profile-list">
          <Item
            onClick={() => {
              setVisible({
                visible: true,
                type: 'photo',
              });
            }}
            extra={
              <span className="avatar-wrapper">
                <img src={getUser.photo} alt="" />
              </span>
            }
          >
            头像
          </Item>
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
          <Item
            onClick={() => {
              setLeftHide({
                visible: true,
                type: 'name',
              });
            }}
            extra={getUser.name}
          >
            昵称
          </Item>
          <Item
            onClick={() => {
              setLeftHide({
                visible: true,
                type: 'intro',
              });
            }}
            extra={<span className={classNames('intro', getUser.intro && 'normal')}>{getUser.intro || '未填写'}</span>}
          >
            简介
          </Item>
        </List>
        <List>
          <Item
            onClick={() => {
              setVisible({
                visible: true,
                type: 'gender',
              });
            }}
            extra={sex[getUser.gender]}
          >
            性别
          </Item>
          <Item
            onClick={() => {
              setDateHide(true);
            }}
            extra={getUser.birthday}
          >
            生日
          </Item>
          <DatePicker
            title="年月日"
            max={now}
            min={new Date('1900-1-1')}
            value={new Date(getUser.birthday)}
            visible={dateHide}
            onClose={() => {
              setDateHide(false);
            }}
            onConfirm={onBirthday}
          />
        </List>
        <div className="logout" onClick={onLogout}>
          <button className="btn">退出登录</button>
        </div>
      </div>
      {/* 下面弹出层 */}
      <Popup
        visible={visible.visible}
        onMaskClick={() => {
          setVisible({
            visible: false,
            type: '',
          });
        }}
        bodyStyle={{ minHeight: '24vh' }}
        destroyOnClose
      >
        {visible.visible && <EditList onPopupClose={onPopupClose} config={config} type={visible.type} />}
      </Popup>
      {/* 右边弹出层 */}
      <Popup
        visible={leftHide.visible}
        onMaskClick={() => {
          setLeftHide({
            visible: false,
            type: '',
          });
        }}
        destroyOnClose
        position="right"
        bodyStyle={{ minWidth: '57vh' }}
      >
        {leftHide.visible && <EditInput onPopupClose={onPopupClose} type={leftHide.type} getUser={getUser} onCommit={onCommit} />}
      </Popup>
    </div>
  );
};

export default connect(({ login }) => ({
  getUser: login.getUser,
}))(memo(Edit));
