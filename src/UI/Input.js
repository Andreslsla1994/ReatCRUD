import React from 'react'
import PropTypes from 'prop-types';
export default function Input(props) {
  const{name, value, change }=props
  return (
    <div className="input-group flex-nowrap">
      <input
        aria-describedby="addon-wrapping"
        className="form-control"
        name={name}
        placeholder={name}
        type="text"
        onChange={change}
        value={value}
      />
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  value:PropTypes.string,
  change: PropTypes.func
};
