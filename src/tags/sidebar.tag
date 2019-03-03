<sidebar>

    <nav class="sidebar" ref="sidebar">
        <header>
            uNote
        </header>

        <div class="item meta" onclick={ goToHomepage }>
            Homepage
        </div>

        <div class="separator"></div>

        <div class="item meta" onclick={ newNote }>
            New Note
        </div>

        <div ref="noteList"></div>

        <div class="separator"></div>
        
        <div class="item meta" onclick={ updateNotes }>
            Update
        </div>

        <div class="item meta" onclick={ logout }>
            Log Out
        </div>
    </nav>

    <div class="hamburger-button" onclick={ toggleSidebar }>
        <i class="icon-font">\</i>
    </div>

    <script>

        import { get, keys, clear } from 'idb-keyval';
        import route from 'riot-route';
        import * as Cookies from 'js-cookie';

        var self = this;
        var changeManager = self.opts.changemanager;

        self.updateNotes = self.opts.updatenotes;
        self.loggedIn = self.opts.loggedin;

        self.updateList = function(){
            console.log("updating list");

            keys()
            .then(keys => {
                self.refs.noteList.innerHTML = "";

                var notes = keys || [];

                for(let i = 0; i < notes.length; i++){
                    if(keys[i] == "notesChanged") continue;

                    get(keys[i])
                    .then(val => {
                        if(val == undefined || val.title == undefined) return;

                        let elem = document.createElement('div');
                        elem.setAttribute('class', 'item');
                        elem.onclick = function(){
                            route("view/" + keys[i]);
                        }
                        elem.innerHTML = val.title;
                        self.refs.noteList.appendChild(elem);
                    });
                }
            });
        }

        self.toggleSidebar = function(){
            if(self.refs.sidebar.style.display != "block"){
                self.refs.sidebar.style.display = "block";
            }else{
                self.refs.sidebar.style.display = "none";
            }
        }

        self.logout = function(){
            changeManager.pendingChanges()
            .then(amount => {
                if(amount > 0){
                    if(!window.confirm("You have " + amount + " unsynced changes. If you sign out now, these will be lost. Are you sure you want to sign out?"))
                        return false;
                }else{
                    if(!window.confirm("Are you sure you want to sign out?"))
                        return false;
                }

                Cookies.remove("api_key");
                Cookies.remove("session_id");

                clear()
                .then(() => {
                    return changeManager.clear();
                })
                .then(() => {
                    location.reload();
                });
            });
        }

        self.goToHomepage = function(){
            route("homepage");
        }

        self.newNote = function(){
            route("edit");
        }

        self.on('mount', self.updateList);
        self.on('update', self.updateList);

    </script>

    <style>
        .sidebar{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;

            height: 100vh;
            width: 90%;
            max-width: 300px;
            display: none;

            overflow-x: hidden;
            overflow-y: auto;
            background-color: #EEE;
        }

        .sidebar .item{
            width: 100%;
            padding: 16px 8px;
            cursor: pointer;
            box-sizing: border-box;
        }

        .sidebar .item:hover{
            background-color: #DDD;
        }

        .sidebar .meta{
            text-align: center;
            font-weight: bold;
        }

        .sidebar .separator{
            margin: 16px;
            border-bottom: 1px solid #CCC;
        }

        .sidebar header{
            text-align: center;
            padding: 16px 0;
            font-size: 32px;
            background-color: #CCC;
        }

        .hamburger-button{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 101;

            padding: 8px 16px;
            text-align: center;
            font-size: 32px;
            cursor: pointer;
            background-color: rgba(238, 238, 238, 0.5);
        }

        .hamburger-button:hover{
            background-color: rgba(238, 238, 238, 0.8);
        }

        @media only screen and (min-width: 768px) {
            .sidebar{
                display: block;
            }

            .hamburger-button{
                display: none;
            }
        }
    </style>
</sidebar>