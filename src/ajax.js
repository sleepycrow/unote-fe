export function get(url, headers = {}, parseResponse = true){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.withCredentials = true;

        for(var header in headers){
            req.setRequestHeader(header, headers[header]);
        }

        req.onload = () => {
            if(req.status == 200){
                if(parseResponse === true){
                    let parsedResponse = JSON.parse(req.response);
                    resolve(parsedResponse);
                }else{
                    resolve(req.response);
                }
            }else{
                reject({
                    result: "httpError",
                    error: req.status
                });
            }
        };

        req.onerror = () => {
            reject({result: "networkError"});
        };

        req.send();
    });
}

export function post(url, data, headers = {}, parseResponse = true){
    return new Promise(function(resolve, reject){
        var form = new FormData();
        for(var item in data){
            form.append(item, data[item]);
        }

        var req = new XMLHttpRequest();
        req.open("POST", url, true);
        req.withCredentials = true;

        for(var header in headers){
            req.setRequestHeader(header, headers[header]);
        }

        req.onload = () => {
            if(req.status == 200){
                if(parseResponse === true)
                    resolve(JSON.parse(req.response));
                else
                    resolve(req.response);
            }else{
                reject({
                    result: "httpError",
                    error: req.status
                });
            }
        };

        req.onerror = () => {
            reject({result: "networkError"});
        };

        req.send(form);
    });
}

export function del(url, headers = {}, parseResponse = true){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open("DELETE", url, true);
        req.withCredentials = true;

        for(var header in headers){
            req.setRequestHeader(header, headers[header]);
        }

        req.onload = () => {
            if(req.status == 200){
                if(parseResponse === true)
                    resolve(JSON.parse(req.response));
                else
                    resolve(req.response);
            }else{
                reject({
                    result: "httpError",
                    error: req.status
                });
            }
        };

        req.onerror = () => {
            reject({result: "networkError"});
        };

        req.send();
    });
}