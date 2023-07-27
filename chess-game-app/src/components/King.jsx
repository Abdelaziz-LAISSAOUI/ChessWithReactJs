import bKing from '../assets/bKing.png'
import wKing from '../assets/wKing.png'
import PropTypes from 'prop-types';

function King({ color }) {

    return (
        color === "black" ? <img src={bKing} alt="balck Rook" /> : <img src={wKing} alt='white Rook' />
    )
}

King.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
};

export default King