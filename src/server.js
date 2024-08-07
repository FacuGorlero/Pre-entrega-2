const express = require("express");
const ProductManager = require("./Manager/ProductManager.js");
const { productosrouter} = require("./routes/products.route.js");
const { cartsRouter } = require ("./routes/cart.route.js");
const handlebars = require("express-handlebars");
const {viewsrouter} = require("./routes/views.route.js");
const { Server } = require("socket.io");


const app = express();
const port = 8080;



// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// motor de plantilla
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views")

// definiendo vistas
app.use('/', viewsrouter)

app.use("/api/products", productosrouter)
app.use('/api/carts/', cartsRouter)

app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Error de server')
})

const serverHttp = app.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});


// Servidor WebSocket
const ServerIO = new Server(serverHttp)



const products = new ProductManager("./src/mock/Productos.json");
ServerIO.on('connection', io => {
console.log('nuevo cliente conectado')


io.on('nuevoproducto', async newProduct => {
   await products.addProduct(newProduct)
   console.log(newProduct)
  const listproduct = await products.getProducts();

  io.emit('productos', listproduct)

})

io.on ('eliminarProducto', async code => {
  await products.deleteProductbycode(code);
  const listproduct = await products.getProducts()  

  io.emit ('productos', listproduct)

})
});





  