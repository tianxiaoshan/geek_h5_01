import React from 'react';
import './index.less';

const PageLoading = () => (
  <div className="page-loading-wrap">
    <div className="snt-spin snt-spin-lg snt-spin-spinning">
      <span className="snt-spin-dot snt-spin-dot-spin">
        <i className="snt-spin-dot-item" />
        <i className="snt-spin-dot-item" />
        <i className="snt-spin-dot-item" />
        <i className="snt-spin-dot-item" />
      </span>
    </div>
  </div>
);
export default PageLoading;
