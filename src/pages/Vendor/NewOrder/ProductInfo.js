import { Button, Card, Form, } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
import NewProduct from './NewProduct';
@Form.create()

class ProductInfo extends PureComponent {
  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      newMember,
      itemList,
      productShowModal,
      delOrderDetail,
      baseInfoShow,
    } = this.props;

    const orderParentMethods = {
      setFieldsValue,
      getFieldDecorator,
      getFieldValue,
      delOrderDetail,
      productShowModal,
      itemList,
    };

    return (
      <Card style={{ marginTop: 20 }} bordered={false}>
        <div className={styles.baseInfo}>
          <span className={styles.flag}>{!baseInfoShow ? 3 : 1}</span>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>选择产品</span>
        </div>
        {itemList && itemList.map((item, i) => (
          <NewProduct item={item} {...orderParentMethods} index={i} key={item.index} />
        ))}
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => newMember()}
          icon="plus"
          title="新增"
        >
          新增
        </Button>
      </Card>
    );
  }
}

export default ProductInfo;
