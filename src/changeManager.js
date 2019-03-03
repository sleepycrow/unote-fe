import { get, set, keys, del, clear } from 'idb-keyval';

export class ChangeManager {

    constructor(notesApiWrapper, changeStore){
        this.api = notesApiWrapper;
        this.store = changeStore;
        this.aliases = {};
    }

    addChange(type, subject){
        console.log("--adding change--", type, subject);
        var self = this;
        
        return new Promise(function (resolve, reject){
            let date = new Date();
            
            set(date.valueOf(), {
                type: type,
                id: subject
            }, self.store)
            .then(() => {
                console.log("set");
                resolve();
            })
            .catch(err => {
                reject(err);
            });

        });
    }

    clear(){
        var self = this;

        return clear(self.store);
    }

    pendingChanges(){
        var self = this;
        
        return new Promise(function(resolve, reject){
            keys(self.store)
            .then(keys => {
                resolve(keys.length);
            })
            .catch(reject);
        });
    }

    sync(){
        console.log("--attempting sync--");
        var self = this;
        var synced = [];
        
        //get the names of all keys in the change store
        keys(self.store)
        .then(keys => {
            console.log(keys);

            //get the contents of each key
            for(let i = 0; i < keys.length; i++){
                get(keys[i], self.store)
                .then(val => {
                    console.log(val);

                    //if there is an alias, use it
                    if(typeof self.aliases[val.id] != "undefined") val.id = self.aliases[val.id];

                    switch(val.type){

                        case "add":
                            if(synced.includes(val.id)) break;
                            else synced.push(val.id);

                            self.handleNoteAdd(val.id)
                            .then(newId => {
                                self.aliases[val.id] = newId;

                                synced.push(newId);
                                del(keys[i], self.store);
                            })
                            .catch(self.handleSyncError);
                            break;

                        case "edit":
                            if(synced.includes(val.id)) break;
                            else synced.push(val.id);

                            self.handleNoteEdit(val.id)
                            .then(() => {
                                synced.push(val.id);
                                del(keys[i], self.store);
                            })
                            .catch(self.handleSyncError);
                            break;

                        case "delete":
                            synced.push(val.id);
                        
                            self.handleNoteDelete(val.id)
                            .then(() => {
                                synced.push(val.id);
                                del(keys[i], self.store);
                            })
                            .catch(self.handleSyncError);
                            break;

                    }
                });
            }
        });
    }

    handleNoteAdd(noteId){
        var self = this;

        console.log("--adding note--", noteId);

        return new Promise(function(resolve, reject){
            get(noteId)
            .then(val => {
                console.log("adding note value", val);

                if(typeof val == "undefined") resolve();

                self.api.addNote(val.title, val.content)
                .then(id => {
                    console.log("note added, new id", id);

                    val.id = id;
                    set("note" + id, val);
                    del(noteId);

                    resolve(id);
                })
                .catch(reject);
            })
            .catch(reject);
        });
    }

    handleNoteDelete(noteId){
        var self = this;

        console.log("--deleting note--", noteId);

        return new Promise(function(resolve, reject){
            self.api.deleteNote(noteId)
            .then(() => {
                console.log("deleting resolved", noteId);
                resolve();
            })
            .catch(reject);
        });
    }

    handleNoteEdit(noteId){
        var self = this;

        console.log("--editing note--", noteId);

        return new Promise(function(resolve, reject){
            get(noteId)
            .then(val => {
                if(typeof val == "undefined" || typeof val.id == "undefined") resolve();

                console.log("editing ntoe value", val);

                self.api.editNote(val.id, val.title, val.content)
                .then(id => {
                    console.log("editing note resolved", noteId);
                    resolve();
                })
                .catch(reject);
            })
            .catch(reject);
        });
    }

    handleError(err){
        console.log("An error occured in changeman", err);
    }

}