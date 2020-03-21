'use strict';
import './style.css'


let _board
let _width, _height


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

function calcBoundingBox() {
	_board.forEach(row => {
		row.forEach(bubble => {
			bubble.boundingBox = bubble.element.getBoundingClientRect()
		})
	})
}

function drawBoard() {
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

function checkCollision(pos) {
	_board.forEach(row => {
		row.forEach(bubble => {
			const box = bubble.element.getBoundingClientRect()
			if (
				(pos[0] > box.x && pos[0] < box.x + box.width) &&
				(pos[1] > box.y && pos[1] < box.y + box.height)
			) {
				console.log('HIT!')
				return bubble
			}
		})
	})
	
	return null
}

function castRay(startingPos, directionVect) {
	let i = 0

	let v = directionVect
	let pos = startingPos
	while (pos[1] < _height && pos[0] > 0 && pos[0] < _width) {
		// console.log('iter', pos)
		pos[0] += v[0]
		pos[1] += v[1]
		const collidingBubble = checkCollision(pos)
		if (collidingBubble) {
			collidingBubble.color = 'r'
		}

		if (i++ > 1000) { console.log('BREJK'); return false; }

	}
}


// Main
document.addEventListener("DOMContentLoaded", function (event) {
	const gameEl = document.getElementById('game');
	constructBoard(8, 8).forEach(rowEl => gameEl.appendChild(rowEl))

	_board[0].forEach(bubble => { bubble.color = 'g' })
	_board[1].forEach(bubble => { bubble.color = 'b' })
	drawBoard(_board)

	setTimeout(() => {
		const gameBox = gameEl.getBoundingClientRect()
		console.log(gameBox)
		_width = gameBox.width
		_height = gameBox.height
		console.log(gameEl, _width, _height)
	})

	gameEl.addEventListener('mousedown', (event) => {
		// console.log(event)
		// console.log(event.offsetX, width)
		// console.log(event.offsetY, height)
		// console.log(height - event.offsetY)

		const mouseX = event.offsetX
		const mouseY = _height - event.offsetY

		const startingPos = [_width/2, 0]
		const v = [mouseX - startingPos[0], mouseY - startingPos[1]]
		const norm = Math.sqrt(v[0]**2 + v[1]**2)
		const nv = v.map(x => x / norm)
		console.log(v, norm, nv)

		console.log('start_pos', startingPos)
		castRay(startingPos, nv)

	})
});

