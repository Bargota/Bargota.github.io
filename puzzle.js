var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

var base_arr = [];
var tile_arr = [];
var pieces = [];
var num_drag_tile=0;

// Заполняем массив числами от 1 до 25
for (let i = 1; i <= 25; i++) {
    base_arr.push(i);
    tile_arr.push(0);
}

window.onload = function() {
    //initialize the 5x5 board
    var board=document.getElementById("board");
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./cutter/white.jpg";
            tile.name=((c*columns+1)+r).toString()

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            
            board.append(tile);
            console.log(((r)*columns+(c+1)).toString());
        }
    }

    //pieces
    
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./cutter/" + pieces[i] + ".jpg";
        tile.name=(pieces[i]).toString();

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
    console.log(pieces.toString());
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
    
}

function get_name(img_tile)
{
    let images_urls = img_tile.getAttribute('src'); 
    let tmp = img_tile.getAttribute('src').split('/');
    let curr_file_name = tmp[tmp.length -1].split('.')[0];
    return curr_file_name
}

function dragEnd() {
    if (currTile.src.includes("white")) {
        return;
    }
    // console.log(currTile.parentNode.id.toString());
    let curr_file_name=get_name(currTile);
    let oth_file_name=get_name(otherTile);
    
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

   
    
    if (currTile.parentElement.id==="board")
    {   
        // let curr_pos = currTile.name;
        // let other_pos = otherTile.name;
        // currTile.name = other_pos;
        // otherTile.name = curr_pos;
        tile_arr[otherTile.name-1]=curr_file_name;
        tile_arr[currTile.name-1]=oth_file_name;
        
    } else
    {
        tile_arr[otherTile.name-1]=get_name(otherTile);
    }
    turns += 1;
    document.getElementById("steps").innerText = turns;

   
    
    if (tile_arr.toString()===base_arr.toString()){
        document.getElementById("button").style.visibility='visible';
        // window.location.href = 'congratilation.html';
    }
    // tile_arr=[];
    // for (let i = 1; i <= 25; i++) {
    //     tile_arr.push(i);
    // }



    console.log(tile_arr.toString());
}

function redirectToNewPage() {
    // Здесь вы можете указать URL новой страницы
    window.location.href = 'congratilation.html';
}