import bKnight from '../assets/bKnight.png'
import wKnight from '../assets/wKnight.png'
import PropTypes from 'prop-types';

function Knight({ color }) {

    return (
        color === "black" ? <img src={bKnight} alt="balck Rook" /> : <img src={wKnight} alt='white Rook' />
    )
}

Knight.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
  };

export default Knight;