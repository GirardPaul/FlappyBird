        let cvs = document.getElementById("canvas");
        let ctx = cvs.getContext("2d");
        let btn = document.getElementsByClassName("btn");
        cvs.style.border = "2px black solid";
        cvs.style.borderRadius = "5%";
        cvs.style.boxShadow = "5px 5px 5px black";



        //Variables Images

        var bg = new Image();
        var player = new Image();
        var tubebottom = new Image();
        var tubetop = new Image();
        var gameover = new Image();
        //Chargement des images

        bg.src = "fond.jpg";
        player.src = "player.png";
        tubebottom.src = "tubebottom.png";
        tubetop.src = "tubetop.png";
        gameover.src = "gameover.jpg"


        //Variables Joueur + Gravité
        let posPlayerX = 150;
        let posPlayerY = 250;
        let hPlayer = 50;
        const gravity = 2;

        //Variables Score
        var score = 0;
        var bestscore = 0;

        //Variables intervalles tuyaux
        var gap = 120;
        var constant;

        //Variables TubeTop
        let tubetopX = cvs.width;
        let tubetopY = 0;

        //Variables TubeBottom
        let tubebottomX = cvs.width;
        let tubebottomY = 350;

        if(localStorage.getItem("score")){
            bestscore = localStorage.getItem("score");
        }

        
        //Tableau
        var tab = [];
        
        tab[0] = {
            x : cvs.width,
            y : 0
        };

        //Ajout de l'évènement pour le mouvement du player
        document.addEventListener("keydown", monte) || document.addEventListener("click", monte);

        //fonction de la hauteur à laquelle le player monte
        function monte(){
        posPlayerY -= 38;   
        }

        //Evenement pour relancer la partie
        btn.addEventListener("onclick", reload);
        function reload(){
            location.reload();
        }

        //function du jeu
        function game(){


            //création du fond et du player
            ctx.drawImage(bg, 0, 0, 800, 502);
            ctx.drawImage(player,posPlayerX,posPlayerY, 50, 50);

            //vitesse à laquelle le player descends
            posPlayerY += gravity;

        

            //Tableau pour le lancement aléatoire des obstacles + collision
            for(var i = 0; i < tab.length; i++)
            {
                if(posPlayerY <= 0 || posPlayerY + hPlayer >= cvs.height || posPlayerX + 50 >= tab[i].x && posPlayerY < tab[i].y + tubetop.height && posPlayerX <= tab[i].x + tubetop.width || posPlayerX + 50 >= tab[i].x && posPlayerY + 50 >= tab[i].y+constant && posPlayerX <= tab[i].x + 52)
                {

                    ctx.drawImage(gameover, 0, 0, 800, 502);
                    if(score!==0){
                        localStorage.setItem("score", score);
                        
                    }
                   return;
                }

                if(tab[i].x == 180){
                    score++;
                }
                


                constant = tubetop.height+gap;
                ctx.drawImage(tubetop,tab[i].x,tab[i].y, 52, 300);
                ctx.drawImage(tubebottom,tab[i].x,tab[i].y+constant, 52, 378);                     
                tab[i].x--;

                if( tab[i].x == 500 ){
                    tab.push({
                        x : cvs.width,
                        y : Math.floor(Math.random()*tubetop.height)-tubetop.height
                    }); 
                }
            }

            //déplacement des tuyaux
            tubetopX -= 10;
            tubebottomX -= 10;

            //texte score
            ctx.fillStyle = "#FFF";
            ctx.font = "3rem  Bangers";
            ctx.fillText(score,20,cvs.height-20);

            //texte meilleur score
            ctx.fillStyle = "#FFF";
            ctx.font = "3rem  Bangers";
            ctx.fillText(bestscore,730,cvs.height-20);




            requestAnimationFrame(game);

        }
 
