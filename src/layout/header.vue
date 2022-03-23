<template>
  <div class="headerBar">
    <div class="left-box">
      <div class="buttons">
        <i class="el-icon-arrow-left cursor-pointer" @click="$router.go(-1)"></i>
        <i class="el-icon-arrow-right cursor-pointer" @click="$router.go(1)"></i>
      </div>
    </div>
    <div class="center-box">
      <div class="nav-button">
        <router-link to="/home">首页</router-link>
      </div>
      <div class="nav-button">
        <router-link to="/discover">发现</router-link>
      </div>
      <div class="nav-button">
        <router-link to="/video">视频</router-link>
      </div>
    </div>
    <div class="right-box">
      <div class="search">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toSearchResult">
        <i class="el-icon-search"></i>
      </div>
      <div class="login">
        <el-popover
          placement="bottom"
          title="登录功能"
          width="200"
          trigger="click"
          content="还没开发发发发发发发">
        <el-button slot="reference">登录</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      // 搜索内容
      inputValue: ''
    }
  },
  methods: {
    toSearchResult() {
      if(this.inputValue == ''){
        this.$message.warning('请输入内容后搜索')
      } else {
        this.$router.push('/searchresult?q=' + this.inputValue)
      }
    }
  }
}
</script>

<style scoped>
.headerBar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 64px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: hsla(0,0%,100%,0.86);
}

.buttons {
  margin-left: 10vw;
}

.buttons i {
  font-size: 24px;
  margin-right: 20px;
}

.center-box {
  display: flex;
  margin-left: 120px;
}

.nav-button {
  margin-left: 40px;
}

.right-box {
  display: flex;
  margin-right: 10vw;
}

.login {
  margin-left: 10px;
}

.el-button {
  border-radius: 20px;
}

.search {
  position: relative;
}

.el-icon-search {
  position: absolute;
  right: 10px;
  top: 12px;
  font-size: 18px;
  color: #BEBEBE;
}

.el-input__inner {
  border-radius: 10px;
  border: none;
  background-color: #f5f5f7;
}

.el-input__inner:focus {
  background-color: #edf2ff;
}

.el-button {
  border: none;
  background-color: #f5f5f7;
  color: #BEBEBE;
}

.el-button:focus {
  background-color: #edf2ff;
  color: #BEBEBE;
}

.el-button:hover {
  background-color: #edf2ff;
  color: #BEBEBE;
}
</style>