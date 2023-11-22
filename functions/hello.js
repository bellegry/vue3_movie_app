exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Bong',
      age: 20,
      email: 'bong.work.bong@gmail.com'
    })
  }
}