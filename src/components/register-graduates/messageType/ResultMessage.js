import React, { Component } from 'react'
import {Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../../public/stylesheets/Messages.css';


export class ResultMessage extends Component {
    render() {
        var colorMessage = this.props.colorBg;
        return (
            <div style={{border: '1px solid `${colorMessage}` !important'}} className="centerMessage">
                <Message color={`${colorMessage}`} size='big' style={{
                    color: `${colorMessage}`,border: `${colorMessage}`}}>
                <Message.Header>{this.props.messageHeader}</Message.Header>
                <p>
                    {this.props.messageBody}
                </p>
                </Message>
            </div>
        )
    }
}


ResultMessage.propTypes = {
    todo: PropTypes.object.isRequired
}

export default ResultMessage
