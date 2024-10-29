import { expect } from "chai";
import sinon from "sinon";
import { fetchUsers } from "../../src/users.js";

describe("Проверка работы функции fetchUsers", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("Функция должна получать и выводить имена пользоватетлей", async () => {
    const testUsers = [
      { id: 1, name: "Helen Smith" },
      { id: 2, name: "Bob Marley" },
    ];
    global.fetch = sandbox.stub().resolves({
      ok: true,
      json: async () => testUsers,
    });

    const consoleLogSpy = sandbox.spy(console, "log");

    await fetchUsers();

    expect(global.fetch.calledOnce).to.be.true;
    expect(
      global.fetch.calledWith("https://jsonplaceholder.typicode.com/users")
    ).to.be.true;

    expect(consoleLogSpy.calledWith("Helen Smith")).to.be.true;
    expect(consoleLogSpy.calledWith("Bob Marley")).to.be.true;
  });

  it("Функция должна обрабатывать ошибки при неудачном запросе", async () => {
    global.fetch = sandbox.stub().resolves({
      ok: false,
      status: 404,
    });
    try {
      await fetchUsers();
      expect.fail("Функция должна была выбросить ошибку");
    } catch (error) {
      expect(error.message).to.include(
        "Network response was not ok, status: 404"
      );
    }
  });
});
