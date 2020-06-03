import { Button, Form, Input, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
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
export default class AddOrEditPro extends PureComponent {
    state = {
        unit: null,
        name: null,
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const unit = JSON.parse(localStorage.getItem('unit'));
        const name = location.state && location.state.name;

        this.setState({
            unit,
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
    handleSubmit = e => {
        e.preventDefault();
        const { unit, name } = this.state;

        const { form, dispatch } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            if (name)
                dispatch({
                    type: 'product/productModify',
                    payload: fieldsValue,
                    callback: () => {
                        router.goBack();
                    }
                })
            else
                dispatch({
                    type: 'product/addProduct',
                    payload: fieldsValue,
                    callback: () => {
                        router.goBack();
                    }
                })
        });
    }
    render() {
        const { group, productOne, productImgOne, form: { getFieldDecorator } } = this.props;
        const { unit, name } = this.state;

        return (
            <Form className={styles.product} onSubmit={this.handleSubmit}>
                <div>
                    {name ? '编辑产品' : '新增产品'}
                </div>
                <div className={styles.info}>
                    <FormItem label={'名称'} className={styles.baseInfo}>
                        {getFieldDecorator('name', {
                            initialValue: name && productOne && productOne.name,
                            rules: [{ required: true, message: '请输入名称' }],
                        })(
                            <Input autoComplete='off' placeholder={'请输入'} />
                        )}
                    </FormItem>
                    <FormItem label={'分组'} className={styles.baseInfo}>
                        {getFieldDecorator('group', {
                            initialValue: name && productOne && productOne.group,
                        })(
                            <Select className={styles.select} onChange={this.onChangeUnit}>
                                {
                                    group && group.map((v, i) => {
                                        if (!v.name) return null;
                                        return <SelectOption key={v.name}>{v.name}</SelectOption>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'价格'} className={styles.baseInfo}>
                        {getFieldDecorator('price', {
                            initialValue: name && productOne && productOne.price,
                        })(
                            <InputNumber autoComplete='off' placeholder={'请输入'} />
                        )}
                        <FormItem>
                            {getFieldDecorator('unit', {
                                initialValue: name && productOne && productOne.unit,
                            })(
                                <Select className={styles.select} onChange={this.onChangeUnit}>
                                    {
                                        unit && unit.map((v, i) => {
                                            return <SelectOption key={v.name}>{v.name}</SelectOption>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                    </FormItem>
                </div>
                <div>
                    <div>产品工艺单</div>
                    <FormItem label={'描述'} className={styles.baseInfo}>
                        {getFieldDecorator('description', {
                            initialValue: name && productOne && productOne.description,
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                    <FormItem label={'参数'} className={styles.baseInfo}>
                        {getFieldDecorator('parameter', {
                            initialValue: name && productOne && productOne.parameter,
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                </div>
                <div>
                    <Button type="fault" onClick={this.onCancel} style={{ marginRight: 20 }} >取消 </Button>
                    <Button type="primary" htmlType="submit"  >提交 </Button>
                </div>
            </Form>
        )
    }
}