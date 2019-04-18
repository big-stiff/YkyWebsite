$(function() {
    //轮播图

    var imgs = document.getElementById('imgwrap').children; //Li集
    var len = imgs.length; //Li长度
    var spans = document.getElementsByClassName('circle')[0].children; //底部横条集
    var timer = null; //动画定时器
    var moveWidth = $('#CarouselPic').outerWidth(); //轮播图宽度
    var iNow = 0; //当前显示图片的序号
    $('#imgwrap>li:gt(0)').css('left', moveWidth + 'px'); //  将图片除第一张外全部移动到右边

    //      添加点击按钮效果
    $('.circle > span').on('click', function(index) {

        // alert('你点击了第'+this.innerHTML+'个按钮');
        var that = $(this).index(); //      取得点击的序号
        if (that > iNow) {
            animateMul(imgs[iNow], { left: -moveWidth }); //      让当前显示图片移动到左侧
            imgs[that].style.left = moveWidth + 'px';
            animateMul(imgs[that], { left: 0 });
        }
        if (that < iNow) {
            animateMul(imgs[iNow], { left: moveWidth }); //      让当前显示图片移动到右侧
            imgs[that].style.left = -moveWidth + 'px';
            animateMul(imgs[that], { left: 0 }); //      让上一张图片移动到显示区域
        }
        iNow = that; //  点击后将 点击的序号传递给iNow
        // alert(len);
        animateMul(imgs[iNow], { left: 0 }); //      让当前显示图片移动到左侧
        autoiNow(); //      传递iNow参数，使suqare跟随定位
    });

    $('.before').click(function() {
        animateMul(imgs[iNow], { left: moveWidth }); //      让当前显示图片移动到右侧
        --iNow < 0 ? iNow = len - 1 : iNow;
        imgs[iNow].style.left = -moveWidth + 'px';
        animateMul(imgs[iNow], { left: 0 }); //      让上一张图片移动到显示区域
        autoiNow(); //      传递iNow参数，使suqare跟随定位
    });

    $('.after').click(function() {
        autoPlay(); //      右侧函数和定时器一样
    });

    timer = setInterval(autoPlay, 2000);

    function autoPlay() {
        //      和点击右侧按键效果一致
        animateMul(imgs[iNow], { left: -moveWidth }); //      让当前显示图片移动到左侧
        ++iNow > len - 1 ? iNow = 0 : iNow;
        imgs[iNow].style.left = moveWidth + 'px';
        animateMul(imgs[iNow], { left: 0 }); //      让下一张图片移动到显示区域
        autoiNow();
    } //     点击右侧按钮函数，同定时器
    function autoiNow() {
        for (var i = 0; i < len; i++) { //  遍历，从第二个按钮一直到倒数第二个
            spans[i].className = '';
        }
        spans[iNow].className = 'currentStrip'; //  从第二个按钮开始，所以要iNow+1
    } //      传递iNow参数，使suqare跟随定位
    function mouseMove() {
        $('#CarouselPic').hover(function() {
                clearInterval(timer); //  鼠标放在轮播区域，清除定时器
            },
            function() {
                clearInterval(timer); //  先清除定时器，避免bug
                timer = setInterval(autoPlay, 2000);
            });
    }
    mouseMove();
});