import React, {Component} from 'react';
import {Button,  Modal} from 'react-bootstrap';
import InputForm from './InputForm'


class InputModal extends Component {
    static defaultProps = {
        fields: [],
        model: {},
        title: 'Input Modal',
        showModal: false,
        onHide: ()=>{}
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <InputForm fields={this.props.fields} model={this.props.model}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.onHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default InputModal;
