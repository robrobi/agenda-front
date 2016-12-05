import ACTION from '../constants';
import api from '../../../../api';

export default class HomeActions {
	test() {
		return {
			type: ACTION.TEST,
			payload: new Promise((resolve) => {
				console.log("action");
				resolve([{ info: 'from server' }]);
			}),
		};
	}

	loadAllContacts() {
		return {
			type: ACTION.LOAD_CONTACTS,
			payload: new Promise((resolve, reject) => {
				resolve(api.getAllContacts());
			}),
		}
	}

	deleteContact(contact) {
		return {
			type: ACTION.DELETE_CONTACT,
			payload: new Promise((resolve, reject) => {
				resolve(api.deleteContact(contact.get('id')));
			}),
		}
	}

	addContact(formData) {
		return {
			type: ACTION.ADD_CONTACT,
			payload: new Promise((resolve, reject) => {
				resolve(api.addContact(formData));
			}),
		}
	}
}
