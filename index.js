'use strict';
import './style.css'


let _board


function constructBoard(sizeX, sizeY) {
	const boardElements = [];

	_board = [...Array(sizeY)].map((_, i) => {
		const rowEl = document.createElement('div')
		rowEl.className = 'bubble-row'

		const newBubble = () => {
			const b = document.createElement('div')
			b.className = 'bubble'
			rowEl.appendChild(b)
			return b
		};

		boardElements.push(rowEl);

		return [...Array(sizeX - (i % 2))].map((_, j) => ({
			y: i,
			x: j,
			color: '',
			element: newBubble(),
		}))
	});

	console.log(_board)

	return boardElements;
}

function drawBoard(borard) {
	_board.forEach(row => {
		row.forEach(bubble => {
			if (bubble.color !== '')
				bubble.element.className = `bubble exist ${bubble.color}`
		})
	})
}

function getUpperBubbles(bubble) {
	const rowIndex = bubble.y - 1
	const odd = bubble.x % 2
	const leftBubble = _board[rowIndex][bubble.x - 1 + odd]
	const rightBubble = _board[rowIndex][bubble.x + odd]
	return [leftBubble, rightBubble];
}


// Main
document.addEventListener("DOMContentLoaded", function (event) {
	const gameEl = document.getElementById('game');
	constructBoard(8, 8).forEach(rowEl => gameEl.appendChild(rowEl))

	const { width, height } = gameEl.getBoundingClientRect()
	console.log(gameEl)



	drawBoard(_board)

	gameEl.addEventListener('mousedown', (event) => {
		console.log(event)
		console.log(event.offsetX, width)
		console.log(event.offsetY, height)
		console.log(height - event.offsetY)
	})
});

