/*
Things to Add/Do:
1) player level progress needed does not increase per level
3) Heal Added - additional skills needed

*/


(function() {
    document.getElementById("audio1").preload;
    document.getElementById("audio2").preload;
    document.getElementById("audio3").preload;
    document.getElementById("audio4").preload;
    document.getElementById("audio5").preload;
    document.getElementById("audio6").preload;
    document.getElementById("audio7").preload;
}());

var abilityUsed;
function Person(firstname, lastname, health, strength) {
    console.log(this)
    this.firstname = firstname;
    this.lastname = lastname;
    this.level = 1;
    this.health = health;
    this.baseHealth = health;
    this.strength = strength;
    this.progress = 0;
    this.progressNeeded = 100;
    this.attackPoints = 50;
    this.abilities = {
        heal: { name: "heal", amount: 30, attackPoints: 18, learned: "no"},
        berzerk: { name: "Berzerk", strength: 9, attackPoints: 21, learned: "no"}, 
        meteor: { name: "meteor", strength: 31, attackPoints: 35, learned: "no"}, 
    }
}

player = new Person('Alex', 'Doe', "100", "2");
var forestChallengeMusic = document.getElementById("audio1");
var forestCombatMusic = document.getElementById("audio2");
var enemyRoar = document.getElementById("audio3");
var attackSound = document.getElementById("audio4");
var fightWon = document.getElementById("audio5");
var forestFinalBattleIntro = document.getElementById("audio6");
var forestFinalBattle = document.getElementById("audio7");

//initializing game
var changeName = function() {

    document.getElementById("audio1").play;
    document.getElementById("audio2").play;
    document.getElementById("audio3").play;
    document.getElementById("audio4").play;
    document.getElementById("audio5").play;
    document.getElementById("audio6").play;
    document.getElementById("audio7").play;
    document.getElementById("audio1").pause;
    document.getElementById("audio2").pause;
    document.getElementById("audio3").pause;
    document.getElementById("audio4").pause;
    document.getElementById("audio5").pause;
    document.getElementById("audio6").pause;
    document.getElementById("audio7").pause;

    var name = document.getElementById("nameField").value;
    document.getElementById("dialogBox").style.display = "flex";
    document.getElementById("toggleBackground").style.display = "flex";
    document.getElementById("playerName").innerHTML = name;
    document.getElementById("face").style.display = "inline-block";
    document.getElementById("playerSubmit").remove();
    window.player = new Person(name, 'Doe', 100, 2);
    document.getElementById("playerInfo").style.display = "inline";
    document.getElementById("initialNextIcons").style.display = "inline-block";
    document.getElementById("settingInfo").style.display = "inline";
    document.getElementById("locationInfo").innerHTML = section1.location;
    document.getElementById("levelInfo").innerHTML = player.level;
    document.getElementById("healthInfo").innerHTML = player.health;
    document.getElementById("attackPointsInfo").innerHTML = player.attackPoints;
    document.getElementById("strengthInfo").innerHTML = player.strength;
    document.getElementById("dialog").innerHTML = "Welcome," + ' ' + name + 
    "! Progress through the " + section1.location + " and overcome challenges to escape..";
};

function closeInstructions() {
    console.log("clicked")
    document.querySelector('.instructions').style.display = 'none';
}

function inventoryToggleIn() {
    document.getElementById("inventoryAnimateIn").style.display = "inline-block";
}

function inventoryToggleOut() {
    document.getElementById("inventoryAnimateIn").style.display = "none";
    
}

function topBoxToggle () {
     var x = document.getElementById("player");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//world 1, which contains enemies and challenge properties as well as challenge and chack answer methods
var a = 0;
var lastChallengeInitiated = false;
var tempProgress = 0;
var selectChallenge = 0;
var section1 = {
    location: "Enchanted Forest",
    progress: 0,
    enemies: {
        enemy1: {name: 'Vengeful Wolf', level: 1, attack: 3, health: 5, expGiven: 21, picID: "wolf"},
        enemy2: {name: "Webbie", level: 1, attack: 1, health: 3, expGiven: 14, picID: "spiderSmall"},
        enemy3: {name: "Beetler", level: 1, attack: 3, health: 7, expGiven: 23, picID: "beetle"},
        enemy4: {name: 'Knight Beaver', level: 1, attack: 2, health: 4, expGiven: 15, picID: "beaver"},
        enemy10: {name: 'Hotmush', level: 1, attack: 9, health: 3, expGiven: 34, picID: "mushroom"},
        enemy11: {name: 'King Serpentor', level: 2, attack: 11, health: 6, expGiven: 44, picID: "snake"},
        enemy12: {name: "Colossal Rootra", level: 2, attack: 4, health: 10, expGiven: 28, picID: "plant"},
        enemy13: {name: "Queen Webra", level: 2, attack: 9, health: 8, expGiven: 51, picID: "spiderQueen"},
        enemy14: {name: "Gate Keeper", level: "???", attack: 31, health: 54, expGiven: 212, picID: "wizard"},
    },
    firstChallenge: function() {forestChallengeMusic.play(); selectedChallenge = section1.challenges.challenge1; document.getElementById("initialNextIcons").style.display = "none"; section1.progressionCheck(); },
    challenges: {
        
        challenge1: {question: "A small creature spots you, but seems more intrigued than anything..",
                        forward: function() {
                            selectChallenge = 1;
                            this.selectedChallengeName = section1.enemies.enemy10;
                            document.getElementById("commandIcons").style.display = "none";
                            document.getElementById("dialog").innerHTML = "The small creature beings charging you ready to attack!!"
                            setTimeout(function(){playerAttacked()}, 5000);
                        },
                    },
        challenge2: {question: "You hear a slithering from behind you. A loud sound like a boulder dragging through the forest..",
                            forward: function() {
                            selectChallenge = 2;
                            this.selectedChallengeName = section1.enemies.enemy11;
                            document.getElementById("commandIcons").style.display = "none";
                            document.getElementById("dialog").innerHTML = "You hear a loud hiss as fangs the size of ice picks speed towards you!!"
                            setTimeout(function(){playerAttacked()}, 5000);
                            },
                    },
        challenge3: {question: "Whoa.. the ground is shaking and trees are dropping all around you.. earthquake?!",
                            forward: function() {
                            selectChallenge = 3;
                            this.selectedChallengeName = section1.enemies.enemy12;
                            document.getElementById("commandIcons").style.display = "none";
                            document.getElementById("dialog").innerHTML = "A massive figure slowly appears in front of you while your surroundings get demolished.."
                            setTimeout(function(){playerAttacked()}, 5000);
                            },
                    },
        challenge4: {question: "You tripped over what looks like a thick white rope, it clings on as you free your leg..",
                            forward: function() {
                            selectChallenge = 4;
                            this.selectedChallengeName = section1.enemies.enemy13;
                            document.getElementById("commandIcons").style.display = "none";
                            document.getElementById("dialog").innerHTML = "You barely free yourself as a creature shoots a string of web towards you!!"
                            setTimeout(function(){playerAttacked()}, 5000);
                            },
                    },
        challenge5: {question: "HP Fully Restored!!",
                    forward: function() {
                        forestChallengeMusic.pause();
                        forestFinalBattleIntro.play();
                        player.health = player.baseHealth;
                        document.getElementById("healthInfo").innerHTML = player.health;
                        selectChallenge = 5;
                        this.selectedChallengeName = section1.enemies.enemy14;
                        document.getElementById("commandIcons").style.display = "none";
                        document.getElementById("dialog").innerHTML = "HP Fully Restored!!";
                        setTimeout(function(){document.getElementById("dialog").innerHTML = "you see a figure slowly approaching from the other side.."}, 2000);
                        setTimeout(function(){document.getElementById("dialog").innerHTML = "Unknown: 'You think you can leave this place? Without a true challenge?!...'"}, 8000);
                        setTimeout(function(){document.getElementById("dialog").innerHTML = "Unknown: 'step forward and show me when you're made of...'"}, 15000);
                        setTimeout(function(){document.getElementById("dialog").innerHTML = "Make sure you're truly ready before proceeding..."}, 22000);
                        setTimeout(function(){
                                document.getElementById("commandIcons").style.display = "inline-block";
                                document.getElementById('forward').onclick = function changeContent() {playerAttacked();}
                                document.getElementById('run').onclick = function changeContent() {
                                document.getElementById("combatIcons").style.display = "none";
                                document.getElementById("commandIcons").style.display = "none";
                                document.getElementById("dialog").innerHTML = "Come back when you're a real challenge, child.";
                                setTimeout(function(){document.getElementById("dialog").innerHTML = "Progress reduced to 50";}, 4000);
                                setTimeout(function(){
                                    forestFinalBattleIntro.pause();
                                    section1.progress = 50;
                                    document.getElementById("progressInfo").style.width = section1.progress + '%';
                                    lastChallengeInitiated = false;
                                    selectedName = 0;
                                    document.getElementById("nextIcons").style.display = "inline-block";
                                    }, 8000);
                                };
                            }, 22000);
                        }
                    },
    },
    //challenge method - chooses a random challenge property and outputs it's value
    challenge: function() {
        document.getElementById("nextIcons").style.display = "none"; //remove nextIcon
        document.getElementById("combatIcons").style.display = "none"; //remove combatIcons
        document.getElementById("forestPic").style.display = "inline";
        document.getElementById("commandIcons").style.display = "block"; //add commandIcon
        forestChallengeMusic.play();
            a = Math.floor((Math.random() * 4) + 1);
        if (a === 1) {
            selectedChallenge = section1.challenges.challenge1;
        } else if (a === 2) {
            selectedChallenge = section1.challenges.challenge2;
        } else if (a === 3) {
            selectedChallenge = section1.challenges.challenge3;
        } else if (a === 4) {
            selectedChallenge = section1.challenges.challenge4;
        } 
        document.getElementById("dialog").innerHTML = selectedChallenge.question;

        //gives functionality to answer types
        document.getElementById('forward').onclick = function changeContent() {
            selectedChallenge.forward();
        }
        document.getElementById('run').onclick = function changeContent() {
            document.getElementById("commandIcons").style.display = "none"; //add commandIcon
            document.getElementById("dialog").innerHTML = "Challenge avoided.."
            if (6 < Math.floor((Math.random() * 6) + 1)) {
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                        }, 300 * i);
                    }(i));
                }
                setTimeout(function() {document.getElementById("commandIcons").style.display = "none"; document.getElementById("dialog").innerHTML = "Watch out!"}, 3000)
                setTimeout(function() {forestChallengeMusic.pause(); document.getElementById("forestPic").style.display = "none"; playerAttacked(); }, 5000)
                return
            }
                else {
                section1.progressionCheck()
                }
        }

    },
    //Change to get a challenge or get attacked while making progress
    progressionCheck: function() {
            forestChallengeMusic.play();
            document.getElementById("nextIcons").style.display = "none";
            document.getElementById("forestPic").style.display = "inline";
            tempProgress = Math.floor((Math.random() * 9) + 1);
            document.getElementById("commandIcons").style.display = "none";
            document.getElementById("dialog").innerHTML = '<img src=\"img/walkingGit.gif\">' + '<span style=\"position:absolute; top: 20px; left: 80px; z-index=2; text-align: center;\">' + tempProgress + ' Progress Made!!</span>';

            if (section1.progress > 99) {
                section1.progress = 80; 
                section1.challenges.challenge5.forward();              
                return    
            } else if (6 <= Math.floor((Math.random() * 10) + 1)) {
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                        }, 300 * i);
                    }(i));
                }
                setTimeout(function() {document.getElementById("commandIcons").style.display = "none"; document.getElementById("dialog").innerHTML = "Watch out!"}, 3000)
                setTimeout(function() {playerAttacked(); }, 5000)
                return
            } else if (8 <= Math.floor((Math.random() * 10) + 1)) {
                    for (i = 0; i < tempProgress; i++) {
                        (function(i) {
                            setTimeout(function() {
                                let atPercentage = section1.progress + 1;;
                                section1.progress = atPercentage
                                document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                                document.getElementById("commandIcons").style.display = "none";
                            }, 300 * i);
                        }(i));
                    }
                    setTimeout(function() {section1.challenge();}, 3000)
                    return
            } else { 
                document.getElementById("forestPic").style.display = "block";
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                        }, 300 * i);
                    }(i));
                } 
                setTimeout(function() {tempProgress = 0; document.getElementById("commandIcons").style.display = "none"; document.getElementById("nextIcons").style.display = "inline-block"; document.getElementById("dialog").innerHTML = "No encounters..."; },3000)
            }   
    }
};


//Beginning of checks before starting sequence
//Beginning of checks before starting sequence
//Beginning of checks before starting sequence
//Beginning of checks before starting sequence

function checkLevelProgress (){ // checks player Level - invoked by "nextIcons" onclick
    if (player.progress >= player.progressNeeded) {
        player.attackPoints = 50; //temporary to reset AP
        fightWon.play();
        document.getElementById("attackPointsInfo").innerHTML = player.attackPoints; //temporary to reset AP
        document.getElementById("commandIcons").style.display = "none";
        document.getElementById("nextIcons").style.display = "none";
        player.progress = 0;
        document.getElementById("playerProgressInfo").style.width = player.progress + '%';
        player.level = player.level + 1;
        player.baseHealth = player.baseHealth + 20;
        player.health = player.baseHealth;
        player.strength = player.strength + 2;
        document.getElementById("levelInfo").innerHTML = player.level;
        document.getElementById("healthInfo").innerHTML = player.health;
        document.getElementById("strengthInfo").innerHTML = player.strength;
        document.getElementById("dialog").innerHTML = "Congratulations, you've leveled up to " + player.level + "!!"
        setTimeout(function() { 
            document.getElementById("dialog").innerHTML = "Your health has increased to " + player.health + "!!"
        }, 3000);
        setTimeout(function() {
            document.getElementById("dialog").innerHTML = "Your Strength has increased to " + player.strength + "!!"
        }, 7000);
        setTimeout(function() {

            if (player.level === 2 && player.abilities.heal.learned == "no") {
                document.getElementById("dialog").innerHTML ="You've learned Heal!!!";
                document.getElementById("heal").style.display = "inline-block";
                document.getElementById("healDescription").innerHTML = "Heal yourself " + player.abilities.heal.amount + " points at the cost of " + player.abilities.heal.attackPoints + " AP."; //temporary to reset AP
                player.abilities.heal.learned = "yes";
                setTimeout(function() {document.getElementById("nextIcons").style.display = "inline-block";}, 4000);
            } else {
            checkfinalBoss();
            }
        }, 10000);
    } else {
        player.attackPoints = 50; //temporary to reset AP
        document.getElementById("attackPointsInfo").innerHTML = player.attackPoints; //temporary to reset AP
        checkfinalBoss();
    }
}


function checkfinalBoss(){ //Checks if defeated final boss - invoked after checkLevelProgress (above)
    if (section1.enemies.enemy14.health <= 0) {
        forestFinalBattleIntro.pause();
        document.getElementById("dialog").innerHTML = "Unfamiliar Voice: " + '"You.. you are the first to ever defeat the forest gatekeeper"'; 
        setTimeout(function() {
            document.getElementById("dialog").innerHTML = "Unfamiliar Voice: " + '"Proceed to the next location. People are in need.."';
        }, 4000)
        setTimeout(function() {
            document.getElementById("dialog").innerHTML = "Unfamiliar Voice: " + 'Proceed...';
            document.getElementById("nextLevelIcons").style.display = "inline-block";
        }, 8000)
    } else {selectedName = 0; section1.progressionCheck();}
};

//sequence when ambushed
var selectedName;
function playerAttacked() {
    if (selectedName === section1.enemies.enemy14) {
        forestChallengeMusic.pause();
    } else if (selectedName !== section1.enemies.enemy14){
    forestFinalBattleIntro.pause();
    forestChallengeMusic.pause();
    forestCombatMusic.play();
    }
    document.getElementById("commandIcons").style.display = "none"; //remove commandIcon
    document.getElementById("forestPic").style.display = "none";
    //document.getElementById("combatIcons").style.display = "block"; //add combatIcon
    a = Math.floor((Math.random() * 4) + 1);
    
    if (selectChallenge === 1) {
        selectedName = section1.challenges.challenge1.selectedChallengeName;
        selectChallenge = 0;
    } else if (selectChallenge === 2) {
        selectedName = section1.challenges.challenge2.selectedChallengeName;
        selectChallenge = 0;
    } else if (selectChallenge === 3) {
        selectedName = section1.challenges.challenge3.selectedChallengeName;
        selectChallenge = 0;
    } else if (selectChallenge === 4) {
        selectedName = section1.challenges.challenge4.selectedChallengeName;
        selectChallenge = 0;
    } else if (selectChallenge === 5) {
        selectedName = section1.challenges.challenge5.selectedChallengeName;
        selectChallenge = 5;
    }  else if (a === 1) {
        selectedName = section1.enemies.enemy1;
    } else if (a === 2) {
        selectedName = section1.enemies.enemy2;
    } else if (a === 3) {
        selectedName = section1.enemies.enemy3;
    } else if (a === 4) {
        selectedName = section1.enemies.enemy4;
    } 

    document.getElementById(selectedName.picID).style.display = "inline";
    document.getElementById(selectedName.picID).style.animation = "attacked linear 1s";
    document.getElementById(selectedName.picID).style.animation = "enemyAttack linear 1s";
    enemyRoar.play();
    attackSound.play();
    forestCombatMusic.play();
    document.getElementById("dialog").innerHTML ="You were ambushed by " + selectedName.name + " and took " + selectedName.attack + " damage";
    player.health = player.health - selectedName.attack;
    document.getElementById("healthInfo").innerHTML = player.health;
    section1.enemies.tempEnemyHealth = selectedName.health;
    if (player.health < 1) {
        document.getElementById("dialog").innerHTML = "You Have Died!!!";
        setTimeout(function() { document.location.reload(true); }, 2000)
    } else if (player.health < 30) {
        document.getElementById("dialog").innerHTML = "Be careful, you are getting weak!!!";
        document.getElementById("face").classList.remove('fa-smile-beam');
        document.getElementById("face").classList.add('fa-tired');
        setTimeout(function() { combatSequence(); }, 4000)
    } else {
        setTimeout(function() { combatSequence(); }, 4000)
    }
}
  
//fight sequence 
var abilityUsed
var overallDamageGiven = 0;
var overallDamageTaken = 0;
var sequences = 0;
var attack;
//combat sequence - also checks for abilities called and adjusts values
function combatSequence(param1) {
    param1;
    document.getElementById("combatIcons").style.display = "block";
    document.getElementById("dialog").innerHTML = "<b>Fighting</b>: " + selectedName.name
        + "<br><b>Lvl</b>: " + selectedName.level + " <b>Atk</b>: " + selectedName.attack + " <b>HP</b>: " + section1.enemies.tempEnemyHealth;
    if (param1 === player.abilities.heal.name) {
        abilityUsed = player.abilities.heal.name;
        document.getElementById("combatIcons").style.display = "none";
        attack();
    }
    
    //invoked when attack is clicked, damage date applied
    document.getElementById("attack").onclick = function(param1) {
    document.getElementById("combatIcons").style.display = "none";
    attack();
    };
    //after attack click function above. Has checks for spells.
    function attack() {
        

        //if abilityUsed is heal if abilityUsed is heal if abilityUsed is heal if abilityUsed is heal
        if (abilityUsed === "heal") {
            if (player.attackPoints < player.abilities.heal.attackPoints) {
                inventoryToggleOut();
                
                console.log("tested ability points")
                document.getElementById("dialog").innerHTML = "You need " + player.abilities.heal.attackPoints + " attack points for this..."
                setTimeout(function() {abilityUsed = "none"; combatSequence(); }, 5000)
            } else {
                
                if (player.abilities.heal.amount + player.health > player.baseHealth){
                    player.health = player.baseHealth;
                } else {
                    player.health = player.health + player.abilities.heal.amount;
                }
                document.getElementById("dialog").innerHTML = "You healed " + player.abilities.heal.amount + " points!!";
                console.log("heal used");
                player.attackPoints = player.attackPoints - player.abilities.heal.attackPoints;
                document.getElementById("attackPointsInfo").innerHTML = player.attackPoints;
                inventoryToggleOut();
                abilityUsed = "none"
                i = section1.enemies.tempEnemyHealth;
                overallDamageGiven = 0;
                overallDamageTaken = overallDamageTaken + selectedName.attack;   
                tempDamage = 0;           
                sequences = sequences + 1;
                setTimeout(function() {  
                    document.getElementById("dialog").innerHTML = "You used " + player.abilities.heal.attackPoints + " attack points..";
                }, 3000)
                setTimeout(function() {  
                    finishAttack();
                }, 6000)
            }
            // END HEAL END HEAL END HEAL

        } else {    //if no abilities are used
        attackSound.play();
        enemyRoar.play();
        section1.enemies.tempEnemyHealth = section1.enemies.tempEnemyHealth - player.strength;
        player.health = player.health - selectedName.attack;
        i = section1.enemies.tempEnemyHealth;
        overallDamageGiven = overallDamageGiven + player.strength;
        overallDamageTaken = overallDamageTaken + selectedName.attack;     
        tempDamage = player.strength;         
        sequences = sequences + 1;
        finishAttack();
        } 

        //Determines if player is still alive, then executes damage to both enemies before returning to start of combat
        function finishAttack(){
            document.getElementById("combatIcons").style.display = "none";
            if (section1.enemies.tempEnemyHealth >= 1 && player.health >= 1) {
                document.getElementById("dialog").innerHTML = "You dealt " + tempDamage + " damage to " + selectedName.name; 
                document.getElementById("healthInfo").innerHTML = player.health;
                setTimeout(function() {attackSound.play(); document.getElementById("dialog").innerHTML = "You received " + selectedName.attack + " damage"; }, 3000)
                setTimeout(function() { combatSequence(); }, 6000)
                return

            //if player health is below 1, you died (reloads webpage)
            } else if (player.health <= 0) {
                setTimeout(function() { document.getElementById("dialog").innerHTML = "You Died..."; }, 1)
                setTimeout(function() { document.location.reload(true); }, 5000)
                return

            //if player enemy's health is below 1, you win fight and damage stats are shown
            } else if  (section1.enemies.tempEnemyHealth <= 1) {
                document.getElementById(selectedName.picID).style.animation = "attacked linear 1s";
                document.getElementById("commandIcons").style.display = "none";
                document.getElementById("dialog").innerHTML = "Congratulations, you've won the fight!!"; 
                document.getElementById("healthInfo").innerHTML = player.health;
                fightWon.play();
                forestCombatMusic.pause();
                forestFinalBattleIntro.pause();
                setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Dealt: " + overallDamageGiven; }, 3000)
                setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Received: " + overallDamageTaken; }, 6000)
                setTimeout(function() {
                    document.getElementById("dialog").innerHTML = "You gained " + selectedName.expGiven + " XP!!!"
                    for (i = 0; i < selectedName.expGiven; i++) {
                        (function(i) {
                            setTimeout(function() {
                                let atPercentage = player.progress + 1;
                                player.progress = atPercentage
                                document.getElementById("playerProgressInfo").style.width = atPercentage + '%'; 
                            }, 100 * i);
                        }(i));
                    }
                }, 9000)
                setTimeout(function() {
                    sequences = 0;
                    overallDamageGiven = 0;
                    overallDamageTaken = 0;
                    document.getElementById("commandIcons").style.display = "none";
                    document.getElementById(selectedName.picID).style.display = "none";
                    document.getElementById("nextIcons").style.display = "inline-block";
                    }, 12000)
            }
        };
    }

    //Attempts to run away. 50/50 chance.
    document.getElementById("runAway").onclick = function () {
        document.getElementById("combatIcons").style.display = "none";
        var runChance = Math.floor((Math.random() * 2) + 1);
        
        if (runChance == 1) {
            document.getElementById("dialog").innerHTML = "You escaped!!";
            lastChallengeInitiated = false;
            forestCombatMusic.pause();
            document.getElementById(selectedName.picID).style.display = "none";
            document.getElementById("nextIcons").style.display = "inline-block";
        }  else { 
            document.getElementById("dialog").innerHTML = "You could not escape! <br>" + selectedName.attack + " damage taken";
            player.health = player.health - selectedName.attack;
            document.getElementById("healthInfo").innerHTML = player.health;
            attackSound.play();
            setTimeout(function() { combatSequence(); }, 2000)
        }
    };
    
};
