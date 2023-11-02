<template>
  <RouterLink 
    to="/" 
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.logo {
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>