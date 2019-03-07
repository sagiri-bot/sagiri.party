import React, {Component, Fragment} from 'react';
import Hero from "../components/Hero";
import {Col, Row, UncontrolledTooltip} from 'reactstrap';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const commands = {
    "Basic": [
        {
            "name": "help",
            "description": "List of all available commands."
        },
        {
            "name": "invite",
            "description": "Invite Sagiri to your guild."
        },
        {
            "name": "test",
            "usage": "test <gay|asd|foo|bar> [user]",
            "description": "blah"
        },
        {
            "name": "test5345",
            "usage": "test lol [lol|a|b]",
            "description": "blah"
        }
    ],
    "Moderation": [
        {
            "name": "ban",
            "usage": "ban <user> [reason]",
            "description": "Throw a ban hammer at someone."
        },
        {
            "name": "test1234",
            "description": "blah"
        },
        {
            "name": "test4234",
            "description": "blah"
        },
        {
            "name": "test34532",
            "description": "blah"
        },
        {
            "name": "test123",
            "description": "blah"
        },
        {
            "name": "test234",
            "description": "blah"
        }
    ]
};

const uuidv4 = () => '_xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const usageToReact = usage => {
    let elements = [];

    let splits = usage.split(" ");

    elements.push(<span key={uuidv4()} className="usage-command">{splits.shift()}</span>);

    splits.forEach(s => {
        let tooltipUUID = uuidv4();

        if (s.startsWith("<") && s.endsWith(">")) { // required argument
            s = s.substring(1, s.length - 1);
            let c = s;
            if (s.includes("|")) { // multiple options
                s = s.replace(/\|/g, ", ").replace(/,(?=[^,]*$)/, " or");
            }

            elements.push(<Fragment key={uuidv4()}>
                <span className="usage-required" id={tooltipUUID}>{c}</span>
                <UncontrolledTooltip placement="top" target={`#${tooltipUUID}`}>{s}{" (required)"}</UncontrolledTooltip>
            </Fragment>);
        } else if (s.startsWith("[") && s.endsWith("]")) { // optional argument
            s = s.substring(1, s.length - 1);
            let c = s;
            if (s.includes("|")) { // multiple options
                s = s.replace(/\|/g, ", ").replace(/,(?=[^,]*$)/, " or");
            }

            elements.push(<Fragment key={uuidv4()}>
                <span className="usage-optional" id={tooltipUUID}>{c}</span>
                <UncontrolledTooltip placement="top" target={`#${tooltipUUID}`}>{s}{" (optional)"}</UncontrolledTooltip>
            </Fragment>);
        } else {
            elements.push(<span className="usage" key={uuidv4()}>{s}</span>);
        }
    });

    return elements;
};

class Sidebar extends React.PureComponent {
    render() {
        let items = [];
        let links = [];

        Object.keys(this.props.commands).forEach(cmd => {
            if (cmd) {
                items.push(cmd);
                links.push(<li key={"sidebar-" + cmd} className={"sidebar-link"}><AnchorLink offset="-150"
                                                                                             href={`#${cmd}`}>{cmd}</AnchorLink>
                </li>);
            }
        });

        return (
            <Col className="commands-sidebar" md={3}>
                <Scrollspy items={items} currentClassName="active">
                    {links}
                </Scrollspy>
            </Col>
        );
    }
}

class CommandCard extends React.PureComponent {
    render() {
        return (
            <div className="commands-card">
                <h5>{this.props.command.name}</h5>
                {this.props.command.description}<br/>
                {this.props.command.usage
                    ? (<Fragment>{"Usage: "}{usageToReact(this.props.command.usage)}</Fragment>)
                    : (<Fragment>{"Usage: "}<span
                        className="usage-command">{this.props.command.name}</span></Fragment>)}
            </div>
        );
    }
}

class CommandCategory extends React.PureComponent {
    render() {
        let elements = [];
        this.props.commands.forEach(c => elements.push(<CommandCard key={`card_${this.props.name}_${c.name}`}
                                                                    command={c}/>));

        return (
            <section id={this.props.name} className="commands-category">
                <h2>{this.props.name}</h2>
                {elements}
            </section>
        );
    }
}

class Commands extends Component {
    render() {
        let categories = [];
        Object.keys(commands).forEach(cat => {
            categories.push(<CommandCategory key={"category_" + cat} name={cat} commands={commands[cat]}/>)
        });

        return (
            <Fragment>
                <Hero>
                    <h1>COMMANDS</h1>
                </Hero>
                <div className="d-flex">
                    <Sidebar commands={commands}/>
                    <Col md={9}>
                        {categories}
                    </Col>
                </div>
            </Fragment>
        )
    }
}

export default Commands;