import React from 'react';

function Card(props) {
    return (
        <div className="card border-primary mb-3">
            <h4 className="card-header">{props.title}</h4>
            <div className="card-body">{props.children}</div>
        </div>
    )
}

export default Card;