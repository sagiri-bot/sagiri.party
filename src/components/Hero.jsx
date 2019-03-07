import React from 'react'
import {Container} from 'reactstrap';

class Hero extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sagiri-hero">
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}

export default Hero