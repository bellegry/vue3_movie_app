exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Bong',
      age: 20,
      email: 'gayoung.work@gmail.com'
    })
  }
}