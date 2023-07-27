import bQueen from '../assets/bQueen.png'
import wQueen from '../assets/wQueen.png'
import PropTypes from 'prop-types';

function Queen({ color }) {

    return (
        color === "black" ? <img src={bQueen} alt="balck Rook" /> : <img src={wQueen} alt='white Rook' />
    )
}

Queen.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
};

export default Queen