import PropTypes from 'prop-types';


function Square({ peice, isItBlack}) {
    return (
        // <div>Square</div>
        <div className={`square + ${isItBlack && 'blackSquare'}`}>
            {peice}
        </div>
    )
}

Square.propTypes = {
    peice: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.oneOf([null]),
    ]),
    isItBlack: PropTypes.bool.isRequired,
};

export default Square