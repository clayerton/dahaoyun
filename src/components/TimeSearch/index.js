import { Button, Col, Form, Row, DatePicker } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.less';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const defaultStartDate = moment(
    moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 00:00')
);
const defaultEndDate = moment(
    moment(new Date())
        .add(0, 'days')
        .format('YYYY-MM-DD 23:59')
);
@Form.create()
class TimeSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultStartDate,
            defaultEndDate,
            selected: 0,
            dateArray: [
                { key: 0, value: 'days', text: formatMessage({id: 'today'}) },
                { key: -1, value: 'days', text: formatMessage({id: 'yesterday'}) },
                { key: 0, value: 'month', text: formatMessage({id: 'month'}) },
                { key: -1, value: 'month', text: formatMessage({id: 'last.month'}) },
            ],
        }
    }

    getLastMonthDate() {
        let nowDays = new Date();
        let year = nowDays.getFullYear();
        let month = nowDays.getMonth();
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }

        let myDate = (new Date(year, month, 0)).getDate();
        return myDate
    }


    nowTime(now, cate, index) {
        const { dispatch, searchButton, searchDate, form: { setFieldsValue } } = this.props;
        let start = null;
        let end = null;
        let days = null;
        if (cate === 'days') {
            start = moment(new Date()).add(now, cate).format('YYYY-MM-DD 00:00');
            end = moment(new Date()).add(now, cate).utc().format('YYYY-MM-DD 23:59');
        }
        if (cate === 'month' && now === -1) {
            days = this.getLastMonthDate();
            start = moment(new Date()).add(now, cate).format('YYYY-MM-01 00:00');
            end = moment(new Date()).add(now, cate).format(`YYYY-MM-${days} 23:59`);
        }
        if (cate === 'month' && now === 0) {
            start = moment(new Date()).add(now, cate).format(`YYYY-MM-01 00:00`);
            end = moment(new Date()).add(now, cate).format(`YYYY-MM-DD 23:59`);
        }
        let start_utc = moment(start).utc().format();
        let end_utc = moment(end).utc().format();
        this.setState({
            selected: index,
            defaultStartDate: moment(start),
            defaultEndDate: moment(end),
        })
        setFieldsValue({
            shiftDate: [moment(start), moment(end)]
        })
        searchDate && searchDate({ start: start_utc, end: end_utc })
    }

    handleSearch = e => {
        e.preventDefault();
        const { dispatch, searchButton,  form: { validateFields, setFieldsValue } } = this.props;

        validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            this.setState({
                defaultStartDate: values.shiftDate[0],
                defaultEndDate: values.shiftDate[1],
            })
            const values_utc = {
                start: (values.shiftDate[0]).utc().format(),
                end: (values.shiftDate[1]).utc().format(),
            };
            searchButton && searchButton(values, values_utc);
            setFieldsValue({
                shiftDate: [moment(values.shiftDate[0].format()), moment(values.shiftDate[1].format())]
            })
        });
        
    }

    render() {
        const {
            form: { getFieldDecorator, setFieldsValue },
        } = this.props;
        const { defaultStartDate, defaultEndDate, value, dateArray, selected } = this.state;

        return (
            <Form onSubmit={this.handleSearch} layout="inline" style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
                <Row
                    gutter={{ md: 8, lg: 24, xl: 48 }}
                    type={'flex'}
                    align={'bottom'}
                    style={{ alignItems: 'center' }}
                >
                    <Col md={8} sm={24}></Col>
                    <Col md={8} sm={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {
                            dateArray && dateArray.map((v, i) => {
                                return (
                                    <span key={i} onClick={() => { this.nowTime(v.key, v.value, i) }} className={i === selected ? styles.active : styles.getDate}>{v.text}</span>
                                )
                            })
                        }
                    </Col>
                    <Col
                        md={8}
                        sm={24}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}
                    >
                        <FormItem style={{}}>
                            {getFieldDecorator('shiftDate', {
                                rules: [{ required: true, message: formatMessage({id: 'please.select.date.range'}) }],
                                initialValue:
                                    [defaultStartDate, defaultEndDate],
                            })(
                                <RangePicker
                                    style={{ width: '100%' }}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit">
                            {formatMessage({id: 'search'})}
                        </Button>
                    </Col>
                </Row>
            </Form>
        );


    }
}
export default TimeSearch;