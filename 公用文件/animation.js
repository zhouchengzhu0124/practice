/*
** Create by 张晓坤 on 2018/7/2
* 动画封装
*/

/**1.匀速移动函数
 *
 * @param objc  要移动的元素
 * @param target  要移动的距离
 */
function animationMove ( objc,target ) {
    //每一次点击按钮的时候，无条件的清除当前的定时
    //如果这个元素以前有定时器，则先清除以前的定时器
    clearInterval( objc.timeID);
    //如果是全局变量timeID来记录定时器，则只能存储一个定时器，无法让多个元素同时移动
    /*解决方案：每一个元素移动时，给这个元素动态添加一个属性来记录自己的定时器，到达终点后自己移除
    这样就可以保证每一个元素的移动定时器都是独立的，互不干扰
     */
    objc.timeID  =  setInterval(function (  ) {
        //1.获取元素当前位置
        var currentLeft = objc.offsetLeft;
        //判断元素是从左往右还是从右往左
        /*这行代码意思：用一个isLeft变量来保存用户移动方向   true:从左往右  false：从右往左
        三元表达式：  如果当前位置< 目标位置  返回true
         */
        var isLeft =  currentLeft < target?true:false;
        //2.元素移动
        if(isLeft){//从左往右
            currentLeft += 20;
        }else{//从右往左
            currentLeft -= 20;
        }
        /*isLeft?currentLeft<target:currentLeft>target
        如果ifLeft为true，则返回currentLeft<target 条件表达式的结果
        如果ifLeft为false，则返回currentLeft>target条件表达式的结果
         */
        if(isLeft?currentLeft<target:currentLeft>target){//没有到达目的地，则移动
            objc.style.left = currentLeft + 'px';//offsetLeft只能读取不能设置，设置还是用点语法获取style
        }else{//到达目的低，结束定时器，位置复位
            clearInterval( objc.timeID);
            objc.style.left = target + 'px';
        }

    },10);
}


/**
 * 2.缓动动画封装
 * @param obj 要移动的元素
 * @param target  移动的目标位置
 * @param attrs 要修改的属性对象
 * @param fn 变量（一段代码，回调函数），动画完成之后自动执行这个变量里面的代码
 * 如果传了第三个参数，则执行函数里面的代码，如果没传就不执行
 */
function animationSlow ( obj, attrs,fn ) {
    //1.清除元素之前的计时器
    clearInterval ( obj.timeID )

    //2.开始动画:将定时器作为元素的属性来存储
    obj.timeID = setInterval ( function () {
        /*无论定时器怎么移动，定时器永远只有两种状态（开/关）
        开关思想
            * 1.假设定时器应该关闭   var isAllOK = true
                * 所有的属性都到达终点
           * 2.应该开启：只要有任何一个属性没有到达终点，定时器应该开启isAllOK = false
         */
        //使用开关思想来表示定时器的开启与关闭状态
        var isAllOK = true;//定时器关闭（所有的属性都到达终点了）
        for(var key in attrs){
            var attr = key;
            var target = attrs[key];
            //如果是透明度与层级，则应该有他们单独的逻辑
            if(key == 'opacity'){//透明度单独的逻辑
                //2.1 获取元素当前的属性值
                //获取的是字符串，所以要转成number
                //透明度范围是0-1，目前取整操作无法计算，解决方案放大一百倍计算，赋值的时候缩小100倍
                target *= 100;
                var currentAttr = getStyle ( obj, attr ) * 100;
                //2.2 计算本次移动的距离
                var step = ( target - currentAttr ) / 10
                //2.3 取整操作
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.4 开始移动
                currentAttr += step
                obj.style[ attr ] = currentAttr/100;
                //2.5 终点检测：到达目的清除定时器
                if ( currentAttr != target ) {
                    isAllOK = false;//还有属性没有到达终点，定时器不能关闭
                }
            }else if(key == 'zIndex'){//没有动画
                obj.style[ attr ] = target;
            }else{
                //2.1 获取元素当前的属性值
                //获取的是字符串，所以要转成number
                var currentAttr = parseInt ( getStyle ( obj, attr ) )
                //2.2 计算本次移动的距离
                var step = ( target - currentAttr ) / 10
                //2.3 取整操作
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.4 开始移动
                currentAttr += step
                obj.style[ attr ] = currentAttr + "px"
                //2.5 终点检测：到达目的清除定时器
                if ( currentAttr != target ) {
                    isAllOK = false;//还有属性没有到达终点，定时器不能关闭
                }
            }
        }
        //循环结束之后，判断开关是否关闭定时器
        if(isAllOK == true){
            clearInterval(obj.timeID);
            if(typeof  fn == 'function'){//如果用户传递了一段代码，则执行它
                fn();//执行fn变量里面存储的代码
            }
        }
    }, 50 )
}

/**
 * 获取元素样式属性值
 * @param obj  要获取的元素
 * @param attr   属性名字符串
 * @return {*}  属性值
 */
function getStyle ( obj, attr ) {
    if ( obj.currentStyle ) {//IE8浏览器
        return obj.currentStyle[ attr ]
    } else {
        return window.getComputedStyle ( obj, null )[ attr ]
    }
}