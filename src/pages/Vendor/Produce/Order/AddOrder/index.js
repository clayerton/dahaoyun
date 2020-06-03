import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Form } from 'antd';
import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import NewOrderContent from '../../../NewOrder/index';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';

@Form.create()
@connect(({ vdrOrder, loading }) => ({
  vdrOrder,
  loading: loading.models.list,
}))
class AddOrder extends Component {

  componentDidMount() {

  }

  sourceDate = (values) => {
    const { dispatch } = this.props;
    // let start = null;
    // if(values && values.instalment) {
    //   start = moment(values.instalment.start).format('YYYY-MM-DD') || null;
    //   values.instalment.start = start;
    // }
    dispatch({
      type: 'vdrOrder/addOrder',
      payload: {
        add: { ...values },
        fetch: {}
      },
      callback: ()=>{
        router.push('/vendor/produce/order');
      }
    });
  }
  render() {
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.produce.order.newOrder' })}>
        <NewOrderContent sourceDate={this.sourceDate} />
      </PageHeaderWrapper>
    );
  }
}

export default AddOrder;
