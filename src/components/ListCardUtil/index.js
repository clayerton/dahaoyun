import React, { Fragment } from 'react';
import { Form, Checkbox, List, Card, Popover, Button } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-react/locale';

const ListCardUtil = Form.create()(props => {
  const {
    checkboxGroup,
    avatar,
    translateRender,
    actions,
    item,
    title,
    onClick,
    content,
    _distribution,
    showDetail,
    updDesign,
    handleDelete,
    design,
    deviceHide,
    fromToVendorProduct
  } = props;

  return (
    <List.Item key={item.id} style={{ padding: 0 }}>
      <Card hoverable className={styles.card} bodyStyle={{ padding: 16 }} actions={actions}>
        {checkboxGroup ? (
          <div style={{ float: 'right' }}>
            <Checkbox value={item.sn} />
          </div>
        ) : (
          <div style={{ float: 'right' }} />
        )}
        {(item.parameter &&
        Array.isArray(item.parameter) &&
        item.parameter.length > 0 &&
        !deviceHide) || (!!fromToVendorProduct )? (
          <Popover content={content}>
            <Card.Meta
              onClick={onClick !== undefined ? onClick : null}
              avatar={avatar}
              title={title}
              description={<Ellipsis lines={20}>{translateRender(item)}</Ellipsis>}
            />
          </Popover>
        ) : (
          <Card.Meta
            onClick={onClick !== undefined ? onClick : null}
            avatar={avatar}
            title={title}
            description={<Ellipsis lines={20}>{translateRender(item)}</Ellipsis>}
          />
        )}

        {design && (
          <Fragment>
            <div style={{ marginTop: 20, width: '100%', height: 1, backgroundColor: '#eee' }} />
            <div style={{ float: 'left', width: '100%', marginTop: 10 }}>
              {/* <Button onClick={_distribution.bind(this, item)} type="primary" size="small">
                排样
              </Button> */}
              <div style={{ float: 'right' }}>
                <a onClick={showDetail.bind(this, item)} style={{ paddingRight: 15 }}>
                  {formatMessage({id: 'detail'})}
                </a>
                <a onClick={updDesign.bind(this, item)} style={{ paddingRight: 15 }}>
                  {formatMessage({id: 'modify'})}
                </a>
                <a onClick={handleDelete.bind(this, item)} style={{ paddingRight: 15 }}>
                  {formatMessage({id: 'delete'})}
                </a>
              </div>
            </div>
          </Fragment>
        )}
      </Card>
    </List.Item>
  );
});

export default ListCardUtil;
