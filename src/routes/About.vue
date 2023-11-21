<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ github }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    bong() {
      // 전개연산자를 이용해서 작성해야 다른 함수를 추가할수 있음
    },
    ...mapState('about', [
      'image',
      'name',
      'email',
      'github',
      'phone'
    ])
    // mapState함수로 객체데이터를 전개연산자로 computed에 등록
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // github() {
    //   return this.$store.state.about.github
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // },
  },
  // lifecycle에서는 비동기로 사용이 불가, 따라서 별도의 method를 만들어서 사용해야함
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 20px;
  }
}
  
</style>