// make sure to import React even on stateless functional components
// there is no direct reference to react, but when babel converts it to es5
// there WILL be a bunch of React.createElement calls
import React from 'react';

const Option = (props) => (
        <div className="option">
            <p className="option__text"><b>{props.count}</b>. {props.optionText}</p>
            <button 
                className="button button--link"
                onClick={(e) => 
                    props.handleDeleteOption(props.optionText)}
            >Remove</button>
        </div>
    );


export { Option as default }
// do this for stateless functional components

// options for exporting
// could remove variable and directly export, but not good
// get Unknown component name in React dev tools
// DON't DO THIS
// export default (props) => {
//     return (
//         <div>
//             {props.optionText}
//             <button 
//                 onClick={(e) => 
//                     props.handleDeleteOption(props.optionText)}
//             >Remove</button>
//         </div>
//     );
// }