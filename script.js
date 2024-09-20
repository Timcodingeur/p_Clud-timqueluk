const body = document.querySelector("body")

const table = document.createElement("table")
table.style = "background-color: lightgray"
body.appendChild(table)
let text = []
for (let index = 0; index < 28; index++) {
    text.push(" ")
}

for(let i=0; i < 56;i++) {
    const tr = document.createElement("tr")
    table.appendChild(tr)
    const td = document.createElement("td")
    td.style = "width: 20px; height: 10px; border: 0.5px black double; background-color: white;"
    for(let j=0; j < 45;j++) {
        if(i == 1) {
            text[0] = "Jour"
            text[1] = "JSP"
            for(let i=2;i<21;i++) {
                text[i] = i + 32
            }
            for(let i=21;i<47;i++) {
                text[i] = i - 20
            }
        } else if(i == 2 || j == 0) {

        } else {
            for (let index = 0; index < text.length; index++) {
                text[index] = ""
            }
        }

        td.textContent = text[j]
        tr.appendChild(td)
    } 
}

/*
            <td style="width: 15px; padding-left: 5px;">1</td>
            <td style="width: 15px; padding-left: 5px;">2</td>
            <td style="width: 15px; padding-left: 5px;">3</td>
            <td style="width: 15px; padding-left: 5px;">4</td>
            <td style="width: 15px; padding-left: 5px;">5</td>
            <td style="width: 15px; padding-left: 5px;">6</td>
            <td style="width: 15px; padding-left: 5px;">7</td>
            <td style="width: 15px; padding-left: 5px;">8</td>
            <td style="width: 15px; padding-left: 5px;">9</td>
*/


/*const absence = 0
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
    img.src = "./heart.jpg"
    img.style = "margin-right: 10px;"
    div.appendChild(img)
}*/