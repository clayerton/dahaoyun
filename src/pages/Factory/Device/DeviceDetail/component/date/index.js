import { localUtc } from '@/utils/timeLine';
import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

export default function DateUtc(props) {
    const { _onRefresh } = props;
    const [date, setDate] = useState(props.date || localUtc());
    useEffect(() => {
        _onRefresh && _onRefresh(date);
    }, [date])
    return (
        <div className={styles.dateRang}>
            <span onClick={() => {
                setDate(new Date(moment(date).subtract(1, "d")))
            }}>&lt;&lt;</span>
            <DatePicker bordered={false} value={moment(date, 'YYYY-MM-DD')} allowClear={false} onChange={(e) => {
                setDate(new Date(moment(e)))
            }} />
            <span onClick={() => {
                setDate(new Date(moment(date).add(1, "d")))
            }}>&gt;&gt;</span>
        </div>
    )
}