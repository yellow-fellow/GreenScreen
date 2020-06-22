var image1;
var image2;
var og1;
var og2;

function upload1() {
    var fileInput = document.getElementById('fginput');
    var imgCanvas = document.getElementById("d1");
    image1 = new SimpleImage(fileInput);
    og1 = new SimpleImage(fileInput);
    image1.drawTo(imgCanvas);
}
function upload2() {
    var imgCanvas2 = document.getElementById('d2');
    var fileInput = document.getElementById('bginput');
    image2 = new SimpleImage(fileInput);
    og2 = new SimpleImage(fileInput);
    image2.drawTo(imgCanvas2);
}

function clearCanvas() {
    var imgCanvas1 = document.getElementById("d1");
    var ctx1 = imgCanvas1.getContext("2d");
    ctx1.clearRect(0,0,imgCanvas1.width,imgCanvas1.height);
    imgCanvas1.width = window.innerWidth/4;
    imgCanvas1.height = window.innerHeight/2;

    var imgCanvas2 = document.getElementById("d2");
    var ctx2 = imgCanvas2.getContext("2d");
    ctx2.clearRect(0,0,imgCanvas2.width,imgCanvas2.height);
    imgCanvas2.width = (window.innerWidth)/4;
    imgCanvas2.height = (window.innerHeight)/2;
}

function greenscreen() {

    var imgCanvas = document.getElementById('d1');

    var outputImg = new SimpleImage(image1.getWidth(),image1.getHeight());

    for (var pixel of image1.values()){
        var x = pixel.getX();
        var y = pixel.getY();

        if (pixel.getGreen() > pixel.getRed()+pixel.getBlue()){
            var bgPixel = image2.getPixel(x,y);
            outputImg.setPixel(x,y,bgPixel);
        }
        else {
            outputImg.setPixel(x,y,pixel);
        }
    }
    clearCanvas();
    outputImg.drawTo(imgCanvas);

}

function gray1() {

    for (var pixel of image1.values()){
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgCanvas = document.getElementById("d1");
    image1.drawTo(imgCanvas);

}

function gray2() {
    
    for (var pixel of image2.values()){
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgCanvas = document.getElementById("d2");
    image2.drawTo(imgCanvas);

}

function red1() {

    for (var pixel of image1.values()){
        pixel.setRed(255);
    }
    var imgCanvas = document.getElementById("d1");
    image1.drawTo(imgCanvas);

}

function red2() {

    for (var pixel of image2.values()){
        pixel.setRed(255);
    }
    var imgCanvas = document.getElementById("d2");
    image2.drawTo(imgCanvas);

}

function blur1() {
    

    function ensureInImage (coordinate, size) {
        // coordinate cannot be negative
        if (coordinate < 0) {
            return 0;
        }
        // coordinate must be in range [0 .. size-1]
        if (coordinate >= size) {
            return size - 1;
        }
        return coordinate;
    }
    
    function getPixelNearby (image1, x, y, diameter) {
        var dx = Math.random() * diameter - diameter / 2;
        var dy = Math.random() * diameter - diameter / 2;
        var nx = ensureInImage(x + dx, image1.getWidth());
        var ny = ensureInImage(y + dy, image1.getHeight());
        return image1.getPixel(nx, ny);
    }
    
    for (var pixel of image1.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() > 0.5) {
            var other = getPixelNearby(image1, x, y, 10);
            image1.setPixel(x, y, other);
        }
        else {
            image1.setPixel(x, y, pixel);
        }
    }

    var imgCanvas = document.getElementById("d1");
    image1.drawTo(imgCanvas);
}

function blur2() {
    

    function ensureInImage (coordinate, size) {
        // coordinate cannot be negative
        if (coordinate < 0) {
            return 0;
        }
        // coordinate must be in range [0 .. size-1]
        if (coordinate >= size) {
            return size - 1;
        }
        return coordinate;
    }
    
    function getPixelNearby (image2, x, y, diameter) {
        var dx = Math.random() * diameter - diameter / 2;
        var dy = Math.random() * diameter - diameter / 2;
        var nx = ensureInImage(x + dx, image2.getWidth());
        var ny = ensureInImage(y + dy, image2.getHeight());
        return image2.getPixel(nx, ny);
    }
    
    for (var pixel of image2.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() > 0.5) {
            var other = getPixelNearby(image2, x, y, 10);
            image2.setPixel(x, y, other);
        }
        else {
            image2.setPixel(x, y, pixel);
        }
    }

    var imgCanvas = document.getElementById("d2");
    image2.drawTo(imgCanvas);
}

function reset() {

    var imgCanvas1 = document.getElementById("d1");
    og1.drawTo(imgCanvas1);

    var imgCanvas2 = document.getElementById("d2");
    og2.drawTo(imgCanvas2);
}

function rainbow1() {
    var imgCanvas = document.getElementById('d1');

    for (var pixel of image1.values()){
        var x = pixel.getX();
        var y = pixel.getY();

        if (x <= (image1.getHeight()/3)){
            pixel.setRed(255);
        }
        else if (x <= (image1.getHeight()/3)*2){
            pixel.setGreen(255);
        }
        else{
            pixel.setBlue(255);
        }

    }

    image1.drawTo(imgCanvas);
}