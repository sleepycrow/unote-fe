<app>
    
    <div class="loading-overlay" ref="loadingOverlay"></div>

    <login-prompt if={ !loggedIn } api={ api }></login-prompt>

    <sidebar if={ loggedIn } updatenotes={ updateNotes } changemanager={ changeManager }></sidebar>
    
    <main if={ loggedIn }>
        <homepage if={ state == states.homepage } loggedin={ loggedIn }></homepage>
        <note-viewer if={ state == states.view } noteid={ noteId } changemanager={ changeManager } loggedin={ loggedIn }></note-viewer>
        <note-editor if={ state == states.edit } noteid={ noteId } changemanager={ changeManager } loggedin={ loggedIn }></note-editor>
    </main>

    <script>
        import route from 'riot-route';
        import { clear, set } from 'idb-keyval';

        var self = this;

        self.states = { homepage: "homepage", view: "view", edit: "edit" };
        self.state = self.states.homepage;
        self.noteId = "";
        self.api = self.opts.api;
        self.changeManager = self.opts.changemanager;
        self.loggedIn = self.opts.loggedIn;

        self.updateDb = function(){
            return new Promise(function(resolve, reject){
                self.api.getNotes()
                .then(notes => {
                    clear()
                    .then(() => {
                        for(let i = 0; i < notes.length; i++){
                            if(typeof notes[i].id == "undefined") continue;

                            set("note" + notes[i].id, notes[i]);
                        }
                        resolve();
                    })
                    .catch(reject);
                })
                .catch(reject);
            });
        }

        self.updateNotes = function(showOverlay = true){
            if(!self.loggedIn) return;

            if(showOverlay) self.refs.loadingOverlay.style.display = "block";

            self.api.loginWithApiKey()
            .then(() => {
                return self.changeManager.sync();
            })
            .then(self.updateDb)
            .then(() => {
                self.refs.loadingOverlay.style.display = "none";

                self.tags.sidebar.update();
                if(typeof self.tags["note-viewer"] != "undefined") self.tags["note-viewer"].update();
            })
            .catch(err => {
                if(typeof err.result != "undefined"){
                    if(err.result != "networkError")
                        window.alert("An error occured: " + err.result + ": " + err.error);
                }else{
                    window.alert("An error occured: " + err);
                }
                console.log(err);
            });
        }

        route(function(state, noteId = ""){
            if(state == "") state = self.states.homepage;

            self.state = state;
            self.noteId = noteId;

            self.update();
        });
        route.start(true);

        self.on('mount', function(){
            self.updateNotes(false);

            self.api.on('sessionIdChange', function(){
                self.loggedIn = true;
            });
        });
    </script>

    <style>
        main{
            margin-top: 64px;
        }
    
        .context-buttons{
            position: fixed;
            top: 0;
            right: 0;
            z-index: 99;

            border-left: 1px solid #CCC;
            border-bottom: 1px solid #CCC;
            border-radius: 0 0 0 8px;
            background-color: rgba(238, 238, 238, 0.5);
        }

        .context-buttons .button{
            display: inline-block;

            padding: 8px 16px;
            text-align: center;
            font-size: 32px;
            cursor: pointer;
            background: transparent;
            margin-left: 4px;
        }

        .context-buttons .button:hover{
            background-color: rgba(238, 238, 238, 0.8);
        }

        .note{
            width: 100%;
            max-width: 100%;
            x-overflow: hidden;
        }

        .note header{
            font-size: 32px;
            margin: 8px 0;
        }
        
        .loading-overlay{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;

            width: 100vw;
            height: 100vh;

            background-color: rgba(0, 0, 0, 0.25);
            cursor: wait;
            display: none;
        }

        @media only screen and (min-width: 768px) {
            main{
                margin-left: 300px;
                margin-top: 0;
            }
        }
    </style>

</app>