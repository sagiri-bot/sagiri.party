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
                        <Review by="aaaaaa" avatar="https://cdn.discordapp.com/avatars/219067402174988290/a_6b61800643369365f5c806aff385dfd3.png?size=256">
                            There might be the same Discord bot out there but this one blah blah blah...
                        </Review>
                        <Review by="ophis" avatar="https://cdn.discordapp.com/avatars/199217346911404032/a_6bf037cf605d9f3dfae2608acf72ebed.png?size=256">
                            Guys btw there's this really queer person called amy
                            and like she's a java programmer lol
                        </Review>
                        <Review by="anime girl" avatar="https://t4.rbxcdn.com/3b6ff3d387f8bfd902489514a4608fca">
                            Sagiri big cute OwO
                        </Review>
                    </Row>

                    <div className="sagiri-reviews-bottom">
                        <h5 className="mb-5">Convinced yet? Get Sagiri for your Discord server now!</h5>
                        <Button className="hero-button mt-4" /*href="/invite"*/ color="blurple">
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