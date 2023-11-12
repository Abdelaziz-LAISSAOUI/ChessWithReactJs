import bPawn from '../assets/bPawn.png'
import wPawn from '../assets/wPawn.png'
import PropTypes from 'prop-types';

function Pawn({ color }) {
    
    return (
        color === "black" ? <img src={bPawn} alt="balck Rook" /> : <img src={wPawn} alt='white Rook' />
    )
}

Pawn.propTypes = {
    color: PropTypes.oneOf(['black', 'white']).isRequired,
  };

export default Pawn;
