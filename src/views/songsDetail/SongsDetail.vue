<template>
  <div class="songs-detail-container">
    <div class="top-box">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="">
        <span>
          <i class="el-icon-video-play"></i>
        </span>
      </div>
      <div class="info-wrap">
        <div class="title">{{ playlist.name }}</div>
        <div class="artist">playlist by {{ playlist.creator.nickname }}</div>
        <div class="desc">{{playlist.description }}</div>
        <div class="button">
          <el-button>播放</el-button>
        </div>
      </div>
    </div>
    <div class="main-box">
      <div
        class="song-wrap"
        v-for="(item, index) in tracks"
        :key="index"
        @dblclick="playMusic(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.al.picUrl" alt="">
          <span>
            <i class="el-icon-video-play"></i>
          </span>
        </div>
        <div class="info-wrap">
          <div class="name">{{ item.name }}</div>
          <div class="singer">
            {{ item.ar[0].name }}
            <span>{{ feat }}</span>
          </div>
          <div class="duration">{{ item.dt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventBus from '@/EventBus'
export default {
  name: 'songsdetail',
  data() {
    return {
      playlist: {},
      tracks: [],

      feat: ''
    }
  },
  created() {
    axios({
      url: 'https://autumnfish.cn/playlist/detail',
      method: 'get',
      params: {
        id: this.$route.query.q,
      }
    }).then(res => {
      console.log(res);
      this.playlist = res.data.playlist
      this.tracks = res.data.playlist.tracks
      // 计算歌曲时间
      for (let i = 0; i < this.tracks.length; i++) {
        let min = parseInt(this.tracks[i].dt / 1000 / 60);
        let sec = parseInt((this.tracks[i].dt / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.tracks[i].dt = min + ":" + sec;
      }
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
    getFeat() {
      if(this.tracks.ar[1] != undefined) {
        this.feat = this.tracks.ar[1]
      }
    }
  }
}
</script>

<style>

</style>