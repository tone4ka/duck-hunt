import { CANVAS_HEIGTH, CANVAS_WIDTH, NUMBER_OF_LVLS } from "./constants";

describe("Constant ", () => {
    test("CANVAS_HEIGTH shoud be exists", () => {
        expect(CANVAS_HEIGTH).toBeDefined();
    });
    test("CANVAS_WIDTH shoud be exists", () => {
        expect(CANVAS_WIDTH).toBeDefined();
    });
    test("NUMBER_OF_LVLS shoud be exists", () => {
        expect(NUMBER_OF_LVLS).toBeDefined();
    });
});
