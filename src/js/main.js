//
//
//
//
var spawnList = [];

function spawn(x,y,h,w,speed){
    this.x = Math.floor(Math.random() * 800);
    this.y = Math.floor(Math.random() * - 2000);
    this.h = 10;
    this.w = 10;
    this.speed = 3//Math.floor(Math.random() * 5) + 1;
    this.fill = '#00FF00';
}

function createSpawn(){
    for(x=0;x<20;x++){
        var newSpawn = new spawn();
        spawnList.push(newSpawn);
    }
}

createSpawn();

var game = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    //1. Create the player object
    // Define all argument that will be used by fillRect()
    var player = {
        x:0,
        y:475,
        h: 25,
        w: 25,
        fill: '#fff',
        stroke: '00FF00',
        dir: 'right',
        speed: 2
    }

    function launchSpawns(obj){
        //console.log(obj);
        // reload spaws to have continious game.
        if (obj.y > canvas.height) {
            obj.y=0;
        }
        ctx.fillStyle=obj.fill;

        ctx.clearRect(
            obj.x-1,
            obj.y-obj.speed,
            obj.w+2,
            obj.h+2
        );
    
        ctx.fillRect(
            obj.x,
            obj.y = (obj.y + obj.speed),
            obj.w,
            obj.h
        );
      }

    // add timer to repeat the spawned object
//    function checklocation(obj){
//
//    }

    return {
        //2. Draw the player to the canvas
        player: function(){
            //ctx.lineWidth = 2;   // Sets line width for Stroke Style, frame of the object
            ctx.fillStyle=player.fill;
            ctx.strokeStyle=player.stroke; 
            ctx.clearRect(player.x-4,player.y-4,player.w+6,player.h+5);
        //1. Define how many pixels the player
        // should move each frame (i.e. speed)
        if(player.dir === 'right'){
            player.x += player.speed
            //ctx.strokeRect(player.x++,player.y,player.w,player.h);
            ctx.fillRect(player.x,player.y,player.w,player.h);
                if((player.x + player.w ) >= canvas.width){
                    player.dir = 'left';
                }
        }else if(player.dir === 'left'){
            player.x -= player.speed
            //ctx.strokeRect(player.x--,player.y,player.w,player.h);
            ctx.fillRect(player.x,player.y,player.w,player.h);
                if ((player.x + player.w) <= 25){
                    player.dir = 'right';
                }
        } else if(player.dir === 'up'){
            player.y -= player.speed
            //ctx.strokeRect(player.x--,player.y,player.w,player.h);
            ctx.fillRect(player.x,player.y,player.w,player.h);
                if ((player.y + player.h) <= 0){
                    player.dir = 'down';
                }
        } else {  /// play.dir =='down';
            player.y += player.speed
            //ctx.strokeRect(player.x++,player.y,player.w,player.h);
            ctx.fillRect(player.x,player.y,player.w,player.h);
                if ((player.y + player.h ) >= canvas.height){
                    player.dir = 'up';
                }
        }
        },

        //1. Create a setter for changing the current direction of the user.
//        changeDirection: function(){
//              if(player.dir === 'left'){
//                player.dir = 'right';
//            }else if(player.dir === 'right'){
//                player.dir = 'left';
//            }
//        },

            changeDirection: function(code){
            if(code == 37){
                player.dir='left';
            } 
            else if (code == 38){
                player.dir='up';
            } 
            else if (code == 39 ){
                player.dir='right';
            } 
            else if (code == 40 ){
                player.dir='down';
            }
        },
        //2. Create an animation frame
        //3. Redraw the player every time a frame is executed
        animate: function(){
            this.player();
            for(var x=0;x<spawnList.length; x++){  
                launchSpawns(spawnList[x]);
            } 
            window.requestAnimationFrame(this.animate.bind(this));
        },

        init: function(){
            canvas.height = 600;
            canvas.width = 800;
            this.animate();
        }
    }
})();
  
game.init();

//2. Add a listener to allow the  user to change the direction
//of the player sprite
//window.addEventListener('keyup', function(){
//    game.changeDirection();
//});
    
//of the player sprite
window.addEventListener('keyup', function(evt){
    if( evt.keyCode == 37 ){
        game.changeDirection(37)
    } else if ( evt.keyCode == 38 ){
        game.changeDirection(38)
    } else if ( evt.keyCode == 39 ){
        game.changeDirection(39)
    } else {
        game.changeDirection(40)
    }
});

