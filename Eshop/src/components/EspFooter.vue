<template>
	<div>
		<div class="footer">
			<div class="footerr">
				<div class="footer_l">
					<h5>浏览指南</h5>
					<ul>
						<li>特色介绍</li>
						<li>购物头条</li>
						<li>手机专栏</li>
						<li>热门商品</li>
						<li>常见问题</li>
						<li>联系客服</li>
					</ul>
				</div>
				<div class="footer_c">
					<h5>更多购物网站</h5>
					<ul>
						<li>淘宝网</li>
						<li>京东商城</li>
						<li>一号店</li>
						<li>苏宁易购</li>
					</ul>
				</div>
				<div class="footer_r">
					<h5>商品购买指引</h5>
					<ul>
						<li>配送服务</li>
						<li>特色专业定制</li>
						<li>大众喜爱</li>
						<li>24小时服务</li>
						<li>联系客服</li>
					</ul>
				</div>
				<div class="footer_down">	
					<a href="#">关于我们</a>
					<span>|</span>
					<a href="#">联系我们</a>
					<span>|</span>
					<a href="#">广告招商</a>
					<span>|</span>
					<a href="#">更多帮助</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	.footer{
		float: left;
		width: 100%;
		background: #FA6F57;
		.footerr{
			height: 260px;
			width: 1320px;
			margin: 0 auto;			
			text-align: center;
			background: #FA6F57;
			h5{
				font-size: 16px;
				height: 50px;
				line-height: 50px;
				font-weight: 800;	
			}
			li{
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				color: #333333;
				&:hover{
					cursor: pointer;
					color: #fff;
				}
			}
			.footer_l{
				height: 200px;
				float: left;
				width:300px;
				margin-left: 200px;
				border-bottom: 1px solid #333333;
			}
			.footer_c{
				height: 200px;
				width:300px;
				float: left;			
				border-bottom: 1px solid #333333;
			}
			.footer_r{
				height: 200px;
				width:300px;
				float: left;
				border-bottom: 1px solid #333333;
			}
			.footer_down{
				height: 60px;
				position: relative;
				width: 400px;	
				line-height:60px;
				margin-left: 460px;
				a{
					font-size: 14px;
					&:hover{
						color: #fff;
					}
				}		
			}
		}		
	}
</style>>