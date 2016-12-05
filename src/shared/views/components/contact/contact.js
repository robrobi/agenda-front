import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
	require('./contact.scss');
}

class Contact extends Component {
	static propTypes = {
		contact: PropTypes.object.isRequired,
        openModalDelete: PropTypes.func,
	};

    constructor(props) {
        super(props);
        this.openModalDelete = this.openModalDelete.bind(this);
    }
	shouldComponentUpdate(nextProps) {
		for (const prop in nextProps) {
			if (nextProps.hasOwnProperty(prop) && !this.props.hasOwnProperty(prop) || this.props[prop] !== nextProps[prop]) {
				return true;
			}
		}
		return false;
	}


	render() {
		const { contact } = this.props;
		return (
			<div className="contact">

    				<div className="contact__title">
                        {this.capitalize(contact.get('title'))} {this.capitalize(contact.get('first'))} {this.capitalize(contact.get('last'))} ({this.getGender(contact.get('gender'))})
                    </div>
                    <div className="contact__phone">
                        Phone: {contact.get('phone')}
                    </div>
                    <div className="contact__cell">
                        Cell: {contact.get('cell')}
                    </div>
                    <div className="contact__email">
                        Email: {contact.get('email')}
                    </div>

                <i className="glyphicon glyphicon-remove contact__iconRemove" onClick={this.openModalDelete}></i>
			</div>
		);
	}

    openModalDelete() {
        this.props.openModalDelete(this.props.contact);
    }

    getGender(gender) {
        return gender === 'male' ? 'M' : 'F';
    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

export default Contact;
