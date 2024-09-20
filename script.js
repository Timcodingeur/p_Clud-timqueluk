import data from "./quentin.metroz@eduvaud.ch.json" with { type: 'json' }

const absence = 0
const late = 0

const body = document.querySelector("body")

let div = document.createElement("div");
div.id = "life"

let count = 4
if(absence == 0 ) {
} else if((absence >= 3 || absence < 6) || (late >= 3 || late < 6)) {
    count = 3
} else if(((late >= 6 || late < 9) || (absence >= 6 || absence < 9)) || (( late >= 6 || late < 9)) && ((absence >= 6 || absence < 9))) {
    count = 2
}

body.appendChild(div)

for(let i = 0;i < count;i++) {
    let img = document.createElement("img")
    img.alt = "Heart from Minecraft"
    img.src = "./download.jpg"
    img.style = "margin-right: 10px;"
    div.appendChild(img)
}