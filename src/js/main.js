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
                    <button class="UpBtn">UP</button>
                    <button class="DownBtn">DOWN</button>
                </div>
                <div class="LiftWrapper">
                    ${i===0?GenerateLifts():""}
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
        `<div class="Lift">
            <div class="LGate" id="LGate"></div>
            <div class="RGate" id="RGate"></div>
        </div>`
    }
    return resultantLiftDisplay;
}

//listening to Submit Button
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