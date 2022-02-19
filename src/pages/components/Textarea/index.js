import classNames from 'classnames';
import React from 'react';
import styles from './index.less';
export default function Textarea({ className, value = '', maxLength = 100, ...rest }) {
  return (
    <div className={styles.root}>
      <textarea className={classNames('textarea', className)} value={value} {...rest} maxLength={maxLength}></textarea>
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
