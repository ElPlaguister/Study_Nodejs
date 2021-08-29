var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = ''
    console.log('id: ' + queryData.id);
    console.log('url:' + _url);
    if(_url == '/'){
      title = 'Welcome';
      console.log('title is Welcome');
    }
    else if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    else if(queryData.id != undefined){
        title = queryData.id;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, desc) {
        title = title.replace(/_/gi, ' ');
        console.log('title: ' + title);
        var template = `
        <!doctype html>
        <html>
            <head>
                <title>백병전 - ${title}</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="style.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                <script src="darkmode.js"></script>
            </head>
            <body>
                <h1><a href="/">백병전</a></h1>
                <input type="button" value="dark" onclick="DarkmodeHandler(this)">
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
        response.end(template);
    });
});
app.listen(3000);
