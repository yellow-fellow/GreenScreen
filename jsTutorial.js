var image1;
var image2;
function upload1() {
    var fileInput = document.getElementById('fginput');
    var imgCanvas = document.getElementById("d1");
    image1 = new SimpleImage(fileInput);
    image1.drawTo(imgCanvas);
}
function upload2() {
    var imgCanvas2 = document.getElementById('d2');
    var fileInput = document.getElementById('bginput');
    image2 = new SimpleImage(fileInput);
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



