<template>
    <div>
        <div style="display: inline-block;margin-bottom: 15px;">
			<el-input
	          placeholder="请输入搜索内容"
	          v-model="ordersearch">
	        </el-input>
		</div>
        <el-button type="primary" @click="searchorder()">搜索订单</el-button>  
        <el-button type="primary" @click="borderdel()">批量删除</el-button>   
        <el-table 
			ref="multipleTable" 
			:data="borderlist" 
			tooltip-effect="dark" 
			style="width: 100%" 
			:header-cell-style="{background:'#eef1f6',color:'#606266'}"
			max-height="800"
			:default-sort = "{prop: 'date', order: 'descending'}"
			@selection-change="handleSelectionChange"> 
			<el-table-column 
				type="selection" 
				width="55"> 
			</el-table-column> 
			<el-table-column 
				prop="orderId"
				label="订单Id"
				sortable
                align="center"
				width="220"> 	 
			</el-table-column> 
			<el-table-column 
				prop="orderTotalprice"
				label="订单金额" 
                sortable
				width="120"
				align="center"> 
			</el-table-column>
            <el-table-column 
                prop="chooseaddress[0].userName" 
				label="收货人" 
				align="center"
                width="120"
				show-overflow-tooltip> 
			</el-table-column> 
            <el-table-column 
                prop="chooseaddress[0].tel" 
				label="收货人电话" 
				align="center"
                width="120"> 
			</el-table-column>
            <el-table-column 
                prop="chooseaddress[0].streetName" 
				label="订单地址" 
				align="center"
                width="250"
				show-overflow-tooltip> 
			</el-table-column> 
            <el-table-column 
				prop="createdate"
				label="订单日期" 
                sortable
				align="center"
				width="180"> 
			</el-table-column>
            <el-table-column 
				prop="invoice"
				label="发票类型" 
				align="center"
				width="120"> 
			</el-table-column>
            <el-table-column 
				prop="liuyan"
				label="订单留言" 
				width="150"
                show-overflow-tooltip
				align="center"> 
			</el-table-column> 
			<el-table-column 
				prop="orderstate"
				label="订单状态" 
				align="center"
				width="120"> 
                <template slot-scope="scope">
                    <el-button  style="padding: 8px;" type="danger" @click="editorderstate(scope.row.orderId)" v-if="scope.row.orderstate=='待发货'">确认发货</el-button>
                    <el-button  style="padding: 8px;" type="warning" v-if="scope.row.orderstate=='待付款'">尚未付款</el-button>
                    <el-button  style="padding: 8px;" type="info" v-if="scope.row.orderstate=='待收货'">待收货</el-button>
                    <el-button  style="padding: 8px;" type="success" v-if="scope.row.orderstate=='已评价'">已评价</el-button>
                    <el-button  style="padding: 8px;" type="primary" v-if="scope.row.orderstate=='待评价'">待评价</el-button>
                </template>
                
			</el-table-column> 
			<el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		        <el-button @click="bxiuorderlist(scope)" style="padding: 5px;" type="primary" icon="el-icon-edit" circle></el-button>
        		<el-button @click="bdelorderlist(scope)" style="padding: 5px;" type="danger" icon="el-icon-delete" circle></el-button>
		      </template>
		    </el-table-column>
		</el-table>
	    <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
	      <el-card :body-style="{ padding: '0px' }">
	        <img :src="dialogImgUrl" width="100%" height="100%">
	      </el-card>
	    </el-dialog>
		<div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[5, 10, 20, 50]"
		      :page-size="limit"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="currenttotal">
		    </el-pagination>
	  	</div>
    </div>
</template>

<script>
import axios from 'axios'
	export default {
    data(){
      return {
        ordersearch:'',
        imgVisible: false,
      	dialogImgUrl:'',
      	currentPage: 1,
        currenttotal:0,
        limit:10,
      	borderlist:[],
        multipleSelection: []
      }
    },
    mounted:function(){
		this.bgetorderlist();
	},
    methods:{
        // 展示图片
	    openImg(url) {
	      if (url) {
	        this.imgVisible = true
	        this.dialogImgUrl = url
          }
        },
        editorderstate(orderId){
            axios.post("users/borderfa",{
				orderId:orderId
			}).then((response)=>{
                let res = response.data;
				if(res.status=="0"){
					this.$message({
						message: '恭喜你,发货成功',
						type: 'success'
					});
					this.bgetorderlist();
				}else{
					this.$message.error('发货操作失败，请重试');
				}
            })
        },
    	bgetorderlist(){
			axios.get("users/borderList").then((response)=>{
	  			let res = response.data;
	  			if(res.status=="0"){
	  				this.borderlist = res.result;
	                this.currenttotal = this.borderlist.length;
	                this.borderlist = this.borderlist.filter((item, index) =>
                    	index < this.currentPage * this.limit && index >= this.limit * (this.currentPage - 1)
               		)
	  			}else{
	  				this.borderlist = {};
	  			}
  			})
		},
    	handleSizeChange(val) {
	      	this.limit = val;
	        this.bgetorderlist();
	    },
	    handleCurrentChange(val) {
              this.currentPage = val;
              this.bgetorderlist();
	    },
  		toggleSelection(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable.clearSelection();
	        }
        },
        handleSelectionChange(val) {
        	this.multipleSelection = val;
        	console.log(this.multipleSelection);
       },
       formatter(row, column) {
        return row.address;
      }
    },
  }
</script>

<style>
</style>