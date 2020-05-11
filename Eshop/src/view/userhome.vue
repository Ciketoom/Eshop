<template>
	<div>
		<esp-header></esp-header>
		<div class="uh_main">
		    <div class="uh_mainl">
		    	<li @click="shailan('one')" id="one"><router-link to="/userhome/personal">个人信息</router-link></li>
			    <li @click="shailan('two')" id="two"><router-link to="/userhome/collect">收藏管理</router-link></li>
			    <li @click="shailan('three')" id="three"><router-link to="/userhome/order">订单管理</router-link></li>
			    <li @click="shailan('four')" id="four"><router-link to="/userhome/address">地址管理</router-link></li>
		    </div>
		    <div class="uh_mainr">	    	
		    	<router-view></router-view>
		    </div>
		 </div>
		<esp-footer></esp-footer>
	</div>
</template>

<script>
import EspHeader from '@/components/EspHeader.vue'
import EspFooter from '@/components/EspFooter.vue'
import axios from 'axios'
export default {
	data(){
		return{
			
		}	
	},
	methods:{
		shailan(qie){
			let bg1 = document.getElementById("one");
			let bg2 = document.getElementById("two");
			let bg3 = document.getElementById("three");
			let bg4 = document.getElementById("four");
			if(qie=='one'){		
				bg1.style.background = '#B3D4FC';
				bg2.style.background = '#EEEEEE';
				bg3.style.background = '#EEEEEE';
				bg4.style.background = '#EEEEEE';
			}else if(qie=='two'){
				bg1.style.background = '#EEEEEE';
				bg2.style.background = '#B3D4FC';
				bg3.style.background = '#EEEEEE';
				bg4.style.background = '#EEEEEE';
			}else if(qie=='three'){
				bg1.style.background = '#EEEEEE';
				bg2.style.background = '#EEEEEE';
				bg3.style.background = '#B3D4FC';
				bg4.style.background = '#EEEEEE';
			}else if(qie=='four'){
				bg1.style.background = '#EEEEEE';
				bg2.style.background = '#EEEEEE';
				bg3.style.background = '#EEEEEE';
				bg4.style.background = '#B3D4FC';
			}
		}
	},
	mounted: function () {	  

	},
	components:{
    	EspHeader,
    	EspFooter,
    },
}
</script>

<style lang="scss">
	.uh_main{
		width: 1330px;
		margin: 50px auto;
		.uh_mainl{
			float: left;
			display: inline-block;
			width: 150px;
			background: #FA6F57;
			margin-bottom: 50px;
			height: 400px;		
			li{
				margin: 20px 10px;
				height: 30px;
				line-height: 30px;
				font-weight: 500;
				text-align: center;
				border-radius: 15px;
				border: 1px solid #000000;
				background: #EEEEEE;
				&:hover{
					background: #fff;
				}
			}
			
		}
		.uh_mainr{
			float: left;
			display: inline-block;
			margin-left: 20px;
			width: 1100px;
			background: #D9D9D9;
			margin-bottom: 50px;
		}
	}
</style>