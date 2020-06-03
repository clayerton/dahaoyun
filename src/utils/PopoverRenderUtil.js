import React, { Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { getValue, parameterFilter, unitMap } from './parameter';

function getUnit(key, value) {
  if (key === 'length') return value && value + ' cm';
  if (key === 'width') return value && value + ' cm';
  if (key === 'weight') return value && value + ' g/只';
}

export const DesignPopoverRender = item => {
  let items = item.parameter && item.parameter;
  const threads = item && item.threads;
  const material = item && item.material;
  const value = [
    'finger5',
    'finger4',
    'finger3',
    'finger2',
    'palm4',
    'thumb',
    'thumbPalm',
    'rubber',
    'melt',
    'palm3',
  ];
  if (item.deviceType === 'glove') {
    items = parameterFilter(items, value);
  }
  switch (item.deviceType) {
    case 'glove':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'parameter.yarn' })}&nbsp;:&nbsp;</td>
                  <td>{threads && getValue('yarn', threads)}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'parameter.edge' })}&nbsp;:&nbsp;</td>
                  <td>{threads && getValue('edge', threads)}</td>
                </tr>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>
                          {obj.key === 'type' ? (
                            formatMessage({ id: `parameter.type.${obj.value}` }).includes(
                              'parameter.type'
                            ) ? (
                              obj.value
                            ) : (
                              formatMessage({ id: `parameter.type.${obj.value.toLowerCase()}` })
                            )
                          ) : (
                            <Fragment>
                              {typeof obj.value === 'boolean' &&
                                (obj.value
                                  ? formatMessage({ id: 'yes' })
                                  : formatMessage({ id: 'no' }))}
                              {typeof obj.value !== 'boolean' && obj.value}
                            </Fragment>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'rubber' })}&nbsp;:&nbsp;</td>
                  <td>{threads && getValue('rubber', threads)}</td>
                </tr>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>
                          {obj.key === 'type' ? (
                            formatMessage({ id: `parameter.type.${obj.value}` }).includes(
                              'parameter.type'
                            ) ? (
                              obj.value
                            ) : (
                              formatMessage({ id: `parameter.type.${obj.value.toLowerCase()}` })
                            )
                          ) : (
                            <Fragment>
                              {typeof obj.value === 'boolean' &&
                                (obj.value
                                  ? formatMessage({ id: 'yes' })
                                  : formatMessage({ id: 'no' }))}
                              {typeof obj.value !== 'boolean' && obj.value}
                            </Fragment>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'embroidery':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'output1' })}&nbsp;:&nbsp;</td>
                  <td>
                    {item && item.yield}
                    {item && item.unit && unitMap[item.unit]}
                  </td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'parameter.fabric' })}&nbsp;:&nbsp;</td>
                  <td>{material && getValue('fabric', material)}</td>
                </tr>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>
                          {formatMessage({ id: `parameter.type.${obj.value}` }).includes(
                            'parameter.type'
                          )
                            ? obj.value
                            : formatMessage({ id: `parameter.type.${obj.value.toLowerCase()}` })}
                        </td>
                      </tr>
                    ))}
                {threads &&
                  threads
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{typeof obj.value !== 'boolean' && obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'parameter.bobbin' })}&nbsp;:&nbsp;</td>
                  <td>{material && getValue('bobbin', material)}</td>
                </tr>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>
                          {formatMessage({ id: `parameter.type.${obj.value}` }).includes(
                            'parameter.type'
                          )
                            ? obj.value
                            : formatMessage({ id: `parameter.type.${obj.value.toLowerCase()}` })}
                        </td>
                      </tr>
                    ))}
                {threads &&
                  threads
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{typeof obj.value !== 'boolean' && obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const ProductPopoverRender = item => {
  const items = (item && item.parameter) || [];
  let params = items.filter((v, i) => {
    if (v.key !== 'yarn' && v.key !== 'rubber' && v.key !== 'edge') {
      return v;
    }
  });

  switch (item.category) {
    case 'glove':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {params &&
                  params
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => {
                      return (
                        <tr key={i}>
                          <td align="right">
                            {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                          </td>
                          <td>
                            {obj.key !== 'length' && obj.key !== 'width' && obj.key !== 'weight'
                              ? obj.value
                              : getUnit(obj.key, obj.value)}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {params &&
                  params
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => {
                      return (
                        <tr key={i}>
                          <td align="right">
                            {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                          </td>
                          <td>
                            {obj.key !== 'length' && obj.key !== 'width' && obj.key !== 'weight'
                              ? obj.value
                              : getUnit(obj.key, obj.value)}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'lace':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.lace.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.lace.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'sequin':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 0)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.sequin.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                {items &&
                  items
                    .filter((v, i) => i % 2 === 1)
                    .map((obj, i) => (
                      <tr key={i}>
                        <td align="right">
                          {formatMessage({ id: `parameter.sequin.${obj.key}` })}&nbsp;:&nbsp;
                        </td>
                        <td>{obj.value}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const DevicePopoverRender = item => {
  const items = item.parameter && item.parameter.items;
  switch (item.type) {
    case 'glove':
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table style={{ minWidth: '70px' }}>
              <caption
                style={{
                  captionSide: 'top',
                  textAlign: 'center',
                  paddingTop: 0,
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {formatMessage({ id: 'device.detail' })}
              </caption>
              <tbody>
                {items &&
                  items.map(obj => (
                    <tr>
                      <td align="right">
                        {formatMessage({ id: `parameter.${obj.key}` })}&nbsp;:&nbsp;
                      </td>
                      <td>{obj.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10, borderLeft: '1px dashed #acacae' }}>
            <table style={{ minWidth: '70px' }}>
              <caption
                style={{
                  captionSide: 'top',
                  textAlign: 'center',
                  paddingTop: 0,
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {formatMessage({ id: 'status.detail' })}
              </caption>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'status' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.length}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'device.error' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.width}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'duration.time' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.weight}</td>
                </tr>
                <tr>
                  <td align="right">&nbsp;&nbsp;</td>
                  <td> </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10, borderLeft: '1px dashed #acacae' }}>
            <table style={{ minWidth: '70px' }}>
              <caption
                style={{
                  captionSide: 'top',
                  textAlign: 'center',
                  paddingTop: 0,
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {formatMessage({ id: 'current.work.order' })}
              </caption>
              <tbody>
                <tr>
                  <td align="right">{formatMessage({ id: 'design.name1' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.length}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'scheduling.total' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.width}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'finish.total' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.weight}</td>
                </tr>
                <tr>
                  <td align="right">{formatMessage({ id: 'number.unit' })}&nbsp;:&nbsp;</td>
                  <td>{item.parameter && item.parameter.weight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const ProductVendorRender = item => {
  return (
    <div>
      <div style={{ display: 'inline-block', padding: 10 }}>
        <table>
          <tbody>
            <tr>
              <td align="right">{formatMessage({ id: 'model' })}&nbsp;:&nbsp;</td>
              <td>{item && item.electrCtrl}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'framework' })}&nbsp;:&nbsp;</td>
              <td>{item && item.frame}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'heads' })}&nbsp;:&nbsp;</td>
              <td>{item && item.headNm}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'parameter.stitches' })}&nbsp;:&nbsp;</td>
              <td>{item && item.stitches}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'wire.gripper' })}&nbsp;:&nbsp;</td>
              <td>{item && item.clipper}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: 'inline-block', padding: 10 }}>
        <table>
          <tbody>
            <tr>
              <td align="right">{formatMessage({ id: 'spindle' })}&nbsp;:&nbsp;</td>
              <td>{item && item.headstock}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'frame' })}&nbsp;:&nbsp;</td>
              <td>{item && item.embFrame}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'trimming' })}&nbsp;:&nbsp;</td>
              <td>{item && item.trim}</td>
            </tr>
            <tr>
              <td align="right">{formatMessage({ id: 'change.color.name' })}&nbsp;&nbsp;</td>
              <td>{item && item.changeColor}</td>
            </tr>
            <tr>
              <td align="right">&nbsp;&nbsp;</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
