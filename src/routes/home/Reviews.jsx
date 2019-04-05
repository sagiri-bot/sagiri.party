import React from 'react';
import {Container, Card, Row, Col, Button} from "reactstrap";

const Review = (props) => (
    <Col md="4">
        <Card className="shadow-sm review">
            <img src={props.avatar} className="rounded-circle mx-auto d-block" alt="Avatar"/>
            <span className="review-content">"{props.children}"</span>
            {props.by}
        </Card>
    </Col>
);

class Reviews extends React.PureComponent {
    render() {
        return (
            <div className="sagiri-reviews">
                <Container className="text-center">
                    <h1 className="mt-5">Trusted by over a thousand of Discord servers</h1>
                    <h5>See what the people say about Sagiri</h5>
                    <Row>
                        <Review by="alula" avatar="https://files.gang.moe/4uG3kzbi.png">
                            Sagiri is our little server helper, she contains features that help us keeping server clean.
                        </Review>
                        <Review by="shu" avatar="https://files.gang.moe/ZGXBOR0B.png">
                            I am using this bot on my 3.8k members server and it's a really big help for us.
                        </Review>
                        <Review by="ryan." avatar="https://cdn.discordapp.com/avatars/217617036749176833/1c4618b720de26b049a54d65739a4e92.png?size=256">
                            Sagiri big cute OwO
                        </Review>
                    </Row>

                    <div className="sagiri-reviews-bottom">
                        <h5 className="mb-5">Convinced yet? Get Sagiri for your Discord server now!</h5>
                        <Button className="hero-button mt-4" href="/invite" color="blurple">
                            <i className="fab fa-discord mr-2" />
                            Invite
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Reviews;