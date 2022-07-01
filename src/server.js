const express = require('express')
const { Server: IOServer } = require('socket.io')
const path = require('path')
const app = express()
const expressServer = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(expressServer)
const messagesArray = []



const Contenedor = require('./Contenedor.js');
dbChats = new Contenedor;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas estáticas - public
app.use(express.static(path.join(__dirname, '../public')));

//io sockets
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id);
 
    socket.emit('server:products', products);
    socket.on('client:product', productInf => {
        products.push(productInf);
        io.emit('server:products', products);
    })

    socket.emit('server:msgs', messagesArray);
    socket.on('client:msg', messagesInfo => {
        messagesArray.push(messagesInfo);
        dbChats.save(messagesInfo);
        io.emit('server:msgs', messagesArray)
    })
});