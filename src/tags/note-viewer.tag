<note-viewer>

    <article class="note">
        <header ref="noteTitle"></header>
        <div class="content" ref="noteContent"></div>
    </article>

    <div class="context-buttons">
        <div class="button" onclick={ editNote }>
            <i class="icon-font">e</i>
        </div>

        <div class="button" onclick={ deleteNote }>
            <i class="icon-font">I</i>
        </div>
    </div>

    <script>

        import { get, del } from 'idb-keyval';
        import route from 'riot-route';
        const textile = require('textile-js');

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

            get(self.noteId)
            .then(val => {
                if(val == undefined || val.title == null || val.content == null){
                    window.alert("This note could not be found.");
                    route("homepage");
                }else{
                    self.note = val;

                    self.refs.noteTitle.innerHTML = val.title;
                    self.refs.noteContent.innerHTML = textile(val.content);
                }
            });
        }

        self.editNote = function(){
            route("edit/" + self.noteId);
        }

        self.deleteNote = function(){
            if(window.confirm("Are you sure you would like to delete this note?")){
                del(self.noteId);
                route("homepage");

                if(typeof self.note.id != "undefined"){
                    changeManager.addChange("delete", self.note.id)
                    .then(() => {
                        if(loggedIn) changeManager.sync();
                    });
                }
            }
        }

        self.on('mount', self.loadNote);
        self.on('update', self.loadNote);

    </script>

</note-viewer>