import React from 'react';
import styles from './box.less';
import { Carousel } from 'antd';
import WorkshopBoxChart from './com_WorkshopBoxChart';
import { formatMessage } from 'umi-plugin-react/locale';

export default class Component extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { data: null }
  }

  Item = ({ item, index }) => {
    return (
      <div className={`${styles.worshopContentItem} ${(index + 1) % 3 !== 0 && styles.worshopContentItemMarginRight}`}>
        <div className={styles.worshopContentItemText}>
          <div className={styles.worshopContentItemTextTop}>{item.total}</div>
          <div className={styles.worshopContentItemTextBottom}>{item.name}</div>
        </div>
        <WorkshopBoxChart data={item} index={index} />
      </div>
    )
  }

  NestMap = ({ data }) => {
    const Item = this.Item;
    return (
      <Carousel autoplay autoplaySpeed={6000} dotPosition="bottom">
        {data.map((_, index) => {
          if (index % 6 === 0)
            return (
              <div className={styles.worshopContentWindow} key={index + ''}>
                {data.map((obj2, index2) => {
                  if (Math.ceil((index + 1) / 6) === Math.ceil((index2 + 1) / 6))
                    return <Item item={obj2} key={index2 + ''} index={index2} />;
                })}
              </div>
            );
        })}
      </Carousel>
    );
  };


  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  render() {

    const NestMap = this.NestMap;
    const { data } = this.state;

    return (
      <div className={styles.box}>
        <div className={styles.title}>
          {formatMessage({id: 'number.of.needles.in.each.workshop'})}
        </div>
        <div className={styles.worshopContent}>
          <NestMap data={data || []} />
        </div>
      </div>
    )
  }
}
