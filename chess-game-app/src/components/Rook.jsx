import bRook from '../assets/bRook.png'
import wRook from '../assets/wRook.png'
import PropTypes from 'prop-types';

function Rook({ color }) {

    return (
        color === "black" ? <img src={bRook} alt="balck Rook" /> : <img src={wRook} alt='white Rook' />
    )
}

Rook.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
  };

export default Rook