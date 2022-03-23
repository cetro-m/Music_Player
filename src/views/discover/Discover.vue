<template>
  <div class="discover-container">
    <h1 class="title">发现</h1>
    <!-- 分类按钮 -->
    <div class="buttons">
      <span class="button cursor-pointer" :class="{active:tag=='全部'}" @click="tag='全部'">全部</span>
      <span class="button cursor-pointer" :class="{active:tag=='流行'}" @click="tag='流行'">流行</span>
      <span class="button cursor-pointer" :class="{active:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
      <span class="button cursor-pointer" :class="{active:tag=='电子'}" @click="tag='电子'">电子</span>
      <span class="button cursor-pointer" :class="{active:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
      <span class="button cursor-pointer" :class="{active:tag=='ACG'}" @click="tag='ACG'">ACG</span>
      <span class="button cursor-pointer" :class="{active:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
      <span class="button cursor-pointer" :class="{active:tag=='欧美'}" @click="tag='欧美'">欧美</span>
      <span class="button cursor-pointer" :class="{active:tag=='华语'}" @click="tag='华语'">华语</span>
      <span class="button cursor-pointer" :class="{active:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in playlists"
          :key="index"
        >
          <div class="img-wrap" @click="toSongsDetail(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <span class="cursor-pointer">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <div class="desc-wrap">
            <p class="num">{{ item.playCount }}播放</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <!--
      total 总条数
      current-page 当前页
      page-size 每页的数据量
      current-change 页码改变事件
     -->
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
  name: 'discover',
  data() {
    return {
      playlists: [],
      tag: '全部',
      total: 0,
      page: 1,
    }
  },
  // 侦听器
  watch: {
    tag() {
      this.listData()
      this.page = 1
    }
  },
  created() {
    this.listData()
  },
  methods: {
    listData() {
      axios({
        url: 'https://autumnfish.cn/top/playlist',
        method: 'get',
        params: {
          // 每页数据条数
          limit: 60,
          // 起始值（页码-1）*每页数据条数
          offset: (this.page - 1) * 60,
          // 分类数据
          cat: this.tag
        }
      }).then(res => {
        this.playlists = res.data.playlists
        this.total = res.data.total
        for (let i = 0; i < this.playlists.length; i++) {
          if(this.playlists[i].playCount > 10000) {
            this.playlists[i].playCount = parseInt(this.playlists[i].playCount/10000) + '万'
          }
        }
      })
    },
    handleCurrentChange(val) {
      // 获取页码
      this.page = val
      // 重新获取数据
      this.listData()
    },
    toSongsDetail(id) {
      this.$router.push('/songsdetail?q=' + id)
    }
  }
}
</script>

<style>
</style>