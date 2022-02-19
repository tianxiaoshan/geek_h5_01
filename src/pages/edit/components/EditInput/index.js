import Input from '@/pages/components/Input';
import NavBar from '@/pages/components/NavBar';
import Textarea from '@/pages/components/Textarea';
import React, { useState } from 'react';
import styles from './index.less';

export default function EditInput({ onPopupClose, type, getUser, onCommit }) {
  const defaultValue = getUser[type];

  const [value, setValue] = useState(defaultValue || '');
  return (
    <div className={styles.root}>
      <NavBar
        onPopupClose={onPopupClose}
        extra={
          <div className="commit-btn" onClick={() => onCommit(type, value)}>
            提交
          </div>
        }
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="content">
        {type === 'name' ? (
          <Input placeholder="请输入昵称" value={value} onChange={(e) => setValue(e.target.value)}></Input>
        ) : (
          <Textarea placeholder="请输入简介" value={value} onChange={(e) => setValue(e.target.value)} />
        )}
      </div>
    </div>
  );
}
