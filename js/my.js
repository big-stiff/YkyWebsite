/**
 * Created by big_s on 2017-04-24.
 */
//      scroll 函数
function scroll() {
    //              ie9及其他新版本浏览器
    if (window.pageYOffset != null && window.pageXOffset != null) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    //              检测是否声明了DTD，如果声明了，则执行此语句
    //              大部分浏览器
    else if (document.compatMode == 'CSS1Compat') {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    //              检测是否声明了DTD，如果未声明，则执行此语句
    //              谷歌和其他非正常浏览器
    else if (document.compatMode == 'BackCompat') {
        return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }
    return {
        left: 0,
        top: 0
    }
}

function getClass(classname) {
    if (document.getElementsByClassName)
        return document.getElementsByClassName(classname);
    else {
        var arr = [];
        var dom = document.getElementsByTagName('*');
        var len = dom.length;
        for (var i = 0; i < len; i++) {
            var txtarr = dom[i].className.split(' ');
            for (var j = 0; j < txtarr.length; j++) {
                if (classname == txtarr[j])
                    arr.push(dom[i]);
            }

        }
        return arr;
    }
}

//      显示和隐藏元素
function show(obj) {
    obj.style.display = 'block';
}

function hidden(obj) {
    obj.style.display = 'none';
}

//      封装可视化窗口大小
function client() {
    // ie9及以上版本浏览器
    if (window.innerWidth != null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    // 标准浏览器，声明了DTD的
    else if (document.compaMode == 'CSS1Compat') {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    // 少数怪异浏览器，未声明DTD的
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

//      防止冒泡
function stopPropa(event) {
    return event && event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

//      返回目标Id
function targetId(event) {
    return event.target ? event.target.id : event.srcElement.id;
}

//      返回用户选中的内容
function getSelect() {
    if (window.getSelection) {
        return window.getSelection().toString(); //  一般将获取过来的内容转化为字符串
    } else {
        return document.selection.createRange().text;
    }
}

//      匀速运动动画
function animate(obj, end, step, speed) {
    clearInterval(obj.timer);
    step = Number(step);
    end = Number(end);
    speed = Number(speed);
    step = obj.offsetLeft > end ? -step : step;
    var difV = 0;
    obj.timer = setInterval(function() {
        difV = obj.offsetLeft - end;
        if (Math.abs(difV) < Math.abs(step)) {
            clearInterval(obj.timer);
            obj.style.left = end + 'px';
            return false;
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, speed);
}

//      返回元素当前样式
function getStyle(obj, att) {
    //  ie和opera浏览器
    if (obj.currentStyle) {
        return obj.currentStyle[att];
    }
    //  w3c浏览器
    else
        return window.getComputedStyle(obj, null)[att];
}

//  封装运动框架单一属性
function aniMate(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var current = parseInt(getStyle(obj, attr)); //  将现在的样式转化为数字
        var step = (target - current) / 10; //      计算缓动步长，从开始位置到目标位置
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //  判断正负，然后取整
        obj.style[attr] = current + step + 'px';
        if (current == target) {
            clearInterval(obj.timer);
        }
    }, 20);
}

//  封装运动框架多个属性
function animateMul(obj, json, fn) {
    clearInterval(obj.timer);
    var flag = true;
    var current = 0,
        step = 0;
    obj.timer = setInterval(function() {
        for (var att in json) {
            //      添加透明度
            if (att == 'opacity') {
                current = (parseFloat(getStyle(obj, att)) * 100) || 0; //  得到当前的属性值，并且去掉单位转为Num
                step = (json[att] - current) / 10; //      得到缓动步长
                step = step > 0 ? Math.ceil(step) : Math.floor(step); //  确定步长的取整方向
                if ('opacity' in obj.style)
                    obj.style.opacity = (current + step) / 100;
                else {
                    //                        ie5/6/7/8 浏览器
                    obj.style.filter = 'alpha(opacity = ' + (current + step) * 10 + ')';
                    console.log(current);
                }
            }
            //      添加 zIndex
            else if (att == 'zIndex') {
                obj.style.zIndex = json[att];
                current = json[att];
            }
            //      添加长宽高之类
            else {
                current = parseInt(getStyle(obj, att)); //  得到当前的属性值，并且去掉单位转为Num

                step = (json[att] - current) / 10; //      得到缓动步长
                step = step > 0 ? Math.ceil(step) : Math.floor(step); //  确定步长的取整方向
                obj.style[att] = current + step + 'px';
            }
            //      判断终点
            if (current != json[att]) {
                flag = false;
                //                    console.log(current);
                //                    console.log(json[att]);
            }

        }
        if (flag) {
            clearInterval(obj.timer);
            console.log(current);
            if (fn)
                fn();
        }

    }, 15);

};

// 原形链完全继承的封装
//  subclass→子类    superclass →父类
function extend(subclass, superclass) {
    //  初始化一个中间空对象，转换子父类继承关系(不影响传递参数)
    var F = function() {};
    F.prototype = superclass.prototype;
    //  子类继承F
    subclass.prototype = new F();
    subclass.prototype.constructor = subclass;
    //  为子类增加superclass属性
    subclass.superclass = superclass.prototype;
    //  增加一个保险，父类的原型是超类（Object）那么也要把构造函数级别降下来
    if (superclass.prototype.constructor == Object.prototype.constructor) {
        superclass.prototype.constructor = superclass;
    }
}