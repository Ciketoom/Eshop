<template>
  <div style="min-height:900px">
    <div style="width:1903px;background-color: #475669; overflow: hidden">
            <span class="demonstration" style="float:left;color:white;margin-left:3%;line-height: 50px;font-weight: 600;">
                Eshop购物网站管理系统
            </span>		
      			<span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">
                    admin<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>
    <div>
      <el-row>
        <el-col style="width:230px;position: absolute;">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:900px;background-color: #EBEBEB;" @select="handleSelect">
              <el-menu-item index="1"><i class="el-icon-message"></i>商品管理</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-menu"></i>用户管理</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-setting"></i>订单管理</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col style="width:1673px;margin-left: 230px;">
          <div style="margin-top:10px;margin-left: 10px;">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
      }
    },
 
    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
 
      handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/bgood');
            break;
          case '2':
            this.$router.push('/buser') 
            break;
          case '3':
            this.$router.push('/border')  
            break;
        }
      },
 
    },
  }
</script>

<style>
</style>