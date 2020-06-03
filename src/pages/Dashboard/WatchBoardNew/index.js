import React, { PureComponent } from 'react';
import styles from './index.less';
import moment from 'moment';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-react/locale';
import DeviceBox from './com_DeviceBox';
import WorkshopBox from './com_WorkshopBox';
import WorkBox from './com_WorkBox';
import YieldBox from './com_YieldBox';

@connect(
  ({ kanBan, loading }) => ({
    data: kanBan.concise,
    loading: loading.effects['kanBan/watchboardConcise'],
  }),
  dispatch => ({
    watchboardConcise: payload => dispatch({ type: 'kanBan/watchboardConcise', payload }),
  })
)
export default class WatchBoardNew extends PureComponent {

  constructor(props) {
    super(props);
    this._time = null;
    this._polling = null;
    this.state = {
      time: null,
      date: null,
      week: null,
    };
  }

  _formatWeek = number => {
    switch (number) {
      case '1':
        return formatMessage({id: 'Monday'});
      case '2':
        return formatMessage({id: 'Tuesday'});
      case '3':
        return formatMessage({id: 'Wednesday'});
      case '4':
        return formatMessage({id: 'Thursday'});
      case '5':
        return formatMessage({id: 'Friday'});
      case '6':
        return formatMessage({id: 'Saturday'});
      case '7':
        return formatMessage({id: 'Sunday'});
      default:
        return null;
    }
  };

  _dateAndWeek = () => {
    const theMoment = moment().local();
    const date = theMoment.format('YYYY-MM-DD');
    const E = theMoment.format('E');
    const week = this._formatWeek(E);
    this.setState({ date, week });
  };

  _formatTime = number => {
    if (number > 9) return number;
    else return `0${number}`;
  };

  _clock = () => {
    const d = new Date();
    const h = this._formatTime(d.getHours());
    const m = this._formatTime(d.getMinutes());
    const s = this._formatTime(d.getSeconds());
    const time = `${h}:${m}:${s}`;
    this.setState({ time });
  };

  _getData = () => {
    const now = moment(new Date()).format('YYYY-MM-DDT00:00:00+08:00');
    this.props.watchboardConcise({ start: now });
  };

  componentDidMount() {
    this._getData();
    this._dateAndWeek();
    this._time = setInterval(this._clock, 1000);
    this._polling = setInterval(this._getData, 30000);
  }

  componentWillUnmount() {
    if (this._time) {
      clearInterval(this._time);
      this._time = null;
    }
    if (this._polling) {
      clearInterval(this._polling);
      this._polling = null;
    }
  }

  render() {

    const { data } = this.props;
    const device = data && data.device;
    const works = data && data.works;
    const workshops = data && data.workshops;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>{formatMessage({id: 'factory.platform'})}</div>
          <div>
            <span className={styles.date}>{this.state.date}</span>
            <span className={styles.date}>{this.state.time}</span>
            <span className={styles.date}>{this.state.week}</span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.devices}>
              <div className={styles.deviceBox}>
                <DeviceBox label={formatMessage({id: 'device.run'})} quantity={device && device.runs} percentage={device && (device.runs / device.total * 100).toFixed(0)} />
              </div>
              <div className={styles.deviceBox}>
                <DeviceBox label={formatMessage({id: 'device.stop'})} quantity={device && (device.stops + device.errors).toFixed(0)} percentage={device && ((device.stops + device.errors) / device.total * 100).toFixed(0)} />
              </div>
              <div className={styles.deviceBox}>
                <DeviceBox label={formatMessage({id: 'device.offline'})} quantity={device && device.offlines} percentage={device && (device.offlines / device.total * 100).toFixed(0)} />
              </div>
            </div>
            <div className={styles.workshopBox}>
              <WorkshopBox data={workshops} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.workBox}>
              <WorkBox data={works} />
            </div>
            <div className={styles.yieldBox}>
              <YieldBox data={workshops} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}
