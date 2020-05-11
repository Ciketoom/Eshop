<template>
	<div class="lb">
	  <div class="login">
      	<div class="error_tip">
      		<span class="error error-show" v-show="errorTip1">用户名或者密码错误!</span> 
      		<span class="error error-show" v-show="errorTip2">用户名或密码不能为空!</span>      
      	</div>
      	<ul>
          <li class="login_form_input">
            <i class="iconfont iconlunkuodasan-"></i>
            <input
            	type="text"
            	tabindex="1"
            	name="loginname" 
            	v-model="userName"
            	class="login_input"
            	placeholder="User Name" 
            	data-type="loginname">
          </li>
          <li class="login_form_input">
            <i class="iconfont iconlunkuodasan-1"></i>
            <input 
            	type="password"
            	tabindex="2"
            	name="password" 
            	v-model="userPwd"
            	class="login_input"
            	placeholder="Password" 
            	@keyup.enter="login"
            	>
          </li>
        </ul>
        <p>忘记密码</p>
        <div class="login-wrap">
           <router-link to="/register">免费注册</router-link>
        </div>
        <div class="login-wrap">
            <a @click="login">登录</a>
        </div>  
      </div>     
    </div>
</template>

<script>	
	import axios from 'axios'
	import CryptoJS from 'crypto-js'
	export default {
		data() {
			return{
				userName:'',
              	userPwd:'',
				errorTip1:false,
				errorTip2:false,    
			}
		},	
				
		methods:{			
			login() {	
    			if(!this.userName || !this.userPwd){
                  this.errorTip2 = true;
                  return;
				}
				let pass =CryptoJS.MD5(this.userPwd).toString();
    			axios.post("/users/login",{
    				userName:this.userName,
    				userPwd:pass,
    			}).then((response)=>{		
    				let res = response.data;
    				if(res.status=="0") {  					
    					this.$router.push({
				  			path:"/"		
				  		});
				  		let userId= res.result;
				  		this.$store.commit('set_token',userId);
    				}else{
    					this.errorTip1 = true;
    				}
    			})
    		},
			
		}
	}
</script>

<style lang="scss">
	.lb{		
		background: url(../../static/image/lizi.jpg);
		background-size: 100% 100%;
		position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;		
	}
	.login{
		position: relative;
		height: 250px;
		background: transparent;
		width: 400px;
		margin: auto;
		top: 300px;
		z-index: 10;	
		p{
			color: red;
			margin-left: 250px;
			padding: 5px;
		}
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
	.login_form_input .iconfont { 
	  float: left;
	  width: 30px;
	  height: 42px;
	  font-size: 20px; 
	  margin-left: 15px;
	}
	.login_form_input{
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

		  i{
		  	color: #BD2C00;
		  	font-weight: 600;
		  }
		  .login_input{
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
	}
	.login-wrap{ 
	  height: 50px;
	  width: 80px;
	  background: #F9863A;
	  line-height: 50px;
	  float: left;
	  margin-left: 70px;
	  border-radius: 8px;
	  text-align: center;
	  &:hover{
	  	background: #55C2DD;
	  	cursor: pointer;
	  }
	}
	
</style>