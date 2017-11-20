import React from 'react';

const Header = (props) => (
        <div className="header">
            <div className="container">
                <h1 className="header__title">{props.title}</h1>
                {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
            </div>
        </div>
    );

// default props set outside the function
Header.defaultProps = {
    title: 'Indecision App'
};

export { Header as default }