function get_shortstring(str) {
    const lim = 7;
    console.log(str.length);
    if(str.length > lim) {
        str = str.slice(0, lim - 2) + '..';
    }
    return str;
}

console.log(get_shortstring('helooooooooooo'));