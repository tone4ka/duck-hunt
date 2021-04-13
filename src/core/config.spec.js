import { lang } from "./config";

describe("Constant ", () => {
    test("lang shoud be object", () => {
        expect(lang).toBeInstanceOf(Object);
    });
    test("EN shoud be object", () => {
        expect(lang.EN).toBeInstanceOf(Object);
    });
    test("RU shoud be object", () => {
        expect(lang.RU).toBeInstanceOf(Object);
    });
    test("BY shoud be object", () => {
        expect(lang.BY).toBeInstanceOf(Object);
    });
});
