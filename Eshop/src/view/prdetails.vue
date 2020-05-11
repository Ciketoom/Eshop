<template>
	<div>
		<esp-header></esp-header>
		<div class="prdetails">
			<div class="prd_up">
				<div class="prd_upl">
					<p>相似商品</p>
					<div class="xiang_down" ref="xiang_down">
						<div class="xiang_downs" ref="xiang_downs">
							<ul>
								<li v-for="(item, index) in similargoods" v-viewer>
									<img :src="item.productSrc"/>
									<h1 @click="prdetails(item.productId)">{{item.productName}}</h1>
									<h1>{{item.salePrice  | currency('￥')}}</h1>
								</li>
							</ul>
						</div>
					</div>
					<div class="xiang_icon">
						<a><i class="iconfont iconxiangshang" @click="udgun('up')"></i></a>
						<a><i class="iconfont iconxiangxia" @click="udgun('down')"></i></a>
					</div>
				</div>
				<div class="prd_upr">			
					<div class="prd_upro">
						<div class="star_picnav">
							<h2>商品图集</h2>
							<i class="iconfont iconbackward" @click="xiangzy('zuo')"></i>
							<i class="iconfont iconforward"  @click="xiangzy('you')"></i>
						</div>
						<div class="star_picwrap" ref="star_picwrap">
							<div class="star_piccontent" ref="star_piccontent">
								<viewer :images="gooddetails.productImg" >
						        	<img 
						        		v-for="(item, index) in gooddetails.productImg"
						        		:src="item.imgSrc" :key="index">
						  		</viewer>
							</div>		
						</div>
					</div>
					<div class="prd_uprt">
						<h1>商品比价</h1>						
						<li class="bjcontainer" v-for="(item, index) in gooddetails.priceCompare" :key="index">
						    <div class="bjper">
						        <div class="bjname">
					           		<i :class="item.webicon"></i>
					           		<span>{{item.websiteName}}</span>
						        </div>
						        <div class="bjprice">
						        	<i :class="item.webicon"></i>
					           		<span><a :href="item.websiteSrc">{{item.price  | currency('￥')}}</a></span>
						        </div>
						    </div>
						</li>											
					</div>
					<div class="prd_uprd">
						<p>
							{{gooddetails.productName}}
						</p>
						<div class="prd_price">
							<span>价格  :</span>
							<h1>{{gooddetails.salePrice | currency('￥')}}</h1>
						</div>
						<div class="prd_lan">
							<div class="lan_one">
								<span>总销量  :</span>
								{{gooddetails.saleNum}}
							</div>
							<div class="lan_one">
								<span>累计评价  :</span>
								{{gooddetails.commentNum}}
							</div>
							<div class="lan_one">
								<span>品牌  :</span>
								{{gooddetails.brandName}}
							</div>
							<div class="lan_one">
								<span>收藏商品  :</span>
								<i class="iconfont iconlove" @click="collectgood()"></i>
								{{gooddetails.collectNum}}
							</div>
						</div>
						<div class="prd_color">
							<span>颜色分类  :</span>							
							<li v-for="(item,index) in color"
								:key="index"
								@click="Color(index)"
								:class="{'xuan': selc == index}"
								>
								{{item.color}}
							</li>							
						</div>
						<div class="prd_size">
							<span>大小分类  :</span>			
							<li v-for="(item, index) in sizeli.size" 
								:class="{'xuan': selt == index}"
								@click="Size(item,index)">{{item.sizetype}}</li>						
						</div>
						<div class="prd_yun">
							<span>运费:</span>
							<span style="font-size: 12px; padding: 5px; background: red;color: #fff; border-radius: 10%;">包邮</span>
							<span>发货地:</span>
							<i class="iconfont icondizhi"></i>
							<h1>{{gooddetails.productCity}}</h1>
						</div>
						<div class="prd_num">
							<span>购买数量:</span>
							<i class="iconfont iconjianshao" @click="buyadddel('del')"></i>
							<input class="buynum" type="text" v-model="buynum" maxlength="4"/>
							<i class="iconfont icontianjia" @click="buyadddel('add')"></i>
							<span>库存  :</span>
							{{this.num}}
						</div>
						<div class="prd_gj">
							<li @click="buygood()">立即购买</li>
							<li @click="addgoodcart()">加入购物车</li>
						</div>
					</div>
				</div>
			</div>
			<div class="prd_down">
				<div class="prd_dnav">
					<li class="prd_dcon" v-bind:class="{qie:this.content==true}" @click="qiexp('qing')">商品详情</li>
					<li class="prd_dpin" v-bind:class="{qie:this.pinglun==true}" @click="qiexp('ping')">商品评价</li>			
				</div>
				<div class="prd_content">
					<div class="prd_dcontent" v-show="content">
						<h1>{{gooddetails.productName}}</h1>
						<p>{{gooddetails.productContent}}</p>
						<img :src="gooddetails.productimg" />
					</div>
					<div class="prd_dpinlun" v-show="pinglun">
						<div class="content_item" v-for="(item, index) in gooddetails.commentList">
							<div class="content_info">
								<dl>
									<dt>
										<img :src="item.commentAvatar"/>
									</dt>
									<dd>
										<p class="content_name">{{item.commentName}}</p>
										<p class="content_time">{{item.commentDate}}</p>
									</dd>
									<p class="content_zan" >
										<span class="content_zannum">{{item.commentZan}}</span>
										<i 
											@click="editgoodZan(item)" 
											class="iconfont iconthumbup-fill" 
											:class="{zancheck:item.zanCheck=='1'}">
										</i>
									</p>
								</dl>
							</div>
							<div class="content_con">
								<p>
									{{item.commentCon}}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<esp-footer></esp-footer>
	</div>
</template>

<script>
import EspHeader from '@/components/EspHeader.vue'
import EspFooter from '@/components/EspFooter.vue'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
	data(){
		return{	
			buynum:1,
			content:true,
			pinglun:false,
			num:'',
			selc:'a',
			selt:'a',
			prcolor:'',//商品选择颜色
			prsize:'',//商品选择大小尺寸
			color:[],
			sizeli:[],
			gooddetails:[],//商品详情数据
			similargoods:[],
		}	
	},
	computed:{
	    
  	},
  	mounted: function () {
    	this.getgooddetails();
    	this.passascorll();
    	this.goascorll();
    	
	},
	methods:{
		prdetails(productId) {
        	this.$router.push({
	  			path:"/prdetails?productId="+productId  			
	  		});
	  		this.getgooddetails();
        },
		editgoodZan(item){
			if(this.$store.state.token){
	    		if(item.zanCheck=="1"){
					item.commentZan--;
					item.zanCheck = item.zanCheck=="0"?'1':'0';
				}else{
					item.commentZan++;
	    			item.zanCheck = item.zanCheck=="0"?'1':'1';
				}
	    		axios.post("/goods/goodzanEdit",{
	      			productId:this.gooddetails.productId,	
	      			commentZan:item.commentZan,
	    			commentId:item.commentId,
	    			zanCheck:item.zanCheck,
	    		}).then((response)=>{
					let res = response.data;
	 				if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，点赞成功',
				          type: 'success'
				        });
	                }else{	
	                	this.$message.error('点赞失败，请重试');	
	                }
		    	})	
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
			
		},
		buygood(){
			if(this.$store.state.token){
				if(this.sizeli == ''){
					this.$message.error('请选择商品属性！！');
				}else{
					if(this.num!=0){
						axios.post("/goods/buygood",{
			              productId:this.gooddetails.productId,
			              salePrice:this.gooddetails.salePrice,
			              productSrc:this.gooddetails.productSrc,
			              productName:this.gooddetails.productName, 
			              colorType:this.gooddetails.colorType,
			              collectNum:this.gooddetails.collectNum,
			              fiveType:this.gooddetails.fiveType,
			              sexType:this.gooddetails.sexType,
			              functionType:this.gooddetails.functionType,
			              buynum:this.buynum,
			              color:this.prcolor,
			              size:this.prsize,
			            }).then((response)=>{
			            	let res = response.data;
			                if(res.status=="0"){
				            	this.$router.push({path:"/myaddress"})
			                }else{	
			                	this.$message.error('立即购买失败，请重试');	
			                }
			            });
					}else{
						this.$message.error('该类商品已卖完，请选择其它！！！');
					}
				}
			}else{
				this.$message.error('请先登录哦！！！');
			}
		},
		addgoodcart(){
			if(this.sizeli == ''){
				this.$message.error('请选择商品属性！！');
			}else{
				if(this.num!=0){
					axios.post("/goods/addgoodcart",{
		              productId:this.gooddetails.productId,
		              salePrice:this.gooddetails.salePrice,
		              productSrc:this.gooddetails.productSrc,
		              productName:this.gooddetails.productName,
		              buynum:this.buynum,
		              colorType:this.gooddetails.colorType,
		              color:this.prcolor,
		              size:this.prsize,
		              collectNum:this.gooddetails.collectNum,
		              fiveType:this.gooddetails.fiveType,
		              sexType:this.gooddetails.sexType,
		              functionType:this.gooddetails.functionType,
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
					this.$message.error('该类商品已卖完，请选择其它！！！');
				}
				
			}	
		},
		collectgood(){
			if(this.$store.state.token){
	    		axios.post("/goods/collectgood",{
	              productId:this.gooddetails.productId,
	              salePrice:this.gooddetails.salePrice,
	              productSrc:this.gooddetails.productSrc,
	              productName:this.gooddetails.productName,
	              collectNum:this.gooddetails.collectNum
	            }).then((response)=>{
	            	var res = response.data;
	                if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，收藏该商品成功',
				          type: 'success'
				        });
				        this.getgooddetails();
	                }else{
	                	if(res.status=="2"){
			            	this.$message({
					          message: '该商品已被收藏过',
					          type: 'success'
					        });
				        }else{
	                		this.$message.error('收藏失败，请重试');
	                	}
	                }
	            });	
    		}else{
    			this.$message.error('请先登录哦！！！');
    		}
			
		},
		getgooddetails() {
			let productId = this.$route.query.productId;
			axios.get("goods/gooddetails",{
				params:{
      				productId:productId
      			}
			}).then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.gooddetails = res.result; 
      				this.color = this.gooddetails.colorType;
      				this.num = this.gooddetails.productNum;
      				this.getsimilargoods();
      			}else{
      				this.gooddetails = {};
      			}
      		})
		},
		getsimilargoods() {
			let sexType = this.gooddetails.sexType;
			axios.get("goods/similargoods",{
				params:{
      				sexType : sexType
      			}
			}).then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.similargoods = res.result;
      			}else{
      				this.similargoods = {};
      			}
      		})
		},
		Color:function(index){
      		this.sizeli = this.color[index];
      		this.num = this.sizeli.colornum;
      		this.selc = index;
      		this.selt = 'a';
    	},
    	Size(item,index){
    		this.selt = index;
    		this.num = item.sizenum;
    		this.prcolor = this.sizeli.color;
    		this.prsize = item.sizetype;
    	},
		qiexp(pq){
			if(pq=='ping'){
				this.content = false;
				this.pinglun = true;
			}else if(pq=='qing'){
				this.content = true;
				this.pinglun = false;
			}
		},
		ocComment(oc){
			if(oc=='open'){
				this.kuang = true;
			}else if(oc=='close'){
				this.kuang = false;
			}
		},
		passascorll () {
			this.ascroll = new BScroll(this.$refs.xiang_down,{				
		  		click:true,
		  	});
		  	this.ascroll.refresh();	
		},
		goascorll () {
			this.picscroll = new BScroll(this.$refs.star_picwrap,{
		  		scrollX:true,
		  		eventPassthrough:'vertical',
		  		click:true,	
		  	});
		  	this.picscroll.refresh();
		},
		xiangzy(go){
			if(go=='zuo'){
				this.picscroll.scrollBy(150, 0, 1000);
			}else if(go=='you'){
				this.picscroll.scrollBy(-200, 0, 1000);
			}else{
				return;
			}
		},
	  	udgun (to) {
	  		if(to=='up'){
				this.ascroll.scrollBy(0, 80, 1000);
			}else if(to=='down'){
				this.ascroll.scrollBy(0, -130, 1000);
			}else{
				return;
			}
	    },	  	
		buyadddel(fax){
			if(fax=='add'){
				if(this.buynum==10){
					return;
				}else{
					this.buynum++;
				}
			}else if(fax=='del'){
				if(this.buynum==1){
					return;
				}else{
					this.buynum--;				
				}
			}
		},
	},
	
	components:{
    	EspHeader,
    	EspFooter,
    },
}
</script>

<style lang="scss">
.prdetails{
	width: 1320px;
    margin: 30px auto;
    position: relative;
    .prd_up{
    	height: 610px;
    	.prd_upl{
    		position: relative;
    		display: inline-block;
    		height: 600px;
    		margin: 0 0 0 150px;
    		width: 160px;
    		border: 1px solid #FA6F57;
    		p{
    			text-align: center;
    			margin: 5px 0;
    			color: #475669;
    			font-weight: 600;
    			height: 20px;
    		}
    		.xiang_down{
    			position: relative;
    			height: 540px;
    			overflow: hidden;
    			.xiang_downs{
    				height: 200%;
    				position: relative;
					ul{
    					li{
    						height: 130px;
    						text-align: center;
    						margin: 5px 0;
    						img{
    							width: 130px;
    							height: 130px;
    							&:hover{
    								cursor: pointer;   								
    							} 							
    						}
    						h1{
    							padding: 2px 0;
    							width: 130px;
    							margin: 0 auto;
    							font-size: 12px;
    							background: #CCCCCC;
    							opacity: 0.8;
    							position: relative;
    							top: -35px;
    							text-align: center;  
    							text-decoration: none;
								text-overflow: ellipsis;
								white-space: nowrap;
								overflow: hidden;
								padding: 2px 10px;
							    max-width: 110px;
							    &:hover{
    								cursor: pointer; 
    								color: red;  								
    							}  							
    						}
    					}
    				}
    			}
    		}
    		.xiang_icon{
    			position: relative;
				height: 30px;
				line-height: 30px;
				width: 100%;
				a{
					width: 40px;
					margin: 0 28px;
					cursor: pointer;
					i{
						font-size: 26px;
						color: #FA6F57;
					}
				}
			}
    	}
    	.prd_upr{
    		position: relative;
    		display: inline-block;
    		height: 600px;
    		margin-left: 50px;
    		width: 65%;    		
    		.prd_upro{
    			position:relative;
    			float:left;
    			width: 70%;
    			.star_picnav{	
					height: 50px;
					text-align: center;
					h2{
						line-height: 50px;
						font-size: 24px;
						font-weight: 600;
						color: #708090;
						letter-spacing: 10px;						
					}
					i{
						position: relative;
						padding: 0 100px;
						top: -40px;
						font-size: 30px;
						color: #FA6F57;
					}
					
				}
	    		.star_picwrap{
	    			height: 200px;					
					padding: 20px 0;
					overflow: hidden;
					background: #475669;					
					.star_piccontent{
						margin-top: 10px;
						width: 500%;
						img{
							margin-left: 15px;
							height: 180px;
							width: 180px;
							border: 2px solid #475669;							
							&:hover{
								border-color: #FA6F57;
								cursor: pointer;
							}
						}
					}
				}
    		}
    		.prd_uprt{
    			position: relative;
    			float: left;
    			width: 200px;
    			height: 290px;
    			margin-left: 50px;
    			text-align: center;
    			border: 1px solid #FA6F57;
    			h1{
					font-size: 20px;
					line-height: 30px;
					font-weight: 600;
					color: #708090;
					letter-spacing: 5px;
    			}
    			.bjcontainer {
				    perspective: 1000;				    		    
				    .bjper {
					    transition: 0.8s;
					    transform-style: preserve-3d;
					    position: relative;
					    margin: 15px 0;	
					    height: 70px;				    
						background: #FA6F57;
					    .bjname, .bjprice {
						    backface-visibility: hidden;
						    position: absolute;
						    top: 0;
						    left: 0;
						    width: 180px;
				    		height: 70px;
				    		line-height: 70px;
				    		font-size: 25px;
				    		color: #475669;				    		
				    		i{
				    			font-size: 20px;		
				    			padding: 10px;
				    			border-radius: 50%;
				    			color: #fff;				    			
				    		}
				    		span{
				    			margin-left: 10px;
				    			font-size: 15px;
				    		}				    		
						}
						.bjname {
						    z-index: 2;
						}
						.bjprice {
						    transform: rotateY(180deg);  
						    &:hover{
						    	span{
						    		a{color: #fff;}
						    		
						    	}
						    }
						}
					}
					&:hover{
						.bjper{
			        		transform: rotateY(180deg);
			        	}
					}	
				}
				li:nth-child(2){
					i{background: orangered;}
				} 
				li:nth-child(3){
					i{background: red;}
				} 
				li:last-child{
					i{background: #EE0000;}
				}   											
    		}
    		.prd_uprd{
    			position: relative;
    			height: 300px;
    			width: 100%;   			
    			float: left;
    			margin-top: 10px;
    			border-top: 1px solid #999999;
    			p{
    				height: 40px;
    				line-height: 40px;
    				font-size: 20px;
    				font-weight: 600;
    				text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					max-width: 800px;
    			}
    			span{
    				font-size: 12px;
    				color: #888888;
    			}
    			.prd_price{
    				height: 40px;
    				line-height: 40px;
    				font-size: 12px;
    				color: red;
    				h1{
    					display: inline-block;
    					font-size: 30px;
    				}
    			}
    			.prd_lan{
    				background: #e1e2e3;
    				.lan_one{
    					padding-right:100px;
    					height: 30px;
    					line-height: 30px;
    					display: inline-block;
    					color: red;
    					i{
    						padding: 5px;  
    						&:hover{
    							cursor: pointer;
    						}							
    					}
    				}
    			}
    			li{
					display: inline-block;
					padding: 5px 5px;
					height: 16px;
					font-size: 14px;
					line-height: 16px;
					margin: 5px 5px;
					border: 2px solid #999999;
					&:hover{
						cursor: pointer;
					}
				}	
				.xuan{
					border-color: red;
					
				}
    			.prd_yun{
    				margin: 10px 0;
    				span:nth-child(3){
    					margin-left: 100px;
    				}  				
    				h1{
    					color: red;
    					font-size: 14px;
						display: inline-block;
					}
    			}
    			.prd_num{
    				color: red;
    				margin: 10px 0;
    				.buynum{
    					width: 30px;		
    				}
    				span:last-child{
    					margin-left: 100px;
    				} 
    				i{
    					padding: 5px;
    					font-size: 14px;
    					cursor: pointer;
    					color: #000000;
    				}
    			}
    			.prd_gj{
    				height: 50px;
    				li{padding: 10px 20px;margin-right: 100px; font-weight: 600;}
    				li:first-child{
    					border: 1px solid red;
    					color: red;   					
    				}
    				li:last-child{
    					background: #FA6F57;
    					border-color: #FA6F57;
    				}
    			}
    		}
    	}
    }
    .prd_down{
    	position: relative;
    	padding: 20px 80px 50px 150px;
    	.prd_dnav{
    		background: #999999;
    		li{
    			display: inline-block;
    			border:2px solid #999999;
    			padding: 0 30px;
    			height: 40px;
    			line-height: 40px; 
    			&:hover{
    				cursor: pointer;  				
    			}	 			
    		}
    		.qie{
				color: red;
				border:2px solid red;
				background: #fff;
    		} 
    		span{
    			float: right;
    			line-height: 40px;
    			margin-right: 20px;
    			i{
    				color: #fff;
    				font-size: 20px;
    				margin-right: 10px;
    				&:hover{
	    				cursor: pointer;  				
	    			}
    			}
    		} 
    	}
    	.prd_content{
    		position: relative;
			.prd_dcontent{
				text-align: center;
				position: relative;	
				h1{
					height: 50px;
					line-height: 50px;
					font-weight: 600;
					font-size: 26px;
					padding: 30px 0;				
				}
				img{
					width: 800px;					
					border: 2px solid #000000;
				}	
				p{
					float: left;
					letter-spacing: 3px;
	    			text-indent: 2em;
	    			line-height: 30px;
	    			padding: 20px 0 40px 150px;
	    			text-align: left;
	    			width: 800px;	
				}						
			}
			.prd_dpinlun{
				position: relative;
				.content_item{
	    			margin: 15px 0;
				    overflow: hidden;
				    padding-bottom: 20px;
				    border-bottom: 1px solid #f2f2f2;
				    .content_info{
				    	overflow: hidden;
    					margin-bottom: 5px;
    					dl{
    						float: left;
    						width: 100%;
    						dt{
							    float: left;
							    width: 50px;
							    height: 50px;
							    overflow: hidden;
							    border-radius: 50%;
							    margin-right: 16px;
							    img{
							    	width: 100%;
							    	height: 100%;
							    }
    						}
    						dd{
							    width: 800px;
    							float: left;
    							.content_time{
								    color: #999;
								    font-size: 14px;
								    line-height: 28px;
    							}
    						}
    						.content_zan{
					    		float: right;
    							cursor: pointer;
    							.content_zannum{
								    color: #999;
    							}
    							.zancheck{
    								color: #CB0001;
								}
    							i{
    								font-size: 30px;
    								width: 18px;
    								color: #CEDB32;
    								
    							}
    								
    						}
    					}
				    }
				    .content_con{
			    	    width: 900px;
					    margin-left: 66px;
					    line-height: 30px;
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
			    .details_commentk{
		    		float: left;
		    		margin-top: 10%;
		    		margin-left: 40%;
		    		text-align: center;
		    		height: 200px;
		    		top: 300px;
		    		width: 300px;
		    		background: #fff;
		    		.comment{
		    			position:relative;  
					    height:100px;
					   	top: 20px;
		    			width: 80%;
		    			letter-spacing: 2px;
			    		text-indent: 2em;
			    		border-radius: 8px;
			    		border: 1px solid #8C939D;
		    		}
		    		.commentbt{
		    			position: relative;
		    			top: 30px;
		    		}
		    	}
			}
    	}
    }
}
</style>