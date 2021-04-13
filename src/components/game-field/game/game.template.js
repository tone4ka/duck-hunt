import "./game.component.scss";

export const gameTemplate = (width, heigth) => {
    return `
    <canvas class="game-canvas" width="${width}" height="${heigth}"></canvas>
`;
};
