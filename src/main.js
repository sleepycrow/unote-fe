import riot from 'riot';
import { Store } from 'idb-keyval';
import * as Cookies from 'js-cookie';
import { NotesApiWrapper } from './notesApiWrapper.js';
import { ChangeManager } from './changeManager.js';
const config = require('config');

import './tags/app.tag';
import './tags/sidebar.tag';
import './tags/homepage.tag';
import './tags/note-viewer.tag';
import './tags/note-editor.tag';
import './tags/login-prompt.tag';

window.addEventListener('load', function(){
    var changeStore = new Store("changes-db", "changes-store");
    var apiKey = Cookies.get('api_key') || "";
    var sessionId = Cookies.get('session_id') || "";
    var api = new NotesApiWrapper(config.apiLocation, apiKey, sessionId);
    var changeManager = new ChangeManager(api, changeStore);

    api.on('sessionIdChange', function(args){
        if(args.sessionId) Cookies.set("session_id", args.sessionId, { expires: 365 });
    });

    api.on('apiKeyChange', function(args){
        if(args.apiKey) Cookies.set("api_key", args.apiKey, { expires: 365 });
    });

    riot.settings.autoUpdate = false;
    riot.mount('*', {
        api: api,
        changemanager: changeManager,
        loggedIn: (apiKey != "")
    });

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register("./sw.bundle.js", {scope: config.serviceWorkerScope})
        .then(reg => {
            console.log("Service worker registered.", reg);
        })
        .catch(error => {
            console.log("An error occured while registering the service worker...", error);
        });
    }
});