<template>
	<div>
		  <div class="register">
		      	<div class="error_tip">
		      		<span class="error error-show" v-show="errorTip1">用户名或密码或验证码错误!</span>
		            <span class="error error-show" v-show="errorTip2">该用户已经被注册！</span>
		            <span class="error error-show" v-show="errorTip3">用户名或密码或验证码不能为空！</span>   
		      	</div>
		      	<ul>
		          <li class="register_form_input">
		            <i class="iconfont iconlunkuodasan-"></i>
		            <input
		            	type="text"
		            	tabindex="1"
		            	name="loginname" 
		            	v-model="userName"
		            	class="register_input"
		            	placeholder="用户名8字符以内" 
		            	data-type="loginname"
		            	maxlength="8">
		          </li>
		          <li class="register_form_input">
		            <i class="iconfont iconlunkuodasan-1"></i>
		            <input 
		            	:type="pwdType"
		            	tabindex="2"
		            	name="password" 
		            	v-model="userPwd"
		            	class="register_input"
		            	style="width: 150px;"
		            	placeholder="密码16字符以内"
		            	maxlength="16">
		            	<span style="float: right; border: none;" @click="changeType()"><i :class="eye"></i></span>
		          </li>
		          <li class="register_form_input" style="background: none; border: none;">
		          	<span>强度：</span>
			        <span id="ruo">弱</span>
			        <span id="zhong">中</span>
			        <span id="qiang">强</span>
		          </li>
		          <li class="register_form_input">
		            <i class="iconfont iconshouji"></i>
		            <input 
		            	type="phone"
		            	tabindex="3"
		            	name="tel" 
		            	v-model="userTel"
		            	class="register_input"
		            	placeholder="请输入有效手机号码"
		            	maxlength="11"
		            	@input="teltest">	
		          </li>
		          <div class="error_tip">
		          	<span class="error error-show" v-text="telts"></span>
		      	  </div>
		          <li class="register_form_input">
		          	<input 
		          		type="text" 
		          		placeholder="请输入验证码" 
		          		class="register_input" 
		          		style="margin-left: 20px;"
		          		@blur="checkLpicma" 
		          		v-model="picLyanzhengma">
					<input 
						type="button" 
						id="code"
						@click="createCode"
						class="yanzhengma"
						v-model="checkCode"/>
		          </li>
		          <li>
		          	<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"  
						  :show-file-list="false"
						  :on-change="getFile"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="userTou" :src="userTou" class="avatar">
						  <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="register-wrap" style="margin-top: -70px;width: 120px;">头像上传</div>
		          </li>
		        </ul>
		        <div class="register-wrap">
		           <router-link to="/" >取消</router-link>
		        </div>
		        <div class="register-wrap">
		            <a href="javascript:;" @click="register">注册</a>
		        </div> 
	      </div>
	      <vue-particles
	        color="#dedede"
	        :particleOpacity="0.7"
	        :particlesNumber="80"
	        shapeType="star"
	        :particleSize="6"
	        linesColor="#dedede"
	        :linesWidth="2"
	        :lineLinked="true"
	        :lineOpacity="0.4"
	        :linesDistance="150"
	        :moveSpeed="3"
	        :hoverEffect="true"
	        hoverMode="grab"
	        :clickEffect="true"
	        clickMode="push"
	        class="lizi"
	      >
	      </vue-particles>
    </div>
</template>

<script>
	import axios from 'axios'
	import CryptoJS from 'crypto-js'
	var code ; //在全局定义验证码
	export default {
		data() {
			return{
				userName:'',			
              	userPwd:'',
              	pwdType:'password',
              	eye:'iconfont iconbiyan',
              	userTel:'',
              	telts : '',             	
				errorTip1:false,
	            errorTip2:false,
	            errorTip3:false,
	            userTou: '',
	            picLyanzhengma:'',
                checkCode:''
			}
		},
		created(){
	        this.createCode();
	        
	    },
	    watch: {	    	
	    	//通过watch来改变背景色，显示密码强度
	        userPwd(newname, oldname){
		        this.pwstest = this.checkStrong(newname);
		        if (this.pwstest > 1 || this.pwstest == 1) {
			        document.getElementById("ruo").style.background = "red"; 
			    }else {
			        document.getElementById("ruo").style.background = "#fff";
			    }
		        if(this.pwstest > 2 || this.pwstest == 2){
			        document.getElementById("zhong").style.background = "orange";
			    }else {
			        document.getElementById("zhong").style.background = "#fff";
			    }
		        if (this.pwstest == 4){
			        document.getElementById("qiang").style.background = "green";
			    }else {
			        document.getElementById("qiang").style.background = "#fff";
			    }
		    },		    	
	    },
		methods:{
			changeType() {
		        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
		        this.eye = this.eye == 'iconfont iconbiyan' ? 'iconfont iconyanjing' : 'iconfont iconbiyan';
		    },
			teltest(){  
			    //以1开头第二位数字为3-9 的11位数字
			    if(this.userTel.length == 0){
			        this.telts = '';    
			    }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userTel))){
			        this.telts = '请输入正确的手机号';  
			    }else{
			        this.telts = '';
			    }    
			},			
			checkStrong(sValue) {
		      var modes = 0;
		      //正则表达式验证符合要求的
		      if (sValue.length < 1) return modes;
		      if (/\d/.test(sValue)) modes++; //数字
		      if (/[a-z]/.test(sValue)) modes++; //小写
		      if (/[A-Z]/.test(sValue)) modes++; //大写
		      if (/\W/.test(sValue)) modes++; //特殊字符
		
		      //逻辑处理
		      switch (modes) {
		        case 1:
		          return 1;
		          break;
		        case 2:
		          return 2;
		          break;
		        case 3:
		        case 4:
		          return sValue.length < 4 ? 3 : 4;
		          break;
		      }
		      return modes;
		    },
			// 图片验证码
			createCode(){
			     code = "";    
			     var codeLength = 4;//验证码的长度   
			     var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
			                 'S','T','U','V','W','X','Y','Z');//随机数   
			     for(var i = 0; i < codeLength; i++) {
			           //循环操作   
			           var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
			           code += random[index];//根据索引取得随机数加到code上   
			     }   
			     this.checkCode = code;//把code值赋给验证码  
			},
			
			// 失焦验证图和密码
			checkLpicma(){          
			     this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写         
			     if(this.picLyanzhengma == '') {
						//this.errorTip3=true;  
			     }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { 
			            //若输入的验证码与产生的验证码不一致时    
			            this.createCode();//刷新验证码   
			            this.picLyanzhengma = '';//
			      }else {
			            //输入正确时       
			            //this.errorTip1=true;
			            return true;
			      } 
			},
			register(){
				let pass =CryptoJS.MD5(this.userPwd).toString();
    			axios.post("/users/register",{
    				userName: this.userName,
    				userPwd: pass,
    				userTou: this.userTou,
    				userTel: this.userTel,
    				picLyanzhengma: this.picLyanzhengma
    			}).then((response)=>{
    				let res = response.data;
    				if(res.status=="0") {
    					this.errorTip1 = false;
    					this.$router.push({
				  			path:"/login"		
				  		})	
    				}else{	
    					if(res.status=='1002'){
    						this.errorTip3=true
    					}else{
    						this.errorTip2=true
    					}	
    				}
    			})
    		},
    		beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
    		getFile(file) {
		     console.log(file.raw)
		    },
		    getBase64(file) {
		      return new Promise(function(resolve, reject) {
		        let reader = new FileReader();
		        let imgResult = "";
		        reader.readAsDataURL(file);
		        reader.onload = function() {
		          imgResult = reader.result;
		        };
		        reader.onerror = function(error) {
		          reject(error);
		        };
		        reader.onloadend = function() {
		          resolve(imgResult);
		        };
		      });
		    },
			getFile(file) {
		      this.getBase64(file.raw).then(res => {
		      	this.userTou =res;	
		      });
		    },
		}
	}
</script>

<style lang="scss">
	
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    margin-left: 230px;
	    background: #fff;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 78px;
	    height: 78px;
	    line-height: 78px;
	    text-align: center;  
	  }
	  .avatar {
	    width: 78px;
	    height: 78px;
	    display: block;
	  }
	.yanzhengma{
	    background: #F9863A;
	    height: 30px;
	    border: none;
	    margin-left: 20px;
	    border-radius: 8px;
	    transform: translate(-15px,0);
	    width: 45px;
	}
	.lizi{
		background: url(../../static/image/lizi.jpg);
		background-size: 100% 100%;
		position: absolute;
        top: 0;
        left: 0;      
        width: 100%;
        height: 100%;
	}
	.register{
		position: relative;
		height: 650px;
		background: transparent;
		width: 400px;
		margin: auto;
		top: 150px;
		z-index: 10;	
	}
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
	.register_form_input .iconfont { 
	  float: left;
	  width: 30px;
	  height: 42px;
	  font-size: 20px; 
	  margin-left: 15px;
	}
	.register_form_input{
		 position: relative;
		  height: 42px;
		  width: 250px;
		  line-height: 42px;
		  background: #fff;
		  margin-bottom: 10px;
		  margin-left: 60px;
		  font-size: 14px;
		  overflow: hidden;
		  border:1px solid #ccc;
		  border-radius: 8px;
		  padding-bottom: 0;
		  i{
		  	color: #BD2C00;
		  	font-weight: 600;
		  }
		  .register_input{
			  position: absolute;
			  left:50px;
			  top:0;
			  padding: 9px 0 10px;
			  width:100%;
			  font-size: 14px;
			  zoom: 1;
			  border: none;
			  color: #333;
			  /*height: 23px;*/
			  line-height: 23px;
			  background: 0 0!important;
		}
		span{		
			float: left;
			height: 20px;
			line-height: 20px;
			width: 50px;
			text-align: center;
			border-radius: 10px;
			font-size: 12px;
			border: 1px solid #000;
			background: #fff;
			margin-top: 10px;
			margin-left: 10px;			
		}
	}
	.register-wrap{ 
	  height: 50px;
	  width: 80px;
	  background: #F9863A;
	  line-height: 50px;
	  float: left;
	  margin-left: 70px;
	  margin-top: 20px;
	  border-radius: 8px;
	  text-align: center;
	  &:hover{
	  	background: #55C2DD;
	  	cursor: pointer;
	  }
	}
</style>