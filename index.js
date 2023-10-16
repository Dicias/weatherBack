const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const {conectar,obtenerDatos,agregarDatos, buscarDato} = require('./src/mysql_connection.js');
const app = express();

const PUERTO = process.env.PUERTO //|| 3000

//Los Use son para los middleware
app.use(express.json()) //para mandar datos por POST
app.use(cors()) //los permisos del navegador
app.use(express.static('./src')); // Utilizar los archivos js
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req,res)=>{
  conectar()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/api/cities', async (req,res)=>{
try{
  const data = await obtenerDatos();
res.send(data);
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
  if(!req.body) return res.status(400).send('Fallo al obtener datos del body');
  try{
  const newCity = req.body
  agregarDatos(newCity.nombre_ciudad, newCity.temp_actual,	newCity.porcentaje_lluvia,	newCity.temp_prox1,	newCity.temp_prox2,	newCity.temp_prox3,	newCity.temp_prox4,	newCity.temp_prox5)
  res.send("Agregado Correctamente")
  }
catch(err){
res.status(500).send('Sucedio un error, vuelve a intentarlo')
}
})

app.listen(PUERTO,()=>{
  console.log(`Conectado al puerto ${PUERTO}`);
})
