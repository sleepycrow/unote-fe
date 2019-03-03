<note-editor>

    <article class="note">
        <header>
            <input type="text" ref="noteTitle" placeholder="Note Title" value={ note.title }>
        </header>
        <textarea ref="noteContent" placeholder="Note Content"></textarea>
    </article>

    <div class="context-buttons">
        <div class="button" onclick={ saveNote }>
            <i class="icon-font">%</i>
        </div>

        <div class="button" onclick={ cancel }>
            <i class="icon-font">X</i>
        </div>
    </div>

    <script>

        import { get, set } from 'idb-keyval';
        import route from 'riot-route';

        var self = this;

        var changeManager = self.opts.changemanager;
        var loggedIn = self.opts.loggedin;
        
        self.noteId = self.opts.noteid;
        self.note = {
            title: "",
            content: "",
            unsynced: true
        };

        self.loadNote = function(){
            self.noteId = self.opts.noteid;

            if(self.noteId != ""){
                get(self.noteId)
                .then(val => {
                    if(val == undefined || val.title == null || val.content == null){
                        window.alert("This note could not be found.");
                        route("homepage");
                    }else{
                        self.note = val;

                        self.refs.noteTitle.value = val.title;
                        self.refs.noteContent.value = val.content;
                    }
                });
            }
        }

        self.cancel = function(){
            if(self.noteId != ""){
                route("view/" + self.noteId);
            }else{
                route("homepage");
            }
        }

        self.saveNote = function(){
            self.note.title = self.refs.noteTitle.value;
            self.note.content = self.refs.noteContent.value;

            if(self.noteId != ""){
                self.saveExistingNote();
            }else{
                self.saveNewNote();
            }
        }

        self.saveExistingNote = function(){
            set(self.noteId, self.note)
            .then(() => {
                route("view/" + self.noteId);
            })
            .then(() => {
                if(typeof self.note.id != "undefined"){
                    changeManager.addChange("edit", self.noteId)
                    .then(() => {
                        if(loggedIn) changeManager.sync();
                    });
                }
            });
        }

        self.saveNewNote = function(){
            let date = new Date();
            self.noteId = "temp" + date.valueOf();
                
            set(self.noteId, self.note)
            .then(() => {
                route("view/" + self.noteId);
            })
            .then(() => {
                changeManager.addChange("add", self.noteId)
                .then(() => {
                    if(loggedIn) changeManager.sync();
                });
            });
        }

        self.on('mount', self.loadNote);
        self.on('update', self.loadNote);

    </script>
    
    <style>
        .note header input{
            font-size: 32px;
        }

        .note textarea{
            height: calc(100vh - 32px - 64px);
        }
    </style>

</note-editor>