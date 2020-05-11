import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
    count: 0,
    pagecount: '', //总页数
    pagenum: 1,
    good:[],
    goodcartList:[],
    token:sessionStorage.getItem('token') , 
    //state中的全部数据
},
mutations = {
	set_token(state,data){                           
        state.token = data;
        window.sessionStorage.setItem('token',data); //临时存储--刷新保留--窗口关闭消失
   },
    nopoint(state, data){
        if(data != state.pagenum){
            state.pagenum = data;
        }
        console.log('现在在'+state.pagenum+'页');
    },
    pageClick(state){
    	state.pagenum--;
        console.log('现在在'+state.pagenum+'页'); 
    },
    sendData(state){
    	state.pagenum++;
    	console.log('现在在'+state.pagenum+'页'); 
    },
	getgoodsList(state) {
		axios.get("goods/goodsList").then((response)=>{
  			let res = response.data;
  			if(res.status=="0"){
  				state.good = res.result;
  			}else{
  				state.good = {};
  			}
  		})
	},
	getgoodcartList(state){
		if(state.token){
			axios.get("users/getgoodcartList").then((response)=>{
	  			let res = response.data;
	  			if(res.status=="0"){
	  				state.goodcartList = res.result; 
                }else{
	  				state.goodcartList = {};
	  			}
	  		})
		}else{
			return '';
		}		
	},
},
getters = {
    pages: function(state){
      let left = 1;
      let right = state.pagecount;
      let kong = [];
      if(state.pagecount>= 5){
      	//这里最大范围从3到6，如果到达7，那么下边加2变成9，已经超过最大的范围值
        if(state.pagenum > 3 && state.pagenum < state.pagecount-1){
        	//以4为参考基准，左面加2右边加2
                left = state.pagenum - 2
                right = state.pagenum + 2
        }else{
            if(state.pagenum<=3){
                left = 1
                right = 5
            }else{
                right = state.pagecount
                left = state.pagecount -4
            }
        }
     }
    while (left <= right){
        kong.push(left)
        left ++
    }
    console.log(kong);
    return kong
   }
},
actions = {
   
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})