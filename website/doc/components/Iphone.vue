<template>
    <div class="phone">
        <div class="phone_bg1">
            <div class="phone_bg2">
                <div class="phone_bg3">
                    <div class="phone_lh">
                        <div class="phone_lh_con">
                            <div class="lh_tiao"></div>
                            <div class="lh_yuan"></div>
                        </div>
                    </div>
                    <span class="date_time">{{ formatTime(time, 'HH:mm') }}</span>
                    <div class="states">
                        <ul class="ul_xinhao">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div class="wifi1">
                            <div class="wifi2">
                                <div class="wifi3">
                                    <div class="wifi4">
                                        <div class="wifi5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dianliang"></div>
                    </div>
                    <div class="phone_home"></div>
                </div>
            </div>
        </div>
        <div class="jingyin"></div>
        <div class="yl_jia"></div>
        <div class="yl_jian"></div>
        <div class="suoping"></div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue"
import { formatTime } from "../../assets/util/index";

export default defineComponent({
	setup() {
		let time = ref<number>(new Date().getTime())
		let inter;
		onMounted(() => {
			inter = setInterval(() => {
				time.value = time.value + 1000
			}, 1000)
		})
		onBeforeUnmount(() => {
			clearInterval(inter)
		})
		return {
			formatTime,
			time
		}
	}
})
</script>

<style lang="scss">
.phone:after {
	position:absolute;
	content:"";
	display:block;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.2);
	top:10px;
	left:10px;
	z-index:-1;
	border-radius:18px;
	filter:blur(8px);
}
.phone_bg1 {
	width:100%;
	height:100%;
	background:#fff;
	border-radius:30px;
	box-sizing:border-box;
	padding:0.5px;
}
.phone_bg2 {
	width:100%;
	height:100%;
	background:#0b0d0c;
	border-radius:30px;
	box-sizing:border-box;
	padding:10px;
	box-shadow:inset 14px 0px 10px -15px #fff,inset -14px 0px 10px -15px #fff;
}
.phone_bg3 {
	width:100%;
	height:100%;
	background:#fff;
	border-radius:26px;
	box-sizing:border-box;
	position:relative;
}
.phone_lh {
	width:50%;
	height:20px;
	background:#0b0d0c;
	margin:0 auto;
	border-radius:0px 0px 14px 14px;
	position:relative;
}
.phone_lh_con {
	display:flex;
	align-items:center;
	justify-content:center;
}
.phone_lh:before {
	position:absolute;
	content:"";
	width:5px;
	height:5px;
	background:#0b0d0c;
	left:-5px;
	top:0px;
	z-index:9;
}
.phone_lh:after {
	position:absolute;
	content:"";
	width:5px;
	height:5px;
	background:#0b0d0c;
	right:-5px;
	top:0px;
	z-index:9;
}
.phone_lh_con:before {
	position:absolute;
	content:"";
	width:10px;
	height:10px;
	background:#fff;
	border-radius:100%;
	left:-10px;
	top:0px;
	z-index:10;
}
.phone_lh_con:after {
	position:absolute;
	content:"";
	width:10px;
	height:10px;
	background:#fff;
	border-radius:100%;
	right:-10px;
	top:0px;
	z-index:10;
}
.lh_tiao {
	width:25%;
	height:3px;
	border-radius:5em;
	background:#2d2d2d;
	margin-left:8px;
	margin-top:4px;
}
.lh_yuan {
	width:5px;
	height:5px;
	border-radius:5em;
	background:#212554;
	margin-left:8px;
	margin-top:4px;
}
.phone_home {
	width:32%;
	height:0.5%;
	border-radius:5em;
	position:absolute;
	bottom:1%;
	left:50%;
	margin-left:-16%;
	background:#0b0d0c;
}
.phone_bg3 #text {
	font-size:18px;
	position:absolute;
	top:20%;
	left:0%;
	text-align:center;
	width:100%;
	font-weight:600;
}
.phone_bg3 .a_user {
	font-size:10px;
	font-weight:bold;
	position:absolute;
	bottom:10%;
	left:50%;
	text-align:center;
	width:64px;
	margin-left:-32px;
	background:#06F;
	color:#fff;
	border-radius:5em;
	line-height:1.5em;
	padding:3px 0px;
	cursor:pointer;
	transition:all 0.8s ease;
}
.phone_bg3 .date_time {
	width:25%;
	left:0px;
	position:absolute;
	top:6px;
	z-index:111;
	font-size:13px;
	font-weight:600;
	text-align:center;
	user-select: none;
}
.states {
	width:25%;
	right:1.5px;
	position:absolute;
	top:4px;
	z-index:111;
	display:flex;
	align-items:center;
	justify-content:center;
}
.states .ul_xinhao {
	display:flex;
	align-items:flex-end;
	list-style:none;
}
.states .ul_xinhao li {
	width:3px;
	height:3px;
	background:#0d0b0c;
	margin-left:1px;
	list-style:none;
}
.states .ul_xinhao li:nth-of-type(2) {
	height:4px;
}
.states .ul_xinhao li:nth-of-type(3) {
	height:6.5px;
}
.states .ul_xinhao li:nth-of-type(4) {
	height:8.5px;
}
.states .dianliang {
	width:18px;
	height:10px;
	border:1px solid #b6b6b6;
	box-sizing:border-box;
	border-radius:2px;
	margin-left:0.5px;
	position:relative;
}
.states .dianliang:after {
	content:"";
	position:absolute;
	width:94%;
	height:88%;
	top:6%;
	left:3%;
	box-sizing:border-box;
	background:#0d0b0c;
	border-radius:2px;
}
.states .dianliang:before {
	content:"";
	position:absolute;
	width:1px;
	height:4px;
	box-sizing:border-box;
	background:#b6b6b6;
	border-radius:2px;
	right:-2.5px;
	top:50%;
	margin-top:-2px;
}
.states .wifi1 {
	border-radius:5em;
	margin-left:0.5px;
	border:solid transparent;
	border-top-color:#0d0b0c;
	border-width:2.2px 2.2px;
	display:flex;
	align-items:center;
	justify-content:center;
	transform:translateY(4.5px);
}
.states .wifi2 {
	border-radius:5em;
	border:solid transparent;
	border-top-color:#fff;
	border-width:2.15px 2.15px;
	display:flex;
	align-items:center;
	justify-content:center;
}
.states .wifi3 {
	border-radius:5em;
	border:solid transparent;
	border-top-color:#0d0b0c;
	border-width:2.1px 2.1px;
	display:flex;
	align-items:center;
	justify-content:center;
}
.states .wifi4 {
	border-radius:5em;
	border:solid transparent;
	border-top-color:#fff;
	border-width:2.05px 2.05px;
	display:flex;
	align-items:center;
	justify-content:center;
}
.states .wifi5 {
	border-radius:5em;
	border:solid transparent;
	border-top-color:#0d0b0c;
	border-width:2px 2px;
}
.jingyin {
	width:1.5px;
	height:3.75%;
	background:#121212;
	position:absolute;
	top:13.5%;
	left:-1.5px;
	border-radius:5px 0px 0px 5px;
}
.jingyin:after {
	content:"";
	display:block;
	width:0.8px;
	height:90%;
	background:rgba(255,255,255,0.8);
	position:absolute;
	left:0px;
	bottom:5%;
}
.yl_jia {
	width:1.5px;
	height:7%;
	background:#121212;
	position:absolute;
	top:20.75%;
	left:-1.5px;
	border-radius:5px 0px 0px 5px;
}
.yl_jia:after {
	content:"";
	display:block;
	width:0.5px;
	height:90%;
	background:rgba(255,255,255,0.6);
	position:absolute;
	right:0px;
	bottom:5%;
}
.yl_jian {
	width:1.5px;
	height:7%;
	background:#121212;
	position:absolute;
	top:30%;
	left:-1.5px;
	border-radius:5px 0px 0px 5px;
}
.yl_jian:after {
	content:"";
	display:block;
	width:0.5px;
	height:90%;
	background:rgba(255,255,255,0.6);
	position:absolute;
	right:0px;
	bottom:5%;
}
.suoping {
	width:1.5px;
	height:11.5%;
	background:#121212;
	position:absolute;
	top:23%;
	right:-1.5px;
	border-radius:0px 5px 5px 0px;
}
.suoping:after {
	content:"";
	display:block;
	width:0.5px;
	height:90%;
	background:rgba(255,255,255,0.6);
	position:absolute;
	left:0px;
	bottom:5%;
}

</style>