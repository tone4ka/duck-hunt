import { Login } from "./login.component";

const login = new Login();

describe("login ", () => {
    test("init be return instance of Function", () => {
        expect(login.init).toBeInstanceOf(Function);
    });
    test("loginEventHandler be return instance of Function", () => {
        expect(login.init).toBeInstanceOf(Function);
    });
    test("signUpEventHandler be return instance of Function", () => {
        expect(login.init).toBeInstanceOf(Function);
    });
});
