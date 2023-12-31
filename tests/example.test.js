import axios from "axios"
import { fetchMovieTitle } from "./example"

describe('비동기 테스트', () => {
  test('영화제목 변환', async () => {
    axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: {
            Title: 'Frozen II'
          }
        })
      })
    })
    const title = await fetchMovieTitle()
    expect(title).toBe('Frozen ii??')
  })
})