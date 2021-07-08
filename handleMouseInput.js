var down = { x: 0, y: 0 };
var up = { x: 0, y: 0 };
var move = { x: 0, y: 0 };
var isDown = false;

const animate = (direction, target) => {
  console.clear();

  target.style.animation = "animationMove 2s";

  var style = document.createElement("style");
  style.type = "text/css";
  var w = window.innerWidth;
  var h = window.innerHeight;

  switch (direction) {
    case "topleft":
      style.innerHTML = createKeyFrame(0, 0);

      break;
    case "topright":
      style.innerHTML = createKeyFrame(w, 0);

      break;
    case "bottomleft":
      style.innerHTML = createKeyFrame(0, h);

      break;
    case "bottomright":
      style.innerHTML = createKeyFrame(w, h);

      break;

    default:
      style.innerHTML = createKeyFrame(target.offsetLeft, target.offsetTop);
  }

  document.getElementsByTagName("head")[0].appendChild(style);

  // console.log("START ANIMATION");
  //console.log("DIRECTION", direction);
  setTimeout(() => {
    imageObject.continue();
    var hs = document.getElementsByTagName("style");
    for (var i = 0, max = hs.length; i < max; i++) {
      hs[i].parentNode.removeChild(hs[i]);
    }
  }, animationInterval);
};

const createKeyFrame = (moveX, moveY) => {
  return (
    "@keyframes animationMove {\
  0%   {left:" +
    target.offsetLeft +
    "px; top:" +
    target.offsetTop +
    "px;}\
  100%  {opacity: 0.5; left:" +
    moveX +
    "px; top:" +
    moveY +
    "px;}\
  }"
  );
};

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("loaded");

  var content = document.getElementById("content");

  nationalityBoxes.forEach((n) => {
    var div = document.createElement("div");
    div.className = "cbox";
    div.innerText = n.name;
    div.style.top = n.top;
    div.style.left = n.left;
    div.style.bottom = n.bottom;
    div.style.right = n.right;
    content.appendChild(div);
  });

  content.addEventListener(
    "mousedown",
    function (e) {
      isDown = true;
      //console.clear();
      down = { x: e.clientX, y: e.clientY };
      up = { x: 0, y: 0 };
      //console.log("DOWN", down);
      //console.log("UP", up);
      //console.log("MOVE", move);
      imageObject.engage();
      offset = [target.offsetLeft - e.clientX, target.offsetTop - e.clientY];
    },
    true
  );

  content.addEventListener(
    "mouseup",
    function (e) {
      isDown = false;
      //console.clear();
      up = { x: e.clientX, y: e.clientY };
      var imageUp = { x: target.style.left, y: target.style.top };
      //console.log("DOWN", down);
      //console.log("UP", up);
      var d = engine.getDirection(
        { x: down.x / 100, y: down.y / 100 },
        { x: up.x / 100, y: up.y / 100 }
      );

      const isMatched = engine.validateMove(currentNationality, d);
      const score = engine.calculateScores(isMatched);
      document.getElementById("score").innerText = score;
      //debugger;
      animate(d, imageUp, target);
    },
    true
  );
  var offset = [0, 0];
  content.addEventListener(
    "mousemove",
    function (e) {
      move = { x: e.clientX, y: e.clientY };
      event.preventDefault();
      if (isDown) {
        target.style.left = e.clientX + offset[0] + "px";
        target.style.top = e.clientY + offset[1] + "px";
      }
    },
    true
  );
});
