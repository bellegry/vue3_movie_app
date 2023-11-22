import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module
  namespaced: true,
  // 취급해야하는 data, 상태
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // 계산된 상태를 만드는 computed
  getters: () => ({
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  }),
  // methods
  // 변이, 관리하는 데이터를 변경해서 전달 가능
  // mutations를 통해서만 데이터를 수정 가능하도록 해야함, 데이터의 복잡성을 줄여줌
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = [],
      state.message = _defaultMessage,
      state.loading = false
    }
  },
  // actions에서는 기본적으로 데이터 수정이 허용되지 않음
  // 비동기
  actions: {
    async searchMovies({ state, commit }, payload) {
      // 조건이 동작하는 도중에 사용자가 apply를 여러번 누른다던지 엔터를 여러번 친다던지 해서 searchMovies 함수가 여러번 시행되는것을 방지
      if ( state.loading ) return

      // 검색 시작 전에 message에 아무것도 없이 초기화 시켜줌,
      // 검색 시작되면 로딩이 true로 바뀜
      commit( 'updateState',{
        message: '',
        loading: true
      })

      try {
        // const {title, type, number, year} = payload
        // const OMDB_API_KEY = '7035c60c'

        const res = await _fetchMovies({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults)         // 380
        console.log(typeof totalResults)  // string

        const total = parseInt(totalResults, 10)  // 영화 전체 개수를 number로 바꿔줌
        const pageLength = Math.ceil(total / 10)  // 인수로 바뀐 개수를 10으로 나눈 값을 올림

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) {
              break
            }
            const res = await _fetchMovies({
              ...payload,
              page
            })
            const { Search } = res.data
            commit ('updateState' , {
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch ({message}) {
        commit('updateState', {
          // 검색시 영화의 목록은 있으나 코드에 문제가 있을시 초기화
          movies: [],          
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithID({ state, commit }, payload) {
      if ( state.loading ) return

      // searchMovieWithID가 진행되면 이전 작업들이 남아있지 않도록 초기화
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      const { id } = payload
      try {
        const res = await _fetchMovies(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 함수의 앞에 _를 붙이면 현재 페이지에서만 실행되는 함수라는 표기
// _fetchMovie 함수로 따로 관리하는 이유 : 예외처리를 위함,
// 복잡한 코드를 매번 새로 작성할 필요 없게 하기 위함
// function _fetchMovies(payload) {
//   const { title, type, year, page, id } = payload
//   const OMDB_API_KEY = '7035c60c'
//   const url = id 
//     ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
//     : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
//   return new Promise((resolve, reject) => {
//     axios.get(url)
//       .then(res => {
//         // payload 정보가 없는데 정상응답 처리되는것을 방지
//         if(res.data.Error) {
//           reject(res.data.Error)
//         }
//         resolve(res)
//       })
//       .catch(err => {
//         // error 메시지만 reject에 반환
//         reject(err.message)
//       })
//   })
// }
async function _fetchMovies(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}