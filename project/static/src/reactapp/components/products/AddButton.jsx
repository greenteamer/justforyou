import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
export default class IncrementComponent extends Component {
  static propTypes = {
    product: PropTypes.object,
    increment: PropTypes.func,
  }

  render() {
    const { increment } = this.props;
    return <div onClick={increment}
      className="btn btn-small btn-white rounded w-30px h-30px pa-0px bra-30px justify-center fs-120r">
      <i className="ion-android-add"></i>
    </div>;
  }
}

