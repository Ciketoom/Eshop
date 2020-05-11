<template>
	<div class="prlist_page">
		<div class="page">
		    <ul>
		        <li v-if="a >1"><a v-on:click="bb()">上一页</a></li>
		        <li v-if="a == 1"><a class="nopoint">上一页</a></li>
		        <!--当前页背景色为蓝色-->
		        <li v-for="index in b"  v-bind:class="{ 'active': a == index}">
		            <a v-on:click="aa(index)" >{{ index }}</a>
		        </li>
		        <li v-if="a<c"><a v-on:click="cc()">下一页</a></li>
		        <li v-if="a == c"><a class="nopoint">下一页</a></li>
		        <li><a>共<i>{{c}}</i>页</a></li> 
		    </ul>
		</div>
	</div>
</template>

<script>
    export default{
        data(){
            return{ }
        },
        mounted(){},
        watch: {  },
        computed:{        	
        	b:function(){
        		return this.$store.getters.pages;
        	}, 
        	a:{
        		get: function () {
			      return this.$store.state.pagenum;
			    },
			　   // setter
			    set: function (newValue) {
			      this.$store.state.pagenum = newValue
			      
			    }
        	}, 	
        	c:function(){
        		return this.$store.state.pagecount;
        	},
        	
        },
        components:{
        	
        },
        methods:{
        	aa: function(data){
        		this.$store.commit('nopoint',data); 
        		this.$parent.getgoodList();
	        },
	        bb: function(){
	            this.$store.commit('pageClick');
	            this.$parent.getgoodList();
	        },
	        cc: function(){
	        	this.$store.commit('sendData');
	        	this.$parent.getgoodList();
	        }   
        }
    }
</script>

<style lang="scss">
	.prlist_page{
    	position: relative;    	
    	.page{
		    margin: 30px auto 10px;
		    width: 400px;
		    height: 60px;
		    line-height: 60px;		    
		    ul{
		    	li{
		    		margin: 0px;
		    		padding: 0px;
		    		list-style: none;
		    		a{
					    border: 1px solid #FA6F57;
					    text-decoration: none;
					    position: relative;
					    float: left;
					    padding: 6px 12px;
					    margin-left: -1px;
					    line-height: 1.42857143;
					    cursor: pointer;
					    &:hover{
					    	background-color: #FA6F57;
					    }
					}
					a.banclick{
					    cursor:not-allowed;
					}
					i{
					    font-style:normal;
					    color: #fff;
					    font-weight: 600;
					    margin: 0px 4px;
					    font-size: 12px;
					}
		    	}
		    	li:first-child>a {
				   margin-left: 0px
				}
				li:last-child>a {
				   background-color: #FA6F57;
				   color: #fff;
				}
				.active a{
				    color: #fff;
				    cursor: default;
				    background-color: #FA6F57;
				    border-color: #FA6F57;
				}
		    }
		} 
    }
</style>