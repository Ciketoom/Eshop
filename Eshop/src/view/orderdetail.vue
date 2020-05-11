<template>
	<div>
		<esp-header></esp-header>
		<div class="myaddress">
			<div class="myaddress_down">
				<div class="myaddress_up">
					<h1>订单商品信息</h1>
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
					<li v-for="(item, index) in orderdetail.goodList" :key="index">
						<div class="list_xinxi">
							<img :src="item.productSrc"/>
							<span><p>{{item.productName}}</p></span>
						</div>
						<div class="list_danjia">
							<span>￥{{item.salePrice}}</span>
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
							<span>￥{{(item.salePrice * item.buynum)}}</span>
						</div>
					</li>
				</div>
			</div>
			<div class="myaddress_center">
				<div class="addresslist">
					<div class="myaddress_up">
						<h1>发货地址</h1>
					</div>
					<ul>
						<li>
							<div class="address_u">
								<h1>玉皇大帝</h1>
								<h1>13844566688</h1>								
								<el-button  type="danger" round>528694</el-button>		
							</div>
							<p>广东省广州市天河区天河西路66号</p>
						</li>
					</ul>
				</div>
				<div class="addresslist">
					<div class="myaddress_up">
						<h1>收货地址</h1>
					</div>
					<ul>
						<li v-for="item in orderdetail.chooseaddress">
							<div class="address_u">
								<h1>{{item.userName}}</h1>
								<h1>{{item.tel}}</h1>								
								<el-button  type="danger" round>{{item.postCode}}</el-button>		
							</div>
							<p>{{item.streetName}}</p>
						</li>
					</ul>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>订单状态及金额</h1>
					</div>
					<ul>
						<li style="background: #FA6F57; color: #000000;">{{orderdetail.orderstate}}</li>
						<li style="background: #FA6F57;">￥{{orderdetail.orderTotalprice}}</li>
					</ul>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>支付方式</h1>
					</div>
					<ul>
						<li style="background: #00CCFF;">支付宝</li>
					</ul>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>交易时间及发票类型</h1>
					</div>
					<ul>
						<li style="background: #FA6F57; ">{{orderdetail.createdate}}</li>
						<li style="background: #FA6F57; ">{{orderdetail.invoice}}</li>
					</ul>
				</div>
				<div class="zhifu">
					<div class="myaddress_up">
						<h1>邮费及邮寄方式</h1>
					</div>
					<ul>
						<li style="background: #00EE5F;">商品包邮</li>
						<li style="background: #EE9900;">快递随机</li>
					</ul>
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
			orderdetail:[],	
		}
	},
	computed: {
	  
	},
	mounted:function(){
		this.getorderdetail();
	},
	methods :{
		getorderdetail(){
			let orderId = this.$route.query.orderId;
			axios.get("users/orderdetail",{
				params:{
      				orderId:orderId
      			}
			}).then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.orderdetail = res.result; 
      			}else{
      				this.orderdetail  = {};
      			}
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
			ul{
				margin: 20px 0;
				li{
					width: 300px;
					height: 100px;
					background: #FA6F57;
					border: 1px solid #000000;
					display: inline-block;
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
						.el-button{
							padding: 5px;
							background: #000000;
							span{
								font-size: 12px;
								margin: 0;
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
				height: 100px;
				line-height: 100px;				
				border-bottom: 1px solid #FA6F57;
				padding: 5px 0;
				text-align: center;
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
							max-width: 200px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 4;
							overflow: hidden;	
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
	}
}
</style>