const mysql = require('mysq');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'disenio'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Implementar las operaciones CRUD

// Obtener todos los productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      res.status(500).json({ error: true, message: 'Error al obtener los productos' });
      return;
    }
    res.json(results);
  });
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      res.status(500).json({ error: true, message: 'Error al obtener el producto' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: true, message: 'Producto no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Agregar un nuevo producto
app.post('/productos', (req, res) => {
  const data = req.body;
  connection.query('INSERT INTO productos SET ?', data, (err, results) => {
    if (err) {
      console.error('Error al agregar el producto:', err);
      res.status(500).json({ error: true, message: 'Error al agregar el producto' });
      return;
    }
    res.status(201).json({ success: true, message: 'Producto agregado correctamente' });
  });
});

// Eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      res.status(500).json({ error: true, message: 'Error al eliminar el producto' });
      return;
    }
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  });
});

// Actualizar un producto por ID
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  connection.query('UPDATE productos SET ? WHERE id = ?', [newData, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el producto:', err);
      res.status(500).json({ error: true, message: 'Error al actualizar el producto' });
      return;
    }
    res.json({ success: true, message: 'Producto actualizado correctamente' });
  });
});
