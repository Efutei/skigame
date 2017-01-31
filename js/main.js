enchant();

window.onload = function() {

	var game_ = new Game(320,320);
	game_.fps = 30;
	game_.preload('./img/start.png','./img/bg.png','./img/board.png','./img/ball.png','./img/pole.png','./img/poleb.png');

	game_.onload = function(){

		var createStartScene = function(){
			var scene = new Scene();

			scene.backgroundColor ='#f0f0f0';

			var title = new Label('スキー');
			title.textAlign = 'center';
			title.color = '#c0f020';
			title.x =0;
			title.y =96;
			title.font ='35px sans-serif';
			scene.addChild(title);

			var startImage = new Sprite(320,133);
			startImage.image =game_.assets['./img/start.png'];
			startImage.x = 0;
			startImage.y = 175;
			startImage.scaleX =0.5;
			startImage.scaleY =0.5;
			scene.addChild(startImage);

				startImage.addEventListener('touchstart', function(e){

					game_.replaceScene(createGameScene());
				});

			return scene;

		};

		var createGameScene = function() {

			var scene = new Scene();
			scene.backgroundColor='#ffffff';

			var bg1 = new Sprite(320,1280);
			bg1.image = game_.assets['./img/bg.png'];
			bg1.x=0;
			bg1.y=0;
			bg1.scaleX =1;
			bg1.scaleY =1;
			scene.addChild(bg1);

			var bg2 = new Sprite(320,1280);
			bg2.image = game_.assets['./img/bg.png'];
			bg2.x=0;
			bg2.y=320;
			bg2.scaleX =1;
			bg2.scaleY =1;
			scene.addChild(bg2);

			var nowTime = 0;

			var time = new Label();
			time.text ="Time:"+nowTime;
			time.color='#f70f1f';
			time.x=11;
			time.y=0;
			time.font='20px sans-serif';
			scene.addChild(time);

			var retry = new Label('RETRY');
			retry.color='#874684';
			retry.x=265;
			retry.y=0;
			scene.addChild(retry);

			var board = new Sprite(15,60);
			board.image = game_.assets['./img/board.png'];
			board.x=230;
			board.y=30;
			board.scaleX =1;
			board.scaleY =-1;
			board.rotation = -30;
			scene.addChild(board);
			var dir = 1;


			var pole1 = new Sprite(4,4);
			pole1.image = game_.assets['./img/pole.png'];
			pole1.x=180;
			pole1.y=350;
			pole1.scaleX =1;
			pole1.scaleY =-1;
			scene.addChild(pole1);
			
			var pole1b = new Sprite(4,32);
			pole1b.image = game_.assets['./img/pole.png'];
			pole1b.x=pole1.x;
			pole1b.y=pole1.y-28;
			pole1b.scaleX =1;
			pole1b.scaleY =-1;
			scene.addChild(pole1b);

			var pole2 = new Sprite(4,4);
			pole2.image = game_.assets['./img/poleb.png'];
			pole2.x=180;
			pole2.y=350;
			pole2.scaleX =1;
			pole2.scaleY =-1;
			scene.addChild(pole2);
			
			var pole2b = new Sprite(4,32);
			pole2b.image = game_.assets['./img/poleb.png'];
			pole2b.x=pole1.x;
			pole2b.y=pole1.y-28;
			pole2b.scaleX =1;
			pole2b.scaleY =-1;
			scene.addChild(pole2b);

			var ball = new Sprite(40,40);
			ball.image = game_.assets['./img/ball.png'];
			ball.x=board.x;
			ball.y=board.y;
			ball.scaleX =-1;
			ball.scaleY =1;
			scene.addChild(ball);

			var corse = 0;
			var speed = 1;

			retry.addEventListener('touchstart',function(e){
				game_.replaceScene(createGameScene());
			});

			scene.addEventListener('touchstart',function(e){
				dir *= -1;
				ball.scaleX *= -1;
			});


			scene.addEventListener('enterframe', function() {
			
					nowTime += 0.033333;
					var printTime = Math.floor(nowTime*100)/100;
					time.text ="Time:"+printTime;
					speed = 10;
				//ここから背景の動き
					var bgSpeed = speed*Math.cos(board.rotation*Math.PI/180);
					
					if(bgSpeed < 0){
						bgSpeed *= -1;
					}
					corse += bgSpeed;
					if(corse <= 4000){
						board.y = 30;
						if(bg1.y <= -320){
							bg1.y = 320;
						}
						if(bg2.y <= -320){
							bg2.y = 320;
						}
	        	bg1.y -= bgSpeed;
						bg2.y -= bgSpeed;
						
						pole1.y -= bgSpeed;
						pole1b.y = pole1.y-28;
						
					}else{
						board.y += bgSpeed;
					}
					console.log(corse);
				//ここまで背景の動き
				
				//ここから板の動き
					if(board.rotation > 72){
						board.rotation = 72;
					}else if(board.rotation < -72){
						board.rotation = -72;
					}
	    		
	    		board.rotate(6*dir);
	    		
	    		board.x -= speed*Math.sin(board.rotation*Math.PI/180);
					board.scaleX = Math.cos(board.rotation*Math.PI/180);
				//ここまで板の動き
					
				//ここから達磨の動き
	 				ball.x=board.x-12;
					ball.y=board.y-10;
				//ここまで達磨の動き
      });

			return scene;
		};

		game_.replaceScene(createStartScene());

	};

	game_.start();
};