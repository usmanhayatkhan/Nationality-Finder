//console.clear();

game.start(imageObject);

const startAgain = () => {
  //Will move these to game.Setting();
  currentIteration = 1;
  score = 0;
  var scoreel = document.getElementById("score");
  scoreel.innerText = score;
  imageIndex = 0;
  currentImage = images[imageIndex];

  nationalitiesIndex = 0;
  currentNationality = nationalities[nationalitiesIndex];

  x = 5;
  y = 0;
  directionThreshold = 2;

  imageDefaultTransition = {
    start: { x: 5, y: 0 },
    end: { x: 5, y: 10 },
  };

  isEngaged = false;
  isStopped = false;
  document.getElementById("start").className = "start-hidden";
  document.getElementById("target").style.display = "inline";
  document.getElementById("nationality").style.display = "inline";
  console.log("Start Again");
};
