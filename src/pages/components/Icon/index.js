import React from 'react';
import classNames from 'classnames';

const Icon = ({ type, className, ...rest }) => {
  return (
    <>
      <svg {...rest} className={classNames('icon', className)} aria-hidden="true">
        <use xlinkHref={`#${type}`} />
      </svg>
    </>
  );
};

export default Icon;
