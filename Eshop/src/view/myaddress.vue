<template>
	<div>
		<esp-header></esp-header>
		<div class="myaddress">
			<div class="myaddress_center">
				<div class="addresslist">
					<div class="myaddress_up">
						<h1>地址选择</h1>
					</div>
					<ul>
						<li v-for="(item, index) in xianaddressList" @click="seladdress(index)" :key="item.addressId" :class="{'chooseaddress': choose == index }">
							<div class="address_u" >
								<h1>{{item.userName}}</h1>
								<h1>{{item.tel}}</h1>								
								<span @click="editaddress('open')">修改</span>
								<el-button  type="danger" round>{{item.postCode}}</el-button>			
							</div>
							<p>{{item.streetName}}</p>
						</li>
					</ul>
					<div class="list_down">
						<h1 @click="seealladdress()">显示全部地址</h1>
						<h1 @click="gotoaddress()">管理收货地址</h1>
					</div>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>支付选择</h1>
					</div>
					<ul>
						<li style="background: #00CCFF; border: 1px solid #000000;">支付宝</li>
					</ul>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>邮费及邮寄方式</h1>
					</div>
					<ul>
						<li style="background: #00EE5F; border: 1px solid #000000;">商品包邮</li>
						<li style="background: #EE9900; border: 1px solid #000000;">快递随机</li>
					</ul>
				</div>
			</div>
			<div class="myaddress_down">
				<div class="myaddress_up">
					<h1>确认订单信息</h1>
				</div>
				<div class="myaddress_dh">
					<ul>
						<li>商品信息</li>
						<li>单价</li>
						<li>颜色类型</li>
						<li>大小类型</li>
						<li>购买数量</li>
						<li>金额</li>
					</ul>
				</div>
				<div class="myaddress_dl">
					<li v-for="item in goodList" :key="item.productId">
						<div class="list_xinxi">
							<img :src="item.productSrc"/>
							<span><p>{{item.productName}}</p></span>
						</div>
						<div class="list_danjia">
							<span>{{item.salePrice | currency('￥')}}</span>
						</div>
						<div class="list_color">
							<span>{{item.color}}</span>
						</div>
						<div class="list_size">
							<span>{{item.size}}</span>
						</div>
						<div class="list_num">
							<span>x {{item.buynum}}</span>
						</div>
						<div class="list_jine">
							<span>{{(item.salePrice * item.buynum) | currency('￥')}}</span>
						</div>
					</li>
				</div>
				<div class="myaddress_dd">
					<div class="myaddress_up">
						<h1>留言备注</h1>
					</div>
					<div class="liuran">			
						<el-input
						  type="textarea"
						  :autosize="{ minRows: 2, maxRows: 4}"
						  placeholder="请输入内容"
						  v-model="liuyan">
						</el-input>
					</div>
					<div class="fapiao">
						<el-radio v-model="invoice" label="个人发票">个人发票</el-radio>
  						<el-radio v-model="invoice" label="单位发票">单位发票</el-radio>
					</div>
					<div class="tijiao">
						<span>订单金额  :</span>
						<el-button type="danger" round>{{Totalprice | currency('￥')}}</el-button>
						<el-button @click="generateorder()" type="danger" round >提交订单</el-button>
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
import axios from 'axios'
export default {
	data(){
		return{
			invoice: '个人发票',
			choose:"a",
			xian:'6',
			liuyan:'',
			addressList:[],
			goodcartList:[],
			goodList:[],
			orderyan:[],
		}
	},
	computed: {
	    Totalprice(){
		 	let totalprice = 0;
		 	this.goodList.forEach((item)=>{
		 		if(item.check=='1'){
		 			totalprice += parseFloat(item.salePrice)*parseInt(item.buynum);
		 		}
		 	})
		 	return totalprice;
		},
		xianaddressList() {
      		return this.addressList.slice(0,this.xian);
      	},
      	chooseaddress(){
      		return this.addressList[this.choose];
      	}
	},
	mounted:function(){
		this.deaddress();
		this.getgoodcartList();
	},
	methods :{
		//生成新订单
		generateorder(){
			if(this.goodList!==''){
				if(this.choooseaddress!=''){
					axios.post("/users/generateorder",{
						goodList:this.goodList,
						chooseaddress:this.chooseaddress,
						liuyan:this.liuyan,
						invoice:this.invoice,
						Totalprice:this.Totalprice,
						sexType : this.orderyan.sexType,
						fiveType : this.orderyan.fiveType,
						functionType : this.orderyan.functionType
					}).then((response)=>{
						let res = response.data;
						if(res.status=="0"){
							this.$message({
							message: '恭喜你，提交订单成功',
							type: 'success'
							});
							this.$router.push({
								path:"/ordersucess"	  			
							})
						}else{	
							this.$message.error('提交订单失败，请重试');	
						}
					});
				}else{this.$message.error('地址为空哦，请先添加地址');}
			}else{
				this.$message.error('无购买商品哦！！！');
			}
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
		getgoodcartList(){
			axios.get("users/getgoodcartList").then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.goodcartList = res.result;
      				this.goodList =this.goodcartList.filter(item => item.check==1); 
      				this.orderyan =this.goodList[0];
      			}else{
      				this.goodcartList = {};
      			}
      		})
		},
		seladdress(index){
			this.choose = index;
			console.log(this.chooseaddress);
		},
		seealladdress(){
			if(this.xian==6){
      			this.xian  = this.addressList.length;
      		}else{
      			this.xian =6;
      			this.$message.error('以上就是是全部地址');	
      		}
		},
		gotoaddress(){
			this.$router.push({
	  			path:"/userhome/address"	  			
	  		})
		}
	},
	components:{
    	EspHeader,
    	EspFooter
   },
}

</script>

<style lang="scss">
.myaddress{
	width: 1320px;
	margin: 30px auto;
	.myaddress_up{
		height: 50px;
		line-height: 50px;
		color: #FA6F57;
		border-bottom: 1px solid #000000;
		position: relative;
		h1{
			font-size: 25px;
			font-weight: 600;
			margin: 0 30px;
		}
	}
	.myaddress_center{
		.addresslist{	
			.list_down{
				height: 30px;
				h1{
					display: inline-block;
					margin-right: 500px;
					margin-left: 20px;
					background: #000000;
					color: #fff;
					border-radius: 15px;
					padding: 8px;
					&:hover{
						cursor: pointer;
						color: red;
					}
				}
			}
			ul{
				margin: 20px 0;
				.chooseaddress{
					border: 2px solid #000000;
				}
				li{
					width: 350px;
					background: #FA6F57;
					display: inline-block;
					position: relative;
					margin-left: 20px;
					margin-top: 20px;
					border: 2px solid #fff;
					.address_u{
						padding: 20px 20px 5px 20px;
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
						.el-button{
							margin-left: 10px;
							padding: 0;
							span{
								font-size: 12px;
								padding: 6px;
								border-radius: 15px;
								background: #000000;
								color: yellow;
							}
						}
						
					}
					p{
						padding: 10px 20px 30px 20px;
						line-height: 20px;
						font-size: 14px;
					}
					&:hover{
						cursor: pointer;
					}
				}
			}
		}
		.zhifu{
			ul{
				margin: 20px;
				li{
					padding: 10px;
					color: #fff;
					display: inline-block;
				}
			}
		}
	}
	.myaddress_down{
		.myaddress_dh{
			ul{
				padding:10px 20px;
				li{
					width: 150px;
					height: 50px;
					line-height: 50px;
					margin-left: 20px;
					text-align: center;
					display: inline-block;
					border-bottom: 2px solid #FA6F57;
				}
				li:first-child{
					width: 300px;
				}
			}
		}
		.myaddress_dl{
			padding:10px 20px;
			li{
				height: 80px;
				line-height: 80px;				
				border-bottom: 1px solid #FA6F57;
				padding: 5px 0;
				text-align: center;
				display: inline-block;
				.list_xinxi{
					float: left;
					width: 300px;
					line-height: 15px;
					margin-left: 20px;	
					img{
						height: 80px;
						width: 80px;
						float: left;	
					}
					span{
						font-size: 14px;
						margin-left: 20px;
						p{
							margin-left: 100px;
						}
					}			
				}
				.list_danjia{
					float: left;
					width: 150px;
					margin-left: 20px;
				}
				.list_color{
					float: left;
					width: 150px;
					margin-left: 20px;
				}
				.list_size{
					float: left;
					width: 150px;
					margin-left: 20px;
				}
				.list_num{
					float: left;	
					width: 150px;
					margin-left: 40px;			
					
					i{
						font-size: 20px;
						color: #FA6F57;
						&:hover{
							cursor: pointer;
							
						}
					}
				}
				.list_jine{
					float: left;
					width: 150px;
					margin-left: 20px;	
				}
			}
		}
		.myaddress_dd{
			.liuran{
				width: 500px;
				margin: 20px;
				.el-textarea__inner{
					border-color: #FA6F57;
				}
			}
			margin: 50px 0;
			.fapiao{
				display: inline-block;
				margin-left: 20px;
			}
			.tijiao{
				margin-left: 50%;
				display: inline-block;
					.el-button--danger:last-child{
						background: #000000;
						color: yellow;
						border: none;
						&:hover{
							color: #fff;
						}
					}	
			}
		}
	}
}
</style>