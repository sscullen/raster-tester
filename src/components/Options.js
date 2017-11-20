import React from 'react';
import Option from './Option';

const Options = (props) =>  (
        <div>
            <div className="widget-header">
                <h3>Your Options</h3>
                <button 
                    className="button button--link" 
                    onClick={props.removeAll}>Remove All</button>
            </div>
            { props.options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
            
                {props.options.map((option, index) => {
                    // Map gives you the index!!
                    
                    return (
                        <Option key={option} 
                                optionText={option}
                                handleDeleteOption={props.handleDeleteOption}
                                count={index + 1} />
                    );
                })}
        </div>
);

export { Options as default }