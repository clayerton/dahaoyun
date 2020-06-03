import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Form } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import BaseInfo from './BaseInfo';
import ProductInfo from './ProductInfo';
import StageInfo from './StageInfo';
import ChooseProdVdr from '@/components/ChooseProdVdr';
import { router } from 'umi';

let index = 1;

@Form.create()
class NewOrder extends PureComponent {
  state = {
    value: 1,
    productVisible: false,
    itemList: [{index: 0,key: 0}],
  };
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  // 增加新产品
  newMember = () => {
    const { itemList } = this.state;
    const newItemList = itemList.map(item => item);

    newItemList.push({ index, key: index });
    index += 1;
    this.setState({
      itemList: newItemList,
    });
  };

  productShowModal = (item) => { 
    this.setState({
      productVisible: true,
      selectIndex: item,
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      sourceDate,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        sourceDate && sourceDate(values);
      }
    });
  };

  cancel = () => { 
    router.goBack();
  };
  productHandleCancel = value => {
    const { selectIndex, itemList } = this.state;
    this.setState({
      productVisible: false,
      selectIndex: undefined,
    });
    if (value) {
      const newItemList = itemList.map(item => {
        if (item.index === selectIndex) {
          const data = {
            ...item,
            product: value,
          };
          return data;
        }
        return item;
      });
      this.setState({
        itemList: newItemList,
      });
    }
  };
  delOrderDetail = value => {
    const { itemList } = this.state;
    const indexs = itemList.map(item => item.index).indexOf(value);
    const newItemList = itemList.map(item => item);
    newItemList.splice(indexs, 1);
    this.setState({
      itemList: newItemList,
    });
  };


  render() {
    const {
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;
    const { productVisible, width, itemList } = this.state;

    const baseInfo = {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      formLayout: this.formLayout,
    };
    const orderParentMethods = {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      formLayout: this.formLayout,
      index,
      productShowModal: this.productShowModal,
    };
    const productInfo = {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      newMember: this.newMember,
      itemList,
      delOrderDetail: this.delOrderDetail,
      productShowModal: this.productShowModal,
    };

    const productParentMethod = {
      // 产品列表的方法
      prodVisible: productVisible,
      prodHandleCancel: this.productHandleCancel,
      fromToVdr: true,
    };

    return (
      <Fragment>
        <Form>
          <BaseInfo {...baseInfo} />
          <StageInfo {...orderParentMethods} />
          <ProductInfo {...productInfo} />
          <FooterToolbar style={{ width: '100%' }}>
            <Button type="primary" onClick={this.validate}>
              提交
            </Button>
            <Button onClick={this.cancel}>取消</Button>
          </FooterToolbar>
        </Form>
        <ChooseProdVdr {...productParentMethod} />

      </Fragment>

    );
  }
}

export default NewOrder;
