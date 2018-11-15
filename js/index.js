var oTotal = document.getElementsByClassName("total_time")[0]
var oAudio = document.getElementById("audio")
var oPlay = document.getElementById("play")
var oCircle = document.getElementById("circle")
var oStart = document.getElementById("start_time")
var oRound = document.getElementById("round")
var oLoad = document.getElementById("load")
var oUl = document.getElementById("ul")
var oLi = oUl.getElementsByTagName("li")
var oTop = document.getElementById("top")
var oDown = document.getElementById("down")

var num = 0
var arr = ["video/1.mp3", "video/2.mp3", "video/3.mp3", "video/4.mp3"]
oAudio.src = arr[num]

//点击切换歌曲
 
for(var i = 0; i < oLi.length; i++) {
    oLi[i].index = i
    oLi[i].onclick = function() {
        num = this.index
        oAudio.src = arr[this.index]
        oAudio.play()

        oPlay.innerHTML = '<i class="iconfont icon-iconstop"></i>'
    }
}

//转换总时长
			oAudio.addEventListener("canplay", function() {
				oTotal.innerHTML = getMin(this.duration)
			})
 
			//点击开始播放
			oPlay.onclick = function() {
				if(oAudio.paused) {
					oAudio.play()
					oPlay.innerHTML = '<i class="iconfont icon-iconstop"></i>'
 
				} else {
					oAudio.pause()
					oPlay.innerHTML = '<i class="iconfont icon-bofang"></i>'
				}
            }
            

//监听进度变化
oAudio.ontimeupdate = function() {
    var pre = Math.floor(oAudio.currentTime / oAudio.duration * 200)
    oCircle.style.width = pre + "px"
    oStart.innerHTML = getMin(oAudio.currentTime)
    oRound.style.left = oCircle.style.width
}


//点击进度变化
oLoad.onclick = function(e) {
    var l = e.clientX - oLoad.offsetLeft
    oAudio.currentTime = (l / 200) * oAudio.duration
}

//拖拽原点
oRound.onmousedown = function(e) {
    document.onmousemove = function(e) {
        var l = e.clientX - oLoad.offsetLeft
        oAudio.currentTime = (l / 200) * oAudio.duration

    }
    document.onmouseup = function() {
        document.onmousedown = null
        document.onmousemove = null
        //					console.log("up")
    }
    return false

}

//获取分钟的函数
function getMin(time) {
    var m = Math.floor(time / 60)
    var s = Math.floor(time % 60)
    if(m <= 9) {
        m = "0" + m
    }
    if(s <= 9) {
        s = "0" + s
    }
    return m + ":" + s
}

//上一首
oTop.onclick = function() {
    num++
    if(num < 0) {
        num = arr.length - 1
    }
    oAudio.src = arr[num]
    oAudio.play()
}

//下一首
oDown.onclick = function() {
    num++
    if(num > arr.length - 1) {
        num = 0
    }
    oAudio.src = arr[num]
    oAudio.play()
}