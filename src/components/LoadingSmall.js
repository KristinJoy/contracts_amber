import React from 'react';
import PropTypes from 'prop-types';


const LoadingSmall = (props) => {
  return <div className="center"><img alt="loading" width={100} src="https://media.giphy.com/media/dnoa8RlmGDXpDuj1D9/giphy.gif"/><br/></div>;
}
LoadingSmall.propTypes = {
  classes: PropTypes.object,
};

export default (LoadingSmall);
