# Práctica 2 

> Pruebas Unitarias

## Tabla de Contenido
- [Práctica 2](#práctica-2)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Conceptos Básicos](#conceptos-básicos)
      - [Pruebas Unitarias](#pruebas-unitarias)
      - [Estructura de las Pruebas Unitarias](#estructura-de-las-pruebas-unitarias)
  - [Herramientas Utilizadas](#herramientas-utilizadas)
      - [Jest](#jest)
      - [Chai](#chai)
      - [Testing-Library / Vue](#testing-library--vue)
  - [Pruebas Unitarias Realizadas](#pruebas-unitarias-realizadas)
    - [Backend](#backend)
    - [Frontend](#frontend)
       - [Pruebas realizadas en Jest con vue, estas pruebas fueron creadas con el objetivo de observar el correcto funcionamiento de la pagina.](#pruebas-realizadas-en-jest-con-react-estas-pruebas-fueron-creadas-con-el-objetivo-de-observar-el-correcto-funcionamiento-de-la-pagina)
  - [Anexos](#anexos)
    - [Capturas de pantalla de la aplicación.](#capturas-de-pantalla-de-la-aplicación)
      - [**Pantalla login**](#pantalla-login)
      - [**Visualizar publicaciones**](#visualizar-publicaciones)
      - [**Pantalla registro**](#pantalla-registro)
  - [Referencia Bibliográfica](#referencia-bibliográfica)

## Conceptos Básicos
#### Pruebas Unitarias

Las pruebas unitarias (también test unitarios, o unit testing) son un método de pruebas de software que se realizan escribiendo fragmentos de código que testeará unidades de código fuente. El objetivo es asegurar que cada unidad funciona como debería de forma independiente.

No existe una definición cerrada respecto a lo que es una unidad de código, podría ser una clase, o podría ser simplemente un método.

Las pruebas unitarias son las primeras que se realizan ya con código escrito, y las crea el propio desarrollador.

Es importante también tener claro, que las pruebas unitarias, como el resto de pruebas, no demuestran la ausencia de errores en el código, ya que éstos pueden ser errores de integración, rendimiento, etc… que los test unitarios no son capaces de detectar.

#### Estructura de las Pruebas Unitarias
Por norma general, los unit test deberían seguir una estructura AAA, sobretodo para facilitar su lectura y entendimiento. AAA son las siglas de:

- Arrange (Organizar): En esta parte de la prueba, debes establecer las condiciones iniciales para poder realizarla, así como el resultado que esperas obtener. Y esto significa por ejemplo, declarar las variables y crear las instancias de los objetos.
- Act (Accionar): Es la parte de ejecución, tanto del fragmento de código de la prueba, como del fragmento de código a testear.
- Assert (Comprobar): Por último, se realiza la comprobación para verificar que el resultado obtenido, coincide con el esperado.

## Herramientas Utilizadas
#### Jest
Jest es un framework de pruebas de JavaScript con numerosas funciones que se ejecuta en Node. js y en el navegador. Las pruebas de Jest se ejecutan en serie, lo que permite informes flexibles y precisos. Como hemos dicho, Jest es un framework de pruebas.

#### Chai
Chai es una librería de aserciones, que se puede emparejar con cualquier marco de pruebas de JavaScript. Chai tiene varias interfaces: assert, expect y should. Que permiten al programador elegir un estilo que le resulte más legible a la hora de desarrollar los test .


#### Testing-Library / Vue
Test utils es un set de utilidades de testing simple y completo que promueve las buenas prácticas del testing. Es una ayuda para testear User Interfaces de forma centrada en el usuario.

## Pruebas Unitarias Realizadas
#### Backend
----
<table>
<tr>
    <td>Método / Función</td>
    <td>Prueba Unitaria</td>
</tr>
<tr>
<td>

```js
const signup = require('../controllers/Registro.controller');
const BD = require('../config/conexion.js');
const request = require('supertest');
const app = require('../index');
 
describe('Petición get para Login', () =>{
    // el campo autenticacion retornara si existe o no el usuario
    test('el campo autenticacion debe ser true', async () =>{
      const res = await request(app).get('/login/iniciarSesion/OsmanPL/oapl6').send();
      expect(typeof res.body.autenticacion === 'boolean').toBeTruthy();
    });
  });

```
</td>
<td>

  ```js
  describe('test login endpoint: ',()=>{
    it('should login', (done) => {
        chai.request(url)
        .post('/login')
        .send({username: "201602625", password: "123456789"})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(202);
            done();
        });
    });
   });
  ```
</td>
</tr>
<tr>
<td>

  ```js
 describe('Peticion put para Perfil', () =>{
    //Campo username debe ser String
    test("El campo status debe ser True", async () =>{
        const res = await request(app).put('/profile/editprofile').send({
            username: 'OsmanPL',
            newpassword: 'newpw',
            password: 'efe',
            name: 'osmane dembele',
            img_url: 'dembow'
        });
        expect(typeof res.body.status === 'boolean').toBeTruthy();
     
    });

  ```
</td>

</tr>

</table>

### Frontend

#### Pruebas realizadas en Jest con vue, estas pruebas fueron creadas con el objetivo de observar el correcto funcionamiento de la pagina.

<table>
<tr>
<td>

  ```js
import { mount } from '@vue/test-utils'
import Login from './Login.vue'
describe('Prueba unitaria de login: ',()=>{
 
    test('insercion de datos',()=>{
        const taskName ='Username'
        const wrapper = mount(Login)
        const textInput = wrapper.find('input[type="text"]')
        textInput.setValue('user')
        expect(wrapper.find('input[type="text"]').element.value).toBe('user')
 
        expect(wrapper.html()).toContain(taskName);
    });
});
describe('Prueba unitaria de login 2: ',()=>{
 
    test('insercion de datos 2',()=>{
        const taskName ='Password'
        const wrapper = mount(Login)
 
        const textInput2 = wrapper.find('input[type="password"]')
        textInput2.setValue('pass')
        expect(wrapper.find('input[type="password"]').element.value).toBe('pass')
        expect(wrapper.html()).toContain(taskName);
    });

  ```
</td>
</tr>

<tr>
<td>

  ```js
import { mount } from '@vue/test-utils'
import Users from '../../Home/Users.vue'
describe('Prueba unitaria de Perfil: ',()=>{
 
    test('insercion de datos edit perfil',()=>{
        const taskName ='Username'
        const wrapper = mount(Users)
        const textInput = wrapper.find('input[type="text"] ')
        textInput.setValue('user')
        expect(wrapper.find('input[type="text"]').element.value).toBe('user')
 
        expect(wrapper.html()).toContain(taskName);
    });
});
describe('Prueba unitaria de editperfil 2: ',()=>{
 
    test('insercion de datos 2',()=>{
        const taskName ='Password'
        const wrapper = mount(Users)
 
        const textInput2 = wrapper.find('input[type="password"]')
        textInput2.setValue('pass')

  ```
</td>
</tr>


</table>

- - -

## Anexos
### Capturas de pantalla de la aplicación.

#### **Pantalla login**
<img src="imagenes\imagen1.png">

#### **Visualizar publicaciones.**
<img src="imagenes\imagen2.jpeg">

#### **Pantalla registro**
<img src="imagenes\imagen3.jpeg">





- - -




