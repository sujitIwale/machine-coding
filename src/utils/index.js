export const throttle = (fn, delay) => {
  let last = 0;
  let timer;

  return function (...args) {
    const context = this;
    const now = Date.now();

    if (now - last >= delay) {
      fn.apply(context, args);
      last = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(
        () => {
          fn.apply(context, args);
          last = Date.now();
        },
        delay - (now - last)
      );
    }
  };
};

export const debounce = (fn, delay) => {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
