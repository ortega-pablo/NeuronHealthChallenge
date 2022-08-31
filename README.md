# Challenge técnico Neuron Health



**Ejercicios Prácticos Neuron**

**Ejercicio 1:**

`	`Supongamos que tenemos un arreglo con la siguiente estructura:

`		`**[ 1, 3, 4, 5, 3, 7, 1,  2, 1 ]**

`	`Haz un programa que recorre el arreglo y haga lo siguiente:

✔️ - Contar cuántas veces se repite cada número y regresar la respuesta en un arreglo. 

✔️ - Regresar el número que más se repite


`	`Ejemplo de este ejercicio:

Arreglo de incidencias: **[** 

**{numero: 1, repeticiones: 3},** 

**{numero: 3, repeticiones: 2},**

**{numero: 4, repeticiones: 1},**

**{numero: 5, repeticiones: 1},**

**{numero: 7, repeticiones: 1},**

**{numero: 2, repeticiones: 1},**

**]**

Número más repetido: **1 (1, 2)**

**Ejercicio 2:**

Generar una Base de Datos local de mongo, que se usará para probar el programa

`	`Crear un proyecto con Express y usando el paquete Mongoose, configurado en una estructura de modelos, rutas y controladores, que haga lo siguiente:

✔️ - Crear Estudiantes.

✔️ - Obtener a todos los estudiantes.

✔️ - Obtener un estudiante por id.

✔️ - Obtener todos los estudiantes y ordenarlos por fecha de nacimiento.

✔️ - Obtener todos los estudiantes de un grupo.

✔️ - Actualizar a un estudiante por id.

✔️ - Registrar calificaciones que pertenezcan a algún estudiante creado.




**Extra:**

✔️ - Configurar ESLint en el proyecto para garantizar buenas prácticas en el código

✔️ - Obtener el estudiante con las mejores calificaciones en Matemáticas / En alguna materia específica (especificar en query params).


**Modelos:**

**Modelo de Estudiante:**

\_id: ObjectId,

Nombre: String REQUERIDO,

Apellido: String REQUERIDO,

Fecha de nacimiento: Date REQUERIDO,

Grupo: String REQUERIDO ( A, B, C)

**Modelo de Calificaciones**

Estudiante: **ObjectId** REQUERIDO,

Inglés: Number NO REQUERIDO,

Español: Number NO REQUERIDO,

Matemáticas: Number NO REQUERIDO,

Historia: Number NO REQUERIDO



# Respuestas Challenge técnico Neuron Health

En primera instancia se debe clonar el repositorio e instalar las dependencias correspondientes mediante el script: 

```
npm install
```

**Ejercicio 1**

Para ejecutar el ejercicio 1, realizado en el documento repeatedFunction.js ubicado en la carpeta raíz, se debe ejecutar el script:

```
npm run exercise1
```

**Ejercicio 2**

Para hacer funcionar el servidor utilizamos el script 

```
npm run dev
```

Para verificar errores según Eslint utilizamos el script 

```
npm run lint
```

Rutas utilizadas:

Obtener el listado completo de estudiantes:
```
GET http://localhost:3000/students
```

Obtener el listado completo de estudiantes con ordenamiento:
(Tener en cuenta que order sólo puede tomar valores "asc" o "dsc", ascendente y descendente respectivamente)
```
GET http://localhost:3000/students/order/:order
```

Obtener el listado de estudiantes con la mayor nota en una asignatura:
(Tener en cuenta que comparison sólo puede tomar valores "english", "spanish", "history", "mathematics")
```
GET http://localhost:3000/students/highestScore/:comparison
```

Obtener el listado completo de estudiantes pertenecientes a un grupo:
(Tener en cuenta que group sólo puede tomar valores "A", "B" o "C")
```
GET http://localhost:3000/students/group/:group
```

Obtener un estudiante específico mediante su id:
```
GET http://localhost:3000/students/:id
```

Crear un estudiante nuevo:
```
POST http://localhost:3000/students/

body={
        "firstName": "Nombre",
        "lastName": "Apellido",
        "birthDate": "0000-00-00",
        "group": "A"
    }
```

Actualizar datos de un estudiante existente:
```
PUT http://localhost:3000/students/:id

body= {
        "firstName": "Nombre",
        "lastName": "Apellido",
        "birthDate": "0000-00-00",
        "group": "A"
    }
```

Insertar o actualizar calificaciónes a un estudiante existente:
```
PUT http://localhost:3000/students/schoolGrades/:studentId

body= {
        "spanish": 4,
        "english": 8,
        "mathematics": 9,
        "history": 9
    }
```