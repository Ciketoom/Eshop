<template>
	<div>
		<esp-header></esp-header>
		<div class="details">
			<div class="details_main">
				<h1 class="details_title">{{newdetails.newTitle}}</h1>
				<p class="author">{{newdetails.newAuthor}}</p>
				<p class="details_date">{{newdetails.newDate}}</p>
				<div class="details_con">
					<div class="details_img"><img :src="newdetails.newImage"/></div>
					<p class="details_content">
						{{newdetails.newContent}}
					</p>
					<p class="details_source">
						"消息来源:"
						<span>Eshop官网</span>
					</p>
					<p class="details_comment">
						<i class="iconfont iconpinglun" @click="openComment"></i>
					</p>
					<div class='popContainer'v-show="kuang">
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
								<el-button @click="editComment" type="success" round>提交</el-button>
								<el-button @click="closeComment" type="danger" round>关闭</el-button>
							</div>
						</div>
					</div>
					<div class="content_list">	
						<p class="content_title">
							全部评论	
						</p>
						<div class="content_item" v-for="item in comment">
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
										<i class="iconfont iconthumbup-fill" v-on:checkZan="checkZan(item)" :class="{zancheck:item.zanCheck=='1'}"  @click="editZan(item)"></i>
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
import axios from 'axios'
export default {
	data(){
		return{
			kuang:false,
			commentCon:'',
			newdetails:[],
			commentList:[],
		}
	},
	computed: {
	    comment: function() {
	      return this.commentList.sort((a,b)=>Date.parse(b.commentDate)-Date.parse(a.commentDate));//升序
	    }
	},
	mounted:function(){
		this.getnewsdetails();
		
	},
	methods :{
		getnewsdetails() {
			let newId = this.$route.query.newId;
			axios.get("news/newsdetails",{
				params:{
      				newId:newId
      			}
			}).then((response)=>{
      			let res = response.data;
      			console.log(res);
      			if(res.status=="0"){
      				this.newdetails = res.result;
      				this.commentList = res.result.commentList;	
      			}else{
      				this.newdetails = {};
      			}
      		})
		},
		editZan(item){
			if(item.zanCheck=="1"){
				item.commentZan--;
				item.zanCheck = item.zanCheck=="0"?'1':'0';
			}else{
				item.commentZan++;
    			item.zanCheck = item.zanCheck=="0"?'1':'1';
			}

    		axios.post("/news/zanEdit",{
      			newId:this.newdetails.newId,	
      			commentZan:item.commentZan,
    			commentId:item.commentId,
    			zanCheck:item.zanCheck,
    		}).then((response)=>{
    				let res = response.data;
    				
    		})
    	},
    	editComment() {
    		let newId = this.newdetails.newId;
    		let commentCon = this.commentCon;
    		axios.post("/news/comedit",{
      			newId:newId,
      			commentCon:commentCon
    		}).then((response)=>{
    				let res = response.data;
    				console.log(res);
    				this.kuang = false;
    				this.getnewsdetails()
    		})
    	},
    	closeComment() {
    		this.kuang =false;
    	},
    	openComment() {
    		this.kuang =true;  
    		
    	},
    	
	},
	components:{
    	EspHeader,
    	EspFooter
   },
}
</script>

<style lang="scss">
	.header_back{	
		background:  linear-gradient( #4D4D4D , #8CA1A7);
	}
	.footer_back{
		background:  linear-gradient( to top , #4D4D4D ,#8CA1A7);
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
	.details{
	    width: 1005px;
	    
	    overflow: hidden;
	    margin: 0 auto 40px;
	    
	    .details_main{
	    	width: 100%;
	    	float: left;
	    	.details_title{
    		    font-size: 24px;
			    font-weight: 400;
			    margin-bottom: 10px;
			    line-height: 50px;
			    margin-top: 20px;
			    text-align: center;
	    	}
	    	.author{
	    		width: 500px;
    		    color: #666;
    		    float: left;
			    font-size: 14px;
			    padding-bottom: 16px;
			    margin-bottom: 26px;
			    border-bottom: 1px solid #ccc;
	    	}
	    	.details_date{
	    		width: 505px;
	    		float: left;
	    		text-align: right;
	    		color: #666;
			    font-size: 14px;
			    padding-bottom: 16px;
			    margin-bottom: 26px;
			    border-bottom: 1px solid #ccc;
	    	}
	    	.details_con{
	    		width: 100%;
	    		margin-top: 100px;
	    		.details_img{
	    			width: 70%;
	    			margin: auto;
	    			height: 400px;
	    			img{
	    				width: 100%;
	    				height: 100%;
	    			}
	    		}
	    	}
	    	.details_content{
	    		font-size: 16px;
	    		line-height: 50px;
	    		margin-top: 50px;
	    		letter-spacing: 3px;
	    		text-indent: 2em;
	    	}
	    	.details_source{
	    		color: #999;
			    font-size: 12px;
			    line-height: 50px;
			    float: left;
			    span{
			    	color: #CB0001;
			    }
	    	}
	    	.details_comment{
			    font-size: 20px;
			    line-height: 50px;
			    float: right;
			    i{
			    	font-size: 26px;
			    }
			    &:hover{
			    	i{
			    		color: #CB0001;
			    		cursor: pointer;
			    		
			    	}
			    }
	    	}
	    	
	    	.content_list{
	    		margin-bottom: 20px;
	    		margin-top: 80px;
	    		.content_title{
    			    font-size: 18px;
				    padding-bottom: 10px;
				    border-bottom: 1px solid #f2f2f2;
	    		}
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
	    }
	}
</style>