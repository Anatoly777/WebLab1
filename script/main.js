// noinspection JSUnresolvedVariable

let x, y, r;
let errorMessage = "";
const maxLength = 15;
graph0();

function graph0() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.lineTo(400, 250);
    ctx.lineTo(300, 150);
    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillRect(200, 50, 100, 200);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.arc(300, 250, 100, Math.PI, Math.PI / 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();


    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;

    ctx.beginPath();
    ctx.moveTo(25, 250);
    ctx.lineTo(575, 250);
    ctx.moveTo(300, 25);
    ctx.lineTo(300, 475);
    ctx.moveTo(300, 25);
    ctx.lineTo(310, 40);
    ctx.moveTo(300, 25);
    ctx.lineTo(290, 40);
    ctx.moveTo(575, 250);
    ctx.lineTo(560, 240);
    ctx.moveTo(575, 250);
    ctx.lineTo(560, 260);
    ctx.strokeStyle = "black";
    ctx.stroke();

    for(let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(295, i * 100 + 50);
        ctx.lineTo(305, i * 100 + 50);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    for(let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 + 100, 245);
        ctx.lineTo(i * 100 + 100, 255);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}
function graph() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.lineTo(400, 250);
    ctx.lineTo(300, 150);
    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillRect(200, 50, 100, 200);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.arc(300, 250, 100, Math.PI, Math.PI / 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();


    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;

    ctx.beginPath();
    ctx.moveTo(25, 250);
    ctx.lineTo(575, 250);
    ctx.moveTo(300, 25);
    ctx.lineTo(300, 475);
    ctx.moveTo(300, 25);
    ctx.lineTo(310, 40);
    ctx.moveTo(300, 25);
    ctx.lineTo(290, 40);
    ctx.moveTo(575, 250);
    ctx.lineTo(560, 240);
    ctx.moveTo(575, 250);
    ctx.lineTo(560, 260);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    const h = r;
    for(let i = 0; i < 5; i++) {
        ctx.font = "16px Verdana";
        ctx.fillText((2 - i)/2 * h + "", 266, i * 100 + 65);
        ctx.beginPath();
        ctx.moveTo(295, i * 100 + 50);
        ctx.lineTo(305, i * 100 + 50);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    for(let i = 0; i < 5; i++) {
        ctx.font = "16px Verdana";
        ctx.fillText((-2 + i)/2 * h + "", i * 100 + 66, 265);
        ctx.beginPath();
        ctx.moveTo(i * 100 + 100, 245);
        ctx.lineTo(i * 100 + 100, 255);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(300 + 200/r * x, 250 - 200/r * y);
    ctx.arc(300 + 200/r * x, 250 - 200/r * y, 3, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}

function addToErrorMessage(errorDesc) {
    errorMessage += (errorDesc + "\n");
}

function hasProperLength(input) {
    return input.length <= maxLength;
}

function validateX() {
    x = document.querySelector("input[id=xcoord]").value.replace(",", ".");
    if (x === undefined) {
        addToErrorMessage("Поле X не заполнено");
        return false;
    }
    if (!isNumber(x)) {
        addToErrorMessage("X должен быть числом от -5 до 5!");
        return false;
    }
    if (!hasProperLength(x)) {
        addToErrorMessage(`Длина числа должна быть не более ${maxLength} символов`);
        return false;
    }
    if (!((x > -5) && (x < 5))) {
        addToErrorMessage("Нарушена область допустимых значений X (-5; 5)");
        return false;
    }
    return true;
}

function validateY() {
    const selector = document.getElementById("ycoord");
    const selectedValue = selector.value;
    if (selectedValue === "") {
        addToErrorMessage("Нужно выбрать Y");
        return false;
    }
    y = selectedValue;
    return true;
}

function validateR() {
    let RButtons = document.querySelectorAll("input[name=rad]");

    RButtons.forEach(function (button) {
        console.log(button.value);
        if (button.checked) {
            r = button.value;
            console.log("success");
        }
    });

    if (r === undefined) {
        addToErrorMessage("Выберите R.");
        console.log("check r");
        return false;
    }
    return true;
}

function funk() {
    graph0();
    if (validateX() & validateY() & validateR()) {
        graph();
        $.post('php/main.php', { // assemble GET-RQ via jQuery
            'x': x,
            'y': y,
            'r' : r,
            'timezone': new Date().getTimezoneOffset()
        }).done(function(PHP_RESPONSE) { // do when success callback is received
            $('.table-header').after(PHP_RESPONSE);
        }).fail(function (error) {
            addToErrorMessage(error);
        });
    }
    if (!(errorMessage === "")) {
        alert(errorMessage);
        errorMessage = "";
    }
}