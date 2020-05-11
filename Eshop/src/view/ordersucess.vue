<template>
	<div>
		<esp-header></esp-header>
		<div class="myaddress">
			<div class="myaddress_down">
				<div class="myaddress_up">
					<h1>订单成功</h1>
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
			
		}
	},
	computed: {
	    
	},
	mounted:function(){
		
	},
	methods :{
		
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
}
</style>