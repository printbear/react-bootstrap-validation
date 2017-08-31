import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class ValidatedInput extends React.Component {
    constructor(props) {
        super(props);

        const {_registerInput, _unregisterInput} = props;
        this._registerInput = _registerInput;
        this._unregisterInput = _unregisterInput;
        if (!this._registerInput || !this._unregisterInput) {
            throw new Error('Input must be placed inside the Form component');
        }
    }

    inputProps() {
        const {validationEvent, validate, errorHelp, _registerInput, _unregisterInput, label, ...inputProps} = this.props;
        return inputProps;
    }

    componentWillMount() {
        this._registerInput(this);
    }

    componentWillUnmount() {
        this._unregisterInput(this);
    }

    render() {

        return (
            <FormGroup>
                {this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null}
                <FormControl ref='control' {...this.inputProps()}>{this.props.children}</FormControl>
            </FormGroup>
        );
    }
}

ValidatedInput.propTypes = {
    name           : PropTypes.string.isRequired,
    validationEvent: PropTypes.oneOf([
        '', 'onChange', 'onBlur', 'onFocus'
    ]),
    validate       : PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    errorHelp      : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

ValidatedInput.defaultProps = {
    validationEvent: ''
};
