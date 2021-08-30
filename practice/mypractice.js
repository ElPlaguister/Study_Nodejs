function get_shortstring(str) {
    const lim = 7;
    console.log(str.length);
    if(str.length > lim) {
        str = str.slice(0, lim - 2) + '..';
    }
    return str;
}

function remove_underbar(str) {
    return str.replace(/_/gi, ' ');
}

console.log(get_shortstring(remove_underbar('Node.js')));