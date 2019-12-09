app.open = function() {
    const imagens = ['img/facebook.png', 'img/android.png', 'img/chrome.png', 'img/firefox.png', 'img/html5.png', 'img/googleplus.png', 'img/twitter.png', 'img/windows.png'];
    const imagemCardBack = 'img/cross.png';

    for (i = 0; i < imagens.length; i++) {
        $("#tabuleiro").append("<div id='card" + (i) + "' class='card'>");
        $("#card" + i).append("<img class='front-card' src='" + imagens[i] + "'>");
        $("#card" + i).append("<img class='back-card'  src='" + imagemCardBack + "'>");
        $("#card" + i).clone().appendTo("#tabuleiro");
    }

    $(".back-card").hide();
};

var card1, card2, inicio;

app.startGame = function() {
    card1 = null;
    card2 = null;
    inicio = Date.now();

    $(".front-card").show();
    $(".back-card").hide();

    $("#tabuleiro").children().off("click");
    $("#tabuleiro").children().removeClass("fliped");

    cards = $("#tabuleiro").children();

    while (cards.length) {
        $("#tabuleiro").append(cards.splice(Math.floor(Math.random() * cards.length), 1));
    }
    setTimeout(flipAllCards, 3000);
};

flipAllCards = function flipAllCards() {
    $(".front-card").fadeOut("fast", "linear");
    $(".back-card").fadeIn("fast", "linear");
    $(".card").on("click", openCard);
}

openCard = function() {
    if ((card1 && card2) || $(this).hasClass("fliped")) {
        return;
    }
    $(this).addClass("fliped");
    if (card1 === null) {
        card1 = $(this);
        flipCard(card1);
    } else {
        card2 = $(this);
        flipCard(card2);

        if (card1.attr('id') !== card2.attr('id')) {

            setTimeout(() => {
                flipCard(card1);
                flipCard(card2);
                card1.removeClass("fliped");
                card2.removeClass("fliped");
                card1 = null;
                card2 = null;
            }, 1500);
        } else {
            card1 = null;
            card2 = null;
        }
        console.log($("#tabuleiro").children().length);
        console.log($(".fliped").length);
        if ($("#tabuleiro").children().length == $(".fliped").length) {
            setTimeout(alert("Tempo decorrido: " + (Date.now() - inicio) / 1000 + " segundos!!!"), 2000);
        }
    }

}

flipCard = function flipCard(card) {
    card.find(".front-card").slideToggle("fast");
    card.find(".back-card").slideToggle("fast");
}

app.open();