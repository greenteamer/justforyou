import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
export default class TextField extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
  }
  render() {
    const { placeholder, className, onChange, value } = this.props;
    return <div>
      <input
        type="text"
        style={styles}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>;
  }
}


const styles = {
  lineHeight: '34px',
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  width: '100%',
};

