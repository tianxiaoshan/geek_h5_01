import NavBar from '@/pages/components/NavBar';
// import { ImagePicker, InputItem } from 'antd-mobile';
import { history } from 'umi';

import styles from './index.less';

const FeedBack = () => {
  return (
    <div className={styles.root}>
      <NavBar onLeftClick={() => history.go(-1)}>意见反馈</NavBar>

      <div className="wrapper">
        <div className="feedback-item">
          <p className="title">简介</p>
          <div className="textarea-wrap">
            <textarea className="textarea" placeholder="请输入"></textarea>
            <div className="count">0/100</div>
          </div>
          {/* <ImagePicker files={[]} multiple /> */}
          <p className="image-picker-desc">最多6张，单个图片不超过20M。</p>
        </div>

        <div className="feedback-item">
          <p className="title">联系方式</p>
          {/* <InputItem placeholder="请输入手机号码便于联系（非必填）" /> */}
        </div>

        <div className="feedback-item feedback-submit">
          <button>提交反馈</button>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
