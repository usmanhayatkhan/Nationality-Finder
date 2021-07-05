var down = { x: 0, y: 0 };
var up = { x: 0, y: 0 };
var move = { x: 0, y: 0 };
var isDown = false;
const animate = (direction) => {
  console.clear();

  // Do Transition Here

  console.log("START ANIMATION");
  console.log("DIRECTION", direction);
  setTimeout(() => {
    imageObject.continue();
  }, animationInterval);
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
    },
    true
  );

  content.addEventListener(
    "mouseup",
    function (e) {
      isDown = false;
      //console.clear();
      up = { x: e.clientX, y: e.clientY };

      //console.log("DOWN", down);
      //console.log("UP", up);
      var d = engine.getDirection(
        { x: down.x / 100, y: down.y / 100 },
        { x: up.x / 100, y: up.y / 100 }
      );
      const isMatched = engine.validateMove(currentNationality, d);
      const score = engine.calculateScores(isMatched);
      document.getElementById("score").innerText = score;

      animate(d);
    },
    true
  );

  content.addEventListener(
    "mousemove",
    function (e) {
      move = { x: e.clientX, y: e.clientY };
      event.preventDefault();
      if (isDown) {
        //debugger;
        target.style.left = e.clientX + "px";
        target.style.top = e.clientY + "px";
      }
    },
    true
  );
});
