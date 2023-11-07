<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage: `url(${movie.Poster})`}" 
    class="movie">
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      default: () => ({
        
      })
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // html 구조와 연결이 된 직후 init 메소드 동작, created는 html구조가 연결된 상태가 아니라서 사용 X
  // html요소를 다뤄서 method를 진행하는건 created가 아니고 mounted를 사용해야함
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const poster = this.movie.Poster
      if(!poster || poster === "N/A") {
        this.imageLoading = false
      } else {
        await this.$loadImage(poster)
        this.imageLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.movie {
  $width: 200px;
  width: $width;
  height: calc($width * 3 / 2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      // 영화의 제목이 너무 길어지면 ...으로 표기됨
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

