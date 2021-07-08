let randomDirectionIndex = 0;
const handleUserInput = () => {
  if (!isEngaged) {
    // const p = randomDirections[randomDirectionIndex];
    // imageObject.engage();
    // const direction = engine.getDirection(
    //   {
    //     x,
    //     y,
    //   },
    //   p.end
    // );
    // const isMatched = engine.validateMove(currentNationality, direction);
    // const score = engine.calculateScores(isMatched);
    // console.log(`Image: x=>${x}, y=>${y}`);
    // console.log(`DIRECTION ===> ${direction}`);
    // console.log(`CURRNATIONALITY ===> ${currentNationality.name}`);
    // console.log(`MOVE: ${isMatched ? "+20" : "-5"}`);
    // console.log(`SCORE ===> ${score}`);
    // console.log(`============================`);
    // imageObject.continue();
    // console.log(`START => {x:${x}, y:${y}}`);
    // console.log(`END => {x:${p.end.x}, y:${p.end.y}}`);
    // console.log(`X => ${p.end.x - x}, Y => ${p.end.y - y}`);
    // console.log(`DIR => ${direction}`);
    // console.log("Pausing for 3000")
  }

  if (currentIteration > totalIterations && !isStopped) {
    console.log("End");
    imageObject.stop();
    var score = document.getElementById("score");
    score.innerText = "Score :" + score.innerText + " GAME OVER";
    document.getElementById("start").className = "start-visible";
    document.getElementById("target").style.display = "none";
  } else {
    if (!isStopped) {
      //console.log("ITERATION", currentIteration);
    }
  }
};
