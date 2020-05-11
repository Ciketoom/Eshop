<template>
	<div>
		<div style="display: inline-block;margin-bottom: 15px;">
			<el-input
	          placeholder="请输入搜索内容"
	          v-model="usersearch">
	        </el-input>
		</div>
        <el-button type="primary">搜索用户</el-button>
		<el-table 
			ref="multipleTable" 
			:data="buserlist" 
			tooltip-effect="dark" 
			style="width: 70%" 
			:header-cell-style="{background:'#eef1f6',color:'#606266'}"
			max-height="800"
			:default-sort = "{prop: 'date', order: 'descending'}"
			@selection-change="handleSelectionChange"> 
			<el-table-column 
				type="selection" 
				width="55"> 
			</el-table-column> 
			<el-table-column 
				prop="userName"
				label="用户名"
				sortable
				width="120"> 	 
			</el-table-column> 
			<el-table-column 
				prop="userPwd"
				label="密码" 
				width="180"
				align="center"> 
			</el-table-column>
			<el-table-column 
				prop="userTel"
				label="手机号码" 
				sortable
				width="150"
				align="center"> 
			</el-table-column>
			<el-table-column label="头像" width="70" align="center">
			    <template slot-scope="scope">
			        <img :src="scope.row.userTou" style="width: 50px;height:50px;" @click="openImg(scope.row.userTou)">
			    </template>
			</el-table-column>
			<el-table-column 
				prop="userAddress" 
				label="地址" 
				align="center"
				show-overflow-tooltip> 
			</el-table-column> 
			<el-table-column 
				prop="userName"
				label="状态" 
				align="center"
				width="120"> 
			</el-table-column>
			<el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		        <el-button @click="bxiuuserlist(scope)" style="padding: 5px;" type="primary" icon="el-icon-edit" circle></el-button>
        		<el-button @click="bdeluserlist(scope)" style="padding: 5px;" type="danger" icon="el-icon-delete" circle></el-button>
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
      	usersearch:'',
      	imgVisible: false,
      	dialogImgUrl:'',
      	currentPage: 1,
        currenttotal:0,
        limit:10,
      	buserlist:[],
        multipleSelection: []
      }
    },
    mounted:function(){
		this.bgetuserlist();
	},
    methods:{
    	// 展示图片
	    openImg(url) {
	      if (url) {
	        this.imgVisible = true
	        this.dialogImgUrl = url
	      }
	    },
		bxiuuserlist(scope){

		},
		bdeluserlist(scope){

		},
    	bgetuserlist(){
			axios.get("users/busersList").then((response)=>{
	  			let res = response.data;
	  			if(res.status=="0"){
	  				this.buserlist = res.result;
	                this.currenttotal = this.buserlist.length;
	                this.buserlist = this.buserlist.filter((item, index) =>
                    	index < this.currentPage * this.limit && index >= this.limit * (this.currentPage - 1)
               		)
	  			}else{
	  				this.buserlist = {};
	  			}
  			})
		},
    	handleSizeChange(val) {
	      	this.limit = val;
	        this.bgetuserlist();
	      },
	      handleCurrentChange(val) {
	      	this.currentPage = val;
	        this.bgetuserlist();
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

<style lang="scss" scoped="scoped">
.img-dialog {
    .el-dialog__header {
        padding: 0!important;
    }
}
</style>