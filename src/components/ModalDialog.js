import React, {PureComponent} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

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
    };

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide} size={this.props.size}>
                <ModalHeader toggle={this.props.onHide}>{this.props.title}</ModalHeader>
                <ModalBody>
                    <div className='container'>{this.props.component}</div>
                </ModalBody>
                <ModalFooter>
                    {this.props.footer === null ?
                        <Button variant='secondary' onClick={this.props.onHide}>Close</Button>
                        : this.props.closeButton ? (
                                <React.Fragment>
                                    {this.props.footer}
                                    <Button variant='secondary' onClick={this.props.onHide}>Close</Button>
                                </React.Fragment>)
                            : this.props.footer
                    }
                </ModalFooter>
            </Modal>
        );
    }

}
