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

module.exports = {
    html: function(title, list, desc, control) {
        title = remove_underbar(title);
        return `
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
                        ${control}
                    </div>
                    <div>
                        <h2>${title}</h2>
                        <article>${desc}</article>
                    </div>
                </div>
            </body>
        </html>
        `;
    }, 
    list: function(filelist) {
        var list = '<ul>';
        filelist.forEach(file => {
            var element = get_shortstring(remove_underbar(file));
            list += `<li><a href = "/?id=${file}">${element}</a></li>`
        });
        list += '</ul>';
        return list;
    }
};