import Header from '@/components/GroupHeader';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import router from 'umi/router';
import styles from './index.less';
import Item from './Item';

@connect(({ product, loading }) => ({
    group: product.groupList,
    productList: product.productList,
    productNext: product.productNext,
    productImgList: product.productImgList,
}))
class ProductList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            size: 15,
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const { size } = this.state;
        dispatch({
            type: 'product/group',
            payload: {
                size: 1000,
            },
        });
        dispatch({
            type: 'product/fetch',
            payload: {
                size
            },
        });
    }
    onChangeSelect = (value) => {
        const { dispatch } = this.props;
        const { size } = this.state;
        dispatch({
            type: 'product/fetch',
            payload: {
                size,
                group: value,
            },
        });
    }
    onHandleSearch = (value) => {
        const { dispatch } = this.props;
        const { size } = this.state;

        dispatch({
            type: 'product/productKey',
            payload: {
                size,
                key: value,
            },
        });
    }
    onAddClick = () => {
        router.push('/factory/market/product/add-product');
    }
    render() {
        const { group, loading, productList, productImgList } = this.props;
        const headerParent = {
            group,
            onChange: this.onChangeSelect,
            onHandleSearch: this.onHandleSearch,
            onHandleAdd: this.onAddClick,
        };
        return (
            <Fragment>
                <Header {...headerParent} />
                <div className={styles.list}>
                    {
                        productList && productList.map((v, i) => {
                            return (
                                <Item key={i} {...v} imgUrl={productImgList[i]} />
                            )
                        })
                    }

                </div>
            </Fragment>
        )
    }
}
export default ProductList;