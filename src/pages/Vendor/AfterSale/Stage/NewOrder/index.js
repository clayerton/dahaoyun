import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Form } from 'antd';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import NewOrderContent from '../../../NewOrder'
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';

@Form.create()
@connect(({ stage, loading }) => ({
  stage,
  loading: loading.models.list,
}))
class NewOrder extends PureComponent {
  sourceDate = (values) => {
    const { dispatch } = this.props;
    // let start = null;
    // if(values && values.instalment) {
    //   start = moment(values.instalment.start).format('YYYY-MM-DD') || null;
    //   values.instalment.start = start;
    // }
    dispatch({
      type: 'stage/addStageList',
      payload: {
        add: { ...values },
        fetch: {}
      },
      callback: ()=>{
        router.push('/vendor/afterSale/stage');
      }
    });
  }
  render() {
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.after-sale.newOrder' })}>
        <NewOrderContent sourceDate={this.sourceDate} />
      </PageHeaderWrapper>
    );
  }
}

export default NewOrder;
