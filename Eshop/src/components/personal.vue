<template>
	<div>
		<div class="pnav">	
			<span>修改信息</span>
			<i class="iconfont icontianjia" @click="personal('open')"></i>
		</div>
		<div class="pxinxi">
			<div class="pxinxi_up">
				<img :src="userList.userTou"/>				
				<h1>用户头像</h1> 
			</div>
			<div class="pxinxi_down">
				<li>
					<h1>用户名</h1>
					<p>{{userList.userName}}</p>
				</li>				
				<li>
					<h1>手机号码</h1>
					<p>{{userList.userTel}}</p>
				</li>
				<li>
					<h1>用户地址</h1>
					<p>{{userList.userAddress}}</p>
				</li>
			</div>
			<div class='popContainer'v-show="editpersonal">
				<div class="container">
					<el-form label-width="80px" laber-color="#fff">
						<el-form-item label="姓名  :">
					    	<el-input v-model="userList.userName" placeholder="请输入真实姓名"></el-input>
					    </el-form-item>
					    <el-form-item label="手机号  :" >
					    	<el-input 
					    		placeholder="请输入手机号码"
						    	v-model="userList.userTel"
						    	type="phone"
						    	maxlength="11"
		            			@input="teltest"></el-input>
					    </el-form-item>
					    <div class="error_tip">
				          	<span class="error error-show" v-text="telts"></span>
				        </div>			      							  
					    <el-form-item label="详细地址 :">
					    	<el-input type="textarea" v-model="userList.userAddress"></el-input>
					    </el-form-item>
					    <el-form-item>
						    <el-button type="danger" :plain="true" plain @click="xiupersonal()">立即修改</el-button>
						    <el-button type="danger" plain @click="personal('close')">取消</el-button>
						</el-form-item>
				    </el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			editpersonal:false,
			name: '',
			phone: '',
			telts:'',
			load: '',
			userList:[],
		}	
	},
	mounted: function () {
    	this.getpersonal();
	},
	methods:{
		xiupersonal(){
			let userList = this.userList;
    		axios.post("/users/editpersonal",{
      			userList:userList,
    		}).then((response)=>{
				let res = response.data;
				if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，成功修改',
			          type: 'success'
			        });
			        this.getpersonal();
			        this.editpersonal = false;
                }else{
                	this.$message.error('修改失败，重新修改');
                }
    		})
		},		
		getpersonal(){
            axios.get("/users/getpersonal").then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                	this.userList = res.result;
                	console.log(this.userList);
                }else{
                	this.userList = {};
                }
            });
        },
		personal(ad){
			if(ad=='open'){
				this.editpersonal = true;
			}else if(ad=='close'){
				this.editpersonal = false;
			}
		},
		teltest(){  
		    //以1开头第二位数字为3-9 的11位数字
		    if(this.phone.length == 0){
		        this.telts = '';    
		    }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){
		        this.telts = '请输入正确的手机号';  
		    }else{
		        this.telts = '';
		    }    
		},		
	},
	
	components:{
    	
    },
}
</script>

<style lang="scss">
.popContainer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    .container{
    	width: 350px;
    	background: #FA6F57;
    	padding: 20px;
    	position: relative;
    	left: 750px;
    	top: 150px;
		.error_tip{
			margin-left: 45px;
		.error{
			  font-size: 12px;
			  color: red;
			  visibility: hidden;
			  display: block;
			  padding: 0 0 7px 17px;
			  line-height: 25px;
			  height: 25px;
			  text-align: left;
			  z-index: 20; 
		}
		.error-show{
				  visibility: visible;
				  height: auto;
			}
		}
	}
}
.pnav{
	width: 100%;
	height: 50px;
	background: #FA6F57;
	i{
		font-size: 25px;
		float: right;
		padding: 10px;
		color: yellow;
		&:hover{
			cursor: pointer;
		}
	}
	span{
		float: right;
		line-height: 50px;
		margin-right: 10px;
	}
}
.pxinxi{
	width: 100%;
	margin: 30px 0;
	.pxinxi_up{
		width:100px;
		margin-left: 50px;
		border:1px solid #FA6F57;	
		display: inline-block;		
		img{
			width: 100px;
			height: 100px;
		}
		h1{
			height: 30px;
			line-height: 30px;
			text-align: center;
			background: #FA6F57;
		}
	}
	.pxinxi_down{
		height: 80px;
		padding: 20px;
		display: inline-block;
		li{	
			float: left;
			background: #FA6F57;
			text-align: center;
			margin-left: 20px;
			p{
				height: 30px;
				line-height: 30px;
				padding: 10px;
				font-size: 14px;
			}
			h1{
				height: 30px;
				padding: 5px;
				line-height: 30px;
				background: #666666;
				color: #fff;
			}
		}
	}
}
</style>