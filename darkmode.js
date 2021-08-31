darkgray = "rgb(50, 50, 50)"

var Links = {
    setColor: function(color) {
        $('a').css('color', color)
    }
}
var Body = {
    setColor: function(color) {
        $('body').css('color', color)
    },
    setBackgroundColor: function(color) {
        $('body').css('backgroundColor', color)
    }
}
function DarkmodeHandler(self) {
    console.log(document)
    // 링크텍스트컬러, 버튼텍스트, body배경컬러, body텍스트컬러
    var acolor, nextValue, backColor, fontColor;
    if(self.value == 'dark') {
        nextValue = 'light';
        backColor = darkgray;
        fontColor = 'white';
        acolor = 'powderblue';
    }
    else {
        nextValue = 'dark';
        backColor = 'white';
        fontColor = 'black';
        acolor = 'black';
    }
    self.value = nextValue;
    Body.setBackgroundColor(backColor);
    Body.setColor(fontColor);
    Links.setColor(acolor);
}
