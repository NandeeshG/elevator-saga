let obj = {
  init: function (elevators, floors) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let e = 0; e < elevators.length; e++) {
      setTimeout(function () {
        let E = elevators[e];

        E.on("idle", function () {
          if (E.currentFloor() === 0) {
            E.goingUpIndicator(true);
            E.goingDownIndicator(false);
            for (let j = 0; j < floors.length; j++) {
              E.goToFloor(j);
            }
          } else if (E.currentFloor() === 5) {
            E.goingUpIndicator(false);
            E.goingDownIndicator(true);
            for (let j = floors.length; j >= 0; j--) {
              E.goToFloor(j);
            }
          }
        });
      }, e * 1000);
    }
  },
  update: function (dt, elevators, floors) {
    // We normally don't need to do anything here
  },
};
