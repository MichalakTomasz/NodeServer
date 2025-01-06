const addController = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
      
      app.get('/about', (req, res) => {
          res.send(
              {
                  title: "test nodejs",
                  description: "It's a test nodeJs server"
              })
      })

      app.get('/product', (req, res) => {
        res.send()
      })
}

module.exports = addController