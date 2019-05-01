import React, {PureComponent} from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class ModalDialog extends PureComponent {
    static defaultProps = {
        fields: [],
        model: {},
        title: 'Modal Dialog',
        show: false,
        size: 'md',
        component: null,
        footer: null,
        closeButton: false,
        onHide: () => {
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size={this.props.size}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>{this.props.component}</div>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.footer === null ?
                        <Button variant='secondary' onClick={this.props.onHide}>Close</Button>
                        : this.props.closeButton ? (
                            <React.Fragment>
                                {this.props.footer}
                                <Button variant='secondary' onClick={this.props.onHide}>Close</Button>
                            </React.Fragment>)
                        : this.props.footer
                    }
                </Modal.Footer>
            </Modal>
        );
    }

}
