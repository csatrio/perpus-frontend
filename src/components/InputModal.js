import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import InputForm from './InputForm'


export default class InputModal extends Component {
    static defaultProps = {
        fields: [],
        model: {},
        title: 'Input Modal',
        show: false,
        size: 'md',
        footer: null,
        onHide: () => {
        }
    }

    getInput = () => {
        return this.refs.input
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size={this.props.size}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <InputForm fields={this.props.fields} model={this.props.model} ref='input'/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.footer === null ?
                        <Button variant='secondary' onClick={this.props.onHide}>Close</Button>
                        : this.props.footer
                    }
                </Modal.Footer>
            </Modal>
        );
    }

}
