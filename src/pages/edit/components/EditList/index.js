import React from 'react';
import styles from './index.less';

export default function EditList({ onPopupClose, config, type }) {
  //   console.log(config, type);
  const list = config[type];
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div className="list-item" key={item.title} onClick={item.onClick}>
          {item.title}
        </div>
      ))}

      <div className="list-item" onClick={onPopupClose}>
        取消
      </div>
    </div>
  );
}
