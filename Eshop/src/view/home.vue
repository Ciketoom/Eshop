<template>
	<div class="home">
		<esp-header></esp-header>
		<div class="main">
			<div class="content">
				<div class="swiper">
					<el-carousel height="400px">
				      <el-carousel-item v-for="(item, index) in newsList.slice(0,4)" :key='index'>
				        <img :src="item.newImage"/>
				      </el-carousel-item>
				   </el-carousel> 
				</div>
				<div class="tuisong">
					<div class="ts_kuang" v-for="(item, index) in newsList" :key='index'>
						<a href="#">
							<img :src="item.newImage"/>
						</a>
						<div class="ts_hover">
							<p @click="tsdetails(item.newId)">{{item.newTitle}}</p>						
						</div>
					</div>					
				</div>
				<div class="love">
					<div class="love_up">												
						<h1>大家喜欢</h1>
						<h3>网友最新喜爱商品推荐，他们都收藏购买了，你还不快把它带回家！</h3>
						<div class="lu_icon">
							<i class="iconfont iconbackward" @click="leftgun"></i>
							<i class="iconfont iconforward" @click="rightgun"></i>
						</div>
					</div>					
					<div class="love_down" ref="love_down">
						<div class="love_downs" ref="love_downs">
							<li v-for="item in loveList" :key="item.productId">
								<div class="ld_up" v-for="itemu in item.collectUser" :key="itemu.userId">
									<el-divider>
										<a>
											<img :src="itemu.userTou"/>
										</a>
									</el-divider>
									<dl>
										<dt>
											<span>{{itemu.userName}}</span>
										</dt>
										<dd>
											<i>{{itemu.day | dateFormat('itemu.day')}}</i>
											天前
											<i class="iconfont iconlove"></i>
											{{item.collectNum}}人"喜欢了这个商品"
										</dd>
									</dl>
								</div>
								<div class="ld_down">
									<a href="#">
										<img :src="item.productSrc"/>
									</a>
									<div class="ld_gaoliang">
										<ul>
											<li>
												<i class="iconfont iconsearch" @click="seegood(item.productId)"></i>
											</li>
											<li>
												<i class="iconfont icongouwuche" @click="addToCart(item)"></i>
											</li>
										</ul>
									</div>
								</div>
							</li>	
						</div>
					</div>
				</div>
				<div class="rexiao">
					<div class="rexiao_up">
						<h1>热销商品</h1>
						<h3>Eshop中正在热销的商品，你需要吗？还不快把它带回家！</h3>
					</div>
					<div class="rexiao_down">
						<ul>
							<li v-for="item in goodsList.slice(0,9)" :key="item.productId">
								<div class="rd_up">
									<div class="rdu_name">
										<p>{{item.productName}}</p>
									</div>
									<a>
										<div class="rdu_img" @click="seegood(item.productId)">
											<img :src="item.productSrc" />
											<div class="gaoliang"></div>
										</div>
									</a>
									<div class="rdu_jx">
										<h3>{{item.salePrice | currency('￥')}}</h3>
										<h3>库存  : {{item.productNum}}</h3>
										<h3>销量  :{{item.saleNum}}</h3>
									</div>
								</div>
								<div class="rd_down">
									<span @click="seegood(item.productId)">商品详情</span>
									<span @click="addToCart(item)">加入购物车</span>
								</div>
							</li>					
							<div class="rd_move" @click="productlist">									
								<h1>更多</h1>	
								热销商品	
							</div>	
						</ul>
					</div>
				</div>
				<div style="width: 100%; height: 50px;"></div>
			</div>
		</div>
		<esp-footer></esp-footer>
	</div>
</template>

<script>
import EspHeader from '@/components/EspHeader.vue'
import EspFooter from '@/components/EspFooter.vue'
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
	data() {
      return {
        nickName:'',
        newsList:[],
        loveList:[]
      }
    },
    components:{
    	EspHeader,
    	EspFooter
    },
    mounted: function () {	 
    	this.getnewsList();
    	this.getloveList();
    	this.passascorll();
    	this.$store.commit('getgoodsList');
    	this.$store.commit('getgoodcartList');
	},
	computed:{        	
        goodsList(){
        	return this.$store.state.good 
        }
    },
    filters:{
        dateFormat:function(a1){
            let a2 = new Date().Format('yyyy-MM-dd');
		    let separator = "-"; //日期分隔符
			let startDates = a1.split(separator);
			let endDates = a2.split(separator);
		    let startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);
			let endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);
		    let day = parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24);//核心：时间戳相减，然后除以天数
		   	return day+1;
        }
    },
    methods:{
    	addToCart(item) {
    		if(this.$store.state.token){
	    		axios.post("/goods/addgoodcarts",{
	              productId:item.productId,
	              salePrice:item.salePrice,
	              productSrc:item.productSrc,
	              productName:item.productName,
	              colorType:item.colorType,
	              collectNum:item.collectNum,
	              sexType:item.sexType,
		          functionType:item.functionType,
	            }).then((response)=>{
	            	let res = response.data;
	                if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，加入购物车成功',
				          type: 'success'
				        });
	                }else{	
	                	this.$message.error('加入购物车失败，请重试');	
	                }
	            });	
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
			
		 },
		getnewsList() {
			axios.get("news/newsList").then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.newsList = res.result;
      			}else{
      				this.newsList = {};
      			}
      		})
		},
		getloveList() {
			axios.get("goods/loveList").then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.loveList = res.result;
      			}else{
      				this.loveList = {};
      			}
      		})
		},
		tsdetails(newId) {
	  		this.$router.push({
				path:"/tsdetails?newId="+newId
			});
	  	},
	  	seegood(productId) {
	  		this.$router.push({
				path:"/prdetails?productId="+productId
			});
	  	},
	  	passascorll () {
			this.ascroll = new BScroll(this.$refs.love_down,{
	  		scrollX:true,
	  		eventPassthrough:'vertical',
	  		click:true,
		  	});
		  	this.ascroll.refresh();	
		},
	  	leftgun () {
	  		this.ascroll.scrollBy(160, 0, 1000);
	  	},
	  	rightgun() {
	  		this.ascroll.scrollBy(-260, 0, 1000)
	  	},
	  	productlist() {
	  		this.$router.push({
	  			path:"/productlist"	  			
	  		})
	  	}
	},
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
	.home{	
		background-color: #fff;
		width: 100%;
		.main{
			background: #e1e2e3;
			width: 100%;
			.content{				
				width: 1320px;
				margin: 0 auto;							
				background: #e1e2e3;
				.swiper{
					height: 400px;
					width: 800px;
					padding: 10px;
					display: inline-block;
					position:relative;					
					img{
						width: 100%;
						height: 100%;
					}
					button{
						background: #FA6F57;
						height: 40px;
						width: 40px;
						
						i{
							font-size: 20px;
							font-weight: 800;
							color: #fff;
						}
					}
					ul{
						height: 35px;
						margin-bottom: 10px;
						border-radius: 20px;
						background: #FA6F57;
						li{
							padding: 0;
							margin: 12px 5px;							
							button{
								background: #fff;
								height: 10px;							
								width: 10px;
								border-radius: 50%;							
							}
						}
					}					
				}
				.tuisong{					
					position: relative;
					padding: 10px 5px;
					top: -14px;
					width: 480px;
					height: 400px;
					display: inline-block;
					.ts_kuang{
						width: 130px;
						height: 120px;
						margin: 8px 10px;
						display: inline-block;
						text-align: center;
						position: relative;
						background: rgba(0,0,0,0.35);
						&:hover{
							.ts_hover{
								width: 100%;
								height: 100%;
								visibility: visible;			
							    transform:translate(0,30px);				    						        
							    opacity: 0.75;								
								font-size: 10px;								
								background: #666666;																
							}							
						}
						img{
							width: 80%;
							height: 80%;
							margin-top: 12px;
						}
						.ts_hover{
							position: absolute;
						    top: -30px;
						    height: 0;
						    left: 0px;
						    width: 30%;						    
						    visibility: hidden;							   
						    transition: all .6s ease-in;
						    z-index: 10;
						    p{
						    	height: 50px;
						    	line-height: 25px;
						    	width: 100%;
						    	margin-top: 60px;
						    	background: #fff;						    							    	
						    	font-size: 10px;
						    	font-weight: 1000;
						    	text-decoration: none;
							    display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							    max-width: 150px;
						    	&:hover{
						    		cursor: pointer;						    		
						    		color: #fff;
						    		background: #000;	
						    	}
						    }
						    				    
						}
					}
				}
				@mixin h1{
					display: inline-block;							
					color: #FA6F57;
					margin-left: 30px;
					font-size: 20px;						
					font-weight: 600;
				}
				@mixin h3{
					display: inline-block;
					margin-left: 30px;
					font-size: 12px;
					color: #999999;
				}
				.love{
					width: 98%;
					height: 450px;
					margin: 20px 0 0 10px;
					background: #F7F7F7;
					position: relative;
					.love_up{
						position: relative;
						line-height: 50px;
						height: 50px;										
						h1{@include h1;}
						h3{@include h3;}
						.lu_icon{
							display: inline-block;
							margin-left: 670px;							
							i{
								margin: 0 10px;
								font-size: 30px;
								color: #FA6F57;
								cursor: pointer;
							}
						}						
					}
					.love_down{
						position: relative;
					    height: 400px;
					    width: 1293px;
    					overflow: hidden;
    					.love_downs{
    						width: 200%;
    						position: relative;
    						li{
    							width: 250px;
    							margin: 0 2px;
    							display: inline-block;
    							.ld_up{
    								height: 100px;  								
    								.el-divider__text{
    									margin-top: 4px;
    									background: none;
    									img{
	    									width: 50px;
	    									height: 50px;   									
	    									border-radius: 50%;
    									}
    								}
    								dl{		
    									text-align: center;
    									dt{
    										font-size: 14px;
    										height: 50px;
    										line-height: 50px;
    										span{	
    											background: #FA6F57;
    											color: #fff;
    											padding: 5px 8px;
											    border-radius: 30px;											    
    										}
    									}
    									dd{
    										color: #000;
    										font-size: 12px;
    										height: 25px;
    										line-height: 25px;
    										color: #999999;
    										i{
    											color: #000000;
    											font-size: 14px;
    											margin-left: 5px;
    										}
    										i:nth-child(2){
    											color: #FF0000;
    											font-size: 12px;
    											margin-right: 5px;
    										}
    									}
    								}   								
    							}
    							.ld_down{
    								position: relative;
    								height: 250px;
    								padding: 13px 15px;
    								&:hover{
    									.ld_gaoliang{
    										background: rgba(255, 255, 255, 0.1);
    										cursor: pointer;
    										visibility: visible;
    										li{
    											top: 190px;
									    		background: #FA6F57;
									    		i{
									    			visibility: visible;									    			
									    		}
    										}
    									}
    									img{
    										border-color: #FA6F57;
    									}
    								}
    								img{
    									width: 100%;
    									height: 100%;
    									border: 1px solid #000000;
    								}
    								.ld_gaoliang{
    									visibility: hidden;
	    								position: absolute;
									    left: 0;
									    top: 0;
									    right: 0; 
									    height: 250PX;
									    padding: 13px 15px;
									    transition: all 0.8s ease;
									    ul{
									    	li{
									    		position: absolute;
									    		width: 30px;
									    		height: 30px;
									    		top: -10px;
									    		line-height: 30px;
									    		margin-left: 38px;
									    		background: none;									    		
									    		padding: 10px;
									    		border-radius: 50%;
									    		text-align: center;
									    		transition: all 0.8s ease;
									    		i{
									    			color: #fff;
									    			font-size: 22px;
									    			visibility: hidden;
									    		}
									    		&:hover{
									    			background: #000000;
									    			border: 1px solid #fff;									    			
									    		}									    		
									    	}
									    	li:nth-child(2){
									    		margin-left: 140px;
									    	}
									    }
    								}
    							}						
    						}
    					}
					}
				}
				.rexiao{
					width: 98%;
					height: 500px;
					margin: 20px 0 0 10px;
					background: #F7F7F7;
					position: relative;					
					.rexiao_up{
						position: relative;
						line-height: 50px;
						height: 50px;
						h1{@include h1;}
						h3{@include h3;}
					}
					.rexiao_down{
						position: relative;												
						ul{
							margin: 0 27px;
							.rd_move{
								position: absolute;
								display: inline-block;
								width: 160px;
								height: 160px;
								margin-left: 41px;
								margin-top: 30px;
								border-radius: 50%;
								background: #fff;
								border: 1px solid #000000;
								font-size: 18px;
								font-weight: 500;
								text-align: center;	
								transition: all 1s ease;							
								h1{
									margin-bottom: 20px;
									margin-top: 50px;
									
								}
								&:hover{
									background: #000000;
									cursor: pointer;
									color: #fff;
								}
							}
							li{
								height: 210px;
								width: 200px;
								margin: 6px 20px;
								display: inline-block;
								background: #fff;
								text-align: center;
								position: relative;
								border: 1px solid #000;
								&:hover{									
									border-color: #fff;
									box-shadow: 0px 0px 5px #000;
									.rd_down{	
										span{
											background: #FA6F57;
											cursor: pointer;
											background: #000;																				
										}
									}
									.rd_up{
										
										.rdu_name{
											visibility: visible;	
											background: #000;											
											transition: all .6s ease-in;		
								    		transform:translate(100px,0);								    							    		
										}
										.rdu_jx{
											visibility: visible;
											background: #000;																						
											transition: all .6s ease-in;			
								    		transform:translate(-100px,0);
								    		h3{
								    			color: #999999;
								    		}							    							    		
										}
									}																	
								}
								.rd_up{
									position: relative;
									.rdu_name{
										position: relative;
										visibility: hidden;  
										background: #666666;
										left: -100px;
										height: 28px;
										font-size: 15px;
										line-height: 28px;
										border-bottom: 2px solid #fff;
										color: #fff;																						
										p{
											font-size: 12px;
									    	font-weight: 500;
											text-decoration: none;
											text-overflow: ellipsis;
											white-space: nowrap;
											overflow: hidden;
											padding: 0 10px;
										    max-width: 180px;
										}										
									}
									.rdu_img{
										&:hover{
											cursor: pointer;
											.gaoliang{
												background: rgba(255, 255, 255, 0.1);
											}											
										}
										img{
											height: 130px;
											width: 100%;																				
										}
										.gaoliang{
											position: absolute;
										    left: 0;
										    top: 30px;
										    right: 0; 
										    height: 130PX;										    							   									   
										}
									}									
									.rdu_jx{
										position: relative;
										visibility: hidden;   								    
									    right: -100px;
										height: 20px;										
										background: #666666;
										h3{
											display: inline-block;
											margin: 0 2px;
											color: #999999;
											font-size: 12px;
											line-height: 20px;
											
										}
										h3:nth-child(2):hover{
											color: #fff;
											cursor: pointer;
										}
									}	
								}
								.rd_down{
									transition: all 0.6s ease;
									height: 30px;
									line-height: 30px;
									font-size: 12px;
									color: #fff;
									span{
										background: #000000;
										padding: 3px 8px;
										margin: 0 15px;
										border-radius: 14px;
										&:hover{
											background: #FA6F57;
										}										
									}
								}
							}
						}
					}
				}
			}
		}
	}

</style>