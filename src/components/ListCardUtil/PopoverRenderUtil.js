import React from 'react';

export const DesignPopoverRender = item => {
  switch (item.deviceType) {
    // case 1:
    //   return (
    //     <div>
    //       <table>
    //         <tbody>
    //           <tr>
    //             <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //             <td>{item.sn}</td>
    //           </tr>
    //           <tr>
    //             <td align="right">设备型号&nbsp;:&nbsp;</td>
    //             <td>{item.model}</td>
    //           </tr>
    //           <tr>
    //             <td align="right">整机信息&nbsp;:&nbsp;</td>
    //             <td>{item.machine}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   );
    // case 2: return (
    //   <div>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //           <td>{item.sn}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">设备型号&nbsp;:&nbsp;</td>
    //           <td>{item.model}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">整机信息&nbsp;:&nbsp;</td>
    //           <td>{item.machine}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
    case 4:
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">尺码&nbsp;:&nbsp;</td>
                  <td>{item.glove.size}</td>
                </tr>
                <tr>
                  <td align="right">正反&nbsp;:&nbsp;</td>
                  <td>{item.glove.type === 0 ? '反手' : '正手'}</td>
                </tr>
                <tr>
                  <td align="right">低叉&nbsp;:&nbsp;</td>
                  <td>{item.glove.hasMiddlePalm === true ? '是' : '否'}</td>
                </tr>
                <tr>
                  <td align="right">热熔&nbsp;:&nbsp;</td>
                  <td>{item.glove.hasMelt === true ? '是' : '否'}</td>
                </tr>
                <tr>
                  <td align="right">双色&nbsp;:&nbsp;</td>
                  <td>{item.glove.hasTwoColor === true ? '是' : '否'}</td>
                </tr>
                <tr>
                  <td align="right">U2&nbsp;:&nbsp;</td>
                  <td>{item.glove.hasU2 === true ? '是' : '否'}</td>
                </tr>
                <tr>
                  <td align="right">U3&nbsp;:&nbsp;</td>
                  <td>{item.glove.hasU3 === true ? '是' : '否'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">橡筋&nbsp;:&nbsp;</td>
                  <td>{item.glove.elastic}</td>
                </tr>
                <tr>
                  <td align="right">指尖&nbsp;:&nbsp;</td>
                  <td>{item.glove.fingerTip}</td>
                </tr>
                <tr>
                  <td align="right">前密度&nbsp;:&nbsp;</td>
                  <td>{item.glove.frontDensity}</td>
                </tr>
                <tr>
                  <td align="right">后密度&nbsp;:&nbsp;</td>
                  <td>{item.glove.backDensity}</td>
                </tr>
                <tr>
                  <td align="right">长度&nbsp;:&nbsp;</td>
                  <td>{item.glove.length}</td>
                </tr>
                <tr>
                  <td align="right">罗口宽度&nbsp;:&nbsp;</td>
                  <td>{item.glove.width}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    // case 8: return (
    //   <div>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //           <td>{item.sn}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">设备型号&nbsp;:&nbsp;</td>
    //           <td>{item.model}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">整机信息&nbsp;:&nbsp;</td>
    //           <td>{item.machine}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
    default:
      return null;
  }
};

export const ProductPopoverRender = item => {
  switch (item.type) {
    // case 1:
    //   return (
    //     <div>
    //       <table>
    //         <tbody>
    //           <tr>
    //             <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //             <td>{item.sn}</td>
    //           </tr>
    //           <tr>
    //             <td align="right">设备型号&nbsp;:&nbsp;</td>
    //             <td>{item.model}</td>
    //           </tr>
    //           <tr>
    //             <td align="right">整机信息&nbsp;:&nbsp;</td>
    //             <td>{item.machine}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   );
    // case 2: return (
    //   <div>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //           <td>{item.sn}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">设备型号&nbsp;:&nbsp;</td>
    //           <td>{item.model}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">整机信息&nbsp;:&nbsp;</td>
    //           <td>{item.machine}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
    case 4:
      return (
        <div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">主纱&nbsp;:&nbsp;</td>
                  <td>{item.parameter.yarn}</td>
                </tr>
                <tr>
                  <td align="right">橡筋线&nbsp;:&nbsp;</td>
                  <td>{item.parameter.rubber}</td>
                </tr>
                <tr>
                  <td align="right">拷边线&nbsp;:&nbsp;</td>
                  <td>{item.parameter.edge}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'inline-block', padding: 10 }}>
            <table>
              <tbody>
                <tr>
                  <td align="right">落机长度(cm)&nbsp;:&nbsp;</td>
                  <td>{item.parameter.length}</td>
                </tr>
                <tr>
                  <td align="right">罗口宽度(cm)&nbsp;:&nbsp;</td>
                  <td>{item.parameter.width}</td>
                </tr>
                <tr>
                  <td align="right">重量(g/只)&nbsp;:&nbsp;</td>
                  <td>{item.parameter.weight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    // case 8: return (
    //   <div>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td align="right">设备序列号&nbsp;:&nbsp;</td>
    //           <td>{item.sn}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">设备型号&nbsp;:&nbsp;</td>
    //           <td>{item.model}</td>
    //         </tr>
    //         <tr>
    //           <td align="right">整机信息&nbsp;:&nbsp;</td>
    //           <td>{item.machine}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
    default:
      return null;
  }
};
