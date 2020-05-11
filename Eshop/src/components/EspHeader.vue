<template>
	<div>
		<div class="header">
			<div class="header_up">
				<div class="headerup">
					<transition
				    	appear 				       
				        appear-active-class="animated swing">				    
					    <div class="upleft">									
							<a href="#"><img src="../../static/image/logo/logo.png"/></a>
						</div>
				    </transition>	
					<div class="upright">
						<ul>
							<li id="car">
								<div class="goufen">
									<i class="iconfont icongouwuche"></i>
								</div>
								<div class="gouwudan">
									<div class="gouwudan_up">
										<p>购物清单如下</p>   
									</div>
									<div class="gouwudan_center">
										<div class="down_uqd">
											<p>商品名称</p>
											<p>数量</p>
											<p>金额</p>
										</div>
										<p v-if="!Totalprice">你的购物车是空的哦！</p>									
										<div class="down_qd" v-for="item in goodcartList" :key="item._Id">
											
											<li class="qd_name">
												{{item.productName}}
											</li>
											<li class="qd_number">
												x{{item.buynum}}
											</li>
											<li class="qd_heji">
												${{item.salePrice}}
											</li>
										</div>											
									</div>
									<div class="gouwudan_down">
										 <el-button style="background: #000; float: left; margin: 10px 5px;" type="danger" round @click="gotoorder()">结算</el-button>
										 <el-button style="background: #fff; color: #000; float: right; margin: 10px 5px;" type="danger" round>${{Totalprice}}</el-button>
									</div>
								</div>
							</li>
							
							<li>
								<div class="goufen">
									<i class="iconfont iconfenxiang"></i>
								</div>
								<div class="fenxiang">
									<ul>
										<li>
											<a href="#"><i class="iconfont iconweixin"></i></a>
										</li>
										<li>
											<a href="#"><i class="iconfont iconicon"></i></a>
										</li>
										<li>
											<a href="#"><i class="iconfont iconweibo"></i></a>
										</li>
										<li>
											<a href="#"><i class="iconfont iconyoujian"></i></a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>				
			</div>
			<div class="header_down">
				<div class="headerdown">
					<div class="down_l">
							<div class='popContainer' v-show="showtou">
								<div class="container">	
									<el-form label-width="80px" laber-color="#fff">
									    <span style="color: #606266; margin-right: 200px;">头像更换  :</span>
									    <el-upload
											  class="avatar-uploader"
											  action="https://jsonplaceholder.typicode.com/posts/"  
											  :show-file-list="false"
											  :on-change="getFile"
											  :before-upload="beforeAvatarUpload">
											  <img v-if="userTou" :src="userTou" class="avatar">
											  <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									    <el-form-item>
										    <el-button type="danger" :plain="true"  @click="editTou()">立即修改</el-button>
										    <el-button type="danger" plain @click="Tou('close')">取消</el-button>
										</el-form-item>
								    </el-form>
								</div>
							</div>
							<div class="user_img" @click="Tou('open')"><img :src="userTou"/></div>
							<a class="dz" v-text="userName" v-if="userName"></a>
							<router-link to="login" class="dz"  v-if="!userName">登录</router-link>
							<router-link to="register" class="dz" v-if="!userName">免费注册</router-link>
							<a href="javascript:void(0)" class="dz" @click="logOut" v-else>退出</a>	
					</div>
					<div class="down_c">
						<div class="soushuo">
							<el-input
							  placeholder="请输入内容"
							  v-model="soushuo"
							  size="small"
							  class="soukuang"
							  @input="searchgood()"
							  clearable>
							</el-input>
							<a href="#">
								<i @click="searchgood()" class="iconfont iconsearch"></i>
							</a>
						</div>
						<div class="searchkuang">
							<li v-for="item in searchList.slice(0,6)" :key="item.productId">
								<div><i class="iconfont iconsearch"></i></div>
								<p @click="seegood(item.productId)">{{item.productName}}</p>
							</li>
						</div>
						<div class="remai">
							<ul id="gunremai">
								<li v-for="item in goodsList.slice(0,10)" :key="item.productId">
									<a href="#" @click="seegood(item.productId)">
										<img :src="item.productSrc"/>
									</a>
								</li>	
							</ul>
						</div>
					</div>
					<div class="down_r">
						<ul>
							<li @click="home">首页</li>
							<li @click="mycart">购物车</li>
							<li @click="productlist">分类
								<div class="fenlei">
									<div class="fl_up" @mouseleave="mouseleave">									
										<li
											v-for="(item,index) in fenleiList"
									      	:key="index"
									      	@mouseenter="enter"
									      	>
									      	<i :class="item.type"/>{{item.name }}
									   </li>																		
									</div>
									<div
										class="fl_down"
										v-if="fenlei"							    	
								    	@mouseenter="sover"
								        @mouseleave="sout">								
										<li	
											v-for="(item,index) in curfl_down.list"
											:key="item.type">
											<el-divider>
												<a href="#">
													<i :class="item.icon"></i>
												</a>
											</el-divider>
											<h4 :key="index">{{ item.title }}</h4>
											<a href="#">
												<div
													class="fl_xifen"
													v-for="xifen in item.list"
		    	 	 								:key="xifen">
													<i class="iconfont iconlove"></i>
													<p>{{xifen}}</p>
												</div>
											</a>
										</li>																		
									</div>								
								</div>
							</li>								
							<li @click="userhome">个人中心</li>							
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
	  return {
	  	soushuo:'',
	    userName:'',
	    userTou:'http://localhost:3000/images/user.jpg',
	    fenlei:'',
	    nav:'0',
	    list:[],
	    searchList:[],
	    showtou:false,
	    fenleiList:[{	        
	        name:'手机电脑',
	        type:'sd',
	        list:[{	
	        	title:'手机/电脑',	
	        	icon:'iconfont iconshouji',
		        list:['小米9','华为P30','苹果11','华为MateBook','苹果MateBook pro','OPPO手机','华硕笔记本','Vivo手机']
	      }]
	    },{	        
	        name:'精品服饰',
	        type:'fs',
	        list:[{
		        title:'精品男装女装',
		        icon:'iconfont iconyifu',
		        list:['优衣库','牛仔裤','休闲裤','短裙','衬衫','卫衣','t恤','运动服饰']
	      }]
	    },{	        
	        name:'家电广场',
	        type:'jd',
	        list:[{
		        title:'好家居好家电',
		        icon:'iconfont iconxingzhuang',
		        list:['大小家电','冰箱','节能台灯','洗衣机','电视','空调']
	      }]
	    },{       
	        name:'鞋子专卖',
	        type:'xz',
	        list:[{
		        title:'你的滑板鞋',
		        icon:'iconfont iconxiezi',
		        list:['男鞋','皮鞋','高跟鞋','运动鞋','拖鞋','靴子','帆布鞋']
	      }]
	    },{	        
	        name:'美妆个护',
	        type:'mh',
	        list:[{
		        title:'好护肤好皮肤',
		        icon:'iconfont iconmeizhuang',
		        list:['口红','洁面乳','BB霜','面膜','身体乳']
	      }]
	    }]
	  }
	},
	computed:{
	    curfl_down:function(){
	      	return this.fenleiList.filter(item => item.type===this.fenlei)[0]
	    },       	
        goodsList(){
        	return this.$store.state.good 
    	},
		goodcartList(){
			let cart = this.$store.state.goodcartList
			let cartlist = cart.filter((item) => {return item.check== 1;});
			return cartlist;
		},
		Totalprice(){
		 	let totalprice = 0;
		 	this.goodcartList.forEach((item)=>{
		 		if(item.check=='1'){
		 			totalprice += parseFloat(item.salePrice)*parseInt(item.buynum);
		 		}
		 	})
		 	return totalprice;
		},
  	},
  	mounted() {
		this.checkLogin();
		this.$store.commit('getgoodcartList');
		this.$store.commit('getgoodsList');
		this.remaigun();
	},
    methods:{
		remaigun() {
			let gunremai = document.getElementById('gunremai');
			let a =0;
			var wordIndex = 0
			// 定时器
			var wordTime = setInterval(function(){
				wordIndex++;
				if(a>-368){	
					a=a-92;
					gunremai.style.left=a+'px';
				}else if(a=-368){
					gunremai.style.left='0px';
					a=0;
				}
			}, 1000)
			// 鼠标悬停在 hotWord上时 ， 停止定时器
			gunremai.onmouseover = function() {
				clearInterval(wordTime)
			}
			// 鼠标离开 hotWord， 定时器重新启动
			gunremai.onmouseout = function () {
				// 用定时器前一定要先清除定时器  这样子可以避免创建多个相同的定时器
				clearInterval(wordTime)
				wordTime = setInterval(function(){
					wordIndex++
					if(a>-368){	
						a=a-92;
						gunremai.style.left=a+'px';
					}else if(a=-368){
						gunremai.style.left='0px';
						a=0;
					}	
				}, 1500)
			}
		},
    	searchgood(){
			this.searchList=[];
			this.goodsList.forEach((item)=>{
				if((item.bsName.indexOf(this.soushuo) === -1 && item.productName.indexOf(this.soushuo) === -1) && item.productContent.indexOf(this.soushuo) === -1){
					console.log('没有相关内容');
				}else{
					this.searchList.push(item);
					console.log(this.searchList);
				};
			})	
    		// axios.get("goods/searchgood",{
			// 	params:{
      		// 		soushuo:this.soushuo
      		// 	}
			// }).then((response)=>{
      		// 	let res = response.data;
      		// 	if(res.status=="0"){
      		// 		this.searchList = res.result;
      		// 		if(this.searchList==''){
      		// 			this.$message.error('无搜到相关商品，请切换');
      		// 		}
      		// 	}else{
      		// 		this.searchList = {};
      		// 	}
      		// })
    	},
    	gotoorder(){
    		if(this.$store.state.token){
	    			this.$router.push({
		  			path:"/myaddress"	  			
			  })
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}	
		},
    	seegood(productId) {
	  		this.$router.push({
				path:"/prdetails?productId="+productId
			});
	  	},
    	editTou(){
  			let userTou = this.userTou;
    		axios.post("/users/editTou",{
      			userTou:userTou,
    		}).then((response)=>{
				let res = response.data;
				if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，成功修改',
			          type: 'success'
			        });
			        this.checkTou();
			        this.$router.push({
			  			path:"/userhome/personal"	  			
			  		});
			        this.showtou = false;
                }else{
                	this.$message.error('修改失败，重新修改');
                }
	    	})	  				
    	},
    	Tou(ad){
    		if(this.$store.state.token){
				if(ad=='open'){
					this.showtou = true;
				}else if(ad=='close'){
					this.showtou = false;
				}
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
			
		},
    	checkLogin(){
            axios.get("/users/checkLogin").then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                   this.userName = res.result;
                   this.checkTou();
                }
            });
        },
        checkTou(){
            axios.get("/users/checkTou").then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                   this.list = res.result;
                   this.userTou = this.list.userTou;
                   this.userName = this.list.userName;
                }   
            });
        },
        logOut() {
            axios.post("/users/logout").then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                      this.userName = '';
                      this.$store.commit('set_token','');
                      this.userTou = 'http://localhost:3000/images/user.jpg';
                      this.$store.state.userId = '';
                      this.$router.push({
			  			path:"/"		
			  		})
                }
            })
        },
        productlist() {
	  		this.$router.push({
	  			path:"/productlist"	  			
	  		})
	  	},
	  	home() {
	  		this.$router.push({
	  			path:"/"	  			
	  		})
	  	},
	  	mycart(){
	  		if(this.$store.state.token){
	    		this.$router.push({
	  				path:"/mycart"	  			
		  		})
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
  				
	  	},
	  	userhome() {
	  		if(this.$store.state.token){
	    		this.$router.push({
	  				path:"/userhome"	  			 			
	  			})
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
  			
	  	},
    	mouseleave:function(){
            let self=this;
       		self._timer=setTimeout(function(){
        		self.fenlei=''
      		},10)
    	},
    	enter:function(e){
      		this.fenlei=e.target.querySelector('i').className
    	},
    	sover:function(){
      		clearTimeout(this._timer)
		},
    	sout:function(){
      		this.fenlei=''
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
	@mixin border-radius($radius) {
	          border-radius: $radius;
	      -ms-border-radius: $radius;
	     -moz-border-radius: $radius;
	  -webkit-border-radius: $radius;
	}
	@mixin before {
		content: "";
        position: absolute;
        top: -12px;
        right: 4%;
        margin-left: -5px;
        border-top: 5px solid #FA6F57;
        border-right: 8px solid #FA6F57;
        border-left: 8px solid #FA6F57;
        border-bottom: 8px solid #fff;  
	}
	.header{		    
    		width: 100%;
    		margin: 0 auto;		  		
    		.header_up{
    			width: 100%;	    
			    margin: 0 auto;
			    background: #FA6F57;
			    .headerup{
			    	width: 1320px;
			    	margin: 0 auto;
			    	height: 50px;
			    	background: #FA6F57;
			    	.upleft{
			    		position: relative;
			    		width: 32%;
			    		float: left;
			    		height: 50px;
			    		text-align: center;
			    		line-height: 50px;
		    			img{
		    				margin-top: 3px;
		    				width: 130px;
		    				height: 70%;
		    				@include border-radius(25px);
		    				border: 4px solid #fff;		    				
		    			}	
			    	}
			    	.upright{
			    		position: relative;			    		
			    		float: right;
			    		width: 68%;
			    		height: 50px;
			    		line-height: 50px;
			    		text-align: right;
			    		@mixin header_xiala{
			    			position: absolute;
		    				visibility: hidden;
		    				text-align: center;
							width: 250px;
							line-height: 60px;
							background: #FA6F57;
							margin-top: 6px;
							border: 1px solid #fff;
							right: 0px;	
			    		}
			    		li{
			    			display: inline-block;
			    			position: relative;
			    			margin-right: 20px;
			    			height: 40px;
			    			line-height: 40px;
			    			width: 40px;
			    			background: #fff;
			    			border-radius: 50%;
			    			border: 2px solid #fff;
			    			.goufen{				
			    				position: relative;
			    				border-radius: 50%;
			    				margin: 0 auto;
			    				text-align: center;
			    				transition: all 0.6s linear;
			    				i{
				    				color: #FF224E;
				    				font-size: 20px;	
			    				}
			    			}
			    			&:hover{
			    				.goufen{
			    					background: #FA6F57;
			    					cursor: pointer;			
			    				}
			    				i{
			    					color: #fff;
			    				}
			    				.gouwudan{
			    					visibility: visible; 		      
		    					    box-shadow: 0px 0px 15px #cdcdcd;   								
			    					&:before{
			    						@include before;      
					                }      
			    				}
			    				.fenxiang{
			    					visibility: visible; 		    				   
		    					    box-shadow: 0px 0px 15px #cdcdcd;   								
			    					&:before{
			    						@include before;      
					                }       
			    				}
			    			}
			    			.gouwudan{
			    				@include header_xiala;
			    				width: 300px;
			    				font-family: "仿宋";
			    				font-weight: 600;
			    				z-index:5;
			    				transition: all 0.6s ease-in-out;
			    				.gouwudan_up{
			    					height: 50px;
			    					border-bottom: 2px solid #fff;
			    					color: #fff;
			    					font-size: 22px;
			    					background: #FA6F57;			    					
			    				}
			    				.gouwudan_down{
			    					height: 70px;
			    					background: #FA6F57;
			    				}
			    				.gouwudan_center{
			    					border-bottom: 1px solid #fff;
			    					.down_uqd{
			    						background: #FA6F57;
			    						height: 50px;
			    						border-bottom: 1px solid #fff;
			    						p{
			    							display: inline-block;			    							
			    							width: 80px;
			    							color: #fff;
			    						}
			    					}	
			    					.down_qd{
			    						background: #FA6F57;
			    						height: 45px;				    						
		    							li{
				    						width: 80px;				    						
				    						margin: 0 9px;
				    						border: none;	    									
	    									border-radius: 0;	
	    									float: left;	
	    									background: #FA6F57;		
			    						}
			    						.qd_name{
											text-overflow: ellipsis;
											white-space: nowrap;
											overflow: hidden;
										    max-width: 100px;
    									}
			    					}
			    				}		
			    			}
			    			.fenxiang{
			    				@include header_xiala;
			    				z-index:5;
			    				background: #FA6F57;	
			    				height: 60px;
			    				transition: all 0.6s ease-in-out;					
								li{
									width: 30px;
									height: 30px;
									line-height: 30px;
									background: #FA6F57;
									border: 2px solid #fff;
									text-align: center;
									display: inline-block;
   									margin: 0 6px;
   									padding: 0;								
									i{
										color: #fff;
									}
									&:hover{										
										border: none;
										background: #000;
										transition: background-color 0.6s linear;
									}
								}	
			    			}
			    		}
			    		li:nth-child(2) {
			    				margin-right: 60px;
			    			}
			    	}
			    }    
    		}
    		.header_down{    			
    			width: 100%;
    			margin: 0 auto;
    			background: #EEEEEE;   			
    			.headerdown{
    				width: 1320px;
    				height: 99px;
    				margin: 0 auto;
    				text-align: center;
    				background: #EEEEEE;    				
    				.down_l{
    					position: relative;
	    				width: 30%;
	    				float: left;
	    				height: 99px;
	    				.popContainer{
	    					z-index: 100;
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
						    	.avatar-uploader .el-upload {
								    border: 1px dashed #d9d9d9;
								    border-radius: 6px;
								    cursor: pointer;
								    position: relative;
								    overflow: hidden;
								    top: -20px;
								    margin-left: 20px;
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
							}
						}	    				
		    			.dz{
		    				padding: 5px 10px;
		    				color: #fff;
		    				float: left;
		    				font-size: 12px;
		    				margin: 30px 10px;
		    				height: 30px;
		    				line-height: 30px;
		    				background: #FA6F57;
		    				border-radius: 5px;
		    				transition: all 0.5s linear;
		    				&:hover{
		    					color: #FA6F57;
		    					background: #fff;
		    					border: 1px solid #FA6F57; 
		    				}
		    			}			
	    				.user_img{
							width: 50px;
							height: 50px;
							float: left;
							margin: 20px 50px;
							&:hover{
								cursor: pointer;								
							}		
							img{
								width: 100%;
								height: 100%;
								border-radius: 50%;
								border: 2px solid #FA6F57;	
							}
						}			
	    			}
	    			.down_c{
	    				position: relative;
	    				width: 35%;
	    				float: left;
	    				height: 99px;	    					
	    				.soushuo{
	    					position: relative;
	    					margin: 10px 50px 0 50px;
	    					width: 350px;
	    					.soukuang{
	    						display: inline-block;
	    						width: 250px;	
	    					}
	    					a{
	    						position: relative;
	    						display: inline-block;
	    						background: #FA6F57;
	    						color: #fff;
	    						width: 50px;
	    						height: 32px;
	    						border-radius: 0 5px 5px 0;
	    						line-height: 26px;
	    						right: 10px;
	    						i{
	    							font-size: 20px;
	    							font-weight: 700;
	    							position: relative;
	    							top: 4px;	    							
	    						}	    						
	    					}
	    				}
	    				.remai{
							position: absolute;
	    					margin: 7px 0;
							height: 40px;
							width: 460px;
							overflow: hidden;
							border-top: 1px solid #FA6F57;
							border-bottom: 1px solid #FA6F57;
							ul{
								position: relative;
								width: 920px;
								height: 40px;
								li{
									width: 60px;
									height: 30px;
									margin: 5px 15px;
									border: 1px solid #FA6F57;
									float: left;
									img{
										width: 100%;
										height: 100%;
									}
								}
							}	    					
	    					
	    				}
	    				.searchkuang{
	    					position: absolute;
	    					padding: 0 10px;
	    					margin-left: 72px;
	    					z-index: 100;
	    					width: 227px;
	    					background: #FA6F57;
	    					li{
	    						height: 25px;
	    						line-height: 25px;
	    						text-align: center;
	    						padding: 5px 0;
	    						p{		
	    							z-index: 100;
	    							border-bottom: 1px solid #000000;
	    							display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 1;
									overflow: hidden;			    					    
								    max-width: 350px;
								    &:hover{
								    	color: #fff;
								    	cursor: pointer;
								    }
	    						}
	    						i{
									float: left;
									width: 25px;
									height: 25px;
									border: 1px solid #fff;
									background: #000000;
									color: #fff;
									border-radius: 50%;
	    						}
	    					}
	    				}
	    			}
	    			.down_r{
	    				position: relative;
	    				width: 35%;
	    				float: left;
	    				height: 99px;
	    				.fenlei{
	    					visibility: hidden;
	    					position: absolute;
	    					background: #FA6F57;   						    					
	    					width: 450px;
	    					right: 0px;
	    					z-index: 20;	    					
	    					.fl_up{
	    						height: 100px;
	    						background: #FA6F57;
    							li{	    								
    								width: 70px;
    								height: 70px;	    								
    								padding: 0;
    								margin: 10px 8px;
    								border: 1px solid #fff;
    								border-radius: 50%;
    								font-size: 12px;
    								color: #000;	
    								line-height: 70px;
    								&:hover{
    									background: #000000;
    									border: none;
    									color: #fff;	    									
    								}
    							}
	    					}
	    					.fl_down{		    						 						
	    						li{
	    							position: absolute;
	    							width: 100%;	    							
	    							height: 210px;	    								    							
	    							padding: 0;
	    							margin: 0;	
	    							.fl_xifen{
	    								display: inline-block;
	    								height: 16px;
	    								line-height: 16px;
	    								margin: 5px 10px;	  								
	    								p{
	    									display: inline-block;
	    									font-size: 12px;
	    									width: 90px;
	    									color: #fff;
	    									background: #000000;
	    									margin-left: 5px;
	    									border-radius: 8px;
	    									border: 1px solid #fff;
    									    white-space: nowrap;
    									    max-width: 90px;
										    overflow: hidden;
										    text-overflow: ellipsis;
	    									&:hover{
	    										background: #fff;
	    										color: #FA6F57;
	    									}
	    								}
	    								i{
	    									font-size: 10px;
	    									margin-left: 5px;
	    									color: #000;
	    								}	
	    							}	    							
	    							.el-divider--horizontal{
	    								margin: 10px 0;
	    								color: #FA6F57;
	    								.el-divider__text{	
	    									background: #eee;
	    									height: 30px;
	    									width: 30px;
	    									line-height: 32px;
	    									border-radius: 50%;
	    									padding: 0;
	    									i{
	    										color: #FA6F57;
	    										font-size: 20px;				
	    									} 										
	    								}
	    							}		
	    						}
	    					}
	    				}	    				
	    				li:first-child{
							background: #FA6F57;
							color: #fff;
							height: 40px;
							width: 80px;
						}
	    				li{
	    					position: relative;
	    					float: right;
	    					height: 0px;
	    					line-height: 40px;
	    					width: 70px;
	    					color: #FA6F57;
	    					font-weight: 700;
	    					margin: 30px 10px;
	    					//transition: all 0.2s linear;
	    					&:hover{
	    						color: #fff;
	    						height: 40px;
	    						width: 80px;
	    						background: #FA6F57;	    						
	    						cursor: pointer;
	    						.fenlei{
	    							visibility: visible;
	    						}	    						 
	    					}		
	    				}	
    				}		
    			}	
    		}
		}
</style>