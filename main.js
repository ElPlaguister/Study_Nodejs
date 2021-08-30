function get_shortstring(str) {
    if(str.Length > 5) {
        str = 
    }
}

function load_datalist() {
    var list = '<ul>';
    fs.readdir('data/', function(err, filelist) {
        filelist.forEach(file => {
            list += `<li><a href = "/?id=${element}">${element}</a></li>`
        });
    });
    list += '</ul>';
    return list;
}

function load_template(desc, title) {
    title = title.replace(/_/gi, ' ');
    var list = load_datalist();
    console.log(list);

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
                    <ul>
                        <li><a href="/?id=백병전에서도_총은_필수다">백병전에서.. </a></li>
                        <li><a href="/?id=역사_및_특징">역사 및 특징</a></li>
                        <li><a href="/?id=고통">고통</a></li>
                    </ul>
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

var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(url.parse(_url, true));
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = '';
    if(pathname == '/'){
        response.writeHead(200);
        if(queryData.id == undefined) {
            title = 'Welcome';
            desc = 'Hello, Node.js';
            response.end(load_template(desc, title));
        }
        else {
            title = queryData.id;
            fs.readFile(`data/${title}`, 'utf-8', function(err, desc) {
                response.end(load_template(desc, title));
            });
        }
    } 
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
