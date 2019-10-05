import './Checkbox.css';
import React, { Component } from 'react';

export class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
    }

    check() {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.props.onCheck) {
                this.props.onCheck(this.state.checked);
            }
        });
    }

    componentDidUpdate(oldProps) {
        if (this.props.checked !== undefined && oldProps.checked !== this.props.checked) {
            this.setState({ checked: this.props.checked });
        }
    }

    render() {
        return <div className={`checkbox-container ${this.state.checked ? 'checked' : ''}`}
            onClick={this.check.bind(this)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" />
            </svg>
        </div>
    }
}