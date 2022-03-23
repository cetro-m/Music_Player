<template>
  <div class="video-detail-container">
    <!-- 视频播放 -->
    <div class="video-wrap">
      <div class="video">
        <video
          :src="url"
          autoplay
          controls
        ></video>
      </div>
      <div class="info-wrap">
        <div class="video-info">
          <h3 class="title">{{ videoInfo.name }}</h3>
          <span class="date">{{ videoInfo.publishTime }}</span>
          <span class="num">{{ videoInfo.playCount }} 播放</span>
          <p class="desc">{{ videoInfo.desc }}</p>
        </div>
      </div>
    </div>
    <!-- 推荐视频 -->
    <div class="recommend-wrap">
      <h3 class="title">猜你喜欢</h3>
      <div class="recommend-video">
        <div class="items">
          <div class="item" v-for="(item, index) in simiVideos" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="">
              <span class="cursor-pointer">
                <i class="el-icon-video-play"></i>
              </span>
            </div>
            <div class="mv-wrap">
              <p class="num">{{ item.playCount }}</p>
              <p class="name">{{ item.name }}</p>
              <p class="singer">{{ item.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'videodetail',
  data() {
    return {
      url: '',
      simiVideos: [],
      videoInfo: {},
    }
  },
  created() {
    // 播放视频url请求
    axios({
      url: 'https://autumnfish.cn/mv/url',
      method: 'get',
      params: {
        id: this.$route.query.q,
      }
    }).then(res => {
      this.url = res.data.data.url
    })
    // 猜你喜欢数据请求
    axios({
      url: 'https://autumnfish.cn/simi/mv',
      method: 'get',
      params: {
        mvid: this.$route.query.q,
      }
    }).then(res => {
      this.simiVideos = res.data.mvs
      for (let i = 0; i < this.simiVideos.length; i++) {
          if(this.simiVideos[i].playCount > 10000) {
            this.simiVideos[i].playCount = parseInt(this.simiVideos[i].playCount/10000) + '万'
          }
        }
    })
    // 视频详情数据请求
    axios({
      url: 'https://autumnfish.cn/mv/detail',
      method: 'get',
      params: {
        mvid: this.$route.query.q,
      }
    }).then(res => {
      this.videoInfo = res.data.data
    })
  },
  methods: {

  }
}
</script>

<style>

</style>