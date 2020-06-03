import NextPage from '@/components/NextPage';
import { connect } from 'dva';
import moment from 'moment';
import React, { PureComponent } from 'react';
import styles from './index.less';
@connect(({ deploy }) => ({
    design: deploy.designList,
    nextPage: deploy.designNext,
    designImgList: deploy.designImgList,
}))
export default class Design extends PureComponent {
    state = {
        device: null,
        size: 16
    }
    componentDidMount() {
        const { dispatch, location } = this.props;
        const { size } = this.state;
        let device = location.query && location.query.id;
        this.setState({
            device,
        })
        dispatch({
            type: 'deploy/deployByDevice',
            payload: {
                device,
                size,
            }
        })
    }
    onClickMore = () => {
        const { nextPage, dispatch } = this.props;
        const { device, size } = this.state;
        dispatch({
            type: 'deploy/deployByDevice',
            payload: {
                device,
                size,
                page: nextPage,
            },
        });
    }
    onHandleDel = (v) => {
        const { nextPage, dispatch } = this.props;
        const { device, size } = this.state;
        dispatch({
            type: 'deploy/delDeploy',
            del: {
                design: v.design,
                devices: [device]
            },
            fet: {
                device,
                size,
            }
        });
    }

    render() {
        const { design, nextPage, designImgList } = this.props;
        const nextParent = {
            nextPage,
            onClickMore: this.onClickMore,
        }
        return (
            <div className={styles.design}>
                {
                    design && design.map((v, i) => {
                        return (
                            <div key={i} className={styles.item}>
                                <div className={styles.designImg}>
                                    <img src={designImgList[i]} />
                                </div>
                                <div className={styles.main}>
                                    <img onClick={this.onHandleDel.bind(this, v)} src={require('@/assets/common/close.png')} />
                                    <div className={styles.content}>
                                        <span>{v.design}</span>
                                        <span>{v.type[0]}</span>
                                    </div>
                                    <div className={styles.date}>{moment(v.created).format('YYYY-MM-DD HH:mm:ss')}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <NextPage {...nextParent} />
            </div>
        )
    }
}