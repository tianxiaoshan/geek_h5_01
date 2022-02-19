import React, { useState, memo } from 'react';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import { useDispatch } from 'dva';
import { useFormik } from 'formik';
import { history, connect } from 'umi';
import * as Yup from 'yup';
import styles from './index.less';
import Input from '@/pages/components/Input';
import NavBar from '@/pages/components/NavBar';

const Login = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const formik = useFormik({
    initialValues: {
      mobile: '18723221111',
      code: '246810',
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('手机号不能为空')
        .matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('验证码不能为空')
        .matches(/^\d{6}$/, '验证码格式错误'),
    }),
    onSubmit(values) {
      Toast.show({
        icon: 'loading',
        content: '加载中…',
      });
      dispatch({
        type: 'login/login',
        payload: values,
      });
      Toast.show({
        icon: 'success',
        content: '登录成功',
      });
      history.push('/main/video');
    },
  });
  const {
    values: { mobile, code },
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    isValid,
  } = formik;
  const onSendCode = async () => {
    if (time > 0) return;
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      });
      return;
    }

    await dispatch({
      type: 'login/sendCode',
      payload: mobile,
    });
    Toast.show({
      icon: 'success',
      content: '获取验证码成功',
    });
    setTime(60);
    const timeId = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId);
        }
        return time - 1;
      });
    }, 1000);
  };
  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                maxLength={11}
                className="input"
                placeholder="请输入手机号"
                name="mobile"
                onChange={handleChange}
                value={mobile}
                autoComplete="off"
                onBlur={handleBlur}
              />
            </div>
            {touched.mobile && errors.mobile ? <div className="validate">{errors.mobile}</div> : null}
            {/* <div className="validate">手机号验证错误信息</div> */}
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                maxLength={6}
                className="input"
                placeholder="请输入验证码"
                extra={time === 0 ? '获取验证码' : time + 's后获取'}
                onSendCode={onSendCode}
                name="code"
                onChange={handleChange}
                value={code}
                autoComplete="off"
                onBlur={handleBlur}
              />
            </div>
            {touched.code && errors.code ? <div className="validate">{errors.code}</div> : null}

            {/* <div className="validate">验证码验证错误信息</div> */}
          </div>

          {/* 登录按钮 */}
          <button type="submit" className={classNames('login-btn', isValid ? '' : 'disabled')} disabled={!isValid}>
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(({ login }) => ({
  login,
}))(memo(Login));
