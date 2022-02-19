import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const Input = ({ className, extra, onSendCode, ...rest }) => {
  return (
    <div className={styles.root}>
      <input className={classNames('input', className)} {...rest} />
      {extra ? (
        <div className="extra" onClick={onSendCode}>
          {extra}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
