import React from 'react';

import Modal from 'react-modal';

// const OptionModal = () => {
//     return (
//         <div>
//             some text
//         </div>
//     )
// }

// shorthand with implicit return 
const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose={props.handleClearSelection}
        closeTimeoutMS={200}
        className="modal" >
        <h3 className="modal__title">Selected Option</h3>
        <p className="modal__body">{props.selectedOption}</p>
        <button className="button" onClick={props.handleClearSelection}>Okay thanks!</button>
    </Modal>
);

export default OptionModal;