<template>
	<div>
		<div class="onav">			
			<span @click="shaiorder('shai5')" id="spanid5" style="background: #B100DD;">全部订单</span>
			<span @click="shaiorder('shai1')"  id="spanid1" style="background: #EEEE00;">待发货</span>
			<span @click="shaiorder('shai2')" id="spanid2" style="background: #42B983;">待收货</span>
			<span @click="shaiorder('shai3')" id="spanid3" style="background: #005FEE;">待评价</span>
			<span @click="shaiorder('shai4')" id="spanid4" style="background: #EE0030;">待付款</span>	
			<div class="search">
				<el-input v-model="search" placeholder="请输入内容"></el-input>
			</div>
			<span @click="editorder('search')" style="background: #000;">搜索订单</span>	
		</div>
		<div class='popContainer' v-show="kuang">
			<div class="details_commentk">
				<textarea
				  type="text"
				  placeholder="请输入内容/100字内"
				  v-model="commentCon"
				  maxlength="100"
				  class="comment" 
				  name="commentCon"
				  data-type="commentCon"
				>
				</textarea>
				<div class="commentbt">
					<el-button @click="editComment('open')" type="success" round>提交</el-button>
					<el-button @click="editComment('close')" type="danger" round>关闭</el-button>
				</div>
			</div>
		</div>
		<div class="order" v-for="item in orderlist" :key="item.orderId">
			<div class="orderone">
				<div class="orderone_u">
					订单号  :
					<span>{{item.orderId}}</span>
					订单状态：
					<span>{{item.orderstate}}</span>
					交易时间：
					<span>{{item.createdate}}</span>
					<el-button type="danger" style="background:#EE0030" v-if="item.orderstate=='待付款'">前往付款</el-button>
					<el-button type="danger" v-if="item.orderstate=='待收货'"  @click="editorder('shou',item.orderId)">确认收货</el-button>
				</div>
				<div class="orderone_c">
					<li v-for="itemli in item.goodList" :key="itemli.productId">
						<img :src="itemli.productSrc" />
						<p>{{itemli.productName}}</p>
						<h2>{{itemli.salePrice | currency('￥')}}</h2>
						<h2>x {{itemli.buynum}}</h2>
						<h2>{{(itemli.salePrice * itemli.buynum) | currency('￥')}}</h2>		
						<el-button type="danger" round v-if="item.orderstate=='待评价'" @click="editorder('com',itemli.productId,item.orderId)">商品评价</el-button>
						<el-button type="danger" round v-if="item.orderstate=='已评价'" @click="editorder('com',itemli.productId,item.orderId)">追加评价</el-button>
						<div style="height: 1px;width: 1000px; background: #000000; margin: 20px 30px; "></div>
					</li>
				</div>
				<div class="orderone_d">
					总金额  :
					<span>{{item.orderTotalprice | currency('￥')}}</span>
					<el-button type="danger" @click="editorder('del',item.orderId)" v-if="item.orderstate=='待发货'||item.orderstate=='待付款'">取消订单</el-button>
					<el-button type="danger" @click="editorder('del',item.orderId)" v-if="item.orderstate=='待评价'||item.orderstate=='已评价'">删除订单</el-button>
					<el-button type="danger" @click="editorder('see',item.orderId)" style="background: #10DEDE;">查看订单</el-button>
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
			orderlist:[],
			list:[],
			kuang:false,
			commentCon:'',
			productId:'',
			Id:'',
			orderstate:'',
			search:'',
		}	
	},
	computed: {
	
	},
	methods:{
		editComment(ka){
			if(ka=='open'){
	    		let commentCon = this.commentCon;
	    		axios.post("/goods/commentgood",{
	      			productId:this.productId,
	      			orderId:this.Id,
	      			commentCon:commentCon
	    		}).then((response)=>{
    				let res = response.data;
    				if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，评价成功',
				          type: 'success'
				        });
				        this.kuang=false;
						this.getorderlist();
	                }else{
	                	this.$message.error('评价失败，请重试');
	                }	
	    		})
			}else if(ka=='close'){
				this.kuang =false;
			}
		},
		editorder(edit,orderId,id){
			if(edit=='see'){
				this.$router.push({
					path:"/orderdetail?orderId="+orderId
				});
			}else if(edit=='del'){	
				this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		       }).then(() => {				
					axios.post("/users/removeorder",{
						orderId:orderId
					}).then((response)=>{
						let res = response.data;
						if(res.status=="0"){
					    	this.$message({
					          message: '恭喜你，删除该订单成功',
					          type: 'success'
					        });
					        this.getorderlist();
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
			}else if(edit=='com'){
				this.kuang =true;	
				this.productId = orderId;	
				this.Id = id;
			}else if(edit=='shou'){
				axios.post("/users/stateorder",{
					orderId:orderId
				}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
				    	this.$message({
				          message: '恭喜你，确定收货成功',
				          type: 'success'
				        });
						this.getorderlist();
				    }else{
				    	this.$message.error('失败，请重试');
				    }	
				})
			}else if(edit=='search'){
				axios.get("users/searchorder",{
					params:{
      					search:this.search
      				}
				}).then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.orderlist = res.result;
      				this.orderlist=this.orderlist.filter(item => item.userId==this.$store.state.token);
      				if(this.orderlist==''){
      					this.$message.error('无搜到相关商品，请切换');
      				}
      			}else{
      				this.orderlist = {};
      			}
      			})
			}
		},
		shaiorder(edit){
			if(edit=='shai1'){
				this.orderlist = this.list;
				this.orderstate = document.getElementById("spanid1").innerHTML;
				this.orderlist=this.orderlist.filter(item => item.orderstate==this.orderstate);
			}else if(edit=='shai2'){
				this.orderlist = this.list;
				this.orderstate = document.getElementById("spanid2").innerHTML
				this.orderlist=this.orderlist.filter(item => item.orderstate==this.orderstate);
			}else if(edit=='shai3'){
				this.orderlist = this.list;
				this.orderstate = document.getElementById("spanid3").innerHTML
				this.orderlist=this.orderlist.filter(item => item.orderstate==this.orderstate);
			}else if(edit=='shai4'){
				this.orderlist = this.list;
				this.orderstate = document.getElementById("spanid4").innerHTML
				this.orderlist=this.orderlist.filter(item => item.orderstate==this.orderstate);
			}else if(edit=='shai5'){
				this.orderlist = this.list;
			}
		},
		getorderlist() {
			axios.get("users/getorderlist").then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){
      				this.orderlist = res.result;
      				this.list = this.orderlist;
      			}else{
      				this.orderlist = {};
      			}
      		})
		},
	},
	mounted: function () {	  
    	this.getorderlist();
	},
	components:{
    	
    },
}
</script>

<style lang="scss">
.onav{
	width: 100%;
	height: 50px;
	background: #FA6F57;
	i{
		font-size: 25px;
		padding: 5px;
		color: #fff;
		border-radius: 50%;
		background: #000000;
	}
	span{
		padding: 10px;
		border-radius: 15px;
		margin-left: 20px;
		line-height: 50px;
		font-size: 12px;
		font-weight: 600;
		color:#fff;
		&:hover{
			cursor: pointer;
		}
	}
	.search{
		display: inline-block;
		margin-left: 250px;
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
.order{
	width: 100%;
	margin: 20px 0;
	.orderone{
		margin: 25px 20px;
		box-shadow: 0px 0px 4px #FA6F57;
		border: 1px solid #000;
		.orderone_u{
			padding: 15px 20px;
			span{
				height: 20px;
				color: red;
				margin-right:  80px;
			}
			.el-button{
				width: 70px;
				padding: 5px;
				border-color: #FA6F57;
				background: #42B983;
				span{
					font-size: 14px;
					color: #fff;	
				}
			}
		}
		.orderone_c{
			li{
				height:80px;		
				img{
					width: 60px;
					height: 60px;
					margin: 5px 0 0 30px;
					float: left;
				}
				p{
					width: 200px;
					margin: 20px 30px;
					font-size: 14px;
					float: left;
					max-width: 200px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;						
				}
				h2{
					margin: 20px 35px;
					float: left;
				}
				.el-button{
					margin: 10px 80px;
					background: #005FEE;
				}
			}
		}
		.orderone_d{
			margin: 10px 30px;
			span{
				margin: 0 20px;
				font-size: 20px;
				color: red;
			}
			h1{
				display: inline-block;
			}
			.el-button{
				margin-left: 150px;
				padding: 5px;
				border-color: #000000;
				span{
					font-size: 14px;
					color: #000000;	
				}
			}
		}
	}
	
}
</style>