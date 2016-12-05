import superagent from 'superagent';
import util from 'util';

const HOST = "http://localhost";
const PORT = "8000";
const API_PATH = "/";

function createRequest(req) {
    const {
        path,
        method,
        params,
        query,
        data,
    } = req;
    return new Promise((resolve, reject) => {
        const request = superagent(method, formatUrl(path));
        console.log("Load AJAX URL", formatUrl(path), (data || ""));

        if (query) {
            request.query(query);
        }

        if (params) {
            request.use(addParamsUrl(params));
        }

        if (data) {
            request.send(data);
        }

        // request fails if there is an HTTP error (4XX or 5XX status code)
        request.end((err, { body } = {}) => (err && err.status >= 400 ? reject(body || err) : resolve(body)));
    });
}

// params will be passed as ':id'
function addParamsUrl(params) {
    return (request) => {
        request.url = request.url.replace(new RegExp(":(\\w+)", "g"), (match, pKey) => {
            return params[pKey] || match;
        });
    };
}

function formatUrl(path) {
    return util.format('%s:%s%s', HOST, PORT, API_PATH) + path;
}

export default {
    getAllContacts: () => createRequest({ path: 'users', method: 'GET' }),
    deleteContact: (id) => createRequest({ path: 'user/:id', method: 'DELETE', params: { id } }),
    addContact: (data) => createRequest({ path: 'users', method: 'POST', data }),
}
