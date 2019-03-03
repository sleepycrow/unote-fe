import * as Ajax from './ajax.js';

export class NotesApiWrapper {

    constructor(apiLocation = "", apiKey = "", sessionId = ""){
        this.apiLocation = apiLocation;
        this.apiKey = apiKey;
        this.sessionId = sessionId;
        this.headers = {"Session-ID": this.sessionId};
        this.eventHandlers = {};
    }

    updateAuthDetails(sessionId = this.sessionId, apiKey = this.apiKey){
        if(apiKey != this.apiKey) this.dispatchEvent('apiKeyChange', {apiKey: apiKey});
        if(sessionId != this.sessionId) this.dispatchEvent('sessionIdChange', {sessionId: sessionId});

        this.sessionId = sessionId;
        this.apiKey = apiKey;
        this.headers = {"Session-ID": this.sessionId};
    }

    //NOTES
    addNote(title, content){
        var self = this;
        
        return new Promise(function(resolve, reject){
            var data = {};
            if(title != null) data.title = title;
            if(content != null) data.content = content;

            Ajax.post(self.apiLocation + "notes", data, self.headers, true)
            .then(resp => {
                if(resp.result != null && resp.result == "error"){
                    reject(resp);
                }else{
                    resolve(resp.note_id);
                }
            })
            .catch(reject);
        });
    }

    editNote(id = 0, title = "", content = ""){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.post(self.apiLocation + "notes/" + id, {title: title, content: content}, self.headers, true)
            .then(resp => {
                if(resp.result != null && resp.result == "error"){
                    reject(resp);
                }else{
                    resolve();
                }
            })
            .catch(reject);
        });
    }

    getNotes(){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.get(self.apiLocation + "notes", self.headers, true)
            .then(resp => {
                if(resp.result != null && resp.result == "error"){
                    reject(resp);
                }else{
                    resolve(resp);
                }
            })
            .catch(reject);
        });
    }

    getNote(id = 0){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.get(self.apiLocation + "notes/" + id, self.headers, true)
            .then(resp => {
                if(resp.result != null && resp.result == "error"){
                    reject(resp);
                }else{
                    resolve(resp);
                }
            })
            .catch(reject);
        });
    }

    deleteNote(id = 0){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.del(self.apiLocation + "notes/" + id, self.headers, true)
            .then(resp => {
                if(resp.result != null && resp.result == "error"){
                    reject(resp);
                }else{
                    resolve();
                }
            })
            .catch(reject);
        });
    }

    //AUTH
    login(username = "", password = ""){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.post(self.apiLocation + "login", {username: username, password: password}, {}, true)
            .then(resp => {
                if(resp.result == "error"){
                    reject(resp);
                }else{
                    self.updateAuthDetails(resp.session_id, resp.api_key);
                    resolve(resp);
                }
            })
            .catch(reject);
        });
    }

    loginWithApiKey(apiKey = this.apiKey){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.post(self.apiLocation + "login", {api_key: apiKey}, {}, true)
            .then(resp => {
                if(resp.result == "error"){
                    reject(resp);
                }else{
                    self.updateAuthDetails(resp.session_id, resp.api_key);
                    resolve(resp);
                }
            })
            .catch(reject);
        });
    }

    register(username = "", password = ""){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.post(self.apiLocation + "register", {username: username, password: password}, {}, true)
            .then(resp => {
                if(resp.result == "error"){
                    reject(resp);
                }else{
                    resolve();
                }
            })
            .catch(reject);
        });
    }

    logout(){
        var self = this;
        
        return new Promise(function(resolve, reject){
            Ajax.get(self.apiLocation + "logout", {}, self.headers, true)
            .then(resp => {
                if(resp.result == "error"){
                    reject(resp);
                }else{
                    resolve();
                }
            })
            .catch(reject);
        });
    }
    
    on(eventName, callback){
        var self = this;

        if(self.eventHandlers[eventName] == undefined) self.eventHandlers[eventName] = [];

        self.eventHandlers[eventName].push(callback);
    }

    dispatchEvent(eventName, args){
        var self = this;

        let eventHandlers = self.eventHandlers[eventName] || [];
        let eventHandlerAmount = eventHandlers.length;

        for(let i = 0; i < eventHandlerAmount; i++){
            eventHandlers[i](args);
        }
    }

}