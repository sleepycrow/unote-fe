<login-prompt>

    <div class="prompt">

        <main>
            <h2>You are not logged in!</h2>

            <input type="text" placeholder="Username" ref="username"><br>
            <input type="password" placeholder="Password" ref="password"><br>

            <button onclick={ login }>Log In</button>
            <button onclick={ signup }>Sign Up</button>
        </main>

    </div>

    <script>

        var self = this;
        var api = self.opts.api;

        var handleError = function(err){
            if(typeof err.result != "undefined"){
                if(err.result == "networkError")
                    window.alert("A network error occured. Are you connected to the internet?");
                else
                    window.alert("An error occured: " + err.result + ": " + err.error);
            }else{
                window.alert("An error occured: " + err);
            }
            console.log(err);
        }

        self.login = function(){
            let username = self.refs.username.value;
            let password = self.refs.password.value;

            api.login(username, password)
            .then(() => {
                location.reload();
            })
            .catch(handleError);
        }

        self.signup = function(){
            let username = self.refs.username.value;
            let password = self.refs.password.value;

            if(username.length >= 3 && password.length >= 3){
                api.register(username, password)
                .then(() => {
                    self.login();
                })
                .catch(handleError);
            }else{
                window.alert("The username and password must be at least 3 characters long!");
            }
        }

    </script>

    <style>
        .prompt{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;

            width: 100vw;
            height: 100vh;

            background-color: #FFF;
        }

        .prompt main{
            text-align: center;
            padding: 16px;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }
    </style>

</login-prompt>