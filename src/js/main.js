let SubmitBtn = document.getElementById("Submit");
let NumOfFloors = document.getElementById("NoOfFloors");
let NumOfLifts = document.getElementById("NoOfLifts");
let FinalPage = document.getElementById("FinalPage");

let liftRequestQueue = [];

//Check for any Lift Request in every 200msec.
document.addEventListener("DOMContentLoaded", function() {
    let id = setInterval(checkQueue,200);
  });

//Generating floors
function CreateFloors()
{
    let floors = Number(NumOfFloors.value);
    let resultantDisplay = ``;
    if(floors === 1)
    {
        resultantDisplay+=
        `<div class='FloorWrapperContainer'>
            <div class="FloorWrapper"></div>
            <div class="Floor">
                <div class="FloorBoundaryLines"></div>
                <div class="FloorNumberWrapper">
                     Floor <span class="FloorNumber"> 0 </span>
                </div>
            </div>
        </div>`;
    }
    else
    {
    for(let i=floors-1;i>=0;i--)
    {
        resultantDisplay += 
        `<div class='FloorWrapperContainer'>
            <div class="FloorWrapper">
                <div class="LiftButtons">
                    ${i===floors-1?'':`<button class="UpBtn" data-floorNo="${i}">UP</button>`}
                    ${i===0?'':`<button class="DownBtn" data-floorNo="${i}">DOWN</button>`}
                </div>
                <div class="LiftWrapper">
                    ${i===0?GenerateLifts():''}
                </div>
            </div>
            <div class="Floor">
                <div class="FloorBoundaryLines"></div>
                <div class="FloorNumberWrapper">
                    Floor <span class="FloorNumber"> ${i}</span>
                </div>
            </div>
        </div>`;
    }
}
  return resultantDisplay;
}

//Generating Lifts

function GenerateLifts()
{
    let lifts = Number(NumOfLifts.value);
    let resultantLiftDisplay = ``;
    for(i=0;i<lifts;i++)
    {
        resultantLiftDisplay+=
        `<div class="Lift" data-pos="${i}" data-status="${"free"}">
            <div class="LGate" id="LGate"></div>
            <div class="RGate" id="RGate"></div>
        </div>`
    }
    return resultantLiftDisplay;
}

//listening to Submit Button
//TODO: Add some more checks based on the screen size
SubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("InputForm").style.display = "none";
    if(Number(NumOfFloors.value)<1)
    {
        alert("Please enter a valid floor number (>=1)")
    }
    else if(Number(NumOfLifts.value)<1)
    {
        alert("Please enter a valid lift number (>=1)")
    }
    else
    {
        FinalPage.innerHTML=CreateFloors();
    }
});

//Listen to the button click
addEventListener('click', (e) => {
    if(e.target.classList.contains('UpBtn') || e.target.classList.contains('DownBtn')){
        liftRequestQueue.push(e.target.dataset.floorno);
    }
})


//Lift Movement Logic 
//(TODO: 1) To move the nearest lift)

function moveLift(targetFloor) {

    const lifts = Array.from(document.getElementsByClassName("Lift"));
    const availableLift = lifts.find((lift) => lift.dataset.status === "free");
    const availableLiftOnTargetFloor = lifts.find((lift) => {lift.dataset.status === "free" && Number(lift.dataset.pos) === targetFloor});

        // The lift is already present on the current floor
        if (availableLiftOnTargetFloor) {
            availableLiftOnTargetFloor.setAttribute("data-status", "busy");
            return;
        }

    //If lift is somewhere else than the targeted floor
    let distanceToTravel = Math.abs(targetFloor - Number(availableLift.dataset.pos) );
    availableLift.style.transition = `transform ${distanceToTravel * 2}s linear`;
    availableLift.style.transform = `translateY(${-200 * targetFloor}px)`;
    availableLift.setAttribute("data-status", "busy");

    //Make the status of lift free after certain time
    setTimeout(() => {
        DoorAnimation(availableLift)
      }, distanceToTravel* 2000);

    setTimeout(() => {
        availableLift.setAttribute("data-status","free");
        availableLift.setAttribute("data-pos", targetFloor);
    },distanceToTravel* 2000 + 5000);

}

// Check if any lift is free (TRUE: Any lift is free; else FALSE)
function checkAvailability()
{
    const lifts = Array.from(document.getElementsByClassName("Lift"));
    const availableLift = lifts.find((lift) => lift.dataset.status === "free");
    if(availableLift)
    {
        return true;
    }
    else{
        return false;
    }

}


//Check for any requests in the queue and process it
function checkQueue()
{
    if(liftRequestQueue.length === 0)
    {
        return;
    }
    else{
        let target = liftRequestQueue[0];
        if(checkAvailability())
        {
            liftRequestQueue.shift();
            moveLift(target);
        }
        else{
            return;
        }

    }
}


//Door Animation

function DoorAnimation(availableLift)
{
    setTimeout(() => {
        availableLift.children[0].classList.add("leftDoorAnimate");
        availableLift.children[1].classList.add("rightDoorAnimate");
      }, 500);
      setTimeout(() => {
        availableLift.children[0].classList.remove("leftDoorAnimate");
        availableLift.children[1].classList.remove("rightDoorAnimate");
      },3000);
}