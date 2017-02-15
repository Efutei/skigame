enchant();

window.onload = function() {

	var game_ = new Game(320,320);
	game_.fps = 30;
	game_.preload('./img/title.png','./img/start.png','./img/started.png','./img/retry.png','./img/bg.png','./img/board.png','./img/ball.png','./img/pole.png','./img/poleb.png');

	game_.onload = function(){

		var createStartScene = function(){
			var scene = new Scene();

			scene.backgroundColor ='#f5ffff';

			var title = new Sprite(179,66);
			title.image =game_.assets['./img/title.png'];
			title.x =75;
			title.y =66;
			scene.addChild(title);

			var startImage = new Sprite(320,133);
			startImage.image =game_.assets['./img/start.png'];
			startImage.x = 0;
			startImage.y = 175;
			startImage.scaleX =0.5;
			startImage.scaleY =0.5;
			scene.addChild(startImage);

			startImage.addEventListener('touchstart', function(e){
				startImage.image =game_.assets['./img/started.png'];
			});

			startImage.addEventListener('touchend', function(e){
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
			time.color='#01adb9';
			time.x=11;
			time.y=0;
			time.font='20px sans-serif';
			scene.addChild(time);

			var rank = new Label();
			rank.text ="ランキング:取得中...";
			rank.color='#01adb9';
			rank.x=5000;
			rank.y=170;
			rank.font='20px sans-serif';
			scene.addChild(rank);

			var retry = new Sprite(69,27);
			retry.image = game_.assets['./img/retry.png'];
			retry.x=245;
			retry.y=-3;
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
			//pole1.image = game_.assets['./img/pole.png'];
			pole1.x=120;
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

			var pole3 = new Sprite(4,4);
			//pole3.image = game_.assets['./img/pole.png'];
			pole3.x=pole1.x-80;
			pole3.y=pole1.y;
			pole3.scaleX =1;
			pole3.scaleY =-1;
			scene.addChild(pole3);

			var pole3b = new Sprite(4,32);
			pole3b.image = game_.assets['./img/pole.png'];
			pole3b.x=pole3.x;
			pole3b.y=pole3.y-28;
			pole3b.scaleX =1;
			pole3b.scaleY =-1;
			scene.addChild(pole3b);

			var pole2 = new Sprite(4,4);
			//pole2.image = game_.assets['./img/poleb.png'];
			pole2.x=200;
			pole2.y=540;
			pole2.scaleX =1;
			pole2.scaleY =-1;
			scene.addChild(pole2);

			var pole2b = new Sprite(4,32);
			pole2b.image = game_.assets['./img/poleb.png'];
			pole2b.x=pole2.x;
			pole2b.y=pole2.y-28;
			pole2b.scaleX =1;
			pole2b.scaleY =-1;
			scene.addChild(pole2b);

			var pole4 = new Sprite(4,4);
			//pole4.image = game_.assets['./img/poleb.png'];
			pole4.x=pole2.x+80;
			pole4.y=pole2.x;
			pole4.scaleX =1;
			pole4.scaleY =-1;
			scene.addChild(pole4);

			var pole4b = new Sprite(4,32);
			pole4b.image = game_.assets['./img/poleb.png'];
			pole4b.x=pole4.x;
			pole4b.y=pole4.y-28;
			pole4b.scaleX =1;
			pole4b.scaleY =-1;
			scene.addChild(pole4b);

			var ball = new Sprite(40,40);
			ball.image = game_.assets['./img/ball.png'];
			ball.x=board.x;
			ball.y=board.y;
			ball.scaleX =-1;
			ball.scaleY =1;
			scene.addChild(ball);

			var corse = 0;
			var speed = 1;
			var corseClear = 0;
			var poleCount = 0;
			var nextPole = 0;
			var goal = 0;

			retry.addEventListener('touchstart',function(e){
				if(goal==0){
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = "https://script.google.com/macros/s/AKfycbzVUwLkqd9PMXES_2w6IR6tBlcYDOGCGpqlg98JbroJe3kRP8Y/exec?time="+999.99+"&callback=_callback";
					function callBack(json){}
					window._callback = callBack;
					document.body.appendChild(script);
				}
				game_.replaceScene(createStartScene());
			});

			scene.addEventListener('touchstart',function(e){
				dir *= -1;
				ball.scaleX *= -1;
			});


			scene.addEventListener('enterframe', function() {
					if(goal==0){
						nowTime += 0.033333;
					}
					var printTime = Math.floor(nowTime*100)/100;
					time.text ="Time:"+printTime;
					speed = 10;

					if(goal==0&&time.y>=0){
						time.y--;
					}

				//ここから背景の動き
					var bgSpeed = speed*Math.cos(board.rotation*Math.PI/180);

					if(corse >= 4700){
						corseClear = 1;
					}
					if(board.y>=272){
						if(goal==0){
							goal=1;
						}
						time.x=40;
						time.y=75;
						time.font='40px sans-serif';
					}

					if(bgSpeed < 0){
						bgSpeed *= -1;
					}
					corse += bgSpeed;
					if(corseClear == 0){
						board.y = 30;
						if(bg1.y <= -320){
							bg1.y = 320;
						}
						if(bg2.y <= -320){
							bg2.y = 320;
						}
	        	bg1.y -= bgSpeed;
						bg2.y -= bgSpeed;

					}else{
						board.y += bgSpeed;
					}
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

					if(board.x<=0){
						board.x=0;
					}
					if(board.x>=310){
						board.x=310;
					}
				//ここまで板の動き

				//ここから達磨の動き
	 				ball.x=board.x-12;
					ball.y=board.y-10;
				//ここまで達磨の動き

				//ここからポールの動き
				if(corseClear == 0){
					pole1.y -= bgSpeed;
					pole1b.y = pole1.y-28;
					pole3.y = pole1.y;
					pole3b.y = pole3.y-28;
					pole1b.x = pole1.x;
					pole3.x = pole1.x - 80;
					pole3b.x = pole3.x;

					pole2.y -= bgSpeed;
					pole2b.y = pole2.y-28;
					pole4.y = pole2.y;
					pole4b.y = pole4.y-28;
					pole2b.x = pole2.x;
					pole4.x = pole2.x + 80;
					pole4b.x = pole4.x;

					if(poleCount >= 7){
						pole1.x=160;
					}
					if(poleCount >=8){
						pole2.x=160;
					}

					if(poleCount >= 15){
						pole1.x=120;
					}
					if(poleCount >=16){
						pole2.x=200;
					}

					if(poleCount >= 23){
						pole1.x=290;
						pole1b.x=pole1.x;
						pole3.x=28;
						pole3b.x=pole3.x;
					}


					if(pole1.y <= -30){
						pole1.y = 350;
						poleCount++;
					}
					if(pole2.y <= -30){
						pole2.y = 350;
						poleCount++;
					}

					if(nextPole == 0&&pole1.y<ball.y+40){
						nextPole = 1;
						if(ball.x+20<pole3.x||pole1.x<ball.x+20){
							nowTime+=3.0;
							time.y = 4;
						}
					}
					if(nextPole == 1&&pole2.y<ball.y+40){
						nextPole = 0;
						if(ball.x+20<pole2.x||pole4.x<ball.x+20){
							nowTime+=3.0;
							time.y = 4;
						}
					}

				}
				//ここまでポールの動き

				//ここからゴール後の処理
				if(goal==1){
					goal = 2;
					rank.x = 50;
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = "https://script.google.com/macros/s/AKfycbzVUwLkqd9PMXES_2w6IR6tBlcYDOGCGpqlg98JbroJe3kRP8Y/exec?time="+printTime+"&callback=_callback";
					function callBack(json){
						console.log(json.response.rank);
						rank.text = "ランキング:"+json.response.rank+"/"+json.response.total;
					}
					window._callback = callBack;
    			document.body.appendChild(script);

				}

				//ここまでゴール後の処理
      });

			return scene;
		};

		game_.replaceScene(createStartScene());

	};

	game_.start();
};
