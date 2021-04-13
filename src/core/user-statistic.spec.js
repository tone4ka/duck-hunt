import { getStat, getLvlStat } from "./user-statistic";

describe("User statistics ", () => {
    test("getStat must have property time", () => {
        expect(getStat()).toHaveProperty("time");
    });
    test("getStat must have property ducks", () => {
        expect(getStat()).toHaveProperty("ducks");
    });
    test("getStat must have property hits", () => {
        expect(getStat()).toHaveProperty("hits");
    });
    test("getStat must have property kills", () => {
        expect(getStat()).toHaveProperty("kills");
    });
    test("getStat must have property score", () => {
        expect(getStat()).toHaveProperty("score");
    });
});

describe("User statistics ", () => {
    test("getLvlStat must have property ducksKillPerRound", () => {
        expect(getLvlStat()).toHaveProperty("ducksKillPerRound");
    });
    test("getLvlStat must have property duckKillPerLevel", () => {
        expect(getLvlStat()).toHaveProperty("duckKillPerLevel");
    });
    test("getLvlStat must have property duckCount", () => {
        expect(getLvlStat()).toHaveProperty("duckCount");
    });
    test("getLvlStat must have property ducksFlyAway", () => {
        expect(getLvlStat()).toHaveProperty("ducksFlyAway");
    });
    test("getLvlStat must have property ducksFlyAwayPerRound", () => {
        expect(getLvlStat()).toHaveProperty("ducksFlyAwayPerRound");
    });
    test("getLvlStat must have property bulets", () => {
        expect(getLvlStat()).toHaveProperty("bulets");
    });
    test("getLvlStat must have property hits", () => {
        expect(getLvlStat()).toHaveProperty("hits");
    });
    test("getLvlStat must have property score", () => {
        expect(getLvlStat()).toHaveProperty("score");
    });
});
