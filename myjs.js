"use strict";

var result = document.getElementById("result");
var gameMap = document.getElementById("pushbox");
var steps = 0;
var level = 1;
var gameElement = {
    "person": {
        "x": 0,
        "y": 0,
        "id": "person"
    },
    "map": 0,
    "box":{
        "x":"50",
        "y":"50"
    },
    "endpointNumber": 0, /*the number of the ball*/
    "goal": 0//check if the box is tough the goal
};
var boxs=[];
var map1 = [
    // o is grass
    // 1 is wall
    // 3 is ball
    // 4 is box
    // 5 is person
    [0,0,1,1,1,0,0,0,0],
    [0,1,1,3,3,1,0,0,0],
    [0,1,5,4,4,0,1,0,0],
    [0,1,0,0,0,0,1,0,0],
    [0,1,1,1,1,1,1,0,0]
];
var map2 = [
    [0,0,1,1,1,1,1,0,0],
    [0,1,0,0,0,0,0,1,0],
    [0,1,5,3,0,4,0,0,1],
    [0,1,0,0,0,0,4,0,1],
    [0,0,1,0,0,3,1,1,1],
	[0,0,0,1,1,1,1,0,0]
];
var map3 = [
	[0,1,1,1,1,1,0,0],
    [0,1,0,0,1,1,1,0],
    [0,1,5,4,0,0,1,0],
    [1,1,1,0,1,0,1,1],
    [1,3,1,0,1,0,0,1],
    [1,3,4,0,0,1,0,1],
    [1,3,0,0,0,4,0,1],
    [1,1,1,1,1,1,1,1]
];
var map4 = [
	[0,0,1,1,1,0,0,0],
    [0,1,3,3,1,1,1,1],
    [0,1,0,0,3,0,0,1],
    [1,0,0,0,1,4,1,0],
    [1,0,4,0,0,3,1,0],
    [1,0,0,4,4,0,0,1],
    [0,1,0,0,5,0,1,0],
    [0,0,1,1,1,1,1,0]
];
var map5 = [
    [0,0,1,1,1,0,0,0],
    [0,1,3,3,1,1,1,1],
    [0,1,0,0,0,0,0,1],
    [1,0,0,0,1,4,0,1],
    [1,0,4,1,0,3,0,1],
    [1,0,0,4,4,0,0,1],
    [1,3,0,0,5,0,1,0],
    [0,1,1,1,1,1,1,0]
];
var map6 = [
    [0,0,1,1,1,1,0,0],
    [0,0,1,3,3,1,0,0],
    [0,1,1,0,3,1,1,0],
    [0,1,0,0,4,3,1,0],
    [1,1,0,4,0,0,1,1],
    [1,0,0,1,4,4,0,1],
    [1,0,0,0,5,0,0,1],
    [1,1,1,1,1,1,1,1]
];
var map7 = [
    [0,0,0,1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0,0,1,0],
    [1,1,0,0,0,1,1,0,1,1],
    [1,3,3,4,0,4,0,0,5,1],
    [1,3,3,0,4,0,4,0,1,1],
    [1,1,1,1,1,1,0,0,1,0],
    [0,0,0,0,0,1,1,1,1,0]
];
boxs.push(map1);
boxs.push(map2);
boxs.push(map3);
boxs.push(map4);
boxs.push(map5);
boxs.push(map6);
boxs.push(map7);
gameMap.style.display = "none";

// create the game map
function createMap(){
	//gameMap.style.backgroundColor="lightblue";
    result.innerHTML = "Level:          " + level + "            steps: " + (60-steps)+"          left";
    gameMap.style.display = "block";
    gameMap.innerHTML=" ";


    for(var i=0;i<boxs[gameElement.map].length;i++){
        var row = document.createElement("tr");
        gameMap.appendChild(row);
        for(var j=0;j<boxs[gameElement.map][i].length;j++){
            var cell = document.createElement("td");
			var div = document.createElement("div"); //add a div to remove the gap in the table
            var img = document.createElement("img");
			//cell.appendChild(img); //
            row.appendChild(cell);
            cell.setAttribute("name",i + "_" + j);
            img.className = "img";
			div.className = "table div";  //add a div to remove the gap in the table

            switch(boxs[gameElement.map][i][j]){
                case 0:
                    cell.setAttribute("endpoint","0");
                    break;
                case 1:
                    img.src = "wall.jpg";
					cell.setAttribute("endpoint","0");
					cell.appendChild(div); //add a div to remove the gap in the table
					div.appendChild(img);  //add a div to remove the gap in the table
                    break;
                case 3:
                    img.src = "ball.png";
                    cell.setAttribute("endpoint","1");
                    gameElement.endpointNumber++;
					cell.appendChild(div);  //add a div to remove the gap in the table
					div.appendChild(img);  //add a div to remove the gap in the table
                    //console.log(gameElement.endpointNumber);
                    break;
                case 4:
                    img.src = "box.jpg";
					cell.setAttribute("endpoint","0");
					cell.appendChild(div);  //add a div to remove the gap in the table
					div.appendChild(img);  //add a div to remove the gap in the table
                    break;
                case 5:
                    img.src = "man.png";
					cell.setAttribute("endpoint","0");
					cell.appendChild(div);  //add a div to remove the gap in the table
					div.appendChild(img);  //add a div to remove the gap in the table
                    gameElement.person.x = j;
                    gameElement.person.y = i;
                    //console.log(gameElement.person.x);
                    //console.log(gameElement.person.y);
                    break;
            }
        }
    }
//console.log(gameMap);
}

function nextLevel(){
    if(level===7) {
        alert("NO MORE GAMES!");
	}else{
        gameElement.goal = 0;
        gameElement.endpointNumber = 0;
    	gameMap.innerHTML = " ";
        gameElement.map ++;
        steps = 0;
        level++;
        createMap();
	}
}

//type: the first item of the person's moving directin：grass，box，ball
//oy,ox: original position
//y,x : target position
function judgeGame(oy,ox,y,x,type){
	
	if(type=="grass"){
			
		var original = document.getElementsByName(oy+"_"+ox)[0];
        if (steps>=60) {
            alert("Failed! Try again!");
            gameElement.goal = 0;// set variable of box on the target
            gameElement.endpointNumber=0;// set variable of ball's numbers
        }
		
		// change attribute of person's original position, if ball, then show ball; if not ball, show 0
		if(original.getAttributeNode("endpoint").value==="1"){
			boxs[gameElement.map][oy][ox]=3;
			var div = document.createElement("div");
			var img = document.createElement("img");
			div.className = "table div";
			img.src="ball.png";
			img.className = "img";
			original.appendChild(div);
			div.appendChild(img);
		}else{
			boxs[gameElement.map][oy][ox]=0;
		}
		boxs[gameElement.map][y][x]=5;
		
		// move person to target
		var div = document.createElement("div");
		var img = document.createElement("img");
		div.className = "table div";
		img.src="man.png";
		img.className = "img";
		gameMap.rows[y].cells[x].appendChild(div);
		div.appendChild(img);
		steps++;
        result.innerHTML = "Level:          " + level + "            steps: " + (60-steps)+"          left";
		// remove person from original position
		gameMap.rows[oy].cells[ox].removeChild(gameMap.rows[oy].cells[ox].firstChild);
		
		// change the person's position variable
		gameElement.person.x = x;
		gameElement.person.y = y;
	
	}else if(type==="box"){

		// caculate the position before box
		var x2=x+x-ox;
		var y2=y+y-oy;
		
		// outside the bord
		if(8>x2>=0 && 8>y2>=0){
			
			// position of original person, target person, target box
			var original = document.getElementsByName(oy+"_"+ox)[0];
			var person_pos = document.getElementsByName(y+"_"+x)[0]; 
			var box_pos = document.getElementsByName(y2+"_"+x2)[0];
			
			// change attribute of person's original position, if ball, then show ball; if not ball, show 0
			if(original.getAttributeNode("endpoint").value==="1"){
				boxs[gameElement.map][oy][ox]=3;
				var div = document.createElement("div");
				var img = document.createElement("img");
				div.className = "table div";
				img.src="ball.png";
				img.className = "img";
				original.appendChild(div);
				div.appendChild(img);
			}else{
				boxs[gameElement.map][oy][ox]=0;
			}
			boxs[gameElement.map][y][x]=5;
			boxs[gameElement.map][y2][x2]=4;
			
			//remove original pic
			gameMap.rows[oy].cells[ox].removeChild(gameMap.rows[oy].cells[ox].firstChild);
			gameMap.rows[y].cells[x].removeChild(gameMap.rows[y].cells[x].firstChild);
			
			// move person to target
			var div = document.createElement("div");
			var img = document.createElement("img");
			div.className = "table div";
			img.src="man.png";
			img.className = "img";
			gameMap.rows[y].cells[x].appendChild(div);
			div.appendChild(img);
			steps++;
            result.innerHTML = "Level:          " + level + "            steps: " + (60-steps)+"          left";
			// move box to target
			var div = document.createElement("div");
			var img = document.createElement("img");
			div.className = "table div";
			img.src="box.jpg";
			img.className = "img";
			gameMap.rows[y2].cells[x2].appendChild(div);
			div.appendChild(img);

			gameElement.person.x = x;
			gameElement.person.y = y;
			
			// inspect game
			
			
		}
	}else if(type=="ball"){
			
			boxs[gameElement.map][y][x]=5;
			var original = document.getElementsByName(oy+"_"+ox)[0];
			var target = document.getElementsByName(y+"_"+x)[0];
			
			// change attribute of person's original position, if ball, then show ball; if not ball, show 0
			if(original.getAttributeNode("endpoint").value==="1"){
				boxs[gameElement.map][oy][ox]=3;
				var div = document.createElement("div");
				var img = document.createElement("img");
				div.className = "table div";
				img.src="ball.png";
				img.className = "img";
				original.appendChild(div);
				div.appendChild(img);
			}else{
				boxs[gameElement.map][oy][ox]=0;
			}
			
			// move person to target
			var div = document.createElement("div");
			var img = document.createElement("img");
			div.className = "table div";
			img.src="man.png";
			img.className = "img";
			gameMap.rows[y].cells[x].appendChild(div);
			div.appendChild(img);
        	steps++;
            result.innerHTML = "Level:          " + level + "            steps: " + (60-steps)+"          left";
			// remove original person, remove target ball
			target.removeChild(target.firstChild);
			original.removeChild(gameMap.rows[oy].cells[ox].firstChild);
			
			gameElement.person.x = x;
			gameElement.person.y = y;
	}

    InspectionEndPoint(person_pos,box_pos);
}

function InspectionEndPoint(original,target){
	// if the ball is on target position, then goal +1
    if (target.getAttributeNode("endpoint").value==="1") {
			
            gameElement.goal ++;
			target.removeChild(target.firstChild);
    }
	// if a ball is on original position, the goal-1;
	if (original.getAttributeNode("endpoint").value==="1") {
            gameElement.goal --;
    }

    setTimeout(function () {
        if (gameElement.goal === gameElement.endpointNumber) {
            alert("Congratuations!");
            //console.log(gameElement.goal);
            //console.log(gameElement.endpointNumber);
            gameElement.goal = 0;// reset goal
            gameElement.endpointNumber = 0;// reset endpointNumber
            nextLevel();
            //createMap();//调用createGame()
        }
    }, 100);
}

function startGame(){
	// 0 is grass
    // 1 is wall
    // 3 is ball
    // 4 is box
    // 5 is person
    document.onkeydown=function(e){
        var zx = gameElement.person.x;
        var zy = gameElement.person.y;
        switch(e.keyCode){
            case 37://left
                switch(boxs[gameElement.map][zy][zx-1]){
					// grass ahead
                    case 0:
                        judgeGame(zy,zx,zy,zx-1,"grass");
						break;
					// ball ahead
					case 3:
                        judgeGame(zy,zx,zy,zx-1,"ball");
						break;
					// box ahead
					case 4:
						// if the cell before ahead is box or wall, cannot move
						if(boxs[gameElement.map][zy][zx-2]===1 || boxs[gameElement.map][zy][zx-2]===4){
							break;
						}
                        judgeGame(zy,zx,zy,zx-1,"box");
						break;
					// else, break
				}
			break;
            case 38://up
                switch(boxs[gameElement.map][zy-1][zx]){
                    case 0:
						judgeGame(zy,zx,zy-1,zx,"grass");
						break;
					case 3:
                        judgeGame(zy,zx,zy-1,zx,"ball");
						break;
                    case 4:
						if(boxs[gameElement.map][zy-2][zx]===1 || boxs[gameElement.map][zy-2][zx]===4){
							break;
						}
                        judgeGame(zy,zx,zy-1,zx,"box");
						break;
                }
			break;
            case 39://right
                switch(boxs[gameElement.map][zy][zx+1]){
                    case 0:
						judgeGame(zy,zx,zy,zx+1,"grass");
						break;
					case 3:
                        judgeGame(zy,zx,zy,zx+1,"ball");
						break;
                    case 4:
						if(boxs[gameElement.map][zy][zx+2]===1 || boxs[gameElement.map][zy][zx+2]===4){
							break;
						}
                        judgeGame(zy,zx,zy,zx+1,"box");
						break;
                }
            break;
            case 40://down
                switch(boxs[gameElement.map][zy+1][zx]){
                    case 0:
						judgeGame(zy,zx,zy+1,zx,"grass");
						break;
					case 3:
                        judgeGame(zy,zx,zy+1,zx,"ball");
						break;
                    case 4:
						if(boxs[gameElement.map][zy+2][zx]===1 || boxs[gameElement.map][zy+2][zx]===4){
							break;
						}
                        judgeGame(zy,zx,zy+1,zx,"box");
						break;
                }
			break;
        }
    }
}