/**
 * Created by Mr.Zhou on 2018/7/18.
 */

$(function(){
    $('html,body').stop().animate({scrollTop: 0},700,'swing')
});
/*1.下载清单鼠标移入时间
* 需求:鼠标移入,图标亮起,*/
$(function(){
        $('.download_list>a').click(function(){
        $(this).addClass('ss').siblings('a').removeClass('ss')
    })
});


/*2.下载清单点击换背景*/
$(function(){
    $('.download_list>a').click(function(){
        var idx=$(this).index();
        $($('.main1_bg img')[idx]).stop(true,false).slideDown (700).siblings('img').slideUp (500);
        $($('.bgwords>div')[idx]).stop(true,false).fadeIn ().siblings().fadeOut ();
    });
});

/*/!*点击小圆点*!/
$(function(){
    $('.Full_main #nav_point a').click(function(){
        var idx=$(this).index();
        $('body').height(650);
        $('.Full_main').animate({'top':-650*idx},500,'swing');

        $(this).css('opacity',1).siblings().css('opacity',.35)
    })
});*/

/*下载框点击事件*/
$(function(){
    $('.third_bgwords .green').click(function(){
        $('.third_bgwords .download_box1').show()
    });
    $('.third_bgwords .download_box1 .close').click(function(){
        $('.third_bgwords .download_box1').hide()
    })
});


$(function(){
    $('.fourth_bgwords .green').click(function(){
        $('.fourth_bgwords .download_box2').show()
    });
    $('.fourth_bgwords .download_box2 .close').click(function(){
        $('.fourth_bgwords .download_box2').hide()
    })
});


/*3.鼠标移入第三板块有缓动效果*/
$(function(){
    $('.main3').mouseenter(function(){
        $('.main3 .phone').stop(true,true).fadeIn (500).animate({'right':190},1500,'swing',
            function(){
            $('.main3 .phone').find('.img1').fadeOut(2000).siblings('.img2').fadeIn(1800)
        })
    });
    $('.main3').mouseleave(function(){
        $('.main3 .phone').stop(true,false).fadeOut (200).animate({'right':80},'swing');
        $('.main3 .phone').find('.img2').stop(true,true).fadeOut().siblings('.img1').fadeIn();
    })
});


/*4.鼠标移入第四板块有缓动效果*/
$(function(){
    $('.main4').mouseenter(function(){
        $('.main4 .phone').find('img').css('top',0);
        $('.main4 .phone').stop(true,true).fadeIn (800).stop(true,true).animate({'left':190},1500,'swing',
            function(){$('.main4 .phone').find('img').stop(true,false).animate({'top':-300},2500,'swing')});
    });

    $('.main4').mouseleave(function(){
        $('.main4 .phone').stop(true,false).fadeOut (200).animate({'left':100},'swing');
        $('.main4 .phone').find('img').stop()
    })
});

/*5.鼠标移入第五板块有缓动效果*/
$(function(){
    $('.main5').mouseenter(function(){
        $('.main5 .phone').stop(true,true).fadeIn(800).animate({'left':310},1400,'swing');
        $('.main5 .pc').stop(true,true).fadeIn(500).animate({'right':180},1700,'swing')
    });
    $('.main5').mouseleave(function(){
        $('.main5 .phone').stop(true,false).fadeOut(200).animate({'left':220},1000,'swing')
    });
    $('.main5').mouseleave(function(){
        $('.main5 .pc').stop(true,false).fadeOut(200).animate({'right':120},1000,'swing')
    })
});
/*6.板块2鼠标移入 歌手逐渐显示效果*/
$(function(){
    $('.main2').mouseenter(function(){
        $('.main2 .Eason,.main2 .Liangying').stop(true,true).fadeIn(2100).children('img').animate({'width':150,'height':150,'left':241,'top':221},1500,'swing')
    });
    $('.main2').mouseenter(function(){
        $('.main2 .JJ,.main2 .Tingfeng').stop(true,true).fadeIn(2900).children('img').animate({'width':150,'height':130,'left':241,'top':221},1800,'swing')
    });
    $('.main2').mouseenter(function(){
        $('.main2 .Jay,.main2 .Jolin').stop(true,true).fadeIn(3600).children('img').animate({'width':152,'height':150,'left':241,'top':221},2600,'swing')
    });
    $('.main2').mouseleave(function(){
        $('.main2 div').stop(true,false).fadeOut(600)
    })
});

