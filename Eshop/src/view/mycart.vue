<template>
	<div>
		<esp-header></esp-header>
		<div class="mycart">
			<div class="mycart_up">
				<h1>我的购物车</h1>
			</div>
			<div class="mycart_center">
				<div class="mycart_ch">
					<ul>
						<li>商品信息</li>
						<li>颜色类型</li>
						<li>大小类型</li>
						<li>单价</li>
						<li>数量</li>
						<li>金额</li>
						<li>操作</li>
					</ul>
				</div>
				<ul>
					<li v-for="(item, index) in goodcartList">
						<div class="list_check">
							<i class="iconfont iconxuanzhong" 
							 v-bind:class="{'check':item.check=='1'}"
							@click="modifygoodCart('sel',item)"></i>
						</div>
						<div class="list_xinxi">
							<img :src="item.productSrc"/>
							<span><p>{{item.productName}}</p></span>
						</div>
						<div class="list_color">
							<span>{{item.color}}</span>
							<el-select 
								v-model="item.color"
								value-key="colorId"
								placeholder="请选择颜色"
								@blur="modifygoodCart('color',item)"
								>
							    <el-option
							      v-for="(itemc, index) in item.colorType"
							      :key="itemc.colorId"
							      :value="itemc.color"
							     >
							    </el-option>
							</el-select>	
						</div>
						<div class="list_size">
							<span>{{item.size}}</span>
							<el-select 
								v-model="item.size"
								placeholder="请选择大小类型"
								@change="modifygoodCart('size',item)">
							    <el-option
							      v-for="(items, index) in sizezong"
							      :key="items.sizeId"
							      :value="items.sizetype"
							      >
							    </el-option>
							</el-select>
						</div>
						<div class="list_danjia">
							<span>{{item.salePrice | currency('￥')}}</span>
						</div>
						<div class="list_num">
							<span><i class="iconfont iconjianshao" @click="modifygoodCart('jian',item)"></i></span>
							<span>{{item.buynum}}</span>
							<span><i class="iconfont icontianjia" @click="modifygoodCart('jia',item)"></i></span>
						</div>
						<div class="list_jine">
							<span>{{(item.salePrice * item.buynum) | currency('￥')}}</span>
						</div>
						<div class="list_edit">
							<el-button type="danger" round @click="removegood(item)">删除</el-button>
							<el-button type="danger" round @click="collectgood(item)">移入收藏夹</el-button>
						</div>
					</li>
				</ul>
			</div>
			<div class="mycart_down">
				<i class="iconfont iconxuanzhong" v-bind:class="{'check': selall }" @click="selectall()"></i>
				<span>全选</span>
				<div class="mycart_dr">
					总金额  : <span>{{Totalprice | currency('￥')}}</span>
					<el-button @click="myaddress" type="danger" round>结算</el-button>
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
			goodcartList:[],
			sizelist:[],
			sizezu:[],
			sizezong:[],
			size:'',
			yantiao:true,
		}
	},
	computed: {
		Totalprice(){
		 	let totalprice = 0;
		 	this.goodcartList.forEach((item)=>{
		 		if(item.check=='1'){
		 			totalprice += parseFloat(item.salePrice)*parseInt(item.buynum);
		 		}
		 	})
		 	return totalprice;
		},
		selall(){
		 	return this.selone == this.goodcartList.length;
		},
		selone(){
	 		let i = 0;
	 		this.goodcartList.forEach((item)=>{
	 			if(item.check=='1')
	 				i++;
	 		})
	 		return i;
		},
	},
	mounted:function(){
		this.getgoodcartList();
	},
	methods :{
		selectall() {
    		let sele = !this.selall;
    		this.goodcartList.forEach((item)=>{
    			item.check = sele?'1':'0';
    		})	
    		axios.post("/users/modifyselect",{
    			selectall:sele
    		}).then((response)=>{
    			let res = response.data;
    			if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，成功更新',
			          type: 'success'
			        });
                }else{
                	this.$message.error('全选商品失败，请重试');
                }
    		})
    	},
		collectgood(item){
			let productId = item.productId;
			let productSrc = item.productSrc;
			let productName = item.productName;
			let salePrice = item.salePrice;
			let collectNum = item.collectNum;
			axios.post("/goods/collectgood",{
              productId:productId,
              salePrice:salePrice,
              productSrc:productSrc,
              productName:productName,
              collectNum:collectNum
            }).then((response)=>{
            	let res = response.data;
                if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，收藏该商品成功',
			          type: 'success'
			        });
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
		},
		removegood(item){
			this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
        		let productId = item.productId;
				axios.post("/users/removegood",{
	      			productId:productId
	    		}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，删除该商品成功',
				          type: 'success'
				        });
				        this.getgoodcartList();
	                }else{
	                	this.$message.error('删除该商品失败，请重试');
	                }
	    		})	
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		getgoodcartList(){
			axios.get("users/getgoodcartList").then((response)=>{
      			let res = response.data;
      			if(res.status=="0"){	
      				this.goodcartList = res.result; 
      			}else{
      				this.goodcartList = {};
      			}
      		})
		},
		modifygoodCart(selec,item){
    		if(selec=='jia') {
    			item.buynum++;       			
    		}else if(selec=='jian'){
    			if(item.buynum<=1){
    				return;
    			}else{
    				item.buynum--;
    			}
    		}else if(selec=='color'){
    			let color = item.color;
    			this.sizelist = item.colorType;
    			this.sizelist.forEach( (item)=>{
					if(item.color == color){
						this.sizezu = item;
	     			}
		 		});
    			this.sizezong = this.sizezu.size;
    		}else if(selec=='size'){
    			let size = item.size;
    			console.log(item.size);
    		}else{
    			item.check = item.check=="1"?'0':'1';			
    		}	
    		let productId = item.productId;
    		axios.post("/users/modifygoodCart",{
    			buynum:item.buynum,
    			productId:productId,
    			color:item.color,
    			size:item.size,
    			check:item.check,
    		}).then((response)=>{
    			let res = response.data;
    			if(res.status=="0"){
	            	this.$message({
			          message: '恭喜你，修改商品信息成功',
			          type: 'success'
			        });
                }else{
                	this.$message.error('修改商品信息失败，请重新修改');
                }
    		})
    	},
		myaddress(){
			if(!this.Totalprice){
				this.$message.error('请选择需要购买的商品哦！');
			}else{
				this.goodcartList.forEach( (item)=>{
					if(item.check == 1){
						if(item.color=="默认"||item.size=="默认"){
							this.yantiao = false;
						}
	     			}
		 		});
		 		if(this.yantiao==true){
		 			this.$router.push({
			  			path:"/myaddress"	  			
			  	})
		 		}else{
		 			this.$message.error('请选择商品颜色和大小类型！');
		 		}
				
			}
			
		}
	},
	components:{
    	EspHeader,
    	EspFooter
   },
}

</script>

<style lang="scss">
.mycart{
	width: 1236px;
	margin: 30px auto;
	.mycart_up{
		height: 50px;
		line-height: 50px;
		background: #FA6F57;
		position: relative;
		h1{
			font-size: 25px;
			font-weight: 600;
			margin: 0 30px;
		}
	}
	.mycart_center{
		
		.mycart_ch{
			border-bottom: 1px solid #888888;
			ul{
				li{
					display: inline-block;
					width: 110px;
					text-align: center;
					border: none;
					height: 50px;
					line-height: 50px;
				}
				li:first-child{
					width: 400px;
				}
				li:last-child{
					width: 180px;
				}
			}
		}
		ul{
			margin: 0 30px;
			li{
				height: 80px;
				line-height: 80px;				
				border-bottom: 1px solid #FA6F57;
				padding: 5px 0;
				text-align: center;
				.list_check{
					float: left;
					width: 50px;
					i{
						font-size: 20px;
						border:1px solid #000000;
						border-radius: 50%;
						color: #fff;
						&:hover{
							cursor: pointer;
						}
					}
					.check{
						color: #FA6F57;
					}
				}
				.list_xinxi{
					float: left;
					width: 350px;
					line-height: 15px;	
					img{
						height: 80px;
						width: 80px;
						float: left;
						border: 1px solid #000000;	
					}
					span{
						font-size: 14px;
						margin-left: 20px;
						p{
							margin-left: 100px;
							max-width: 250px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
						}
					}			
				}
				.list_danjia{
					float: left;
					width: 110px;
				}
				.list_color{
					float: left;
					width: 110px;
					line-height: 30px;
					font-size: 14px;
					margin-left: 7px;
					.el-input__inner{
						border-color: #FA6F57;
						.el-input__icon{
							line-height: 30px
						}
					}
				}
				.list_size{
					float: left;
					width: 110px;
					line-height: 30px;
					font-size: 14px;
					margin-left: 7px;
					.el-input__inner{
						border-color: #FA6F57;
						.el-input__icon{
							line-height: 30px
						}
					}			
				}
				.list_num{
					float: left;
					width: 140px;
					i{
						font-size: 16px;
						color: #FA6F57;
						&:hover{
							cursor: pointer;	
						}
					}
					
				}
				.list_jine{
					float: left;
					width: 110px;

				}
				.list_edit{
					float: left;
					width: 180px;			
					.el-button{
						padding: 5px;
					}
				}
			}
		}
	}
	.mycart_down{
		height: 50px;
		line-height: 50px;
		background: #999999;
		margin: 20px 0;
		i{
			margin-left: 30px;
			font-size: 20px;
			color: #fff;
		}
		.check{
			color: indianred;
			border: 1px solid #fff;
			border-radius: 50%;
		}
		.mycart_dr{
			float: right;
			margin-right: 50px;
			span{
				font-size: 20px;
			}
			.el-button{
				margin-left: 50px;
			}
		}
	}
}
</style>