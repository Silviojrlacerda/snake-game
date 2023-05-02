window.onload = function(){

    var stage = document.getElementById('stage');
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    setInterval(game, 100);

    const vel = 1;
    var vx = vy = 0;
    var px = 10;
    var py = 15;
    var tp = 10;
    var qp = 40;
    var ax = ay = 15;

    var trail = [];
    tail = 5;

    var score = 0; // variável para armazenar a pontuação

    function game(){
        px += vx;
        py += vy;
        if(px <0) {
            px = qp-1;
        }
        if(px > qp-1){
            px = 0;
        }
        if(py < 0){
            py = qp-1
        }
        if(py > qp-1){
            py = 0;
        }

        context.fillStyle = "black";
        context.fillRect(0,0, stage.width, stage.height);

        context.fillStyle = "red";
        context.fillRect(ax*tp, ay*tp, tp, tp);

        context.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++){
            context.fillRect(trail[i].x*tp, trail[i].y*tp, tp, tp);
            if(trail[i].x == px && trail[i].y == py){
                vx = vy = 0;
                tail = 5;
                score = 0; // reinicia a pontuação
            }
        }
        trail.push({x:px, y:py})
        while (trail.length > tail){
            trail.shift();
        }
        if(ax == px && ay == py){
            tail++;
            score++; // incrementa a pontuação
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }

        // exibe a pontuação na tela
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Score: " + score, 10, 30);
    }

    function keyPush(event){

        switch(event.keyCode){
            case 37: // left
                if (vx !== vel) { // adiciona verificação para não mudar de direção contrária
                  vx = -vel;
                  vy = 0;
                }
                break;
            case 38: // up
                if (vy !== vel) { // adiciona verificação para não mudar de direção contrária
                  vx = 0;
                  vy = -vel;
                }
                break;
            case 39: // right
                if (vx !== -vel) { // adiciona verificação para não mudar de direção contrária
                  vx = vel;
                  vy = 0;
                }
                break;
            case 40: // down
                if (vy !== -vel) { // adiciona verificação para não mudar de direção contrária
                  vx = 0;
                  vy = vel;
                }
                break;
            default:
                break;
        }
    }
}
