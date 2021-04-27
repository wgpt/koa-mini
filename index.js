const http = require('http')

// 主类
class Application {
    constructor() {
        this.middleware = []
    }

    // 注册中间间
    use(arg) {
        this.middleware.push(arg)
    }

    listen(...arg) {

        // 服务实例
        const server = http.createServer(async (req, res) => {
            // 上下文
            let ctx = new Context(req, res)
            ctx.body = '11'

            // 注册洋葱
            let fn = compose(this.middleware)

            // 执行
            await fn(ctx)

            ctx.res.end(ctx.body)
        })

        // 开启服务
        server.listen(...arg)

    }

}

// req , res 合集上下文
class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}

function compose(middleware) {
    return (ctx) => {

        // 洋葱执行模式
        const dispatch = (i) => {

            middleware[i] && middleware[i](ctx, () => dispatch(i + 1))

        }
        dispatch(0)
    }
}

module.exports = Application
