const setCaptchaTime = (time, timestamp) => {
  const captchaBody = {
    time: 0,
    timestamp: undefined,
  };
  if (time && timestamp) {
    captchaBody.time = time;
    captchaBody.timestamp = timestamp;
  }
  localStorage.setItem('CaptchaBody', JSON.stringify(captchaBody));
};

const getCaptchaTime = timestampNow => {
  const captchaBody = JSON.parse(localStorage.getItem('CaptchaBody'));

  if (!captchaBody) {
    return 0;
  }
  const captchaTime = parseInt(captchaBody.time, 0);
  const captchaTimestamp = parseInt(captchaBody.timestamp, 0);
  if (timestampNow && captchaTimestamp) {
    const newTime = captchaTime - Math.floor((timestampNow - captchaTimestamp) / 1000);
    if (newTime > 0) {
      return newTime;
    } else {
      return 0;
    }
  }
  return captchaTime;
};

export { setCaptchaTime, getCaptchaTime };
