<template>
  <div class="container">
    <!-- Content here -->
    <h1>
    <span>OMDb API</span><br />
    THE OPEN<br />
    MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.
      <br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>    
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 60px;
  @include media-breakpoint-down(sm) {
    padding-top: 20px;
  }
}

h1 {
  line-height: 1;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 80px;
  span {
    color: $primary;
  }
  @include media-breakpoint-down(sm) {
      font-size: 56px;
  }
}

p {
  margin: 30px 0;
  color: $gray-600;
}
</style>