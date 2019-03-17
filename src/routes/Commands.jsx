import React, {Fragment} from 'react';
import Hero from "../components/Hero";
import {Col, Input, UncontrolledTooltip} from 'reactstrap';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import commands from '../commands.json';

const uuidv4 = () => '_xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const usageToReact = (usage) => {
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

const Sidebar = (props) => {
    let items = [];
    let links = [];

    Object.keys(props.commands).forEach(cmd => {
        if (cmd) {
            items.push(cmd);
            links.push(<li key={"sidebar-" + cmd} className={"sidebar-link"}><AnchorLink offset="-150"
                                                                                         href={`#${cmd}`}>{cmd}</AnchorLink>
            </li>);
        }
    });

    return (
        <Col className="d-none d-sm-block commands-sidebar" md={3}>
            <Scrollspy items={items} currentClassName="active">
                {links}
            </Scrollspy>
        </Col>
    );
};

const CommandCard = (props) => {
    return (
        <div className="commands-card">
            <h5>{props.command.name}</h5>
            {props.command.description}<br/>
            {props.command.usage
                ? (<Fragment>{"Usage: "}{usageToReact(props.command.usage)}</Fragment>)
                : (<Fragment>{"Usage: "}<span
                    className="usage-command">{props.command.name}</span></Fragment>)}
        </div>
    );
};

const CommandCategory = (props) => {
    let elements = [];
    props.commands.forEach(c => elements.push(<CommandCard key={`card_${props.name}_${c.name}`} command={c}/>));

    return (
        <section id={props.name} className="commands-category">
            <h2>{props.name}</h2>
            {elements}
        </section>
    );
};

class CommandList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: null
        };
    }

    updated(e) {
        const value = e.target.value.trim();

        if (value.length === 0) {
            this.setState({filter: null});
        } else {
            this.setState({filter: value});
        }
    }

    render() {
        let categories = [];
        Object.keys(commands).forEach(cat => {
            if (commands[cat].length !== 0) {
                let newCmds;

                if (this.state.filter !== null) {
                    const filt = this.state.filter.toLowerCase();
                    newCmds = commands[cat].filter(cmd =>
                        (cmd.name && cmd.name.toLowerCase().includes(filt))
                        || (cmd.description && cmd.description.toLowerCase().includes(filt)));
                } else {
                    newCmds = commands[cat];
                }

                if (newCmds.length !== 0) {
                    categories.push(<CommandCategory key={"category_" + cat} name={cat} commands={newCmds}/>)
                }
            }
        });

        return (
            <Col sm={12} md={9}>
                <div className="commands-searchbox clearfix">
                    <Input placeholder="Filter commands" onChange={this.updated.bind(this)}/>
                </div>
                {categories}
            </Col>
        );
    }
}

const Commands = () => (
    <Fragment>
        <Hero>
            <h1>COMMANDS</h1>
        </Hero>
        <div className="d-flex">
            <Sidebar commands={commands}/>
            <CommandList/>
        </div>
    </Fragment>
);

export default Commands;