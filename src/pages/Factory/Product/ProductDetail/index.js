import { Button, Form, Input, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const SelectOption = Select.Option;
@Form.create()
@connect(({ product, loading }) => ({
    group: product.groupList,
    productOne: product.productOne,
    productImgOne: product.productImgOne,
}))
export default class ProductDetail extends PureComponent {
    state = {
        unit: null,
        name: null,
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const unit = JSON.parse(localStorage.getItem('unit'));
        const name = location.state && location.state.name;

        this.setState({
            name
        })
        dispatch({
            type: 'product/group',
            payload: {
                size: 1000,
            },
        });
        if (name) {
            dispatch({
                type: 'product/productOne',
                payload: {
                    name,
                },
            });
        }
    }
    onCancel = () => {
        router.goBack();
    }
    onHandleEdit = () => {
        const { name } = this.state;
        router.push('/factory/market/product/edit-product', { name });
    }
    onHandleDelete = () => {
        const { dispatch } = this.props;
        const { name } = this.state;
        dispatch({
            type: 'product/delProduct',
            payload: {
                name,
            },
            callback: ()=>{
                router.goBack();
            }
        });
    }
    item = ({ name, value }) => {
        return (
            <div className={styles.text} key={name}>
                <span>{name}:</span>
                <span>{value}</span>
            </div>
        )
    }
    render() {
        const { group, productOne, productImgOne, form: { getFieldDecorator } } = this.props;
        const Item = this.item;
        
        return (
            <div className={styles.product}>
                <div>
                    产品详情
                </div>
              
                <div>
                    <Button type="fault" onClick={this.onHandleEdit} style={{ marginRight: 20 }} >编辑 </Button>
                    <Button onClick={this.onHandleDelete} style={{ marginRight: 20 }} >删除</Button>
                    <Button onClick={this.onCancel}>返回</Button>
                </div>
                <br />
                <br />
                <div className={styles.info}>
                    <Item name='名称' value={productOne && productOne.name} />
                    <Item name='分组' value={productOne && productOne.group || '未分组'} />
                    <Item name='价格' value={`${productOne && productOne.price} 元/${productOne && productOne.unit}`} />
                    <img src={productImgOne} alt='无图片'/>
                </div>
                <div>
                    <br />
                    <br />

                    <div>产品工艺单</div>
                    <FormItem label={'描述'} className={styles.baseInfo}>
                        {getFieldDecorator('description', {
                            initialValue: productOne && productOne.description,
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                    <FormItem label={'参数'} className={styles.baseInfo}>
                        {getFieldDecorator('parameter', {
                            initialValue: productOne && productOne.parameter,
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                </div>

            </div>
        )
    }
}