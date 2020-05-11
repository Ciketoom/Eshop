<template>
	<div>
		<div class="cnav">			
			<i class="iconfont iconforward"></i>
		</div>
		<div class="cshou">
			<ul>
				<li v-for="(item, index) in collectList">
					<img @click="seegooddetail(item.productId)" :src="item.productSrc"/>
					<p><a>{{item.productName}}</a></p>
					<h1>{{item.salePrice | currency('￥')}}</h1>
					<span><i class="iconfont iconshanchu" @click="delcollect(item.productId)"></i></span>
				</li>	
			</ul>		
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			collectList:[],
		}	
	},
	methods:{
		getcollectList() {
			axios.get("users/collectList").then((response)=>{
      			let res = response.data;
      			console.log(res);
      			if(res.status=="0"){
      				this.collectList = res.result;
      			}else{
      				this.collectList = {};
      			}
      		})
		},
		delcollect(id) {
			this.$confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
        		let productId = id;
				axios.post("users/delcollect",{
	      			productId:productId,
	    		}).then((response)=>{
	      			let res = response.data;
	      			if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，删除该收藏成功',
				          type: 'success'
				        });
				        this.getcollectList();
	                }else{
	                	this.$message.error('删除该收藏失败，请重试');
	                }
	      		})	
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		seegooddetail(productId){
			this.$router.push({
				path:"/prdetails?productId="+productId
			});
		}
	},
	mounted: function () {	  
    	this.getcollectList();
	},
	components:{
    	
    },
}
</script>

<style lang="scss">
.cnav{
	width: 100%;
	height: 50px;
	background: #FA6F57;
	i{
		font-size: 25px;
		float: right;
		padding: 10px;
	}
}
.cshou{
	position: relative;
	width: 100%;
	margin: 10px 0;
	ul{
		li{
			display: inline-block;
			height: 260px;
			margin: 15px  0 0 20px;
			text-align: center;
			box-shadow: 0px 0px 4px #999999;
			border: 1px solid #000000;
			img{
				width: 190px;
				height: 190px;
				&:hover{
						cursor: pointer;
						
					}
			}
			p{
				height: 35px;
				line-height: 18px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			    margin: 0 20px;				    					    
			    max-width: 150px;
			    font-size: 12px;
			    &:hover{
			    	a{
			    		border-bottom: 1px solid #FA6F57;
			    		color: #FA6F57;
			    		cursor: pointer;
			    	}			    	
			    }			
			}
			h1{
				height: 30px;
				line-height: 30px;
				color: red;
				font-weight: 600;
				display: inline-block
			}
			span{
				margin-left: 50px;
				i{
					color: #BD2C00;
					&:hover{
						cursor: pointer;
						
					}
				}
			}
		}
	}
	
	
}
</style>