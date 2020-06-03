import React, { PureComponent } from 'react';

export default class StageList extends PureComponent {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
