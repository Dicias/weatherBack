const mysql = require('mysql')

const conector = mysql.createConnection({
  host: 'localhost',
  user: 'dicias',
  password: '123456',
  database: 'weather_data'
})

const conectar = () =>{
conector.connect((err)=>{
  if(err) throw err
  console.log('Conectado a la base de datos...');
})
}

const obtenerDatos = () =>{
  return new Promise((resolve, reject)=>{
    const queryObtener = 'SELECT * FROM ciudades';
    conector.query(queryObtener, (err,result)=>{
      if(err) reject(err)
      resolve(result)
    })
  })
}

const agregarDatos = (nombre_ciudad, temp_actual,	porcentaje_lluvia,	temp_prox1,	temp_prox2,	temp_prox3,	temp_prox4,	temp_prox5) =>{
  const queryAgregar = `INSERT INTO ciudades(id_ciudad,	nombre_ciudad, temp_actual,	porcentaje_lluvia,	temp_prox1,	temp_prox2,	temp_prox3,	temp_prox4,	temp_prox5) VALUES (${null}, "${nombre_ciudad}", ${temp_actual}, ${porcentaje_lluvia}, ${temp_prox1}, ${temp_prox2}, ${temp_prox3}, ${temp_prox4}, ${temp_prox5})`
  conector.query(queryAgregar, (err, result)=>{
    if(err) throw err
    console.log('Datos agregados correctamente');
    console.log(result)
  })
}

const buscarDato = (id) =>{
  return new Promise((resolve, reject)=>{
    const queryBuscar = `SELECT * FROM ciudades WHERE id_ciudad = ${id}`
    conector.query(queryBuscar, (err, result)=>{
      if(err) reject(err)
      resolve(result)
    })
  })
}


module.exports = {conectar, obtenerDatos, agregarDatos, buscarDato}