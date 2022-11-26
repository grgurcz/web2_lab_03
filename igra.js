var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "myGameCanvas";
        this.canvas.width = 700;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        this.canvas.addEventListener('click', (e) => {

        })
    },
    stop : function() {
        clearInterval(this.interval);
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function generated_and_hit(generated, hit) {
    this.generated = generated
    this.hit = hit
    this.update = function(hit){
        this.hit = hit
        ctx = myGameArea.context
        ctx.save()
        ctx.font = "30px Consolas";
        ctx.fillText('Generated: ' + this.generated, 450, 50)
        ctx.fillText('Hit: ' + this.hit, 450, 100)
    }
}

function component() {
    this.width = 80;
    this.height = 80;
    this.speed_x = Math.floor(Math.random() * 3);
    this.speed_y = Math.floor(Math.random() * 3);
    this.x = 200 + Math.floor(Math.random() * 300);
    this.y = 200 + Math.floor(Math.random() * 300);
    this.hit = false
    this.update = function() {
        if(!this.hit){
            ctx = myGameArea.context
            ctx.save();
            ctx.translate(this.x, this.y); 
            ctx.fillStyle = 'red';
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            ctx.restore();
        }
    }
    this.newPos = function() {
        if (this.x - this.width / 2 < 0)
            this.changeSpeed(true, false);
        else if ((this.x + this.width / 2) >= myGameArea.context.canvas.width) 
            this.changeSpeed(true, false)
        if (this.y - this.height / 2 < 0)
            this.changeSpeed(false, true)
        else if ((this.y + this.height / 2) >= myGameArea.context.canvas.height) 
            this.speed_y = 2;
            this.x += this.speed_x;
            this.y -= this.speed_y;
    }
    this.changeSpeed = function(x_hit, y_hit) {
        if(x_hit){
            this.speed_x = -this.speed_x + Math.floor(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1)
        }
        if(y_hit){
            this.speed_y = -this.speed_y + Math.floor(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1)
        }
    }
    this.checkHit = function(mousePos) {
        if(mousePos.x >= this.x && mousePos.x <= this.x + this.width && mousePos.y >= this.y && mousePos.y <= this.y + this.height) {
            return true
        }
        return false
    }
}
