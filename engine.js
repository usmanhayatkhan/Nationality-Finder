const imageObjectInterval = 300;
const inputInterval = 100;
const animationInterval = 600;
const totalIterations = 10;
const directionThreshold = 0;
let currentIteration = 1;
let score = 0;
let images = [
  "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg?20200427164901&q=80&rw=750&rh=536",
  "https://ceas.yale.edu/sites/default/files/event-images/mcelwain_hp.jpg",
  "https://images.saymedia-content.com/.image/t_share/MTc1MTEwODI2MjAwNDc0NzE5/top-10-the-most-beautiful-japanese-actresses.png",
  "http://4.bp.blogspot.com/_sZibTP8JiLk/Sgz2a7UGENI/AAAAAAAAAdI/89XDmuOo20A/s1600/an3.jpg",
  "https://live.staticflickr.com/866/41816629562_29378df589_b.jpg",
  "https://1.bp.blogspot.com/-ijnPDDGUFgg/YHih4YiyyBI/AAAAAAAAElU/bnPLFN_cYaESAPREXlXoS3IXP44ibfh-QCLcBGAsYHQ/s1024/Urassaya+Sperbund.jpg",
  "https://www.pinkvilla.com/files/styles/contentpreview/public/cdrama_main_image.jpg?itok=HpiIUQHZ",
  "https://data.whicdn.com/images/312536155/original.jpg?t=1526672001",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWgHdkK6MBLJnSNAKSURwZr04RNuDkEqU3A&usqp=CAU",
  "https://www.24newshd.tv/digital_images/large/2020-07-08/mahira-khan-tops-list-of-highest-paid-pakistani-actresses-1594196399-5136.jpg",
];
let imageIndex = 0;
let currentImage = images[imageIndex];
let nationalities = [
  { name: "Japanese", source: "" },
  { name: "Chinese", source: "" },
  { name: "Korean", source: "" },
  { name: "Thai", source: "" },
  { name: "Korean", source: "" },
  { name: "Chinese", source: "" },
  { name: "Korean", source: "" },
  { name: "Korean", source: "" },
  { name: "Korean", source: "" },
  { name: "Chinese", source: "" },
  { name: "Japanese", source: "" },
  { name: "Thai", source: "" },
  { name: "Korean", source: "" },
  { name: "Thai", source: "" },
  { name: "Chinese", source: "" },
  { name: "Thai", source: "" },
  { name: "Japanese", source: "" },
];
let nationalitiesIndex = 0;
let currentNationality = nationalities[nationalitiesIndex];
let nationalityBoxes = [
  {
    name: "Japanese",
    position: "topleft",
    top: "0px",
    left: "0px",
  },
  {
    name: "Thai",
    position: "topright",
    top: "0px",
    right: "0px",
  },
  {
    name: "Chinese",
    position: "bottomleft",
    bottom: "0px",
    left: "0px",
  },
  {
    name: "Korean",
    position: "bottomright",
    bottom: "0px",
    right: "0px",
  },
];

let x = 5;
let y = 0;

let randomInputs = [
  { yValue: 5, x: 0, y: 0 },
  { yValue: 0, x: 0, y: 0 },
  { yValue: 0, x: 0, y: 0 },
  { yValue: 0, x: 0, y: 0 },
  { yValue: 0, x: 0, y: 0 },
  { yValue: 0, x: 0, y: 0 },
];

let imageDefaultTransition = {
  start: { x: 5, y: 0 },
  end: { x: 5, y: 10 },
};

let randomDirections = [
  // UP
  {
    start: { x: 10, y: 10 },
    end: { x: 10, y: 5 },
  },
  // DOWN
  {
    start: { x: 10, y: 10 },
    end: { x: 10, y: 15 },
  },
  // LEFT
  {
    start: { x: 10, y: 10 },
    end: { x: 5, y: 10 },
  },
  // RIGHT
  {
    start: { x: 10, y: 10 },
    end: { x: 15, y: 10 },
  },
  // TOPLEFT
  {
    start: { x: 10, y: 10 },
    end: { x: 5, y: 5 },
  },
  // TOPRIGHT
  {
    start: { x: 10, y: 10 },
    end: { x: 15, y: 5 },
  },
  // BOTTOMLEFT
  {
    start: { x: 10, y: 10 },
    end: { x: 5, y: 15 },
  },
  // BOTTOMRIGHT
  {
    start: { x: 10, y: 10 },
    end: { x: 15, y: 15 },
  },
];

let isEngaged = false;
let isStopped = false;

const engine = {
  score: score,
  nationalities: nationalities,
  getDirection: (start, end) => {
    let verticalDirection = "same";
    if (end.y - start.y <= directionThreshold * -1) {
      verticalDirection = "top";
    } else if (end.y - start.y >= directionThreshold) {
      verticalDirection = "bottom";
    }
    let horizontalDirection = "same";
    if (end.x - start.x <= directionThreshold * -1) {
      horizontalDirection = "left";
    } else if (end.x - start.x >= directionThreshold) {
      horizontalDirection = "right";
    }

    if (verticalDirection === "same") {
      return horizontalDirection;
    } else {
      if (horizontalDirection === "same") {
        return verticalDirection;
      }
    }

    if (verticalDirection !== "same") {
      if (horizontalDirection !== "same") {
        return `${verticalDirection}${horizontalDirection}`;
      }
    }
  },
  validateMove: (nationality, direction) => {
    let isValid = false;
    for (let index = 0; index < nationalityBoxes.length; index++) {
      const n = nationalityBoxes[index];
      const isSameNationality = nationality.name === n.name;
      const isSameDirection = direction === n.position;
      if (isSameNationality && isSameDirection) {
        isValid = true;
        break;
      } else {
        if (direction === "left" || direction === "right") {
          const isTop = y < 5 && isSameNationality;
          const isBottom = y > 5 && isSameNationality;

          if (isTop) {
            if (n.position.includes("top")) {
              isValid = true;
              break;
            }
          }

          if (isBottom) {
            if (n.position.includes("bottom")) {
              isValid = true;
              break;
            }
          }
        }
      }
    }
    return isValid;
  },
  calculateScores: (isMatched) => {
    if (isMatched) {
      score += 20;
    } else {
      score -= 5;
    }
    return score;
  },
};

const imageObject = {
  isEngaged: isEngaged,
  start: (transition) => {
    // console.log("ImageObject.Started")
    setInterval(() => {
      if (!isEngaged && !isStopped) {
        if (y >= transition.end.y) {
          y = 0;
          currentIteration++;
          nationalitiesIndex = Math.floor(
            Math.random() * (nationalities.length - 1)
          );
          imageIndex = Math.floor(Math.random() * (images.length - 1));
          currentImage = images[imageIndex];
          currentNationality = nationalities[nationalitiesIndex];
          currentNationality.source = currentImage;
          //console.log(`cN => ${currentNationality}`);
        } else {
          y++;
        }

        var target = document.getElementById("target");
        target.setAttribute("src", currentImage);
        target.style.top = y * 100 + "px";
        target.style.left = 45 + "%";
        // var n = document.getElementById("nationality");
        // n.innerText = currentNationality.name;
        // n.style.top = y * 100 + "px";
        // n.style.left = 45 + "%";

        // console.log(`Image: x=>${x}, y=>${y}`);
      } else {
        // console.log("ImageObject.Skipping")
      }
    }, imageObjectInterval);
    // start: {x:0,y:0}
    // end: {x:0,y:0}
    // start to end transistion
  },
  engage: () => {
    // console.log("ImageObject.Engaged")
    isEngaged = true;
    // pause transition
  },
  continue: () => {
    // console.log("ImageObject.Continued");
    y = imageDefaultTransition.end.y;
    isEngaged = false;

    // continue transition
  },
  stop: () => {
    isStopped = true;
    // console.log("ImageObject.Stopped")
    // stop/kill transistion
  },
};

const game = {
  engine: engine,
  imageObject: imageObject,
  userInput: { x: 0, y: 0 },

  start: (imageObj) => {
    imageObj.start(imageDefaultTransition);
    setInterval(handleUserInput, inputInterval);
  },
  end: () => {
    // end game
  },
};
