const koaMini = require('./index')

const app = new koaMini()
const port  = 9005

app.use(async (ctx, next) => {
    console.log('Middleware 1 Start')
    await next()
    console.log('Middleware 1 End')
})
app.use(async (ctx, next) => {
    console.log('Middleware 2 Start')
    await next()
    console.log('Middleware 2 End')
    ctx.body = 'hello, world'
})

app.listen(port, ()=>{
    console.log(`listening in http://localhost:${port}`)
})
