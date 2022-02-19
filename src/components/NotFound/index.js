import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';

export default function NotFound() {
  const [time, setTime] = useState(3);
  // const timeRef = useRef(-1);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime((time) => {
  //       // if (time === 1) {
  //       //   clearInterval(timer);
  //       //   history.push('/main/home');
  //       // }
  //       timeRef.current = time - 1;
  //       return time - 1;
  //     });
  //     if (timeRef.current === 0) {
  //       clearInterval(timer);
  //       history.push('/main/home');
  //     }
  //   }, 1000);
  // }, []);
  useEffect(() => {
    console.log(1111);
    let timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) {
      clearTimeout(timer);
      history.push('/main/home');
    }
  }, [time]);
  return (
    <>
      <div className={styles.wrap}>404</div>
      <p>{time}s后 返回首页</p>
    </>
  );
}
