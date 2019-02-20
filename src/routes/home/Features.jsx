import React from 'react';
import {Button, Col, Row, Container} from 'reactstrap';

class Features extends React.PureComponent {
    render() {
        return (
            <div className="sagiri-features">
                <Container className="h-100">
                    <Row className="h-100">
                        <Col md="6" className="left d-flex flex-column justify-content-left align-self-center">
                            <div>
                                <h1>Perk up your Discord server</h1>
                            </div>
                            <div>
                                <p>
                                    Whether you want music, want a bot to protect yourself from baddies,<br/>
                                    or just want plain fun, Sagiri has it for you, with over 30 commands available<br/>
                                    for anything you need, you have assurance this is the bot for you.
                                </p>
                            </div>
                            <div className="text-center">
                                <Button className="hero-button" outline color="primary">
                                    <i className="fas fa-terminal mr-2"/>
                                    Commands
                                </Button>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="discord"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Features;