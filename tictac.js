let width = 0
let size = width / 3 - 20

player = "Joe"

let map = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

assetPath = "assets/"

imagePath = assetPath + "images/"
soundPath = assetPath + "sounds/"

joePath = imagePath + "joe1.png"
otosPath = imagePath + "otos.png"

canPath = soundPath + "can.wav"
cannotPath = soundPath + "cannot.wav"
winPath = soundPath + "win.wav"
diePath = soundPath + "die.wav"

let lineColor = 255

function init() {
    player = "Joe"

    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++)
            map[i][j] = ""

    background(0, 0, 0, 50)
    stroke(lineColor)
    strokeWeight(1)
    fill(0)
        
    line(width / 3, 0, width / 3, width)
    line(2 * (width / 3), 0, 2 * (width / 3), width)
    line(0, width / 3, width, width / 3)
    line(0, 2 * (width / 3), width, 2 * (width / 3))
        
    strokeWeight(3)
}

function drawJoe(x, y) {
    image(joe, x - 70, y - 70, size - 20, size - 20)
}

function draw5(x, y) {
    image(otos, x - 70, y - 70, size - 20, size - 20)
}

function getRect(x, y) {
    column = 0
    row = 0

    if (x > 0 && x < width / 3)
        column = 0
    else if (x > width / 3 && x < 2 * (width / 3))
        column = 1
    else
        column = 2

    if (y > 0 && y < width / 3)
        row = 0
    else if (y > width / 3 && y < 2 * (width / 3))
        row = 1
    else
        row = 2

    return [column, row]
}

function getCoords(rect) {
    _x = 0
    _y = 0

    switch (rect[0]) {
        case 0:
            _x = 20
            break
        case 1:
            _x = width / 3 + 20
            break
        case 2:
            _x = 2 * (width / 3) + 20
            break
    }

    switch (rect[1]) {
        case 0:
            _y = 20
            break
        case 1:
            _y = width / 3 + 20
            break
        case 2:
            _y = 2 * (width / 3) + 20
            break
    }

    return [_x + 70, _y + 70]
}

function matches(a, b, c) {
    return a == b && b == c && a != ""
}

function switchPlayer() {
    if (player == "Joe")
        player = "5"
    else
        player = "Joe"
}

function preload() {
    joe = loadImage(joePath)
    otos = loadImage(otosPath)

    can = loadSound('assets/sounds/can.wav')
    cannot = loadSound('assets/sounds/cannot.wav')
    win = loadSound('assets/sounds/win.wav')
    die = loadSound('assets/sounds/die.wav')
}

function setup() {
    if (windowWidth < windowHeight)
        width = windowWidth - 40
    else
        width = windowHeight - 40

    cnv = createCanvas(width, width)
    cnv.parent('canvas')

    size = width / 3 - 20

    init()
}

function mouseClicked(){
    rect = getRect(mouseX, mouseY)
    if (map[rect[0]][rect[1]] == "") {
        coords = getCoords(rect)

        if (player == "Joe")
            drawJoe(coords[0], coords[1])
        else
            draw5(coords[0], coords[1])
    
        map[rect[0]][rect[1]] = player

        if (
            matches(map[0][0], map[0][1], map[0][2]) ||
            matches(map[1][0], map[1][1], map[1][2]) ||
            matches(map[2][0], map[2][1], map[2][2]) ||
            matches(map[0][0], map[1][0], map[2][0]) ||
            matches(map[0][1], map[1][1], map[2][1]) ||
            matches(map[0][2], map[1][2], map[2][2]) ||
            matches(map[0][0], map[1][1], map[2][2]) ||
            matches(map[0][2], map[1][1], map[2][0])
        ) {
            win.play()
            alert(player + "  nyert")
            init()
        } else {
            isAnyEmpty = false

            for (i = 0; i < 3; i++)
                for (j = 0; j < 3; j++)
                    if (map[i][j] == "")
                        isAnyEmpty = true
            
            if (!isAnyEmpty) {
                die.play()
                alert("Senki sem nyert")
                init()
            } else {
                can.play()
                switchPlayer()
            }
        }
            
        print("added in rect = \'" + map[rect[0]][rect[1]] + "\'")
        print(map)
    } else
        cannot.play()
}