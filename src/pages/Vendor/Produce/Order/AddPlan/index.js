import React, { PureComponent, Fragment } from 'react';
import { Card, Row, Col, Select, Radio, Input, Modal, Button, Popover, Form, DatePicker, InputNumber } from 'antd';
const { TextArea } = Input;
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import ProductInfo from '../../../NewOrder/ProductInfo';
import FooterToolbar from '@/components/FooterToolbar';
import ChooseProdVdr from '@/components/ChooseProdVdr';
import { router } from 'umi';
import { connect } from 'dva';

let index = 1;

@Form.create()

@connect(({ vdrOrder, loading }) => ({
    vdrOrder,
    loading: loading.effects['order/fetchList'],
  }))
export default class AddPlan extends PureComponent {
    state = {
        value: 1,
        productVisible: false,
        itemList: [{ index: 0, key: 0 }],
    };
    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
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
            location,
        } = this.props;
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                let orderId = (location && location.query && location.query.id) || null
                dispatch({
                    type: 'vdrOrder/addOrderProduct',
                    payload: {
                        add: {
                            orderId,
                            ...values,
                        },
                    },
                    callback: ()=>{
                        router.push('/vendor/produce/order');
                    }
                })
                return;
            }
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
        const { visible, current, value, form: { getFieldDecorator, setFieldsValue, getFieldValue } } = this.props;
        const { productVisible, itemList } = this.state;

        const productInfo = {
            getFieldDecorator,
            setFieldsValue,
            getFieldValue,
            newMember: this.newMember,
            itemList,
            delOrderDetail: this.delOrderDetail,
            productShowModal: this.productShowModal,
            baseInfoShow: true
        };
        const productParentMethod = {
            // 产品列表的方法
            prodVisible: productVisible,
            prodHandleCancel: this.productHandleCancel,
            fromToVdr: true,
        };

        return (
            <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.produce.order.addPlan' })}>
                <Card bordered={false}>
                    <Form>
                        <ProductInfo {...productInfo} />
                        <FooterToolbar style={{ width: '100%' }}>
                            <Button type="primary" onClick={this.validate}>
                                提交
                             </Button>
                            <Button onClick={this.cancel}>取消</Button>
                        </FooterToolbar>
                    </Form>
                </Card>
                <ChooseProdVdr {...productParentMethod} />

            </PageHeaderWrapper>
        )
    }
}