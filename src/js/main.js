let SubmitBtn = document.getElementById("Submit");
let NumOfFloors = document.getElementById("NoOfFloors");
let NumOfLifts = document.getElementById("NoOfLifts");
let FinalPage = document.getElementById("FinalPage");

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
        moveLift(e.target.dataset.floorno);
    }
})


//Lift Movement Logic 
//(TODO: 1) To move the nearest lift  2) Handling the edge case scenario if no lift is free)

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
        availableLift.setAttribute("data-status","free");
      }, distanceToTravel* 2000); // TODO: 1000 will be changed after animating lift doors (as more timeout will be required)
    availableLift.setAttribute("data-pos", targetFloor);

}