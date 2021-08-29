darkgray = "rgb(50, 50, 50)"

var Links = {
    setColor: function(color) {
        // var alist = document.querySelectorAll('a');
        // var i = 0;
        // while(i < alist.length) {
        //     alist[i].style.color = color;
        //     i += 1;
        // }
        // jquery
        $('a').css('color', color)
    }
}
var Body = {
    setColor: function(color) {
        //document.querySelector('body').style.color = color;
        // jquery
        $('body').css('color', color)
    },
    setBackgroundColor: function(color) {
        //document.querySelector('body').style.backgroundColor = color;
        // jquery
        $('body').css('backgroundColor', color)
    }
}
function DarkmodeHandler(self) {
    var target = document.querySelector('body');
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
