'use strict';

import React from 'react';

export class ProductDescription extends React.Component {
    render() {
        return (
            <div className="main-description">
                <p> {this.props.description} </p>
            </div>
        )
    }
};