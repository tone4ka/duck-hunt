const cloud1 = document.createElement("img");
cloud1.src = "../../../assets/img/cloud1.png";

const cloud2 = document.createElement("img");
cloud2.src = "../../../assets/img/cloud2.png";

const cloud3 = document.createElement("img");
cloud3.src = "../../../assets/img/cloud3.png";

const cloud5 = document.createElement("img");
cloud5.src = "../../../assets/img/cloud5.png";

const cloud7 = document.createElement("img");
cloud7.src = "../../../assets/img/cloud7.png";

const cloud8 = document.createElement("img");
cloud8.src = "../../../assets/img/cloud8.png";

const cloud9 = document.createElement("img");
cloud9.src = "../../../assets/img/cloud4_little.png";

export function cloudsAdd(ctx, lvl) {
    switch (lvl) {
        case 1:
        case 7:
            ctx.drawImage(cloud2, 600, 150);
            ctx.drawImage(cloud7, 400, 50);
            break;
        case 6:
        case 2:
            ctx.drawImage(cloud9, 500, 40);
            break;
        case 3:
            ctx.drawImage(cloud2, 600, 150);
            ctx.drawImage(cloud8, 400, 50);
            break;
        case 4:
        case 8:
            ctx.drawImage(cloud5, 600, 70);
            ctx.drawImage(cloud7, 400, 30);
            break;
        case 5:
            ctx.drawImage(cloud1, 500, 70);
            break;
        case 9:
            ctx.drawImage(cloud3, 650, 40);
            break;
        default:
            break;
    }
}
