import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { Actions } from 'flux';
// Action types
import ACTION from '../../../flux/components/home/constants';
// Components
import Contact from '../contact';
import Modal from 'react-modal';
import FormContact from '../formContact';

if (process.env.BROWSER) {
	require('./home.scss');
}

class Home extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		contacts: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.openModalDelete = this.openModalDelete.bind(this);
		this.closeModalDelete = this.closeModalDelete.bind(this);
		this.onDeleteSponsor = this.onDeleteSponsor.bind(this);
		this.openModalAdd = this.openModalAdd.bind(this);
		this.closeModalAdd = this.closeModalAdd.bind(this);

		this.state = {
			modalDeleteIsOpen: false,
			modalAddIsOpen: false,
			modalTitle: "",
			currentContact: null,
		};
	}

	static getActions() {
		return [new Actions().Home.loadAllContacts()];
	}

	render() {
		const customStyles = {
			content : {
				top                   : '25%',
				left                  : '33%',
				right                 : '33%',
				bottom                : 'auto',
				marginRight           : '-25%',
				transform             : 'translate(-25%, -25%)',
				overflow			  : 'scroll',
			}
		};
		const { contacts } = this.props;
		const data = contacts && contacts.size > 0;
		return (
			<div className="home">
				<div className="home__add">
					<i className="glyphicon glyphicon-plus home__iconAdd" onClick={this.openModalAdd} alt="Add new contact"></i>
				</div>
				{
					data &&
					contacts.toArray().map((contact, index) =>
					<Contact key={index} contact={contact} openModalDelete={this.openModalDelete} />
				)}
				{
					!data &&
					<p className="home__emptyMsg">No contacts to display !</p>
				}

				<Modal
					isOpen={this.state.modalDeleteIsOpen || this.state.modalAddIsOpen}
					onAfterOpen={null}
					onRequestClose={this.state.modalDeleteIsOpen ? this.closeModalDelete : this.closeModalAdd}
					closeTimeoutMS={350}
					contentLabel="Modal"
					style={customStyles}
				>
					<h1 className="home__modalTitle">{this.state.modalTitle}</h1>
					<button type="button" className="home__modalCloseButton" onClick={this.state.modalDeleteIsOpen ? this.closeModalDelete : this.closeModalAdd}>
						x
					</button>
					{ this.state.modalAddIsOpen && <FormContact closeModalAdd={this.closeModalAdd} /> }
					{
						this.state.modalDeleteIsOpen &&
						<div className="home__modalContent">
							<p>
								Remove {this.capitalize(this.state.currentContact.get('first'))} from contacts?
							</p>
							<button className="btn btn-primary" onClick={this.onDeleteSponsor}>
								Confirm
							</button>
						</div>
					}
				</Modal>
			</div>
		);
	}

	openModalDelete(contact) {
		this.setState({ modalDeleteIsOpen: true, modalTitle: "Delete Contact", currentContact: contact });
	}

	closeModalDelete() {
		this.setState({ modalDeleteIsOpen: false, modalTitle: "", currentContact: null });
	}

	onDeleteSponsor() {
		this.props.dispatch(new Actions().Home.deleteContact(this.state.currentContact))
			.then(() => { this.closeModalDelete(); })
	}

	openModalAdd(contact) {
		this.setState({ modalAddIsOpen: true, modalTitle: "Add Contact", currentContact: contact });
	}

	closeModalAdd() {
		this.setState({ modalAddIsOpen: false, modalTitle: "", currentContact: null });
	}

	capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

function stateToProps(state) {
	return {
		contacts: state.get('home').get('contacts'),
	};
}

export default connect(stateToProps)(Home);
