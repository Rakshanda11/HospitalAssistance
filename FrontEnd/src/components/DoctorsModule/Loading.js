import React from 'react';
import loading from './Loading_icon.gif';

const Loading = props => (
    <img
      className="offset-xs-5 offset-sm-5 offset-md-5 offset-lg-5"
      src={loading}
      height={100}
      width={100}
      alt = "Loading-img"
    />
  );

  export default Loading;