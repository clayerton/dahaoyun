import moment from 'moment';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-react/locale';
import Box1 from './com_Box1';
import Box2 from './com_Box2';
import Box3 from './com_Box3';
import Box4 from './com_Box4';
import Box5 from './com_Box5';
import Box6 from './com_Box6';
import Box7 from './com_Box7';
import styles from './index.less';

@connect(
  ({ kanBan, loading }) => ({
    data: kanBan.general,
    loading: loading.effects['kanBan/watchboardGeneral'],
  }),
  dispatch => ({
    watchboardGeneral: payload => dispatch({ type: 'kanBan/watchboardGeneral', payload }),
  })
)
class StatisticalBoard extends PureComponent {
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
    const date = theMoment.format('YYYY/MM/DD');
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
    this.props.watchboardGeneral({ start: now });
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

    return (
      <div className={styles.container}>
        <div className={styles.headerCenter}>
          <div className={styles.headerCenterInner}>
            <span className={styles.lgColor}>{formatMessage({id: 'factory.platform'})}</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerRightInner}>
            <div className={styles.time}>{this.state.time}</div>
            <div className={styles.date}>
              <div className={styles.dateItem}>{this.state.date}</div>
              <div className={styles.dateItem}>{this.state.week}</div>
            </div>
          </div>
        </div>
        <div className={styles.boxLeft1}>
          <Box1 data={data && data.device} />
        </div>
        <div className={styles.boxLeft2}>
          <Box2 data={data && data.workshops} />
        </div>
        <div className={styles.boxLeft3}>
          <Box3 data={data && data.errors} />
        </div>
        <div className={styles.boxCenter1}>
          <Box4 data={data && data.works} />
        </div>
        <div className={styles.boxCenter2}>
          <Box5 data={data} />
        </div>
        <div className={styles.boxRight1}>
          <Box6 data={data && data.workshops} />
        </div>
        <div className={styles.boxRight2}>
          <Box7 data={data && data.workshops} />
        </div>
      </div>
    );
  }
}
export default StatisticalBoard;
