import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper/dist/js/swiper';
import "../css/index.less";
import "../css/common.less";
import 'animate.css'

var myAuto;
var swiper; //全局
function indexSwiper() {
    var activeIndex = '';

    swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        on: {
            slideChangeTransitionEnd: function () {
                if (this.realIndex == 0) {
                    firstAni()
                    secondAniPase()
                } else if (this.realIndex == 1) {
                    firstAniPase()
                    secondAni()
                    thirdAniPase()
                } else if (this.realIndex == 2) {
                    secondAniPase()
                    thirdAni()
                    fourthAniPase()
                }else if (this.realIndex == 3) {
                    thirdAniPase()
                    fourthAni()
                    // funAniPase()
                } 
                // else if (this.realIndex == 4) {
                //     thirdAniPase()
                //     fourthAni()
                //     // fifthAniPase()
                // } 
                // // else if (this.realIndex == 5) {
                //     fourthAniPase()
                //     fifthAni()
                // }
            }
        },
    })
}


//音乐暂停
function musicPause() {
    let flag = true
    $('.musicBtn').click(function () {
        if (flag) {
            $('.musicImg').addClass("musicPaused")
            $('.ban').removeClass("hidden")
            myAuto.pause()
        } else {
            $('.musicImg').removeClass("musicPaused")
            $('.ban').addClass("hidden")
            myAuto.play()
        }
        flag = !flag
    });
}

//滑动到第一屏出现的动画
function firstAni() {
    $('.logoindex').removeClass('hidden')
    $('.bigtext').removeClass('hidden')
    $('.ani').removeClass('hidden')
}

function firstAniPase() {
    $('.logoindex').addClass('hidden')
    $('.bigtext').addClass('hidden')
    $('.ani').addClass('hidden')
}

//滑动到第二屏出现的动画 animate__infinite
function secondAni() {
    $('.introducePage>.logo100').removeClass('hidden')
    $('.introducePage>.introduce').removeClass('hidden')
    $('.introducePage .ani2').removeClass('hidden')
}

function secondAniPase() {
    $('.introducePage>.logo100').addClass('hidden')
    $('.introducePage>.introduce').addClass('hidden')
    $('.introducePage .ani2').addClass('hidden')
}

//滑动到第三屏出现的动画
function thirdAni() {
    $('.customPage .logo100').removeClass('hidden')
    $('.customPage .introduce').removeClass('hidden')
    $('.customPage .ani3').removeClass('hidden')
}

function thirdAniPase() {
    $('.customPage .logo100').addClass('hidden')
    $('.customPage .introduce').addClass('hidden')
    $('.customPage .ani3').addClass('hidden')
}

//滑动到第四屏出现的动画
function fourthAni() {
    $('.startPage .logo100').removeClass('hidden')
    $('.startPage .start').removeClass('hidden')
    $('.startPage .ani4').removeClass('hidden')
   
}

function fourthAniPase() {
    $('.startPage .logo100').addClass('hidden')
    $('.startPage .start').addClass('hidden')
    $('.startPage .ani4').addClass('hidden')
}

//灯谜开始按钮
function start() {
    $('.startPage>.start').click(function (e) {
        e.preventDefault();
        // alert("活动已结束。根据评比规则，我们将电话通知获奖用户领奖事宜。感谢您的参与，祝您牛年大吉，万事如意。")
        $('.startPage').addClass('hidden')
        $('.indexPageMain').removeClass('hidden')
    });
}

//音乐播放
function music() {
    myAuto = document.getElementById('audio');
    myAuto.play();
    //微信音乐播放
    document.addEventListener('WeixinJSBridgeReady', function () {
        myAuto.play();
    }, false);
}

//分享代码
function shareTo() {
    // 微信分享函数
    $.ajax({
        url: 'https://h5.yllh.online:5000/wxsign', //服务器地址
        timeout: 10000, // 超时时间 10 秒
        type: 'get',
        data: {
            url: location.href.split('#')[0]
        },
        async: false,
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                var signature = JSON.parse(data.data);
                console.log(signature);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: signature.appid, // 必填，公众号的唯一标识
                    timestamp: signature.timestamp, // 必填，生成签名的时间戳<?= $data['timestamp']?>
                    nonceStr: signature.nonceStr, // 必填，生成签名的随机串<?= $data['noncestr']?>
                    signature: signature.signature, // 必填，签名<?= $data['signature']?>
                    jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                    ]
                });
            }
        },
        error: function (data) {}
    });

    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: '建党百年红色知识竞赛', // 分享标题
            desc: '铭记历史，不忘初心，牢记使命。', // 分享描述
            link: location.href.split('#')[0], //正式环境地址
            imgUrl: "https://h5.yllh.online/PROD-RedKnowlege/red.jpg", //小图标地址
            fail: function (res) {
                alert(JSON.stringify(res));
            },
            success: function (res) {}
        });
        wx.onMenuShareTimeline({
            title: '建党百年红色知识竞赛', // 分享标题
            desc: '铭记历史，不忘初心，牢记使命。', // 分享描述
            link: location.href.split('#')[0], //正式环境地址
            imgUrl: "https://h5.yllh.online/PROD-RedKnowlege/red.jpg", //小图标地址
            fail: function (res) {
                alert(JSON.stringify(res));
            },
            success: function (res) {}
        });
    });

    wx.error(function (res) {
        console.log('err', res)
    });
}

//问题渲染
var score = 0;
var phoneNum = 0;
let question = []
let questionIndex = 0

function questionFn() {
    let answerTitle = ["第一题", "第二题", "第三题", "第四题", "第五题", "第六题", "第七题", "第八题", "第九题", "第十题"]

    function init() {
        $(".next").addClass("hidden");
        $(".report").addClass("hidden");
        $(".next").unbind("click")
        //提示框消失
        $(".toastBad").addClass("hidden");
        $(".toastIncorrect").addClass("hidden");
        //选择图片归位
        $(".select>div").find("img").attr("src", require("../img/answer/no-select.png"))
        $.ajax({
            type: "get",
            url: "https://h5.yllh.online:5000/riddle/ten",
            success: function (response) {
                question = response.data;
                loadQuestion()
            }
        });
    }

    function loadQuestion() {
        $(".answer-title").text(answerTitle[questionIndex]);
        $(".select > div").eq(0).find("span")[1].innerText = question[questionIndex].answera;
        $(".select > div").eq(1).find("span")[1].innerText = question[questionIndex].answerb;
        $(".select > div").eq(2).find("span")[1].innerText = question[questionIndex].answerc;
        $(".select > div").eq(3).find("span")[1].innerText = question[questionIndex].answerd;
        // $(".question").text("“" + question[questionIndex].question + "”(" + question[questionIndex].requirement + ")");
        $(".question").text(question[questionIndex].question);
        selectAnswer()
    }

    function selectAnswer() {
        $(".select>div").click(function (e) {
            e.preventDefault();
            $(this).find("img").attr("src", require("../img/answer/select.png"));
            if ($(this).attr("data") == question[questionIndex].correct) {
                $(".toastIncorrect").removeClass("hidden");
                $(".toastBad").addClass("hidden");
                score++
            } else {
                $(".incorrect").text(question[questionIndex].correct);
                $(".toastBad").removeClass("hidden");
                $(".toastIncorrect").addClass("hidden");
            }
            $(".next").removeClass("hidden");
            $(".select>div").unbind("click");
            $(".next").click(function (e) {
                e.preventDefault();
                questionIndex++
                $(".next").addClass("hidden");
                loadQuestion()
                $(".next").unbind("click")
                //提示框消失
                $(".toastBad").addClass("hidden");
                $(".toastIncorrect").addClass("hidden");
                //选择图片归位
                $(".select>div").find("img").attr("src", require("../img/answer/no-select.png"))
            });
            //最后一道题
            if (questionIndex == 9) {
                $(".report").removeClass("hidden");
                $(".next").addClass("hidden");
                $(".report").click(function () {
                    //这里需要弹窗让用户输入手机号
                    if (phoneNum == 0) {
                        $(".cover").removeClass("hidden");

                        function isPoneAvailable(phone) {
                            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                            if (!myreg.test(phone)) {
                                return false;
                            } else {
                                return true;
                            }
                        }

                        $("#inputPhone").bind("input", function () {
                            if (isNaN($(this).val())) {
                                $(this).val(($(this).val()).substring(0, ($(this).val()).length - 1))
                            }
                            if ($(this).val().length >= 11) {
                                if (!isPoneAvailable($(this).val())) {
                                    $(this).val("")
                                    return alert("手机号输入有误，请重新输入！")
                                }
                                phoneNum = $(this).val()
                                getData()
                            }
                        })
                    } else {
                        getData()
                    }
                    $(".report").unbind("click")
                    
                    //展示用户排名用的
                    function getData() {
                        $(".cover").addClass("hidden");
                        $(".reportPage").removeClass("hidden");
                        // $(".answerPage").addClass("hidden");
                        $(".indexPageMain").addClass("hidden");

                        $.ajax({
                            type: "put",
                            contentType: "application/json;charset=UTF-8",
                            url: "https://h5.yllh.online:5000/riddle/rank/info",
                            data: JSON.stringify({
                                "mobile": phoneNum,
                                "score": score
                            }),
                            dataType: "json",
                            success: function (res) {
                                //get排名信息
                                $.ajax({
                                    type: "get",
                                    url: "https://h5.yllh.online:5000/riddle/mo?mobile=" + phoneNum,
                                    success: function (mobileRes) {
                                        //顶部信息
                                        $("#score").text(score)
                                        $("#resScore").text(mobileRes.data.score);
                                        $("#rownum").text(mobileRes.data.rownum);
                                    }
                                });
                                $.ajax({
                                    type: "get",
                                    url: "https://h5.yllh.online:5000/riddle/rank/all?page=1&size=7",
                                    success: function (rankRes) {
                                        console.log(rankRes);
                                        let html = ""
                                        for (let i = 0; i < rankRes.data.length; i++) {
                                            const el = rankRes.data[i];
                                            html += "<div><span>" + (i + 1) + "</span><span>" + "****" + (el.mobile).substring(7, 11) + "</span><span>" + el.score + "</span></div>"
                                        }
                                        $(".textbox").html("")
                                        $(".textbox").append(html)
                                    }
                                });
                            }
                        });
                    }
                })
                return;
            }
        });
    }

    init()
}

//再来一轮
function again() {
    $('.again').click(function (e) {
        e.preventDefault();
        score = 0
        question = []
        questionIndex = 0
        questionFn()
        $(".reportPage").addClass("hidden");
        $(".indexPageMain").removeClass("hidden");
    });
}

//兑奖信息
function store() {
    var flag = true

    $('.close').click(function () {
        $('.img-share').addClass('hidden')
        $('.cover').addClass('hidden')
        flag = true
    })
    //分享按钮
    $('.something').click(function () { 
        //取消按钮
        console.log("点击了");
        $('.loading').removeClass('hidden')
        if (flag) {
            $('.loading').addClass('hidden')
            $('.img-share').removeClass('hidden')
            $('.cover').removeClass('hidden')
        }
    })
}

//统计访问量
function count() {
    console.log("tongji");
    $.ajax({
        type: "get",
        url: "https://h5.yllh.online:5000/countup?id=5",
        dataType: "dataType",
        success: function (response) {

        }
    });
}


$(document).ready(function () {
    music();
    let imageCount = 0;
    indexSwiper();
    musicPause();
    start()
    questionFn()
    count()
    shareTo()
    again()
    store()
})