const request = require("supertest");
const app = require("../index.js");

describe("Test for /api/auth/signin route", () => {
  test("Testing user login credentials route", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "john.doe@example.com",
      password: "hashedpassword1",
    });

    console.log(response.body);
    const { message, success, data } = response.body;

    expect(message).toEqual("Sign In successful");
    expect(success).toBeTruthy();
    expect(data).toHaveProperty("id");
  });
});
