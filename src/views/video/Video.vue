<template>
  <div class="video-container">
    <h1 class="title">视频</h1>
    <div class="selector-wrap">
      <!-- 地区 -->
      <div class="region-wrap">
        <span class="region-name">地区：</span>
        <div class="buttons">
          <span class="button cursor-pointer" :class="{active:area=='全部'}" @click="area='全部'">全部</span>
          <span class="button cursor-pointer" :class="{active:area=='内地'}" @click="area='内地'">内地</span>
          <span class="button cursor-pointer" :class="{active:area=='港台'}" @click="area='港台'">港台</span>
          <span class="button cursor-pointer" :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span>
          <span class="button cursor-pointer" :class="{active:area=='日本'}" @click="area='日本'">日本</span>
          <span class="button cursor-pointer" :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span>
        </div>
      </div>
      <!-- 排序 -->
      <div class="sort-wrap">
        <span class="sort-name">排序：</span>
        <div class="buttons">
          <span class="button cursor-pointer" :class="{active:order=='上升最快'}" @click="order='上升最快'">上升最快</span>
          <span class="button cursor-pointer" :class="{active:order=='最热'}" @click="order='最热'">最热</span>
          <span class="button cursor-pointer" :class="{active:order=='最新'}" @click="order='最新'">最新</span>
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap" @click="toVideoDetail(item.id)">
            <img :src="item.cover" alt="">
            <span class="cursor-pointer">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <div class="mv-wrap">
            <p class="num">{{ item.playCount }}</p>
            <p class="name">{{ item.name }}</p>
            <p class="singer">{{ item.artistName }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="1000"
      :current-page="page"
      :page-size="60"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'mvs',
  data() {
    return {
      total: 20,
      page: 1,
      limit: 20,
      area: '全部',
      order: '上升最快',
      list: []
    }
  },
  watch: {
    area() {
      this.page = 1
      this.getList()
    },
    order() {
      this.page = 1
      this.getList()
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios({
        url: 'https://autumnfish.cn/mv/all',
        method: 'get',
        params: {
          area: this.area,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        }
      }).then(res => {
        this.list = res.data.data
        this.total = res.data.count
        for (let i = 0; i < this.list.length; i++) {
          if(this.list[i].playCount > 10000) {
            this.list[i].playCount = parseInt(this.list[i].playCount/10000) + '万'
          }
        }
        if(res.data.count) {
          this.total = res.data.count
        }
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    toVideoDetail(id) {
      this.$router.push('/videodetail?q=' + id)
    }
  }
}
</script>

<style>
</style>