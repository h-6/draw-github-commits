var colors = ['#eee','#c6e48b','#7bc96f','#239a3b','#196127'];
var rows = 7;
var cols = 52;
var textarea = document.getElementById('asciiart');
textarea.value = new Array(rows+1).join(new Array(cols+1).join('0') + "\n");
var squares = [];

function updateCharacter(r, c, value) {
	var text = textarea.value;
	var i = r*(cols+1) + c; // +1 is to account for the line break
	textarea.value = text.substring(0,i) + value + text.substring(i+1);
}

function setSquare(el,row,col,value) {
	value = (value+colors.length)%colors.length;
	el.commits = value;
	el.setAttribute('bgcolor', colors[value]);
	updateCharacter(row,col,value);
}

var grid = clickableGrid(function(el,row,col){
	setSquare(el,row,col,el.commits-1);
});

document.body.appendChild(grid);

function clickableGrid( callback ){
    var grid = document.createElement('table');
    grid.setAttribute('bgcolor',colors[0]);
    grid.setAttribute('width','90%');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
		var row_of_squares = [];
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.commits = 0;
            cell.addEventListener('click',(function(el,r,c){
                return function(){
                    callback(el,r,c);
                }
            })(cell,r,c),false);
            row_of_squares.push(cell);
        }
        squares.push(row_of_squares);
    }
    return grid;
}
