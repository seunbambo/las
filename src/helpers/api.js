import fetch from 'node-fetch';
export const WEBSITE = "https://lasretradbackend.landlordstech.com/";
export const BASE_URL = WEBSITE + 'api/lasretrad/';

const Api = {
    get: async function (path, params) {
        let url = path.match(/^https?:\/\//gi) ? path : BASE_URL + path;
        let method = 'GET';
        let queryString = '';
        if(params) {
            queryString = '?' + Object.keys(params).map((key) => {
                return key + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }
        let responseClone;
        let response = await fetch(url + queryString, {
            method: method
        }).then((response) => {
            responseClone = response.clone();
            return response.json();
        }).then((json) => {
            return json;
        }).catch((reason) => {
            if(responseClone) {
                responseClone.text().then(text => console.debug(text)).catch(reason => console.debug(reason));
            } else {
                console.debug(reason);
            }
        });
        console.debug('API REQUEST: ', {url, method, params, response});
        return response;
    },

    post: async function (path, params) {
        let url = path.match(/^https?:\/\//gi) ? path : BASE_URL + path;
        let method = 'POST';
        let responseClone;
        console.log("Post function reached", url, params)
        let response = await fetch(url, {
            method: method,
            body: params
        }).then((response) => {
            responseClone = response.clone();
            return response.json();
        }).then((json) => {
            return json;
        }).catch((reason) => {
            if(responseClone) {
                responseClone.text().then(text => console.debug(text)).catch(reason => console.debug(reason));
            } else {
                console.debug(reason);
            }
        });
        console.debug('API REQUEST: ', {url, method, params, response});
        return response;
    },

    //api endpoints declaration
    login: 'login'
};

export default Api;