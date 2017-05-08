import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
export default class Loader extends Component {
  static  propTypes = {
    store: PropTypes.object,
  }
  render() {
    const {
      store: { hasForegroundFetching, hasBackgroundFetching },
    } = this.props;
    // console.log('Wrapper hasForegroundFetching: ', hasForegroundFetching);
    // console.log('Wrapper children: ', children);
    if (hasForegroundFetching) return <ForegroundLoader />;
    if (hasBackgroundFetching && !hasForegroundFetching) return <BackgroundLoader />;
    return null;
  }
}


class ForegroundLoader extends Component {
  render() {
    return (
      <div className="z-999 fixed absolute--fill bg-black-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
}


class BackgroundLoader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="absolute items-end bg-white justify-center br2 br--left w2 top-1">
        <Spinner />
      </div>
    );
  }
}


export class Spinner extends Component {
  render() {
    return (<div className="load2"><div className="loader">...Loading</div></div>);
  }
}
