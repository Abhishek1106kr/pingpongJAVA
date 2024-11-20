const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");


const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const speed = 5;

const paddleLeft = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0
};

const paddleRight = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0
};


const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: ballSize / 2,
  dx: speed,
  dy: speed
};

function drawPaddle(x, y, width, height) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius) {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}


function update() {
  
  paddleLeft.y += paddleLeft.dy;
  paddleRight.y += paddleRight.dy;
  if (paddleLeft.y < 0) paddleLeft.y = 0;
  if (paddleLeft.y + paddleHeight > canvas.height) paddleLeft.y = canvas.height - paddleHeight;
  if (paddleRight.y < 0) paddleRight.y = 0;
  if (paddleRight.y + paddleHeight > canvas.height) paddleRight.y = canvas.height - paddleHeight;
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  if (ball.x - ball.radius < paddleLeft.x + paddleWidth && ball.y > paddleLeft.y && ball.y < paddleLeft.y + paddleHeight) {
    ball.dx = -ball.dx;
  }
  if (ball.x + ball.radius > paddleRight.x && ball.y > paddleRight.y && ball.y < paddleRight.y + paddleHeight) {
    ball.dx = -ball.dx;
  }
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = speed;
    ball.dy = speed;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
  drawPaddle(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
  drawBall(ball.x, ball.y, ball.radius);

  requestAnimationFrame(update);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") paddleRight.dy = -speed;
  if (e.key === "ArrowDown") paddleRight.dy = speed;
  if (e.key === "w") paddleLeft.dy = -speed;
  if (e.key === "s") paddleLeft.dy = speed;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") paddleRight.dy = 0;
  if (e.key === "w" || e.key === "s") paddleLeft.dy = 0;
});


update();
