const express = require('express');
const cors = require('cors')
const {conectar,obtenerDatos,agregarDatos, buscarDato} = require('./src/mysql_connection.js')
const app = express();

const PUERTO = process.env.PUERTO || 3000

app.use(express.json())
app.use(cors())
app.use(express.static('./src'));

app.get('/', (req,res)=>{
  res.send('Nuevo Server 😈🧪')
  conectar()
})

app.get('/api/cities', async (req,res)=>{
try{
  const todo = await obtenerDatos();
res.send(todo);
res.end()
}
catch(err){
console.log(err);
res.status(500).send('Error al obtener los datos').end();
}
})

app.get('/api/cities/:id', async (req,res)=>{
  try{
  const id = req.params.id
  const city = await buscarDato(id);
  console.log(city, 'desde log');
  res.send(city);
  res.end()
  }catch(err){
    console.log(err);
    res.status(500).send('Error al obtener los datos').end()
  }
})


app.post('/api/cities',(req,res)=>{
  const newCity = req.body
  agregarDatos(newCity.nombre_ciudad, newCity.temp_actual,	newCity.porcentaje_lluvia,	newCity.temp_prox1,	newCity.temp_prox2,	newCity.temp_prox3,	newCity.temp_prox4,	newCity.temp_prox5)
  res.send("Agregado Correctamente")
  
})

app.listen(PUERTO,()=>{
  console.log(`Conectado al puerto ${PUERTO}`);
})
