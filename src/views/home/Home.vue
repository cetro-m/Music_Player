<template>
  <div class="home-container">
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="img-wrap" @click="toSongsDetail(item.id)">
            <img :src="item.picUrl" alt="">
            <span class="cursor-pointer">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <p class="desc">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="new">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in songs"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.picUrl" alt="">
            <span class="cursor-pointer" @click="playMusic(item.id)">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mv">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap" @click="toVideoDetail(item.id)">
            <img :src="item.picUrl" alt="">
            <span class="cursor-pointer">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <div class="mv-wrap">
            <div class="mv-name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
// 导入空白对象
import eventBus from '@/EventBus'
export default {
  name: 'home',
  data() {
    return {
      list: [],
      songs: [],
      mvs: []
    }
  },
  created() {
    // 推荐歌单
    axios({
      url: 'https://autumnfish.cn/personalized',
      method: 'get',
      params: {
        limit: 10
      }
    }).then(res => {
      this.list = res.data.result
    })
    // 最新音乐
    axios({
      url: 'https://autumnfish.cn/personalized/newsong',
      method: 'get',
    }).then(res => {
      this.songs = res.data.result
    })
    axios({
      url: 'https://autumnfish.cn/personalized/mv',
      method: 'get',
    }).then(res => {
      this.mvs = res.data.result
    })
  },
  methods: {
    playMusic(id) {
      axios({
        url: 'https://autumnfish.cn/song/url',
        method: 'get',
        params: {
          id
        }
      }).then(res => {
        let url = res.data.data[0].url
        eventBus.$emit('send', url)
      })
    },
    toSongsDetail(id) {
      this.$router.push('/songsdetail?q=' + id)
    },
    toVideoDetail(id) {
      this.$router.push('/videodetail?q=' + id)
    }
  }
}
</script>

<style>
</style>