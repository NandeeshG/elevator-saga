let obj = {
  init: function (elevators, floors) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const Elen = elevators.length;
    const Flen = floors.length;

    let lowerBound = function (arr, val) {
      let l = 0;
      let r = arr.length - 1;
      while (l < r) {
        let m = Math.floor((l + r) / 2);
        if (arr[m] < val) {
          l = m + 1;
        } else {
          r = m;
        }
      }
      return l;
    };

    let sortElevatorQueue = function (elevator) {
      let cur = elevator.currentFloor();
      let dir = elevator.destinationDirection();

      console.log("OLD queue:", elevator.destinationQueue);

      //remove duplicates
      elevator.destinationQueue = [...new Set(elevator.destinationQueue)];

      //sort in ascending whatever the direction maybe
      elevator.destinationQueue.sort((a, b) => {
        return a - b;
      });

      let newQ = [];
      let cid = lowerBound(elevator.destinationQueue, cur);

      if (dir === "up" || dir === "stopped") {
        //all gt cur shall be sorted in ascending order
        for (let i = cid; i < elevator.destinationQueue.length; ++i) {
          newQ.push(elevator.destinationQueue[i]);
        }
        for (let i = cid - 1; i >= 0; --i) {
          newQ.push(elevator.destinationQueue[i]);
        }
      } else if (dir === "down") {
        for (let i = cid - 1; i >= 0; --i) {
          newQ.push(elevator.destinationQueue[i]);
        }
        for (let i = cid; i < elevator.destinationQueue.length; ++i) {
          newQ.push(elevator.destinationQueue[i]);
        }
      }

      console.log("NEW queue:", newQ);

      elevator.destinationQueue = newQ;
      elevator.checkDestinationQueue();
    };

    let insertStopInMiddle = function (elevator, fl) {
      //elevator.goToFloor(fl);
      elevator.destinationQueue.push(fl);
      sortElevatorQueue(elevator);
    };

    let getLowestLoadedElevator = function () {
      let loadQ = [];
      for (let e = 0; e < Elen; ++e) {
        let E = elevators[e];
        loadQ.push({
          eid: e,
          lf: E.loadFactor(),
          ql: E.destinationQueue.length,
        });
      }
      loadQ.sort((a, b) => {
        if (a.lf < b.lf) return -1;
        else if (a.lf > b.lf) return 1;
        else return a.ql - b.ql;
      });
      console.log("LoadQ: ", loadQ);
      console.log("LowestLoadedElev: ", loadQ[0]);
      //for (let e = 1; e < Elen; e++) {
      //  let curLoad = elevators[e].loadFactor();
      //  if (curLoad < minLoad) {
      //    minLoad = curLoad;
      //    eid = e;
      //  }
      //}
      //console.log("Lowest loaded elevator is:", eid, " with load:", minLoad);
      return elevators[loadQ[0].eid];
    };

    let assignStopToLightest = function (fl) {
      let elevator = getLowestLoadedElevator();
      insertStopInMiddle(elevator, fl);
    };

    for (let e = 0; e < elevators.length; e++) {
      let E = elevators[e];

      E.on("idle", function () {
        console.log("Elevator:", e, " found idle...");
      });

      E.on("floor_button_pressed", function (f) {
        console.log("Elevator:", e, " received floor request:", f);
        insertStopInMiddle(E, f);
      });

      E.on("stopped_at_floor", function (f) {
        console.log("Elevator:", e, " stopped at floor:", f);
        insertStopInMiddle(E, f);
      });
    }

    for (let f = 0; f < Flen; f++) {
      floors[f].on("up_button_pressed", function () {
        console.log("up button pressed at floor:", f);
        assignStopToLightest(f);
      });

      floors[f].on("down_button_pressed", function () {
        console.log("down button pressed at floor:", f);
        assignStopToLightest(f);
      });
    }
  },
  update: function (dt, elevators, floors) {
    // We normally don't need to do anything here
  },
};
