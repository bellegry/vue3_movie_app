module.exports = {
  env: {
    // 코드 검사를 할 것인지 설정
    browser: true,
    node: true
  },
  extends: [
    // 코드검사를 할 규칙 지정
    // vue
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    // 'plugin:vue/vue3-recommended', // Lv3 가장 엄격함
    
    // js
    'eslint:recommended'

  ],
  // es6문법을 es5로 인식하도록 변경해줌
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    // babelOptions: {
    //   babelrc: false,
    //   configFile: false,
    //   // your babel options
    //   presets: ["@babel/preset-env"],
    // },
  },
  rules: {
    // 변경 추가 할 때

    // 닫힘태그 />로 변경
    "vue/html-self-closing": ["error", {
      "html": {
        void: "always",
        normal: "never",
        component: "always"
      },
      svg: "always",
      math: "always"
    }],
    
    // 닫힘태그 설정
    "vue/html-closing-bracket-newline": ["error", {
      // 한 줄 작성 코드에서는 닫히는 >를 줄바꿈을 하지 않아도 된다
      singleline: "never",
      // 여러줄 작성의 경우 닫히는 >를 반드시 줄바꿈해야 한다 : always
      multiline: "never"
    }],
  }
}