/**
 * 处理函数节流
 * @param {*} fn 
 * @param {*} threshhold 
 */
function throttle(delay, action, T = {}) {
    let last = T.timer || 0;

    return function() {
      const cur = +new Date();
      if (cur - last > delay) {
        action.apply(this, arguments);
        T.timer = cur;
      } else {
        T.actions = [
          () => {
            action.apply(this, arguments);
          },
        ];
        setTimeout(() => {
          if (+new Date() - T.timer >= 1000) {
            T.actions[0] && T.actions[0]();
          }
          T.actions = [];
        }, 1000);
      }
    };
  }
export {
    throttle
}