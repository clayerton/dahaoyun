import { Pie } from '@/components/Charts';
import { timeToMillion } from '@/utils/timeToMillion';
import { Modal } from 'antd';
import React, { PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

class UtilizationModal extends PureComponent {

    handleCancel = () => {
        const { handleCancel } = this.props;
        handleCancel && handleCancel();
    }

    render() {
        const { visible, faultList, utilization } = this.props;
        let utilizationRate = [];
        let parameter = ['run', 'error', 'stop', 'offline'];
        utilization && parameter.map((v, i) => {
            utilizationRate.push({
                x: formatMessage({ id: `device.${v}` }),
                y: utilization[v],
            })
        })

        let bottomPie = (faultList && faultList.items) || [];
        const bottomPieData = [];
        let totalProblemCount = null;
        for (let i = 0; i < bottomPie.length; i += 1) {
            let reason = bottomPie[i].reason
            let reasonCode = formatMessage({ id: `error-code-${reason}` }).includes('error-code-') ? reason : formatMessage({ id: `error-code-${reason}` })
            bottomPieData.push({
                x: reasonCode,
                y: bottomPie[i].duration,
                z: bottomPie[i].count,
            });
            totalProblemCount += bottomPie[i].count;
        }
        let utilizationShow = utilizationRate && utilizationRate.every((item, index) => {
            if (item.y === 0) return true;
        })
        let errorShow = bottomPieData && bottomPieData.every((item, index) => {
            if (item.y === 0) return true;
        })

        return (
            <Modal title="" width={800} height={600} visible={visible} onCancel={this.handleCancel} footer={null}>
                <h5 style={{ fontSize: 16 }}>{formatMessage({id: 'status.during.pie'})}</h5>
                {
                    !utilizationShow ? <Pie
                        padding='0'
                        hasLegend
                        data={utilizationRate}
                        valueFormat={value => <span>{timeToMillion(value)}</span>}
                        height={230}
                        lineWidth={4}
                        colors={['#1890FF', '#F5222D', '#FFBF00', '#BFBFBF']}
                        minWidth={200}
                    />
                        :
                        <p style={{ textAlign: 'center', height: 230, lineHeight: '230px', fontSize: 16, }}>{formatMessage({id: 'no-data'})}</p>
                }

                <h5 style={{ fontSize: 16 }}>{formatMessage({id: 'error.status.during.pie'})}</h5>
                {
                    !errorShow ? <Pie
                        hasLegend
                        subTitle={formatMessage({id: 'error.total'})}
                        total={() => <span>{totalProblemCount || 0}{formatMessage({id: 'bout'})}</span>}
                        data={bottomPieData}
                        valueFormat={value => <span>{timeToMillion(value)}</span>}
                        height={230}
                        lineWidth={0}
                    />
                        :
                        <p style={{ textAlign: 'center', height: 230, lineHeight: '230px', fontSize: 16, }}>{formatMessage({id: 'no-data'})}</p>
                }

            </Modal>
        )
    }
}
export default UtilizationModal;