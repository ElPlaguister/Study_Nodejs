function remove_underbar(str) {
    return str.replace(/_/gi, ' ');
}

function get_shortstring(str) {
    const lim = 7;
    if(str.length > lim) {
        str = str.slice(0, lim - 2) + '..';
    }
    return str;
}

function load_datalist() {
    var list = '<ul>';
    filelist = fs.readdirSync('data/');
    filelist.forEach(file => {
        var element = get_shortstring(remove_underbar(file));
        list += `<li><a href = "/?id=${file}">${element}</a></li>`
    });
    list += '</ul>';
    return list;
}

function load_template(desc, title) {
    title = remove_underbar(title);
    var list = load_datalist();
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>백병전 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">백병전</a></h1>
            <div id="grid">
                <div>
                    ${list}
                </div>
                <div>
                    <h2>${title}</h2>
                    <article>${desc}</article>
                </div>
            </div>
        </body>
    </html>
    `;
    return template;
}

console.log(get_shortstring('hellooooo'));
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(url.parse(_url, true));
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    if(pathname == '/'){
        var title, desc;
        response.writeHead(200);
        if(queryData.id == undefined) {
            title = 'Welcome';
            desc = 'Hello, Node.js';
        }
        else {
            title = queryData.id;
            desc = fs.readFileSync(`data/${title}`, 'utf-8');
        }
        response.end(load_template(desc, title));
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
