const type = {
  beta: ['fty.beta','iot.beta', 'core.beta',  'net'],
  io: ['fty', 'iot', 'core', 'io'],
};
const env = type.beta;
function getUrl(type) {
  return `http://${type}.dahaoyun.${env[3]}`;
}
const fty = getUrl(env[0]);
const iot = getUrl(env[1]);
const core = getUrl(env[2]);

export { fty, core, iot };

