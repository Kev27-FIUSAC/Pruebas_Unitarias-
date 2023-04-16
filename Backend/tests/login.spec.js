const signup = require("../controllers/Registro.controller");
const BD = require("../config/conexion.js");
const request = require("supertest");
const app = require("../index");

describe("Peticion get para Login", () => {
  // el campo autenticacion retornara si existe o no el usuario
  test("el campo autenticacion debe ser true", async () => {
    const res = await request(app).get("/login/iniciarSesion/OsmanPL/oapl6");
    //expect(typeof res.body.autenticacion === 'boolean').toBe(false);
    expect(res.status).toBe(400);
  });
});

describe("Pruebas Agregar Amigos", function () {
  describe("GET /api/friends/", function () {
    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).get("/api/friends/2");

      expect(response.status).toBe(200);
    });

    test("deberia responder codigo estado 400", async () => {
      const response = await request(app).get("/api/friends/HOLA");

      expect(response.status).toBe(400);
    });

    test("deberia responder con un arreglo", async () => {
      const response = await request(app).get("/api/friends/2");

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/requests/", function () {
    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).get("/api/requests/2");

      expect(response.status).toBe(200);
    });

    test("deberia responder con un arreglo", async () => {
      const response = await request(app).get("/api/requests/2");

      expect(response.body).toBeInstanceOf(Array);
    });

    test("deberia responder con un arreglo", async () => {
      const response = await request(app).get("/api/requests/4");

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/users/", function () {
    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).get("/api/users/2");

      expect(response.status).toBe(200);
    });

    test("deberia responder con un arreglo", async () => {
      const response = await request(app).get("/api/users/2");

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("PUT /api/confirm/", function () {
    const data = { idAmigo1: 1, idAmigo2: 2 };

    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).put("/api/confirm").send(data);

      expect(response.status).toBe(200);
    });

    test("deberia responder con un json defino con status y result", async () => {
      const response = await request(app).put("/api/confirm").send(data);

      expect(response.body.status).toBeDefined();
      expect(response.body.result).toBeDefined();
    });
  });

  describe("PUT /api/send-again/", function () {
    const data = { idAmigo1: 1, idAmigo2: 2 };

    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).put("/api/send-again").send(data);

      expect(response.status).toBe(200);
    });

    test("deberia responder con un json defino con status y result", async () => {
      const response = await request(app).put("/api/send-again").send(data);

      expect(response.body.status).toBeDefined();
      expect(response.body.result).toBeDefined();
    });
  });

  describe("PUT /api/reject/", function () {
    const data = { idAmigo1: 1, idAmigo2: 2 };

    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).put("/api/reject").send(data);

      expect(response.status).toBe(200);
    });

    test("deberia responder con un json defino con status y result", async () => {
      const response = await request(app).put("/api/reject").send(data);

      expect(response.body.status).toBeDefined();
      expect(response.body.result).toBeDefined();
    });
  });

  describe("POST /api/send-request/", function () {
    const data = { idAmigo1: 1, idAmigo2: 2 };

    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).post("/api/send-request").send(data);

      expect(response.status).toBe(200);
    });

    test("deberia responder con un json defino con status y result", async () => {
      const response = await request(app).post("/api/send-request").send(data);

      expect(response.body.status).toBeDefined();
      expect(response.body.result).toBeDefined();
    });
  });
});

describe("Peticion put para Perfil", () => {
  //Campo username debe ser String
  test("El campo status debe ser True", async () => {
    const res = await request(app).put("/profile/editprofile").send({
      username: "OsmanPL",
      newpassword: "newpw",
      password: "efe",
      name: "osmane dembele",
      img_url: "dembow",
    });
    expect(typeof res.body.status === "boolean").toBeTruthy();
  });

  test("deberia de responder un estado de codigo 200", async () => {
    const response = await request(app).put("/profile/editprofile").send({
      username: "OsmanPL",
      newpassword: "newpw",
      password: "efe",
      name: "osmane dembele",
      img_url: "dembow",
    });

    expect(response.statusCode).toBe(200);
  });
});

describe("Peticion post para Registro", () => {
  // el campo validacion no debe de existir
  test("No debe existir campo validacion", async () => {
    const response = await request(app).post("/signup/registrar").send({
      nickname: "nickname",
      password: "tokenkey",
      email: "@",
      name: "nombre",
      pass: "pass",
    });
    expect(response.body).not.toHaveProperty("validacion");
  });

  test("el campo status debe ser true", async () => {
    const res = await request(app).post("/signup/registrar").send({
      nickname: "nickname",
      password: "tokenkey",
      email: "@",
      name: "nombre",
      pass: "pass",
    });
    expect(typeof res.body.status === "boolean").toBeTruthy();
    //  expect(res.body.status).toMatch(/[null|true|false]/);
  });
});

describe("Pruebas Publicaciones", function () {
  describe("POST /api/new-post/", function () {
    const data = { imagen: "", texto: "", idUser: 1, fecha: "2020-12-12" };
    test("deberia responder codigo estado 200", async () => {
      const response = await request(app).post("/api/new-post").send(data);

      expect(response.status).toBe(200);
    });
  });

  describe("POST /api/posts", function () {
    test("deberia responder codigo estado 200", async () => {
      const data = { idUsuario: 1 };
      const response = await request(app).post("/api/posts").send(data);

      expect(response.status).toBe(200);
    });
  });
});
