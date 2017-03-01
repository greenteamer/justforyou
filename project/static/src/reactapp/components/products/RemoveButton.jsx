import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
export default class DecrementComponent extends Component {
  static propTypes = {
    product: PropTypes.object,
    decrement: PropTypes.func,
  }

  render() {
    const { decrement } = this.props;
    return <div onClick={decrement}
      className="btn btn-small btn-white rounded w-30px h-30px pa-0px bra-30px justify-center fs-120r">
      <i className="ion-android-remove"></i>
    </div>;
  }
}

