import bBishop from '../assets/bBishop.png'
import wBishop from '../assets/wBishop.png'
import PropTypes from 'prop-types';

function Bishop({ color }) {

    return (
        color === "black" ? <img src={bBishop} alt="balck Rook" /> : <img src={wBishop} alt='white Rook' />
    )
}

Bishop.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
};

export default Bishop