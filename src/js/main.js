let SubmitBtn = document.getElementById("Submit");
let NumOfFloors = document.getElementById("NoOfFloors");
let NumOfLifts = document.getElementById("NoOfLifts");

//listening to Submit Button
SubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(Number(NumOfFloors.value)<1)
    {
        alert("Please enter a valid floor number (>=1)")
    }
    if(Number(NumOfLifts.value)<1)
    {
        alert("Please enter a valid lift number (>=1)")
    }
});