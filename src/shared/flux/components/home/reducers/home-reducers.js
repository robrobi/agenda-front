import _ from 'lodash';
import ACTION from '../constants';
import { fromJS } from 'immutable';
import { INITIAL_STATE } from '../flux-components-home';


export default function (state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case ACTION.TEST:
			return state.set('test', fromJS(action.payload));
        case ACTION.LOAD_CONTACTS:
            return state.set('contacts', fromJS(action.payload));
        case ACTION.DELETE_CONTACT:
            const contacts = state.toJS().contacts;
            const idDeleted = parseInt(action.payload.id);
            _.remove(contacts, {
			    id: idDeleted
		    });
            return state.set('contacts', fromJS(contacts));
        case ACTION.ADD_CONTACT:
            const contactsPrevious = state.toJS().contacts;
            contactsPrevious.push(action.payload);
            return state.set('contacts', fromJS(contactsPrevious));
		default:
			return state;
	}
}
