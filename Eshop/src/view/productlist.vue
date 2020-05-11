<template>
	<div>
		<esp-header></esp-header>
		<div class="pr_list">
			<div class="prlist_up" >
				<div class="up_wu">
					<div class="wu_icon">
						<i class="iconfont iconshangpinfenlei"></i>
						<span>所有分类</span>
					</div>
					<div class="fuxuan">
						<el-select v-model="fenlei" placeholder="五大类商品选择" @input="delsaixuan()">
						    <el-option
						      v-for="(item,index) in fenleiList"
						      :key="index"
						      :label="item.name"
						      :value="item.name">						      
						    </el-option>
					  	</el-select>
					</div>
				</div>
				<div class="down_sai" v-show="this.fenlei!='全部商品'">
					<div class="sai">
						<button>你选择的是：</button>
						<mark v-for="(item,index) in saixuan" :key="index">
							<span>{{item}}</span>
							<a href="javascript:;" @click="remove(index)"><i class="iconfont iconshanchu"></i></a>
						</mark>
						<div class="saicon">							
							<ul v-for="(item,index) in sxList" :key="index">								
								<li v-for="(xifen,index) in item.sxlist" :key="index">
									<h1>{{xifen.title}}:</h1>
									<a href="javascript:;" 
									v-for="(sai,i) in xifen.list"
									:key="i"	
									@click="add(sai,index,i)"
									>{{sai}}</a>
								</li>	
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="prlist_sort">
				<li @click="Sort('comment')" id="li" class="lis liss"><a href="#/productlist">综合(默认排序)</a></li>
				<li @click="Sort('pjiang')" id="li" class="lis"><a href="#/productlist">价格(从高到低)</a></li>
				<li @click="Sort('psheng')" id="li" class="lis"><a href="#/productlist">价格(从低到高)</a></li>
				<li @click="Sort('sale')" id="li" class="lis"><a href="#/productlist">销量(默认排序)</a></li>
				<div class="price">价格区间 :
					<div class="pricelist">
						<el-input @input="getgoodList()" v-model="touprice" placeholder="请输入最低价"></el-input>			
					</div>
					~~~
					<div class="pricelist">
						<el-input @input="getgoodList()" v-model="weiprice" placeholder="请输入最低价"></el-input>			
					</div>
				</div>				
			</div>
			<div class="prlist_list" 
				 v-loading="loading"
				 element-loading-background="rgba(0, 0, 0, 0.55)"
				 element-loading-text="拼命加载中">
				<div class="prone" v-for="item in goodList" :key="item.productId">
					<div class="prone_up">						
						<a @click="prdetails(item.productId)"><img :src="item.productSrc"/></a>					
					</div>
					<div class="prone_down">
						<div class="prone_ps">
							<h1>{{item.salePrice | currency('￥')}}</h1>
							<span>{{item.saleNum}}人付款</span>
						</div>
						<div class="prone_title">
							<p><a @click="prdetails(item.productId)">{{item.productName}}</a></p>
						</div>
						<div class="prone_button">
							<h1>
								<a @click="prdetails(item.productId)"><i class="iconfont iconsearch"></i></a>
							</h1>
							<h1>
								<a href="#/productlist" @click="addToCart(item)">
									<i class="iconfont icongouwuche"></i>
								</a>
							</h1>
							<h2 v-if="item.productNum<=20" style="background: #000000;padding: 0 5px;">货源紧张</h2>
							<h2><i class="iconfont icondizhi"></i>{{item.productCity}}</h2>
						</div>
					</div>	
				</div>
				<transition 
					appear
	                @before-appear="beforeEnter"
	                @after-appear='afterEnter'
	                v-for="(item,index) in showMoveDot"
	                :key="index.id">
				    <div 
				    	class="move_dot"
				        ref="ball"
				        v-if="item">
				        <img :src="dropImage" alt="">
				    </div>
			  	</transition>			
			</div>
			<esp-paging></esp-paging>
		</div>
		<esp-footer></esp-footer>
	</div>
</template>

<script>
import EspHeader from '@/components/EspHeader.vue'
import EspFooter from '@/components/EspFooter.vue'
import EspPaging from '@/components/paging.vue'
import axios from 'axios'
export default {
	data(){
		return{
	        fenlei:'全部商品',
	        saixuan:[],
	        brand:'',
	        sex:'',
	        size:'',
	        gongneng:'',
	        touprice:'0',
	        weiprice:'99999',
	        pricesort:'',
	        salesort:'',
	        commentsort:'',
	        showMoveDot: [],
	        elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      		elTop: 0, //当前点击购物车按钮在网页中的绝对left值
      		dropImage: '' ,// 小球图片
      		goodList:[],
	        fenleiList:[	
	        {name:'全部商品'},
	        {
		        name:'手机电脑',		        
		        sxlist:[
		        {
		        	title:'品牌',			        	
			        list:['小米','华为','iphone','华硕','oppo','vivo','联想','其它']
		      	},
		      	{
		        	title:'类别',			        	
			        list:['手机','笔记本']
		      	},   
		      	{
		        	title:'功能特性',			        	
			        list:['商务','时尚','拍照','游戏','音乐','其它']
		      	},
		        ]
		    },{	        
		        name:'精品服饰',
		        sxlist:[
		        {
		        	title:'品牌',			        	
			        list:['优衣库','森马','Gap','李宁','花花公子','H&M','其它']
		      	},
		      	{
		        	title:'类别',			        	
			        list:['男装','女装']
		      	},   	
		      	{
		        	title:'功能特性',			        	
			        list:['短袖','裤子','裙子','毛衣','外套','衬衫','卫衣','风衣','其它']
		      	},
		        ]
		    },{	        
		        name:'家电',
		        sxlist:[
		        {
		        	title:'品牌',			        	
			        list:['小米','创维','海尔','美的','老板','方太','西门子','松下','其它']
		      	},
		      	{
		        	title:'类别',			        	
			        list:['大家电','小电器']
		      	}, 	
		      	{
		        	title:'功能特性',			        	
			        list:['电视','洗衣机','空调','烤箱','电饭锅','油烟机','洗碗机','其它']
		      	},
		        ]
		    },{       
		        name:'鞋子专卖',
		        sxlist:[
		        {
		        	title:'品牌',			        	
			        list:['耐克','阿迪达斯','李宁','回力','VANS','安踏','其它']
		      	},
		      	{
		        	title:'类别',			        	
			        list:['男鞋','女鞋']
		      	}, 	
		      	{
		        	title:'功能特性',			        	
			        list:['跑鞋','靴子','皮鞋','板鞋','帆布鞋','拖鞋','其它']
		      	},
		        ]
		    },{	        
		        name:'美妆个护',
		        sxlist:[
		        {
		        	title:'品牌',			        	
			        list:['圣罗兰','纪梵希','迪奥','雅思兰黛','欧莱雅','曼秀雷敦','MAC','其它']
		      	},
		      	{
		        	title:'类别',			        	
			        list:['美妆','个护']
		      	},    	
		      	{
		        	title:'功能特性',			        	
			        list:['口红','洗面奶','香水','防晒','面膜','美甲','其它']
		      	},
		        ]
		    }],
		    pagecount:'',
			pcount:'',
			loading: false,
		}
	},	
	mounted:function(){
		this.getgoodList();
	},
	watch: {
        
    },
	computed:{
	    sxList:function(){    	
	      	return this.fenleiList.filter(item => item.name==this.fenlei); 	
	    },	
    },
	methods :{
		Sort(sj) {
			let lis =document.getElementsByClassName('lis');
			for(let i = 0; i<lis.length;++i){
				lis[i].classList.remove('liss')
			}	
			if(sj =='psheng'){		
				lis[2].classList.add('liss');
				this.pricesort = 1;
				this.commentsort ='';
				this.salesort ='';
			}else if(sj =='pjiang'){
				lis[1].classList.add('liss')
				this.pricesort = -1;
				this.commentsort ='';
				this.salesort ='';
			}else if(sj =='sale'){
				lis[3].classList.add('liss')
				this.salesort =1;
				this.pricesort ='';
				this.commentsort ='';
			}else if(sj =='comment'){
				lis[0].classList.add('liss')
				this.commentsort =1;
				this.pricesort ='';
				this.salesort ='';
			}				
			this.getgoodList();
    	},
		getgoodList(){
			if(this.fenlei=='全部商品'){this.loading=true;}
			let param = {
				brandName:this.brand,
				sexType:this.sex,
				functionType:this.gongneng,
				touprice:this.touprice,
				weiprice:this.weiprice,
				pricesort:this.pricesort,
				commentsort:this.commentsort,
				salesort:this.salesort,
				fiveType:this.fenlei,
				pagenum:this.$store.state.pagenum,
			}
			axios.get("goods/goodList",{
                params:param
              }).then((response)=>{
	  			let res = response.data;
	  			if(res.status=="0"){
					this.loading=false;
	  				this.goodList = res.result.list;
	  				this.pagecount = res.result.count;
	  				let pcount = Math.ceil(this.pagecount / 10);
					this.$store.state.pagecount = pcount;	
	  			}else{
	  				this.goodList = {};
	  			}
  			})
		},
		add(sai,index,i){
   			this.$set(this.saixuan,index,sai);
   			//找到操作的这一行，把这一行的数据中的index，设置为点击的标签的下标 
   			this.brand = this.saixuan[0];
   			this.sex = this.saixuan[1];
   			this.gongneng = this.saixuan[2];
   			console.log(this.saixuan);
   			this.getgoodList();
		},
   		remove(index){
   			this.$delete(this.saixuan,index);
   			this.brand = this.saixuan[0];
   			this.sex = this.saixuan[1];
   			this.gongneng = this.saixuan[2];
   			this.getgoodList();
   		},
   		delsaixuan(){
   			this.saixuan =[];
   			this.brand = this.saixuan[0];
   			this.sex = this.saixuan[1];
   			this.gongneng = this.saixuan[2];
   			this.getgoodList();
   		},
        addToCart (item) {
        	if(this.$store.state.token){
        		if(item.productNum>0){
        			// 取出商品的图片
		        	this.dropImage = item.productSrc;
				    this.showMoveDot = [...this.showMoveDot, true];
				    this.elLeft = event.target.getBoundingClientRect().left;
		      		this.elTop = event.target.getBoundingClientRect().top;
		      		console.log(item.fiveType);
					axios.post("/goods/addgoodcarts",{
		              productId:item.productId,
		              salePrice:item.salePrice,
		              productSrc:item.productSrc,
		              productName:item.productName,
		              colorType:item.colorType,
		              collectNum:item.collectNum,
		              sexType:item.sexType,
		              functionType:item.functionType,
		              fiveType:item.fiveType,
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
        			this.$message.error('商品已卖光！!!');
        		}	
        	}else{
        		this.$message.error('请先登录哦！!!');	
        	}	
		 },
		beforeEnter (el) {
	      // 设置transform值
	      el.style.transform = `translate3d(${this.elLeft -100}px,${this.elTop - 240}px , 0)`;
	      // 设置透明度
	      el.style.opacity = 0;
	   	},
	   	afterEnter (el) {
	      // 获取底部购物车徽标
	      const badgePosition = document
	        .getElementById("car")
	        .getBoundingClientRect();
	      // 设置小球移动的位移
	      el.style.transform = `translate3d(${badgePosition.left - 100}px,${badgePosition.top - 100}px,0)`
	      // 增加贝塞尔曲线  
	      el.style.transition = 'transform .76s cubic-bezier(0.42,0,1,1)';
	      el.style.transition = 'transform .76s lear';
	      this.showMoveDot = this.showMoveDot.map(item => false);
	      // 设置透明度
	      el.style.opacity = 1;
	  	},	
        prdetails(productId) {
        	this.$router.push({
	  			path:"/prdetails?productId="+productId  			
	  		})
        },
	},
	components:{
    	"esp-header":EspHeader,
    	"esp-footer":EspFooter,
    	"esp-paging": EspPaging
    },
}
</script>

<style lang="scss">
.pr_list{
	width: 1320px;
    margin: 30px auto 30px;
    position: relative;
    .prlist_up{
    	position: relative;
    	background: #e1e2e3;
    	.up_wu{
    		height: 50px;
    		line-height: 50px;
    		background: #999999;
    		.wu_icon{
    			margin-left: 10px;
    			float:left;
    			
    			i{
	    			font-size: 24px;		
    			}
    			span{
    				margin-left: 10px;	
    			}	
    		}
    		.fuxuan{
    			float: right;
    			margin-right: 30px;
    		}	
    	}
    	.down_sai{
    		height: 230px;
    		padding: 10px 20px;
    		.sai{
				width: 100%;
				height: 100%;
				button{
					height: 30px;
					line-height: 18px;
					background: #999999;
					border-radius: 8px;
					border: none;
					padding: 8px;
					margin-left: 150px;
				}				
				mark{
					width: 100%;
					height: 30px;
					margin-left: 10px;
					padding: 5px;
					background: #FA6F57;
					color: #fff;
					a{
						i{
							font-size: 12px;
							margin-left: 5px;
						}
					}
				}
				.saicon{
					width: 100%;				
					ul{
						li{						
							float: left;
							margin: 10px 0 10px 0;
							height: 40px;
							width: 90%;
							line-height: 20px;						
							border: 1px solid #999999;
							h1{
								height: 30px;
								line-height: 30px;
								padding: 5px 10px;
								background: #999999;
								display: inline-block;
							}
							a{
								display: inline-block;
								margin: 0 0 0 30px;
								padding: 10px;
								font-size: 14px;
								font-weight: 600;
								color: #BD2C00;								
							}							
						}
					}					
				}		    
			}
    	}
    }
    .prlist_sort{
    	position: relative;
    	height: 40px;
    	margin: 15px 0;
		background: #999999;
		.liss{
    			a{color: #FA6F57;}
    			background: #fff;
				border-top-color: #FA6F57; 
		}  	
    	li{    		
    		display: inline-block;
    		height: 33px;
    		line-height: 35px;
    		width: 100px;
    		font-size: 14px;
    		color: #fff;
    		border-top: 6px solid #999999;
    		border-left: 1px solid #999999;
    		border-right: 1px solid #999999;
    		padding:0 10px; 
    		text-align: center;    		
    		&:hover{
    			a{
    				color: #FA6F57;
    			}
    			background: #fff;
    			border-top-color: #FA6F57;   			
    		}	
		} 
		
    	.price{
    		display: inline-block;
    		margin-left: 300px;
    		color: yellow;
    		.pricelist{
    			display: inline-block;
    			font-size: 12px;
    			width: 125px;
    			height: 35px;
	    		line-height: 30px;
	    		margin: 0 10px;	
	    		text-align: center;
	    		border-radius: 12px;
	    		.el-input__inner{
	    			height: 30px;
	    			line-height: 30px;
	    			border-color: orangered;
	    		}
	    		.el-input__inner:hover {
				    border-color: yellow;
				}	
    		}
    	} 	
    }
    .prlist_list{
    	position: relative;
    	width: 100%; 
		height: 744px;
    	.move_dot {
		    position: fixed;
	        z-index: 100;
	        top: 0px;
	        left: 0px;
	        height: 240px;
	        width: 240px;  
	        img{
	        	width: 100%;
	        	height: 100%;
	        	animation: 0.88s xun ease-in-out;
	        	
	        }
	     }
	     @keyframes xun {
		    0% {
		      transform: scale(1);
		    }
		    25% {
		      transform: scale(0.8);
		    }
		    50% {
		      transform: scale(0.6);
		    }
		    75% {
		      transform: scale(0.4);
		    }
		    100% {
		      transform: scale(0.05);
		    }
		}
    	.prone{
    		position: relative;
    		width: 240px;
    		height: 350px;  		
    		margin-top: 20px;
    		margin-right: 11px;
    		margin-left: 11px;
		    display: inline-block;
		    border: 1px solid #ededed;
		    box-shadow: 0px 0px 4px #999999;
		    transition: all .5s ease;
		    &:hover{
		    	border-color: #FA6F57;
		    	box-shadow: 0px 0px 3px #FA6F57;
		    }
		    .prone_up{
		    	position: relative;
		    	height: 240px;
		    	width: 100%;
		    	img{
		    		height: 100%;
		    		width: 100%;
		    		&:hover{
	    				cursor: pointer;
	    			}
		    	}
		    }
		    .prone_down{
		    	position: relative;		    	
		    	width: 100%;
		    	.prone_ps{
		    		line-height: 30px;
		    		height: 30px;
		    		h1{
		    			font-size: 20px;
		    			color: #FA6F57;
		    			font-weight: 600;
		    			display: inline-block;
		    			margin-left: 15px;
		    			&:after{
		    				content: '包邮';
		    				background: #FA6F57;
		    				color: #fff;
		    				font-size: 12px;
		    				padding: 1px;
		    				margin-left: 5px;
		    			}
		    		}
		    		span{
		    			color: #666666;
		    			font-size: 12px;
		    			float: right;
		    			margin-right: 15px;
		    		}
		    	}
		    	.prone_title{
		    		height: 40px;
					line-height: 15px;
		    		p{
		    			position: relative;
		    			font-size: 12px;
				    	font-weight: 500;
					    display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					    margin: 0 20px;				    					    
					    max-width: 200px;
					    &:hover{
					    	a{
					    		border-bottom: 1px solid #FA6F57;
					    		color: #FA6F57;
					    		cursor: pointer;
					    	}			    	
					    }					    
		    		}
		    	}
		    	.prone_button{
		    		height: 40px;		    	    		
		    		h1{
		    			position: relative;
		    			display: inline-block;		    			
		    			height: 35px;
		    			line-height: 35px;
		    			width: 35px;
		    			border-radius: 50%;
		    			background: #FA6F57;
		    			margin: 0 10px 0 10px;
		    			transition: all ease .5s;
		    			text-align: center;
		    			a{		    				
		    				i{
		    					font-size: 20px;
		    					color: #fff;
		    				}   				
		    			}
		    			&:hover{
		    				background: #000000;
		    				cursor: pointer;
		    			}		    					    			
		    		}
		    		h2{
		    			
		    			font-size: 12px;
		    			float: right;
		    			line-height: 40px;
		    			margin-right: 10px;
		    			color: #FA6F57;
		    			max-width: 63px;
	    			    white-space: nowrap;
		    			overflow: hidden;
		    		}
		    	}
		    }
    	}
    }   
}
</style>