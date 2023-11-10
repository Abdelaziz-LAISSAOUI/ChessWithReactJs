import PropTypes from 'prop-types';


function Square({ isItBlack, onSquareClick, children}) {
    //children aka piece 
    return (
        <button onClick={onSquareClick} className={`square + ${isItBlack && 'blackSquare'}`}>
            {children}
        </button>
    )
}

Square.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.oneOf([null]),
    ]),
    isItBlack: PropTypes.bool.isRequired,
    onSquareClick: PropTypes.func,
};

export default Square