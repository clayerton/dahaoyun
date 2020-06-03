import React, { PureComponent, Fragment } from 'react';
import styles from './index.less';
import { Button, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
@Form.create()
class StitchInfo extends PureComponent {
    render() {
        const { needles, form: { getFieldDecorator }, edit } = this.props;
        return (
            <div className={styles.stitchInfo}>
                <div className={styles.intro}>
                    <span>针位</span>
                    <span>针号</span>
                    <span>线色</span>
                </div>
                {needles && needles.map((v, i) => {
                    return (
                        <div className={styles.stitchText} key={i}>
                            <div className={styles.line}>
                                <span>{i + 1}</span>
                                {edit ?
                                    <Fragment>
                                        <span className={styles.spanInput}>
                                            {getFieldDecorator(`setting.needles.[${i}].needle`, {
                                                initialValue: v.needle,
                                            })(
                                                <Input autoComplete='off' />
                                            )}
                                        </span>
                                        <span className={styles.spanInput}>
                                            {getFieldDecorator(`setting.needles.[${i}].thread`, {
                                                initialValue: v.thread,
                                            })(
                                                <Input autoComplete='off' />
                                            )}
                                        </span>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <span>{v.needle}</span>
                                        <span>{v.thread}</span>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
export default StitchInfo;
