import React, {Component} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';


export default class Login extends Component {

    static defaultProps = {
        title: 'Login'
    };


    constructor(props) {
        super(props);
        this.model = {username: '', password: ''}
    }

    doLogin = () => {
        const currentPath = window.location.href.replace(window.location.origin, '')
        Axios.post('http://localhost:8008/api/token/', this.model)
            .then(response => {
                try {
                    this.props.store.loginAction(response.data)
                    if (!currentPath.includes('login')) {
                        this.props.history.push(currentPath)
                    }
                    else {
                        this.props.history.push('/')
                    }

                } catch (e1) {
                    console.log(e1)
                }
            })
            .catch((e) => {
                console.log('login failure')
                try {
                    this.props.store.isLogin = false;
                    this.props.store.showError('Login Failure', 'Wrong username / password combination')
                } catch (e2) {
                }
            })
    };

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username"
                                                       onChange={e => this.model.username = e.target.value}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password"
                                                       onChange={e => this.model.password = e.target.value}
                                                       autoComplete="current-password"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" onClick={this.doLogin}>Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Sign up to Electronic Perpustakaan</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active tabIndex={-1}>Register
                                                    Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
