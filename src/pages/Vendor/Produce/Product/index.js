import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Button, List, Modal, Input, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi-plugin-react/locale';
import ListCardUtil from '@/components/ListCardUtil';
import styles from './index.less';
import stj from '@/assets/stj.png';
import cxj from '@/assets/cxj.jpg';
import wj from '@/assets/wj.png';
import hzj from '@/assets/hzj.jpg';
import A98 from '@/assets/device/d_A98.jpg'

import { ProductVendorRender } from '@/utils/PopoverRenderUtil';
import EditableTable from './EditCategoryTable';
import AddOrUpdModal from './AddOrUpdModal';
import { notification } from 'antd';
const { Search } = Input;
// TODO
@connect(({ vdrProduct, vdrCategory, loading }) => ({
  product: vdrProduct.productList,
  categoryList: vdrCategory.typeList,
  loading: loading.models.list,
}))
class Product extends Component {
  static translateRender(item) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td align="right">工艺单&nbsp;:&nbsp;</td>
              <td>{item.craftNm}</td>
            </tr>
            <tr>
              <td align="right">品名&nbsp;:&nbsp;</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td align="right">分组&nbsp;:&nbsp;</td>
              <td>{item.typeName}</td>
            </tr>
            <tr>
              <td align="right">日期&nbsp;:&nbsp;</td>
              <td>{item.createTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  state = {
    visibleType: false,
    visible: false,
    current: undefined,
    type: 0,
    currentPage: 1,
    formParams: {
      count: 9,
      page: 0,
    },
    page: 0,
    count: 9,
    workshopParams: {
      // count: 20,
    },
    productCount: 5,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formParams } = this.state;
    dispatch({
      type: 'vdrProduct/getProductMenu',
      payload: {
        ...formParams,
      },
    });
  }

  judgeImg = type => {
    switch (1) {
      case 0:
        return null;
      case 1:
        return cxj;
      case 2:
        return wj;
      case 'glove':
        return stj;
      case 8:
        return hzj;
      default:
        return null;
    }
  };

  // 条件查询
  handleSearch = key => {
    const { dispatch } = this.props;
    const { formParams } = this.state;
    this.setState({
      formValues: key,
      currentPage: 1,
    });
    dispatch({
      type: 'vdrProduct/getProductMenu',
      payload: {
        ...formParams,
        key,
      },
    });
  };

  addModel = () => {
    const { dispatch } = this.props;
    const { workshopParams } = this.state;
    this.setState({
      visible: true,
      current: undefined,
    });
    dispatch({
      type: 'vdrCategory/fetchCategory',
      payload: {},
    });
  };

  typeManage = () => {
    const { dispatch } = this.props;
    const { productCount } = this.state;
    this.setState({
      visibleType: true,
    });
    dispatch({
      type: 'vdrCategory/fetchCategory',
      payload: { count: productCount, page: 0 },
    });
  };

  updProd = (item, e) => {
    const { dispatch } = this.props;
    const { workshopParams } = this.state;
    e.preventDefault();
    this.setState({
      current: item,
      visible: true,
    });
    dispatch({
      type: 'vdrCategory/fetchCategory',
      payload: { ...workshopParams },
    });
  };

  handleDelete = (item, e) => {
    e.preventDefault();
    Modal.confirm({
      title: '删除产品',
      content: '确定删除该产品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.delProd(item),
    });
  };

  delProd = item => {
    const { dispatch } = this.props;
    const { formParams, page, } = this.state;

    dispatch({
      type: 'vdrProduct/delProduct',
      payload: {
        del: item,
        fetch: {
          ...formParams,
          page,
        },
      },
    });
  };

  // 新增or修改产品
  handleSubmit = values => {
    const { dispatch, categoryList } = this.props;
    const { formParams, current, page, count } = this.state;
    let typeId = null;
    let groupList = categoryList && categoryList.items;
    if(typeof values.typeId === 'string' && groupList) {
        typeId = groupList.filter((v,i)=>{
          if(v.name === values.typeId){
            return v;
          }
        })
        typeId = typeId && typeId[0] && typeId[0].id;
        values = {
          ...values,
          typeId,
        }
    }
    if (values && values.headNm && isNaN(Number(values.headNm))) {
      notification.success({
        message: '头数请输入数字类型',
      });
      return;
    }

    if (values && values.stitches && isNaN(Number(values.stitches))) {
      notification.success({
        message: '针数请输入数字类型',
      });
      return;
    }
    if (current !== undefined) {
      dispatch({
        type: 'vdrProduct/updateProduct',
        payload: {
          upd: { ...current, ...values },
          fetch: { page, count },
        },
        callback: () => {
          this.setState({
            visible: false,
            current: undefined,
          });
        },
      });
    } else {
      dispatch({
        type: 'vdrProduct/addProduct',
        payload: {
          add: {
            ...values,
          },
          fetch: {
            ...formParams,
          },
        },
        callback: () => {
          this.setState({
            visible: false,
            current: undefined,
          });
        },
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  changeType = value => {
    this.setState({
      type: value,
    });
  };

  handleTypeCancel = () => {
    this.setState({
      visibleType: false,
    });
  };

  render() {
    const { visibleType, visible, currentPage, formValues, current } = this.state;
    const { product, categoryList, dispatch } = this.props;
    const productList =
    product && product.items ? product.items : [];

    const paginationProps = {
      onChange: page => {
        dispatch({
          type: 'vdrProduct/getProductMenu',
          payload: {
            ...formValues,
            count: 9,
            page: page - 1,
          },
        });
        this.setState({
          currentPage: page,
          page: page - 1,
        });
      },
      showQuickJumper: true,
      pageSize: 9,
      total: product && product.total ? product.total : 0,
      showTotal: total => `共 ${total} 条`,
      current: currentPage,
    };
    const cardMethod = {
      checkboxGroup: false,
      popover: true,
      // judgeImg: this.judgeImg,
      translateRender: this.constructor.translateRender,
    };
    const parentTableMethods = {
      visible: visibleType,
      categoryList,
      handleCancel: this.handleTypeCancel,
    };

    const parentMethods = {
      visible,
      current,
      groupList: categoryList,
      handleCancel: this.handleCancel,
      changeType: this.changeType,
      handleSubmit: this.handleSubmit,
    };
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'vendor.menu.produce.product' })}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="end">
              <Col md={8} sm={24}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={this.addModel}>
                    新增产品
                  </Button>
                  <span>
                    <Button onClick={this.typeManage}>分组管理</Button>
                  </span>
                </div>
              </Col>
              <Col md={8} sm={24} />
              <Col md={8} sm={24}>
                <Search
                  placeholder="请输入工艺单号\品名\分组"
                  enterButton="查询"
                  onSearch={this.handleSearch}
                  allowClear
                />
              </Col>
            </Row>
          </div>

          <Card bordered={false} bodyStyle={{ padding: 0 }}>
            <List
              rowKey="id"
              loading={false}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 2, xs: 1 }}
              dataSource={[...productList]}
              pagination={paginationProps}
              renderItem={item =>
                item ? (
                  <ListCardUtil
                    avatar={
                      <img alt="" className={styles.cardAvatar} src={A98} />
                    }
                    // title={<a>{item.no}</a>}
                    {...cardMethod}
                    item={item}
                    fromToVendorProduct={true}
                    actions={[
                      <a onClick={this.updProd.bind(this, item)}>修改</a>,
                      <a onClick={this.handleDelete.bind(this, item)}>删除</a>,
                    ]}
                    content={ProductVendorRender(item)}
                  />
                ) : null
              }
            />
          </Card>
          <AddOrUpdModal {...parentMethods} />
          <EditableTable {...parentTableMethods} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Product;
