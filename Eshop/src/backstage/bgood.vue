<template>
	<div>
		<div style="display: inline-block;">
			<el-input
	          placeholder="请输入搜索内容"
	          v-model="goodsearch">
	        </el-input>
		</div>
        <el-button type="primary" @click="searchgood()">搜索商品</el-button>
	    <el-button type="primary" @click="bgoodzeng('open')">新增商品</el-button>   
        <el-button type="primary" @click="bgooddel()">批量删除</el-button>   
        <div class='popContainer' v-show="goodzeng">
			<div class="container">
				<i @click="bgoodzeng('close')" class="el-icon-circle-close" style="cursor: pointer; position: relative;left: 1200px;top: -20px;font-size: 20px;"></i>
				<el-form label-width="80px">
					<el-form-item label="名称 :">
				    	<el-input size="small" v-model="productName" placeholder="请输入商品名称" style="width: 300px;"></el-input>
				    </el-form-item>
				    <el-form-item label="价格  :">
				    	<el-input size="small" v-model="salePrice" @blur="BlurText($event)" min="1" placeholder="请输入价格" ></el-input>
				    </el-form-item>					    
				    <el-form-item label="数量  :">
				    	<el-input size="small" v-model="productNum" @blur="BlurText($event)" min="1" placeholder="请输入数量"></el-input>
				    </el-form-item>
				    <el-form-item label="销量  :">
				    	<el-input size="small" v-model="saleNum" @blur="BlurText($event)" min="1" placeholder="请输入销量" ></el-input>
				    </el-form-item>
				    <el-form-item label="收藏数  :">
				    	<el-input size="small" v-model="collectNum" @blur="BlurText($event)" min="1" placeholder="请输入收藏数"></el-input>
				    </el-form-item>
				    <el-form-item label="评论数:">
				    	<el-input size="small" v-model="commentNum" @blur="BlurText($event)" min="1" placeholder="请输入评论数"></el-input>
				    </el-form-item>
				    <el-form-item label="发货地  :">
				    	<el-input size="small" v-model="productCity" placeholder="请输入发货城市"></el-input>
				    </el-form-item> 
				    <el-form-item label="主类  :">
				    	<el-select size="small" v-model="fivetype" placeholder="请选择" @change="gaixuan('five')" style="width: 200px;">
					   		<el-option
						      v-for="itemf in fenleiList"
						      :key="itemf.id"
						      :label="itemf.name"
						      :value="itemf.name">
					    	</el-option>
					  	</el-select>
				    </el-form-item>
				    <el-form-item label="种类  :">
				    	<el-select size="small" v-model="sextype" placeholder="请选择" style="width: 200px;" @change="gaixuan('sex')">
					   		<el-option
						      v-for="(items, index) in List.sexlist"
						      :key="index"
						      :label="items"
						      :value="items">
					    	</el-option>
					  	</el-select>
				    </el-form-item> 
				    <el-form-item label="品牌  :">
				    	<el-select size="small" v-model="brandtype" placeholder="请选择" style="width: 200px;" @change="gaixuan('sex')">
					   		<el-option
						      v-for="(itemb,index) in List.brandlist"
						      :key="index"
						      :label="itemb"
						      :value="itemb">
					    	</el-option>
					  	</el-select>
				    </el-form-item>
				    <el-form-item label="功能  :">
				    	<el-select size="small" v-model="functiontype" placeholder="请选择" style="width: 200px;" @change="gaixuan('sex')">
					   		<el-option
						      v-for="(itemf,index) in List.functionlist"
						      :key="index"
						      :label="itemf"
						      :value="itemf">
					    	</el-option>
					  	</el-select>
				    </el-form-item>
				    <el-form-item label="比价价格  :" style="width: 300px;">
				    	<el-input size="small" @blur="BlurText($event)" min="1" v-model="bxprice"></el-input>
				    </el-form-item>
				    <el-form-item label="比价网址  :" style="width: 300px;">
				    	<el-input size="small" v-model="bxsrc"></el-input>
				    </el-form-item>
				    <el-form-item label="比价商城:" v-if="this.bxsrc!=''&&this.bxprice!=''">
				    	<el-select size="small" v-model="bj" placeholder="请选择" @change="gaixuan('bj')" style="width: 200px;">
					   		<el-option
						      v-for="itembj in priceCompare"
						      :key="itembj.webicon"
						      :label="itembj.websiteName"
						      :value="itembj.websiteName">
					    	</el-option>
					  	</el-select>
				    </el-form-item>
				    <div>
				    <el-form-item label="商品主图  :">
				    	<div class="upload">
						    <el-upload
						      class="avatar-uploader"
						      :action= domain
						      :http-request = "upqiniuz"
						      :show-file-list="false"
						      :before-upload="beforeUpload">
						      <img v-if="imageUrlz" :src="imageUrlz" class="avatar">
						      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						    </el-upload>
						 </div>
				    </el-form-item>
				    <el-form-item label="详情图  :">
				    	<div class="upload">
						    <el-upload
						      class="avatar-uploader"
						      :action= domain
						      :http-request = "upqiniux"
						      :show-file-list="false"
						      :before-upload="beforeUpload">
						      <img v-if="imageUrlx" :src="imageUrlx" class="avatar">
						      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						    </el-upload>
						 </div>
				    </el-form-item>
				    </div>
				    <el-form-item label="详情图集 :">
					    <el-upload 
						  action= domain
						  :http-request = "upqiniutj"
						  list-type="picture-card"
						  :on-preview="handlePictureCardPreview"
						  :on-remove="handleRemove">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img  width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
				    </el-form-item>
				    <div>
				    	<el-form-item label="颜色类型 :">
							<el-input
							  	style="width: 130px;"
							  	v-model="inputValue"
							  	size="small"
							  	placeholder="请输入颜色名称"
							>
							</el-input>
							<el-input
								style="width: 130px;"
							  	v-model="inputValue1"
							  	size="small"
							  	@blur="BlurText($event)"
							  	placeholder="该颜色产品数量"
							>	
							</el-input>
							<i class="iconfont icontianjia" @click="handleInputConfirm"></i>
							<el-tag
								style="margin-left: 8px;cursor: pointer;"
							  	:key="tag.colorId"
							  	v-for="tag in dynamicTags"
							  	closable
							  	:disable-transitions="false"
							  	:class="{'xuan': selc == tag.colorId}"
							  	@close="handleClose(tag,'c')"
							  	@click='xuancolor(tag)'>
							  {{tag.color}}
							</el-tag>
						</el-form-item>
				    </div>
				    <div v-if='sizeyan'>
				    	<el-form-item label="大小类型 :">
							<el-input
							  	style="width: 130px;"
							 	v-model="inputValues"
							  	size="small"
							  	placeholder="请输入大小类型"
							>
							</el-input>
							<el-input
								style="width: 130px;"
							  	v-model="inputValues1"
							  	size="small"
							  	@blur="BlurText($event)"
							  	placeholder="该类型产品数量"
							>
							</el-input>
							<i class="iconfont icontianjia" @click="handleInputConfirms"></i>
							<el-tag
								style="margin-left: 8px;cursor: pointer;"
							  	:key="tags.colorId"
							  	v-for="tags in dynamicTags1"
							  	closable
							  	:disable-transitions="false"
							  	
							  	@close="handleClose(tags,'s')">
							  	{{tags.sizetype}}
							</el-tag>
						</el-form-item>
				    </div>
				    <el-form-item label="商品详情 :" style="width: 600px; display: block;">
				    	<el-input
						  type="textarea"
						  :autosize="{ minRows: 3, maxRows: 5}"
						  v-model="productContent">
						</el-input>
				    </el-form-item>
				    <el-form-item>
					    <el-button type="danger" :plain="true" @click="xzbgood('zeng')">立即添加</el-button>
					    <el-button type="danger" plain @click="bgoodzeng('close')">取消</el-button>
					</el-form-item>
			    </el-form>
			</div>
		</div>
		<el-table 
			ref="multipleTable" 
			:data="bgoodlist" 
			border
			tooltip-effect="dark" 
			style="width: 100%;margin-top: 15px;" 
			:header-cell-style="{background:'#eef1f6',color:'#606266'}"
			max-height="800"
			:default-sort = "{prop: 'date', order: 'descending'}"
			@selection-change="handleSelectionChange"> 
			<el-table-column type="selection" width="55"></el-table-column> 
			<el-table-column prop="productName" label="商品名称" width="150" show-overflow-tooltip></el-table-column> 
			<el-table-column label="主图" width="70" align="center">
			    <template slot-scope="scope">
			    	<i v-if="scope.row.productSrc==''" class="iconfont icontianjia"></i>
			        <img v-if="scope.row.productimg!=''" :src="scope.row.productSrc" style="width: 50px;height:50px;" @click="openImg(scope.row.productSrc)">
			    </template>
			</el-table-column>
			<el-table-column prop="salePrice" sortable label="价格" align="center" width="80"></el-table-column>
			<el-table-column align="center" label="商品比价栏" width="150">
				 <template slot-scope="scope">
				 	<i v-if="scope.row.priceCompare==''" class="iconfont icontianjia"></i>
					<li v-for="itemb in scope.row.priceCompare" :key="itemb.websiteName">
						<a :href="itemb.websiteSrc">{{itemb.websiteName}}</a>
						<span style="margin-left: 10px;">{{itemb.price}}</span>
					</li>
			    </template>
			</el-table-column>
			<el-table-column prop="sexType" label="商品类型" align="center" width="80"></el-table-column>
			<el-table-column prop="functionType" label="功能类别" align="center" width="80"></el-table-column> 
			<el-table-column label="颜色类别及数量" width="180" align="center">
			    <template slot-scope="scope">							
					<li v-for="(itemc,index) in scope.row.colorType"
						class="colorli"
						:key="index"
						@click="Color(scope.$index,itemc)"
						:class="{'xuan': selc == itemc.colorId}"
						>
						{{itemc.color}}
						<h1>{{itemc.colornum}}</h1>
					</li>
			    </template>	
			</el-table-column>
			<el-table-column label="大小类别及数量" width="180" align="center">
			    <template slot-scope="scope">
					<li v-for="(items, index) in sizeli"
						:key="index"
						v-show="xians==scope.$index"
						class="colorli">
						{{items.sizetype}}
						<h1>{{items.sizenum}}</h1>
					</li>
			    </template>	
			</el-table-column>
			<el-table-column prop="brandName" label="品牌" align="center" width="80"></el-table-column> 
			<el-table-column prop="productNum" label="数量" sortable align="center" width="80"></el-table-column> 
			<el-table-column prop="saleNum" label="销量" sortable align="center" width="80"></el-table-column> 
			<el-table-column prop="collectNum" label="收藏数" sortable align="center" width="90"></el-table-column> 
			<el-table-column prop="commentNum" label="评论数" sortable align="center" width="90"></el-table-column>
			<el-table-column prop="productCity" label="发货地" align="center" width="80"></el-table-column>
			<el-table-column label="详情图" width="70" align="center">
			    <template slot-scope="scope">
			    	<i v-if="scope.row.productimg==''" class="iconfont icontianjia"></i>
			        <img v-if="scope.row.productimg!=''" :src="scope.row.productimg" style="width: 50px;height:50px;" @click="openImg(scope.row.productimg)">
			    </template>
			</el-table-column>
			<el-table-column prop="productContent" label="详情描述" align="center" width="150" show-overflow-tooltip></el-table-column>
			<el-table-column align="center" label="商品图集" width="360">
			    <template slot-scope="scope">
			    	<viewer :images="scope.row.productImg" >
						<li
							style="float: left;margin-right: 5px;"
							:key="itemi.imgId"
							v-for="itemi in scope.row.productImg">
							<i @click="deltjone(scope.row.productId,itemi.imgId)" class="el-icon-circle-close" style="position: relative;top: -20px;cursor: pointer;"></i>
							<img 
								class="xiangimg"
								style="width: 50px;height: 50px;"
								:src="itemi.imgSrc" :key="itemi.imgId"/>
						</li>
					</viewer>
        			<el-upload
						:show-file-list='false'
        				action= domain
        				:limit="1"
						:http-request = "upqiniutjz">    				
					    <el-button @click="{fuid=scope.row.productId}" style="padding: 5px;margin-left: 10px;margin-top: 15px;" type="success" icon="el-icon-upload" circle></el-button>
					</el-upload>
  			    </template>
			</el-table-column>
			<el-table-column fixed="right" align="center" label="操作" width="100">
		      <template slot-scope="scope">
		        <el-button @click="bgoodxiu('open',scope.$index, scope.row)" style="padding: 5px;" type="primary" icon="el-icon-edit" circle></el-button>
        		<el-button @click="bgooddelone(scope.$index, scope.row)" style="padding: 5px;" type="danger" icon="el-icon-delete" circle></el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div class='popContainer' v-show="goodxiu">
			<div class="container" style="width: 1000px;">
				<i @click="bgoodxiu('close')" class="el-icon-circle-close" style="cursor: pointer; position: relative;left: 980px;top: -20px;font-size: 20px;"></i>
				<el-form label-width="80px">
					<el-form-item label="商品名称 :">
				    	<el-input style="width: 800px;"  v-model="xiugood.productName"></el-input>
				    </el-form-item>
				    <el-form-item label="商品价格  :">
				    	<el-input v-model="xiugood.salePrice"></el-input>
				    </el-form-item>					    
				    <el-form-item label="商品品牌 :">
				    	<el-input v-model="xiugood.brandName"></el-input>
				    </el-form-item>
				    <el-form-item label="商品数量  :">
				    	<el-input v-model="xiugood.productNum"></el-input>
				    </el-form-item>
				    <el-form-item label="商品销量  :">
				    	<el-input v-model="xiugood.saleNum"></el-input>
				    </el-form-item>
				    <el-form-item label="收藏数  :">
				    	<el-input v-model="xiugood.collectNum"></el-input>
				    </el-form-item>
				    <el-form-item label="评论数:">
				    	<el-input v-model="xiugood.commentNum"></el-input>
				    </el-form-item>
				    <el-form-item label="发货地  :">
				    	<el-input v-model="xiugood.productCity"></el-input>
				    </el-form-item> 
				    <div>
					    <el-form-item label="比价修改  :">
					    	<el-select v-model="bxname" placeholder="请选择" @change="gaixuan('bx',xiugood.priceCompare)">
						   		<el-option
							      v-for="(itembx,index) in xiugood.priceCompare"
							      :key="index"
							      :label="itembx.websiteName"
							      :value="itembx.websiteName">
						    	</el-option>
						  	</el-select>
					    </el-form-item>
					    <el-form-item label="该网价格  :">
					    	<el-input v-model="bxprice"></el-input>
					    </el-form-item>
					    <el-form-item label="网址  :">
					    	<el-input v-model="bxsrc"></el-input>
					    </el-form-item>
				    </div>
				    <div>
					    <el-form-item label="颜色修改  :">
					    	<el-select v-model="color" placeholder="请选择" @change="gaixuan('yx',xiugood.colorType)">
						   		<el-option
							      v-for="(itemyd,index) in xiugood.colorType"
							      :key="index"
							      :label="itemyd.color"
							      :value="itemyd.color">
						    	</el-option>
						  	</el-select>
					    </el-form-item>
					    <el-form-item label="对应数量  :">
						    	<el-input v-model="colornum"></el-input>
						</el-form-item>
				    </div>
				    <div>
					    <el-form-item label="大小修改  :">
					    	<el-select v-model="size" placeholder="请选择" @change="gaixuan('dx')">
						   		<el-option
							      v-for="(itemydd,index) in sizeli"
							      :key="index"
							      :label="itemydd.sizetype"
							      :value="itemydd.sizetype">
						    	</el-option>
						  	</el-select>
					    </el-form-item>
					    <el-form-item label="对应数量  :">
						    	<el-input v-model="sizenum"></el-input>
						</el-form-item>
				    </div>
				    <el-form-item label="商品详情 :" style="width: 600px; display: block;">
				    	<el-input
						  type="textarea"
						  :autosize="{ minRows: 2, maxRows: 5}"
						  v-model="xiugood.productContent">
						</el-input>
				    </el-form-item>
				    <el-form-item>
					    <el-button type="danger" :plain="true" @click="xzbgood('xiu')">立即修改</el-button>
					    <el-button type="danger" plain @click="bgoodxiu('close')">取消</el-button>
					</el-form-item>
			    </el-form>
			</div>
		</div>
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
      	dialogImageUrl: '',
        dialogVisible: false,
      	imageUrlz: '',
		imageUrlx: '',
		fuid:'',
      	zx:'',
      	productImg:[],
      	token: {},
      	// 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      	domain: 'https://upload-z2.qiniup.com',
      	// 这是七牛云空间的外链默认域名
     	qiniuaddr: 'q83beb8bf.bkt.clouddn.com',
     	dynamicTags: [],
        inputValue: '',
        inputValue1: '',
        sizeyan:false,
        dynamicTags1: [],
        inputValues: '',
        inputValues1: '',
        idyan:'',
      	productName:'',
      	salePrice:'',
      	brandName:'',
      	productNum:'',
      	saleNum:'',
      	collectNum:'',
      	commentNum:'',
      	productCity:'',
      	productContent:'',
      	fiveType:'',
      	sexType:'',
      	functionType:'',
      	dialogImgUrl:'',
      	imgVisible: false,
      	goodxiu:false,
      	goodzeng:false,
        goodsearch:'', 
        currentPage: 1,
        currenttotal:0,
        limit:10,    
        selc:'a',
		xians:'',
		bxname:'',
		bxsrc:'',
		bxprice:'',
        sizeli:[],
        xiugood:[],
        bgoodlist:[],
        tablecheck:[],
        List:[],
        bj:'',
        color:'',
        colornum:'',
        size:'',
        sizenum:'',
        priceCompare:[ 
	        {
	            websiteSrc : "",
	            websiteName : "淘宝网",
	            price : "",
	            webicon : "iconfont icontaobao"
	        }, 
	        {
	            websiteSrc : "",
	            websiteName : "天猫商城",
	            price : "",
	            webicon : "iconfont icontianmaoT"
	        }, 
	        {
	            websiteSrc : "",
	            websiteName : "京东商城",
	            price : "",
	            webicon : "iconfont iconjingdong-"
	        }],
        fenleiList:[	
	        {
		        name:'手机电脑',	
		        id:'001',
		        brandlist:['小米','华为','华硕','iphone','oppo','vivo','联想','其它'],
			    sexlist:['手机','笔记本'],   		        	
			    functionlist:['商务','时尚','拍照','游戏','音乐','其它'],
		    },{	        
		        name:'精品服饰',
		        id:'002',		        	
			    brandlist:['优衣库','森马','Gap','李宁','花花公子','H&M','其它'],		        	
			    sexlist:['男装','女装'],	        	
			    functionlist:['短袖','裤子','裙子','毛衣','外套','衬衫','卫衣','风衣','其它'],
		    },{	        
		        name:'家电',
		        id:'003',		        	
			    brandlist:['小米','创维','海尔','美的','老板','方太','西门子','松下','其它'],		        	
			    sexlist:['大家电','小电器'],		        	
			    functionlist:['电视','洗衣机','空调','烤箱','电饭锅','油烟机','洗碗机','其它'],
		    },{       
		        name:'鞋子专卖',
		        id:'004',		        	
			    brandlist:['耐克','阿迪达斯','李宁','回力','VANS','安踏','其它'],		        	
			    sexlist:['男鞋','女鞋'],			        	
			    functionlist:['跑鞋','靴子','皮鞋','板鞋','帆布鞋','拖鞋','其它'],
		    },{	        
		        name:'美妆个护',
		        id:'005',		        	
			    brandlist:['圣罗兰','纪梵希','迪奥','雅思兰黛','欧莱雅','曼秀雷敦','MAC','其它'],		        	
			    sexlist:['美妆','个护'],  				        	
			    functionlist:['口红','洗面奶','香水','防晒','面膜','美甲','其它']
		    }],
        value:'',
        brandtype:'',
        fivetype:'',
        sextype:'',   
        functiontype:'',
      }
    },
    mounted:function(){
		this.bgetgoodList();
	},
    methods:{
		searchgood(){
			console.log(this.bgoodList);
			let searchlist=[];
			this.bgoodList.forEach((item)=>{
				
				if(item.productName == this.fivetype){
					this.List=item;
				}
			})
		},
    	handleClose(tag,cs) {
    		if(cs=='c'){
    			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    			this.sizeyan=false;
    		}else if(cs=='s'){
    			console.log(this.dynamicTags1);
    			this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag), 1);
    		}  
	    },
	    xuancolor(tag){
	    	this.selc=tag.colorId;
	    	this.dynamicTags1=tag.size;
	    	this.sizeyan = true;
	    	this.idyan =tag.colorId;
	    	console.log(this.idyan);
	    },
	    handleInputConfirm() {
	        if(this.inputValue&&this.inputValue1) {
	          this.dynamicTags.push({
	          	colorId:new Date().Format('yyyy-MM-dd hh:mm:ss') + Math.floor(Math.random()*1000+100),
	          	color:this.inputValue,
	          	colornum:this.inputValue1,
	          	size:[]
	          }); 
	          console.log(this.dynamicTags);
	          this.inputValue='';
	          this.inputValue1='';
	        }else{
	        	this.$message.error('请输入颜色及其数量！！')
	        }   
	    },
	    handleInputConfirms() {
	        if(this.inputValues&&this.inputValues1) {
	          this.dynamicTags1.push({
	          	sizeId:new Date().Format('yyyy-MM-dd hh:mm:ss') + Math.floor(Math.random()*1000+100),
	          	sizetype:this.inputValues,
	          	sizenum:this.inputValues1
	          }); 
	          console.log(this.dynamicTags1);
	          this.dynamicTags.forEach((item)=>{
					if(item.colorId == this.idyan){
						console.log(item);
						item.size=this.dynamicTags1;
	     			}
		 		})
	          console.log(this.dynamicTags);
	          this.inputValues='';
	          this.inputValues1='';
	        }else{
	        	this.$message.error('请输入大小类型及其数量！！')
	        }   
	    },
    	upqiniuz (req) {
    		this.upqiniu(req,'z');
		},
		bgoodzj(){
			console.log(this.productImg[0]);
			console.log(this.fuid);
			axios.post("/goods/bgoodzengj",{
					productImg:this.productImg[0],
					productId:this.fuid
			}).then((response)=>{
				let res = response.data;
				if(res.status=="0"){
					this.$message({
						message: '恭喜你，新增图片成功',
						type: 'success'
					});
					this.bgetgoodList();
				}else{
					this.$message.error('新增图片失败，请重试');
				}
			})	
		},
    	upqiniutj (req) {
			this.upqiniu(req,'tj');	
		},
		upqiniutjz (req) {
			this.upqiniu(req,'tjz');
    	},
    	upqiniux (req) {
    		this.upqiniu(req,'x');
    	},
    	// 上传文件到七牛云
	    upqiniu (req,aaa) {
	    	console.log(req.file.uid);
	      	const config = {
	        	headers: {'Content-Type': 'multipart/form-data'}
	      	}
		    let filetype = ''
		    if (req.file.type === 'image/png') {
		      filetype = 'png'
		    } else {
		      filetype = 'jpg'
		    }
		      // 重命名要上传的文件
		    const keyname = 'zjheshop' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
		      // 从后端获取上传凭证token
		    axios.get('/goods/token').then(res => {
		        const formdata = new FormData()
		        formdata.append('file', req.file)
		        formdata.append('token', res.data)
		        formdata.append('key', keyname)
	         	//获取到凭证之后再将文件上传到七牛云空间
		        axios.post(this.domain, formdata, config).then(res => {
		          	this.zx = 'http://' + this.qiniuaddr + '/' + res.data.key;
		          	if(aaa=='z'){
		          		this.imageUrlz = this.zx;
		          	}else if(aaa=='x'){
		          		this.imageUrlx = this.zx;
		          	}else if(aaa=='tj'){
		          		this.productImg.push({
							imgId: req.file.uid,
							imgSrc:this.zx,
						});
						console.log(this.productImg);
		          	}else if(aaa=='tjz'){
		          		this.productImg.push({
							imgId: req.file.uid,
							imgSrc:this.zx,
						});
						this.bgoodzj();	
		          	}
		        })
	      })
	    },
	    // 验证文件合法性
	    beforeUpload (file) {
	      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
	      const isLt2M = file.size / 1024 / 1024 < 5
	      if (!isJPG) {
	        this.$message.error('上传头像图片只能是 JPG 格式!')
	      }
	      if (!isLt2M) {
	        this.$message.error('上传头像图片大小不能超过 5MB!')
	      }
	      return isJPG && isLt2M
	    },
	    handleRemove(file, fileList) {
	        console.log(file.uid);
			this.productImg.splice(this.productImg.indexOf(file.uid),1);
			console.log(this.productImg);

	    },
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
		},
		deltjone(productId,imgId){
			this.$confirm('此操作将永久删除选择的文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				axios.post("/goods/bgoodtjdel",{
					productId:productId,
					imgId:imgId
				}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
						this.$message({
							message: '恭喜你，删除商品成功',
							type: 'success'
						});
						this.bgetgoodList();
					}else{
						this.$message.error('删除商品失败，请重试');
					}
			})	
			}).catch(() => {
				this.$message({
				type: 'info',
				message: '已取消删除'
				});          
			});
		},
    	xzbgood(xz){
    		if(xz=='zeng'){
    			let newgood ={
    				productName:this.productName,
    				productSrc:this.imageUrlz,
    				productimg:this.imageUrlx,
      				fiveType:this.fivetype,
      				sexType:this.sextype,
      				functionType:this.functiontype,
      				salePrice:this.salePrice,
      				brandName:this.brandtype,
      				productNum:this.productNum,
      				saleNum:this.saleNum,
      				commentNum:this.commentNum,
      				collectNum:this.collectNum,
      				productCity:this.productCity,
      				productContent:this.productContent,
      				priceCompare:this.priceCompare,
      				productImg:this.productImg,
      				colorType:this.dynamicTags,
    			};
    			axios.post("/goods/bgoodzeng",{
      				newgood:newgood
	    		}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
		            	this.$message({
				          message: '恭喜你，新增商品成功',
				          type: 'success'
				        });
				        this.bgetgoodList();
				        this.goodzeng = false;
	                }else{
	                	this.$message.error('新增商品失败，请重试');
	                }
	    		})	
    		}else if(xz=='xiu'){
    			console.log(this.xiugood);
    			console.log(this.color);console.log(this.size);
    			console.log(this.colornum);console.log(this.sizenum);
    		}
    	},
    	Color(index,itemc){
      		this.sizeli = itemc.size;
      		this.selc = itemc.colorId;
      		this.xians = index;
    	},
    	// 展示图片
	    openImg(url) {
	      if (url) {
	        this.imgVisible = true
	        this.dialogImgUrl = url
	      }
	    },
	    gaixuan(gx,bxlist){
	    	if(gx=='five'){
	    		console.log(this.fivetype);
	    		this.fenleiList.forEach( (item)=>{
					if(item.name == this.fivetype){
						this.List=item;
	     			}
		 		});
	    	}else if(gx=='sex'){
	    		console.log(this.fivetype);
	    		console.log(this.sextype);
	    		console.log(this.functiontype);
	    		console.log(this.brandtype);
	    	}else if(gx=='bx'){
	    		bxlist.forEach( (item)=>{
					if(item.websiteName == this.bxname){
						this.bxsrc=item.websiteSrc;
						this.bxprice=item.price;
	     			}
		 		});
	    	}else if(gx=='bj'){
    			this.priceCompare.forEach( (item)=>{
					if(item.websiteName == this.bj){
						item.websiteSrc =this.bxsrc;
						item.price = this.bxprice;
	     			}
		 		});
		 		console.log(this.priceCompare);	
	    	}else if(gx=='yx'){
    			bxlist.forEach( (item)=>{
					if(item.color == this.color){
						this.colornum = item.colornum;
						this.sizeli = item.size;
	     			}
		 		});
	    	}else if(gx=='dx'){
	    		if(this.sizeli==''){
	    			this.$message.error('请先选择商品颜色');
	    		}else{
	    			this.sizeli.forEach( (item)=>{
						if(item.sizetype == this.size){
							this.sizenum = item.sizenum;
		     			}
			 		});
	    		}
    			
	    	}
	    },
    	bgoodxiu(ad,index,row){
			if(ad=='open'){
				this.goodxiu = true;
				this.xiugood = row;
				this.bxprice='';
				this.bxsrc='';
			}else if(ad=='close'){
				this.goodxiu = false;
			}
		},
		bgoodzeng(ad){
			if(ad=='open'){
				this.goodzeng = true;
			}else if(ad=='close'){
				this.goodzeng = false;
			}
		},
		bgooddelone(index,row){
			this.tablecheck = row;
			this.bgooddel();
		},
		bgooddel(){
			if(this.tablecheck==''){
      			this.$message.error('请选择需要删除的商品');
      		}else{
				this.$confirm('此操作将永久删除选择的文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		     	}).then(() => {
					axios.post("/goods/bgooddel",{
	      				tablecheck:this.tablecheck
		    		}).then((response)=>{
						let res = response.data;
						if(res.status=="0"){
			            	this.$message({
					          message: '恭喜你，删除商品成功',
					          type: 'success'
					        });
					        this.bgetgoodList();
		                }else{
		                	this.$message.error('删除商品失败，请重试');
		                }
		    	})	
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    }
		},
    	BlurText(e) {
		    let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value)
		    if(!boolean) {
		      this.$message.error('请输入正整数,注意空格')
		      e.target.value = ''
		    }
		},
      	handleSizeChange(val) {
      		this.limit = val;
        	this.bgetgoodList();
      	},
      	handleCurrentChange(val) {
      		this.currentPage = val;
        	this.bgetgoodList();
      	},
      	handleCheckAllChange(val) { 
       
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
        	this.tablecheck = val;
       	},
      	bgetgoodList(){
			axios.get("goods/bgoodsList").then((response)=>{
	  			let res = response.data;
	  			if(res.status=="0"){
	  				this.bgoodlist = res.result;
	  				console.log(this.bgoodlist);
	                this.currenttotal = this.bgoodlist.length;
	                this.bgoodlist = this.bgoodlist.filter((item, index) =>
                    	index < this.currentPage * this.limit && index >= this.limit * (this.currentPage - 1)
               		)
	  			}else{
	  				this.goodlist = {};
	  			}
  			})
		},
    }
  }
</script>

<style lang="scss" scoped="scoped">
.popContainer{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .container{
    	width: 1200px;
    	background: #FA6F57;
    	padding: 30px;
    	position: relative;
    	left: 350px;
    	top: 80px;
    	.el-form-item{
    		display: inline-block;
    		margin-bottom: 10px;
    		.el-input{
	    		width: 100%;
	    	}	
	    	.el-form-item__label{
			    color: #fff;
			}
    	}
    	
	}
	
}	
.colorli{
	float: left;
	margin-left: 5px;
	border: 1px solid #999999;
	margin-bottom: 5px;
	padding: 2px;
	font-size: 12px; 
	&:hover{
		cursor: pointer;
	}
}
.xuan{
	border-color: #0086B3;
	background: #fff;
} 
.upload {
  width: 300px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 5px dashed #ca1717 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  border:1px solid #404040;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
} 
</style>