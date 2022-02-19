import { trackApp } from './appMethod';
// 页面
export const trackPage = (PROJECT_id) => {
  trackApp('GetCoupon', { PROJECT_id });
};

// 点击领取红包
export const trackCoupon = (Ecall_Key_CouponId, Ecall_Key_CouponSources) => {
  const obj = {
    Ecall_Key_CouponId,
    Ecall_Key_CouponSources,
  };
  trackApp('Ecall_Event_GetCoupon', obj);
};
// 获劵弹窗
export const trackCouponPop = (Ecall_Key_CouponId, Ecall_Key_CouponSources) => {
  const obj = {
    Ecall_Key_CouponId,
    Ecall_Key_CouponSources,
  };
  trackApp('Ecall_Event_CouponPost', obj);
};
// 点击去使用
export const trackUseCoupon = (Ecall_Key_CouponId, Ecall_Key_CouponSources) => {
  const obj = {
    Ecall_Key_CouponId,
    Ecall_Key_CouponSources,
  };
  trackApp('Ecall_Event_UseCoupon', obj);
};
