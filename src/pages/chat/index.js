import React, { useState, useRef } from 'react';
import styles from './index.less';
import NavBar from '@/pages/components/NavBar';
import Icon from '@/pages/components/Icon';
import Input from '@/pages/components/Input';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { getTokenInfo } from '@/utils/storage';
export default function Chat() {
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: '你好呀，我是小智' },
    { type: 'user', text: '你好呀，小智' },
  ]);
  const [msg, setMsg] = useState();
  const clientRef = useRef(null);
  const scrollRef = useRef(null);
  // 1 链接ws
  useEffect(() => {
    const client = io('http://toutiao.itheima.net', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    });
    clientRef.current = client;
    client.on('connect', () => {
      // console.log('链接成功');
      setMessageList((messageList) => {
        return [...messageList, { type: 'robot', text: '我在呢！！' }];
      });
    });
    // 机器人回复消息
    // client.on('massage', (e) => setMessageList([...messageList, { type: 'robot', text: e.msg }]));
    client.on('message', (e) => setMassageList((massageList) => [...massageList, { type: 'robot', text: e.msg }]));
    return () => {
      client.close();
    };
  }, []);
  // 2 给ws 发消息
  const onKeyUp = (e) => {
    // console.log(1111);
    if (e.keyCode !== 13) return;
    if (!msg) return;
    setMessageList([...messageList, { type: 'user', text: msg }]);
    clientRef.current.emit('message', { msg, timestamp: Date.now() });
    setMsg('');
  };
  // 3 页面一打开执行
  useEffect(() => {
    // scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.offectScroll;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.offsetHeight;
  }, [messageList]);
  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onLeftClick={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={scrollRef}>
        {/* 机器人的消息 */}
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          }
          return (
            <div className="chat-item user" key={index}>
              <img src={'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
              <div className="message">{item.text}</div>
            </div>
          );
        })}
      </div>
      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border" placeholder="请描述您的问题" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyUp={onKeyUp} />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
}
