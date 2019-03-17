const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.listen(3001, () => {
    console.log('JSON Server is running')
})

server.put('/customers/30000001', (req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        console.log(JSON.stringify(body));
        if(body.age && body.age > 18) {
            console.log("Validation error");
            return res.send({
                error: true,
                validation: {
                    age: 'It must be underage'
                }
            });
        } else {
            res.send('ok');
        }
    });

})

server.use(router)