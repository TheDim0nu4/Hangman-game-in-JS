const words_en = [
    "SUN", "MOON", "STAR", "SKY", "WATER",
    "MOUNTAIN", "FOREST", "RIVER", "GRASS", "TREE",
    "FLOWER", "BIRD", "ANIMAL", "HOUSE", "VILLAGE",
    "CITY", "ROAD", "SEA", "LAKE", "WINDMILL",
    "BREAD", "SOUP", "WATER", "TEA", "SALT",
    "SUGAR", "MILK", "HONEY", "FISH", "MEAT",
    "CHEESE", "EGG", "PORRIDGE", "CAKE", "BREAD",
    "CHILD", "MOTHER", "FATHER", "SISTER", "BROTHER",
    "GRANDFATHER", "GRANDMOTHER", "FAMILY", "FRIEND", "BOOK"
];

const words_ua = [
    "СПОКІЙНИЙ", "ВІДПУСТКА", "ТЕАТРАЛЬНИЙ", "ЕКСКУРСІЯ", "РЕКОМЕНДАЦІЯ",
    "МЕТАЛУРГІЯ", "НАУКОВЕЦЬ", "УКРАЇНСЬКИЙ", "ІНФОРМАЦІЯ", "ВОЛОНТЕР",
    "КУЛЬТУРНИЙ", "ПРЕЗИДЕНТ", "ТРАНСПОРТ", "СУЧАСНИЙ", "СУДНО",
    "ЛІТЕРАТУРА", "ПРОГРАМІСТ", "МЕДИЦИНА", "ІНТЕРНЕТ", "ТРЕНАЖЕР",
    "ПРОФЕСІЯ", "ІНЖЕНЕР", "АКТРИСА", "МУЗИКА", "ФІЛОСОФІЯ",
    "КЛАСИЧНИЙ", "ОБРАЗОТВОРЧИЙ", "ФУНКЦІОНАЛЬНИЙ", "ДОСЛІДЖЕННЯ", "ОБЛАШТУВАННЯ",
    "ТЕОРІЯ", "ДИРЕКТОР", "ЛЕКТОР", "МІНІСТЕРСТВО", "ЕКОЛОГІЯ",
    "ІНСТИТУТ", "АКАДЕМІЯ", "НАВЧАННЯ", "ПЕДАГОГІКА", "ЕСТЕТИКА"
];

function getRandomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}


let btn_lang_ua = document.querySelector(".ua");
let btn_lang_en = document.querySelector(".en");

let guessed_word;
let underlines = '';
let game_word = document.querySelector(".gues-let");
let nums_inc = 0;

function add_letter( guessed_word, underlines, letter){
    let res = underlines.split('');
    for (let i = 0; i < guessed_word.length; i++) {
        if (guessed_word[i] === letter) {
            res[i] = letter; 
        }
    }        
    return res.join('');
};

let hangman = [ ".head", ".body", ".left-arm", ".right-arm", ".left-leg", ".right-leg" ];

function ua_game(){
    btn_lang_ua.classList.remove("no-active");
    btn_lang_ua.classList.add("active");

    guessed_word = getRandomWord(words_ua);
    underlines = '';
    for( let i = 0; i < guessed_word.length; i++ ){
        underlines += '_';
    };
    game_word.innerHTML = underlines;

    document.querySelector(".letters").innerHTML = "";
    document.querySelector(".letters").insertAdjacentHTML( 'afterbegin', '<div class="letter">А</div>' + '<div class="letter">Б</div>' + '<div class="letter">В</div>' + '<div class="letter">Г</div>' + '<div class="letter">Ґ</div>' + '<div class="letter">Д</div>' + '<div class="letter">Е</div>' + '<div class="letter">Є</div>' + '<div class="letter">Ж</div>' + '<div class="letter">З</div>' + '<div class="letter">И</div>' + '<div class="letter">І</div>' + '<div class="letter">Ї</div>' + '<div class="letter">Й</div>' + '<div class="letter">К</div>' + '<div class="letter">Л</div>' + '<div class="letter">М</div>' + '<div class="letter">Н</div>' + '<div class="letter">О</div>' + '<div class="letter">П</div>' + '<div class="letter">Р</div>' + '<div class="letter">С</div>' + '<div class="letter">Т</div>' + '<div class="letter">У</div>' + '<div class="letter">Ф</div>' + '<div class="letter">Х</div>' + '<div class="letter">Ц</div>' + '<div class="letter">Ч</div>' + '<div class="letter">Ш</div>' + '<div class="letter">Щ</div>' + '<div class="letter">Ь</div>' + '<div class="letter">Ю</div>' + '<div class="letter">Я</div>' );
    document.querySelector(".inc-gues").innerHTML = 'Неправильні літери: <span class="nums-inc">0/6</span>';

    btn_lang_en.classList.remove("active");
    btn_lang_en.classList.add("no-active");

    game();   
}

function en_game(){
    btn_lang_en.classList.remove("no-active");
    btn_lang_en.classList.add("active"); 

    guessed_word = getRandomWord(words_en);
    underlines = '';
    for( let i = 0; i < guessed_word.length; i++ ){
        underlines += '_';
    };
    game_word.innerHTML = underlines;

    document.querySelector(".letters").innerHTML = "";
    document.querySelector(".letters").insertAdjacentHTML( 'afterbegin',  '<div class="letter">A</div>' + '<div class="letter">B</div>' + '<div class="letter">C</div>' + '<div class="letter">D</div>' + '<div class="letter">E</div>' + '<div class="letter">F</div>' + '<div class="letter">G</div>' + '<div class="letter">H</div>' + '<div class="letter">I</div>' + '<div class="letter">J</div>' + '<div class="letter">K</div>' + '<div class="letter">L</div>' + '<div class="letter">M</div>' + '<div class="letter">N</div>' + '<div class="letter">O</div>' + '<div class="letter">P</div>' + '<div class="letter">Q</div>' + '<div class="letter">R</div>' + '<div class="letter">S</div>' + '<div class="letter">T</div>' + '<div class="letter">U</div>' + '<div class="letter">V</div>' + '<div class="letter">W</div>' + '<div class="letter">X</div>' + '<div class="letter">Y</div>' + '<div class="letter">Z</div>' );
    document.querySelector(".inc-gues").innerHTML = 'Incorect guesses: <span class="nums-inc">0/6</span>';

    btn_lang_ua.classList.remove("active");
    btn_lang_ua.classList.add("no-active");

    game();   
}


let lang = localStorage.getItem("lang");
if( lang == "ua"){
    ua_game();
}else{
    en_game();
}


btn_lang_ua.addEventListener('click', function(){
    if(btn_lang_ua.classList.contains("no-active")){
        ua_game();
        localStorage.setItem("lang", "ua");
    }
});

btn_lang_en.addEventListener('click', function(){
    if(btn_lang_en.classList.contains("no-active")){
        en_game();
        localStorage.setItem("lang", "en");
   }
});


function game(){
    let game_letters = document.querySelectorAll(".letter");    
    game_letters.forEach( function(el){      

    el.addEventListener( 'click',  function(){
        if( !el.classList.contains('remove') ){ 
            let letter = el.innerHTML;
            el.classList.add("remove"); 
            if( !(guessed_word.includes(letter)) ){
                nums_inc++;
                document.querySelector(".nums-inc").innerHTML = nums_inc + '/6';
                document.querySelector(hangman[nums_inc-1]).classList.add("opac");
                if( nums_inc == 6){
                    if(btn_lang_en.classList.contains("active")){
                        document.querySelector("body").insertAdjacentHTML('afterbegin', '<div class="window">' + '<div class="emodji">😪</div>' + '<div class="text-lose">Game Over!</div>' + '<div class="text-word">The correct word was: '+ guessed_word + '</div>' + '<div class="btn-block">' + '<button class="btn-play">PLAY AGAIN</button>' + '</div>' + '</div>');
                    }else{
                        document.querySelector("body").insertAdjacentHTML('afterbegin', '<div class="window">' + '<div class="emodji">😪</div>' + '<div class="text-lose">Ти не вгадав!</div>' + '<div class="text-word">Правильне слово: '+ guessed_word + '</div>' + '<div class="btn-block">' + '<button class="btn-play">ГРАТИ ЗНОВУ</button>' + '</div>' + '</div>');
                    }
                    document.querySelector(".box").classList.add("opac-50");
                    document.querySelector(".btn-lang").classList.add("opac-50");
                    document.querySelector(".btn-play").onclick = function(){
                        location.reload();
                    };
                };
            }else{
                underlines = add_letter( guessed_word, underlines, letter);
                game_word.innerHTML = underlines;
                if( underlines == guessed_word ){
                    if(btn_lang_en.classList.contains("active")){
                        document.querySelector("body").insertAdjacentHTML('afterbegin', '<div class="window">' + '<div class="emodji">😄</div>' + '<div class="text-lose">Congrats!</div>' + '<div class="text-word">You found the word: '+ guessed_word + '</div>' + '<div class="btn-block">' + '<button class="btn-play">PLAY AGAIN</button>' + '</div>' + '</div>');
                    }else{
                        document.querySelector("body").insertAdjacentHTML('afterbegin', '<div class="window">' + '<div class="emodji">😄</div>' + '<div class="text-lose">Вітання!</div>' + '<div class="text-word">Ти вгадав слово: '+ guessed_word + '</div>' + '<div class="btn-block">' + '<button class="btn-play">Грати знову</button>' + '</div>' + '</div>');
                    }
                    document.querySelector(".box").classList.add("opac-50");
                    document.querySelector(".btn-lang").classList.add("opac-50");
                    document.querySelector(".btn-play").onclick = function(){
                        location.reload();
                    } ; 
                };
            };
        };
    });
    });

};