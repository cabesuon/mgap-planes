# Repo - Base de Datos Geográfica

## Estructura

- _db_ : Consultas relacionadas a la creación de bases, esquemas y tablas del modelo.
- _functions_ : Consultas para crear las funciones para el modelo y para tests.
- _procedures_ : Consultas para crear los procedimientos para el modelo y para tests.
- _tests_ : Consultas para crear los tests unitarios del modelo.
- _triggers_ : Consultas para crear los triggers del modelo.
- _tsqlt_ : Consultas para instalar el framework de tests.

## Programa "_run.sh_" y "_run.bat_"

### Parámetros posicionales

1. _command_ : Comando a ejecutar.
2. _host_ : Url del servidor.
3. _user_ : Nombre de usuario de la base de datos.
4. _password_ : Password del nombre de usuario.
5. _dbname_ : Nombre de la base de datos.
6. _arcgis_ : Opcional, se utiliza en caso que las tablas hayan sido creadas por ArcGIS y la base este registrada como GeoDatabase.

### Comandos

- _createdb_ : Crea la base de datos "_PlanesCoreGDB_".
- _createschema_ : Crea el esquema "_PlanesCore_".
- _createtables_ : Crea las tablas "_Chacras_","_Pendientes_" y "_ZonasDeExclusion_".
- _addconstraints_ : Crea las restricciones de las tablas.
- _createfunctions_ : Crea las funciones auxiliares del modelo.
- _createprocedures_ : Crea los procedimientos axiliares del modelo.
- _createtriggers_ : Crea los triggers de las tablas.
- _addtsqlt_ : Instala el framework para test.
- _addtestfunctions_ : Crea las funciones auxiliares para tests.
- _addtestprocedures_ : Crea los procedimientos auxiliares para tests.
- _test_ : Crea y ejecuta los tests.
- _dropdb_ : Elimina la base "_PlanesCoreGDB_".
- _doall_ : Ejecuta todos los comandos en orden excepto _dropdb_. Si el parametro _arcgis_ es utilizado, se ejecutan los comandos a partir de _addcontraints_.

### Nota

Los comandos _createdb_ y _dropdb_ no utilizan el parámetro del programa _dbname_. En las consultas que ejecuta el programa para estos comandos el nombre de la base de datos esta fijada en "_PlanesCoreGDB_". Si se desea utilizar otro nombre de base de datos es necesario fijarlo en las mencionadas consultas.
