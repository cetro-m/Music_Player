<template>
  <div class="search-result-container">
    <div class="title-wrap">
      <h2 class="title">关键字：{{ $route.query.q }}</h2>
      <span class="sub-title">{{ count }}个搜索结果</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲列表" name="song">
        <table class="el-table">
          <thead>
            <th>歌名</th>
            <th>歌手</th>
            <th>时长</th>
            <th>专辑</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songList"
              :key="index"
              @dblclick="playMusic(item.id)"
            >
              <td class="item1">{{ item.name }}</td>
              <td class="item2">{{ item.artists[0].name }}</td>
              <td class="item3">{{ item.duration }}</td>
              <td class="item4">{{ item.album.name }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="songlist" class="songlist">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
          >
            <div class="img-wrap" @click="toSongsDetail(item.id)">
              <img :src="item.coverImgUrl" alt="" />
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
      </el-tab-pane>
      <!-- MV -->
      <el-tab-pane label="MV" name="mv" class="mv">
        <div class="items">
          <div class="item" v-for="(item, index) in mv" :key="index">
            <div class="img-wrap" @click="toVideoDetail(item.id)">
              <img :src="item.cover" alt="" />
              <span>
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
      </el-tab-pane>
      <!-- 专辑 -->
      <el-tab-pane label="专辑" name="album" class="songlist">
        <div class="items">
          <div class="item" v-for="(item, index) in album" :key="index">
            <div class="img-wrap">
              <img :src="item.picUrl" alt="" />
              <span class="cursor-pointer">
                <i class="el-icon-video-play"></i>
              </span>
            </div>
            <div class="desc-wrap">
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from "@/EventBus";
export default {
  name: "search-result",
  data() {
    return {
      activeName: "song",
      count: 0,
      songList: [],
      playlists: [],
      mv: [],
      album: [],
    }
  },
  created() {
    axios({
      url: "https://autumnfish.cn/search",
      method: "get",
      params: {
        keywords: this.$route.query.q,
        type: 1,
        limit: 60,
      },
    }).then((res) => {
      this.songList = res.data.result.songs;
      // 计算歌曲时间
      for (let i = 0; i < this.songList.length; i++) {
        let min = parseInt(this.songList[i].duration / 1000 / 60);
        let sec = parseInt((this.songList[i].duration / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.songList[i].duration = min + ":" + sec;
      }
      this.count = res.data.result.songCount;
    });
  },
  watch: {
    activeName() {
      let type = 1
      let limit = 20
      switch (this.activeName) {
        case "song":
          type = 1
          limit = 60
          break;
        case "songlist":
          type = 1000
          limit = 20
          break;
        case "mv":
          type = 1004
          limit = 20
          break;
        case "album":
          type = 10
          limit = 20
          break;
        default:
          break;
      }
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type,
          limit,
        },
      }).then((res) => {
        if (type == 1) {
          this.songList = res.data.result.songs;
          this.count = res.data.result.songCount;
          // 计算歌曲时间
          for (let i = 0; i < this.songList.length; i++) {
            let min = parseInt(this.songList[i].duration / 1000 / 60);
            let sec = parseInt((this.songList[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.songList[i].duration = min + ":" + sec;
          }
        } else if (type == 1000) {
          this.playlists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
          // 换算播放量
          for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].playCount > 10000) {
              this.playlists[i].playCount = parseInt(this.playlists[i].playCount / 10000) + "万";
            }
          }
        } else if (type == 1004) {
          this.mv = res.data.result.mvs
          this.count = res.data.result.mvCount
          for (let i = 0; i < this.mv.length; i++) {
            if (this.mv[i].playCount > 10000) {
              this.mv[i].playCount = parseInt(this.mv[i].playCount / 10000) + "万";
            }
          }
        } else {
          this.album = res.data.result.albums
        }
      });
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 播放单曲
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        eventBus.$emit("send", url);
      });
    },
    // 跳转至歌单详情页面
    toSongsDetail(id) {
      this.$router.push('/songsdetail?q=' + id)
    },
    // 跳转至视频详情页面
    toVideoDetail(id) {
      this.$router.push('/videodetail?q=' + id)
    }
  },
}
</script>

<style>
</style>