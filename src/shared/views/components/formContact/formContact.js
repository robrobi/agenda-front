import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import _ from 'lodash';

import { Actions } from 'flux';

class FormContact extends Component {
    static propTypes = {
		dispatch: PropTypes.func.isRequired,
        closeModalAdd: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeCell = this.handleChangeCell.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.closeModalAdd = this.closeModalAdd.bind(this);

        this.state = {
            errorMessages: [],
            gender: 'female',
            title: '',
            first: '',
            last: '',
            phone: '',
            cell: '',
            email: '',
        }
	}

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.gender !== this.state.gender ||
            nextState.title !== this.state.title ||
            nextState.first !== this.state.first ||
            nextState.last !== this.state.last ||
            nextState.phone !== this.state.phone ||
            nextState.cell !== this.state.cell ||
            nextState.email !== this.state.email ) { // not re render when input field changed
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        if (this.validateForm()) { // submit
            const data = this.state;
            delete data.errorMessages;
            const formData = new FormData();
    		_.forOwn(data, (value, key) => {
    			formData.append(key, value);
    		});
            this.props.dispatch(new Actions().Home.addContact(formData))
                .then(() => { this.closeModalAdd(); })
                .catch((err) => {
                    this.setState({ errorMessages: ['Error while adding the contact'] })
                });
        }
        event.preventDefault();
    }

    closeModalAdd() {
        this.props.closeModalAdd();
    }

    validateForm() {
        let errorMessages = [];
        const phoneRegExp = new RegExp(/^[0-9|+|\-|(|)]+$/, 'g');
        const cellRegExp = new RegExp(/^[0-9|+|\-|(|)]+$/, 'g');
        //gender
        if (!(validator.equals(this.state.gender, 'male') || validator.equals(this.state.gender, 'female'))) {
            errorMessages.push('Provide a valid gender');
        }
        //title
        if (!(validator.isLength(this.state.title, { min: 2, max: 15 }) && validator.isAlphanumeric(this.state.title))) {
            errorMessages.push('Provide a valid title');
        }
        //firstname
        if (!(validator.isLength(this.state.first, { min: 2, max: 50 }) && validator.isAlphanumeric(this.state.first))) {
            errorMessages.push('Provide a valid firstname');
        }
        //lastname
        if (!(validator.isLength(this.state.last, { min: 2, max: 50 }) && validator.isAlphanumeric(this.state.last))) {
            errorMessages.push('Provide a valid lastname');
        }
        //phone
        if (!(validator.isLength(this.state.phone, { min: 6, max: 15 }) && phoneRegExp.test(this.state.phone))) {
            errorMessages.push('Provide a valid phone number');
        }
        //cell
        if (!(validator.isLength(this.state.cell, { min: 6, max: 15 }) && cellRegExp.test(this.state.cell))) {
            errorMessages.push('Provide a valid cell number');
        }
        //email
        if (!(validator.isEmail(this.state.email))) {
            errorMessages.push('Provide a valid email');
        }
        this.setState({ errorMessages });
        return errorMessages.length === 0 ? true : false;
    }

    handleChangeGender(event) {
        this.setState({ gender: event.target.value });
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleChangeFirst(event) {
        this.setState({ first: event.target.value });
    }

    handleChangeLast(event) {
        this.setState({ last: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleChangeCell(event) {
        this.setState({ cell: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        const { errorMessages } = this.state;
        return (
            <form className="formContact" onSubmit={this.handleSubmit}>
                { errorMessages.length > 0 &&
                    <div className="alert alert-danger">
                        <ul>
                            {
                                errorMessages.map((msg, i) => {
                                    return (<li key={i}>{msg}</li>);
                                })
                            }
                        </ul>
                    </div>
                }
                <div className="form-group row">
                    <label htmlFor="gender" className="col-xs-2 col-form-label">Gender*</label>
                    <div className="col-xs-10" id="gender">
                    <select defaultValue="female" className="custom-select" onChange={this.handleChangeGender}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="title" className="col-xs-2 col-form-label">Title*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Title" id="title" onChange={this.handleChangeTitle} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="first" className="col-xs-2 col-form-label">Firstname*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Firstname" id="first" onChange={this.handleChangeFirst} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="last" className="col-xs-2 col-form-label">Lastname*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Lastname" id="last" onChange={this.handleChangeLast} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="phone" className="col-xs-2 col-form-label">Phone*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Phone" id="phone" onChange={this.handleChangePhone} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="cell" className="col-xs-2 col-form-label">Cell*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Cell" id="cell" onChange={this.handleChangeCell} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-xs-2 col-form-label">Email*</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="Email" id="email" onChange={this.handleChangeEmail} />
                    </div>
                </div>
                <input type="submit" value="Add" />
            </form>
        );
    }
}

function stateToProps(state) {
	return {

	};
}

export default connect(stateToProps)(FormContact);
