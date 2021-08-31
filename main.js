var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');

http.createServer(function(request,response){
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    console.log(pathname);
    fs.readdir('./data', function(err, filelist) {
        if(pathname == '/'){
            var title, desc, control;
            if(queryData.id == undefined) {
                title = 'Welcome';
                desc = 'Hello, Node.js';
                control = '<a href = "/create"> create</a>';
            }
            else {
                title = queryData.id;
                var filteredId = path.parse(queryData.id).base;
                desc = fs.readFileSync(`data/${filteredId}`, 'utf-8');
                title = sanitizeHtml(title);
                control = `
                <a href = "/create"> create</a>
                <a href = "/update?id=${title}"> update</a>
                <form action="/delete_process" method="post" onsubmit=""> 
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
                </form>
                `;
            }
            var list = template.list(filelist);
            var html = template.html(title, list, desc, control);
            response.writeHead(200);
            response.end(html);
        }
        else if(pathname == '/create') {
            var title, desc;
            title = '백병전 - create';
            desc = `
            <form action = "http://localhost:3000/create_process" method = "post">
                <p><input type="text" name = "title" placeholder = 'title'></p>
                <p>
                    <textarea name = "desc" placeholder = 'description'></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `;
            var list = template.list(filelist);
            var html = template.html(title, list, desc, '');
            response.writeHead(200);
            response.end(html);
        } 
        else if(pathname == "/create_process") {
            var body = '';
            request.on('data', function(data) {
                body += data;
            });
            request.on('end', function() {
                var post = qs.parse(body);
                var title = post.title;
                var desc = post.desc;
                fs.writeFile(`data/${title}`, desc, 'utf-8', function(err) {
                    response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
                    response.end();   
                });
            });
        }
        else if(pathname =='/update') {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf-8', function(err, desc) {
                var title = filteredId;
                desc = `<form action = "/update_process" method = "post">
                    <input type="hidden" name="id" value=${title}>
                    <p><input type="text" name = "title" placeholder = 'title' value = ${title}></p>
                    <p>
                        <textarea name = "desc" placeholder = 'description'>${desc}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>`;
                var list = template.list(filelist);
                var html = template.html(title, list, desc, '');
                response.writeHead(200);
                response.end(html);
            })
        }
        else if(pathname == '/update_process') {
            var body = '';
            request.on('data', function(data) {
                body += data;
            });
            request.on('end', function() {
                var post = qs.parse(body);
                var id = post.id;
                var title = post.title;
                var desc = post.desc;
                fs.rename(`data/${id}`, `data/${title}`, function(err) {
                    fs.writeFile(`data/${title}`, desc, 'utf-8', function(err) {
                        response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
                        response.end();   
                    });
                });
            });
        }
        else if(pathname == '/delete_process') {
            var body = '';
            request.on('data', function(data) {
                body += data;
            });
            request.on('end', function() {
                var post = qs.parse(body);
                var id = post.id;
                var filteredId = path.parse(id).base;
                fs.unlink(`data/${filteredId}`, function(err) {
                    response.writeHead(302, {Location: encodeURI(`/`)});
                    response.end(); 
                });
            });
        }
        else {
            response.writeHead(404);
            response.end('Not found');
        }
    });
}).listen(3000);