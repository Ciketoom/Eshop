<template>
	<div>
		<div class="anav">	
			<span>新增地址</span>
			<i class="iconfont icontianjia" @click="addaddress('open')"></i>
		</div>
		<div class="address">
			<li 
				v-bind:class="{moren:item.isDefault == true}" 
				v-for="item in addressList"
				:key="item.addressId">
				<div class="address_u">
					<h1>{{item.userName}}</h1>
					<h1>{{item.tel}}</h1>
					<span><i class="iconfont iconshanchu" @click="removeaddress(item)"></i></span>
					<span @click="kuang=true,itemli=item">编辑</span>
					<span @click="shedefault(item)">设为默认</span>
				</div>
				<p>{{item.streetName}}</p>
				<div class='popContainer' v-show="kuang">
					<div class="container">
						<el-form label-width="80px" laber-color="#fff">
							<el-form-item label="姓名  :">
						    	<el-input v-model="itemli.userName" maxlength="4"></el-input>
						    </el-form-item>
						    <el-form-item label="手机号  :" >
						    	<el-input 
							    	v-model="itemli.tel"
							    	type="phone"
							    	maxlength="11"
			            			@input="teltest"></el-input>
						    </el-form-item>
						    <div class="error_tip">
					          	<span class="error error-show" v-text="telts"></span>
					        </div>					      	
						    <el-form-item label="详细街道 :">
						    	<el-input type="textarea" v-model="itemli.streetName"></el-input>
						    </el-form-item>
						    <el-form-item>
							    <el-button type="danger" :plain="true" @click='modifyaddress()'>立即修改</el-button>
							    <el-button type="danger" plain @click="kuang = false">取消</el-button>
							</el-form-item>
					    </el-form>
					</div>
				</div>
			</li>
		</div>
		<div class='popContainer' v-show="zeng">
			<div class="container">
				<el-form label-width="80px" laber-color="#fff">
					<el-form-item label="姓名  :">
				    	<el-input v-model="name" placeholder="请输入真实姓名" maxlength="4"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号  :" >
				    	<el-input 
				    		placeholder="请输入手机号码"
					    	v-model="phone"
					    	type="phone"
					    	maxlength="11"
	            			@input="teltest"></el-input>
				    </el-form-item>
				    <div class="error_tip">
			          	<span class="error error-show" v-text="telts"></span>
			      	</div>
			      	<el-form-item label="邮政编码  :" >
				    	<el-input 
				    		placeholder="请输入邮政编码"
					    	v-model="code"
					    	type="phone"
					    	maxlength="6"
	            			@input="codetest"></el-input>
				    </el-form-item>
				    <div class="error_tip">
			          	<span class="error error-show" v-text="codes"></span>
			      	</div>		
				    <v-distpicker 
				    	style="padding: 20px; margin-left: 60px;"
				        :province="province" 
				        :city="city" 
				        :area="area"
				        @selected="onSelected">
				    </v-distpicker>
				    <el-form-item label="详细街道 :">
				    	<el-input type="textarea" v-model="load"></el-input>
				    </el-form-item>
				    <el-form-item>
					    <el-button type="danger" :plain="true"  @click="zengaddress()">立即添加</el-button>
					    <el-button type="danger" plain @click="addaddress('close')">取消</el-button>
					</el-form-item>
			    </el-form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			kuang: false,
			zeng:false,
			name: '',
			phone: '',
			load: '',
			province:'',
			city: '',
			area: '',
			address:'',
			code:'',
			telts:'',
			codes:'',
			itemli:[],
			default: true,
			addressList:[],
		}	
	},
	mounted: function () {
    	this.deaddress();
	},
	methods:{
		//增加用户新地址
		zengaddress() {
			let userName = this.name;
			let tel = this.phone;
			let postCode = this.code;
			let streetName = this.address + this.load;
			if(this.telts || this.codes){
        		this.$message.error('输入错误！');
        		return;
        	}else{
	    		axios.post("/users/zengaddress",{
	      			userName:userName,
	      			tel:tel,
	      			postCode:postCode,
	      			streetName:streetName,
	    		}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，成功添加新地址',
				          type: 'success'
				        });
				        this.addressList = res.result;
				        this.zeng = false;
	                }else{
	                	this.$message.error('添加失败，请重新添加');
	                }
	    		})
	    	}
		},
		//修改用户地址
		modifyaddress(){
			let addressOne = this.itemli;
			axios.post("/users/modifyaddress",{
      			addressOne:addressOne
    		}).then((response)=>{
				let res = response.data;
				if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，成功修改该地址',
			          type: 'success'
			        });
			        this.deaddress();
			        this.kuang = false;
                }else{
                	this.$message.error('修改失败，请重新修改');
                }
    		})
		},
		//设置默认地址
		shedefault(item){
			let addressOne = item;
			axios.post("/users/shedefault",{
      			addressOne:addressOne
    		}).then((response)=>{
				let res = response.data;
				if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，该地址设置默认地址成功',
			          type: 'success'
			        });
			        this.addressList = res.result;
			        this.kuang = false;
                }else{
                	this.$message.error('默认地址设置失败，请重试');
                }
    		})
		},
		//删除地址
		removeaddress(item){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
        		let addressId = item.addressId;
				axios.post("/users/removeaddress",{
	      			addressId:addressId
	    		}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，删除该地址成功',
				          type: 'success'
				        });
				        this.deaddress();
	                }else{
	                	this.$message.error('删除该地址失败，请重试');
	                }
	    		})	
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		//获取用户地址列表
		deaddress(){
			axios.get("/users/deaddress").then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                	this.addressList = res.result;                	
                }else{
                	this.addressList = {};
                }
            });
		},
		//邮政编码验证
		codetest(){
			if(this.code.length == 0){
		        this.telts = '';    
		    }else if(!( /[1-9][0-9]{5}/.test(this.code))){
		        this.codes = '请输入正确的邮政编码';  
		    }else{
		        this.codes = '';
		    }  
		},
		//电话号码验证
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
		addaddress(ad){
			if(ad=='open'){
				this.zeng = true;
			}else if(ad=='close'){
				this.zeng = false;
			}
		},
		onSelected(data) {
	      this.address=data.province.value + data.city.value  + data.area.value; 
	    },
	},
	components:{
    	
    },
}
</script>

<style lang="scss">
.anav{
	width: 100%;
	height: 50px;
	background: #FA6F57;
	i{
		font-size: 25px;
		float: right;
		padding: 13px;
		color: yellow;
		&:hover{
			cursor: pointer;
			color: yellow;
		}
	}
	span{
		float: right;
		line-height: 50px;
		margin-right: 10px;
	}
}
.address{
	width: 100%;
	margin: 10px 20px;	
	.moren{
		border: 2px solid #000000;
	}
	li{
		width: 340px;
		display: inline-block;
		background: #FA6F57;
		margin: 20px 8px;
		border-radius: 10px;
		.address_u{
			padding: 10px 20px;
			h1{
				display: inline-block;					
			}
			span{
				margin-left: 5px;
				font-size: 14px;
				color: #fff;
				&:hover{
					cursor: pointer;
					color: yellow;	
				}				
			}
		}
		p{
			padding: 10px 20px;
			line-height: 20px;
			font-size: 14px;
		}
	}
}
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
</style>