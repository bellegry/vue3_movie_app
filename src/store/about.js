export default {
  namespaced: true,
  // 상태는 함수로 만들어야 한다
  // 객체 데이터는 참조형이고 데이터의 불변성을 위함
  state: () => ({
    name: 'BONG',
    email: 'bong.work.bong@gmail.com',
    github: 'https://github.com/bellegry',
    phone: '+82-10-3205-0245',
    image: 'https://cdn-icons-png.flaticon.com/512/4086/4086577.png'
  })
}