import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.urlencoded({ extended: true }));

// HANDLEBARS ---------------------------------------

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// HANDLEBARS ---------------------------------------

// PUG ----------------------------------------------

// app.set('view engine', 'pug');
// app.set('views', './views');


// PUG ----------------------------------------------

// EJS ----------------------------------------------

app.set('view engine', 'ejs');

// EJS ----------------------------------------------

// Comentar contenido de productos para verificar el if de las plantillas

const productos = [
	{
		title: 'Harry Poter Y La Piedra Filosofal',
		price: 12,
		thumbnail:
			'https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg',
		id: 1,
	},
	{
		title: 'Harry Poter Y El Prisionero De Azkaban',
		price: 13,
		thumbnail:
			'https://images-na.ssl-images-amazon.com/images/I/8103uoOEY9L.jpg',
		id: 2,
	},
];

app.get('/', (req, res) => {
    res.render('form');
});

app.get('/productos', (req, res) => {
	res.render('productos', { productos });
});


app.post('/productos', (req, res) => {
	const newProducto = req.body;
	const idList = productos.map((a) => a.id);
	const largestId = idList.reduce((a, b) => {
		return Math.max(a, b);
	}, 0);
	const newId = largestId + 1;
	const producto = { ...newProducto, id: newId || 1 };
	productos.push(producto);
    res.redirect('/')
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

