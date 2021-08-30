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