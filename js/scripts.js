/**
 * i18n language toggle: Spanish is the default (authored in index.html) and the
 * fallback. English overrides live in EN_DICT below, keyed by the elements'
 * data-i18n (text), data-i18n-html (inner HTML) and data-i18n-ph (placeholder)
 * attributes. Missing keys fall back to the cached Spanish. No persistence:
 * every load starts in Spanish. The RSVP form's name/value contract is untouched.
 */
var EN_DICT = {
    "nav.intro": "Purpose",
    "nav.wedding": "The Wedding",
    "nav.instagram": "Share the memories",
    "nav.network": "Our Network",
    "nav.bogota": "Discover Bogota",
    "nav.place": "Venue",
    "inv.title": "We're Getting Married!",
    "inv.body": "The date is June 26th, 2027, in Bogotá, Colombia.",
    "intro.header": "Purpose",
    "intro.body": "Convinced of the network of affection that sustains and drives us, we want to celebrate with all of you the joy of finding one another and coming together. It will be a time to look into each other's eyes, laugh and dance. A rite that will nourish the seeds of our shared project — one we build every day as a couple and that grows stronger with the love of you all, our families and friends.",
    "events.header": "For the Day of the Event",
    "events.date": "June 26th",
    "events.wedding": "The Wedding",
    "events.body": "It will be a civil marriage. A small ceremony, followed by dinner and a great night of dancing.",
    "events.important": "Important",
    "dc.title": "Get dressed up (Time to shine!)",
    "dc.dress.h": "Dress code suggestion",
    "dc.dress.p": "For those who like to play with their creativity and setting, the dress code is just the formality of a ceremonial rite. For those who prefer a direct message: the suggestion is \"evening cocktail\" attire. There is no restriction on color or fabric.",
    "dc.dance.h": "Let's dance!",
    "dc.dance.p": "Colombian culture is famous for its dancing. Our celebration echoes that tradition and includes a big party. We don't expect you to be as passionate about dancing as the Salazar Rivera family, but in case you'd like to practice a few steps, check out these videos of <a href=\"https://www.youtube.com/watch?v=tE18rzWcnBE\">salsa</a> and <a href=\"https://www.youtube.com/watch?v=A9YyCsxVXeA\">merengue</a>.",
    "dc.intl.h": "An international network",
    "dc.intl.p": "For those who don't speak Spanish, here's a video with some <a href=\"https://youtu.be/hyLl_0d0EBw\">words and phrases</a>, and the same for those who don't know <a href=\"https://youtu.be/Z6GGAQOMX8c\">English</a>. That way you'll meet many people from all over the world and better understand why we love you all so much.",
    "dc.fiebre.h": "Yellow Fever",
    "dc.fiebre.p": "If you are travelling to Colombia from abroad, you may need the <strong>yellow fever</strong> vaccine. The vaccine must be given <strong>at least 10 days before</strong> travelling to be valid. We recommend checking the current restrictions and requirements with your doctor and the health authorities before flying. You can find more information <a href=\"https://www.cancilleria.gov.co/tramites_servicios/apostilla_legalizacion/requisitos-ingreso-salida-pais\" target=\"_blank\" rel=\"noopener\">here</a>.",
    "rec.title": "Recommendations",
    "rec.aloj.h": "Lodging",
    "rec.aloj.p": "Here are some lodging options near the celebration venue. We recommend booking in advance to secure availability.<br><a href=\"https://maps.app.goo.gl/huzhYvEQ9vQMxksN8\" target=\"_blank\" rel=\"noopener\">Suggested hotel</a> &middot; <a href=\"https://www.airbnb.com/wishlists/1629781079\" target=\"_blank\" rel=\"noopener\">Apartments</a>",
    "rec.trans.h": "Transportation",
    "rec.trans.p": "To reach Bogota by air, fly into El Dorado Airport. Around the city you can use the following ride-hailing apps.<br><a href=\"https://www.uber.com/\" target=\"_blank\" rel=\"noopener\">Ride-hailing app</a>",
    "rec.rest.h": "Restaurants/Tourism",
    "rec.rest.p": "Some of our favorite restaurants and iconic spots so you can enjoy your stay beyond the celebration. There are options for every taste and budget.<br><a href=\"https://maps.app.goo.gl/iyppq3msP4KYpF54A\" target=\"_blank\" rel=\"noopener\">This is a lovely list full of restaurants and tourist spots.</a> &middot;",
    "rec.fuera.h": "Outside Bogota",
    "rec.fuera.p": "If you'd like to make the most of your trip, here are some recommendations for destinations outside Bogota. Towns, nature and experiences just a few hours from the city.<br><a href=\"https://maps.app.goo.gl/ZxDHNXU4kiuN9wQ39\" target=\"_blank\" rel=\"noopener\">Nearby destinations</a>",
    "ig.h": "A picture is worth a thousand words!",
    "ig.p": "Help us keep our memories! <a href=\"https://immichnova.ddns.net/share/b9PmJl9elZiUcAgdE9alq-BOV1BYUbrjJqjNW_QOh7bN-vl6JgPJkIVdE3pyn0-_QA8\" target=\"_blank\">Upload and view them on our server!</a>",
    "footer.p": "Made by Adrián with lots of <span class=\"fa fa-heart pulse2\"></span> for Valentina and all our guests. Illustrations by Laura Camila Suarez Rodríguez and logo by Juan Carlos Zeledón",
    "network.h": "Our Network!",
    "video.p": "2600 Meters Closer to the Stars",
    "map.h": "How do I get to the venue?",
    "map.soon": "We'll confirm the venue soon.",
    "map.confirm": "",
    "map.contact": "Contact",
    "map.viewmap": "View Map",
    "map.rec": "Recommendations",
    "rsvpm.h": "Thank You So Much",
    "rsvpm.p": "We're so excited that you'll be joining us.",
    "rsvp.h": "CONFIRM YOUR ATTENDANCE",
    "rsvp.p": "We'd appreciate it if you could confirm before December 1st, 2026. Add all the details so you can enjoy the event to the fullest!",
    "rsvp.ph.email": "Your email",
    "rsvp.ph.nombre": "Your full name",
    "rsvp.ph.codigo": "Invitation code (see your invitation)",
    "rsvp.ph.musica": "A song you'd like to dance to",
    "rsvp.ph.restr": "Dietary restrictions",
    "rsvp.comida.prompt": "Choose your protein",
    "rsvp.comida.carne": "Beef",
    "rsvp.comida.pollo": "Chicken",
    "rsvp.comida.veg": "Vegetarian",
    "rsvp.trago.prompt": "Your drink of choice",
    "rsvp.trago.vblanco": "White Wine",
    "rsvp.trago.vtinto": "Red Wine",
    "rsvp.trago.cerveza": "Beer",
    "rsvp.trago.ginebra": "Gin",
    "rsvp.submit": "READY TO PARTY"
};

$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "35px 0"
                });
                $('header .member-actions').css({
                    "top": "26px",
                });
                $('header .navicon').css({
                    "top": "34px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "50px 0"
                });
                $('header .member-actions').css({
                    "top": "41px",
                });
                $('header .navicon').css({
                    "top": "48px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });


    /********************** Toggle Map Content **********************/
    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    // Localized add-to-calendar content. Spanish is the default/fallback; the calendar
    // is rebuilt on language toggle so the button label, event title and description
    // match the active language. Date/time and address (proper noun) never change.
    var CAL_I18N = {
        es: {
            label: "Agrégalo a tu calendario",
            title: "Boda de Valentina y Adrián",
            description: "Nos emociona muchisimo poder verte en el evento! Si tienes alguna duda contactanos!"
        },
        en: {
            label: "Add it to your calendar",
            title: "Valentina and Adrián's Wedding",
            description: "We're so excited to see you at the event! If you have any questions, contact us!"
        }
    };

    function renderCalendar(lang) {
        var c = CAL_I18N[lang] || CAL_I18N.es;
        var myCalendar = createCalendar({
            options: {
                class: '',
                id: ''
            },
            data: {
                title: c.title,
                start: new Date('Jun 26, 2027 17:00'),
                end: new Date('Jun 27, 2027 03:00'),
                address: "Cra. 7 #22-9, Santa Fé, Bogotá, Colombia",
                description: c.description
            }
        });
        $('#add-to-cal').html(myCalendar);
        // ouical hardcodes the Spanish label; override it with the active language.
        $('#add-to-calendar-label').html('<i class="fa fa-calendar"></i>&nbsp;&nbsp; ' + c.label);
    }

    renderCalendar('es');


    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>Un momento!</strong> Estamos guardando tu confirmación.'));
        var validCodes = [
            '01dd565b7c7a7a742792da478fd40e7a', // 990427
            '923c8638360b525238cbaf92508f7092', // 920427
            'ffcb13ec2d56f158fbd744a56de77de9', // 950909
            'cbee0d6d7663efd6e0c99b42fdb4ed41'  // 257515
        ];
        if (validCodes.indexOf(MD5($('#codigo_invitacion').val())) === -1) {
            $('#alert-wrapper').html(alert_markup('danger', '<strong>Lo sentimos!</strong> Tu código de invitación no es correcto.'));
        } else {
            $.post('https://script.google.com/macros/s/AKfycbzc6VDDRYmpUxELVh2MF07CbakkEeA3RNmU02HMzSZbMXjiZEHdBCjF_xw8gOAw2w7U9w/exec', data)
                .done(function (data) {
                    console.log(data);
                    if (data.result === "error") {
                        $('#alert-wrapper').html(alert_markup('danger', data.message));
                    } else {
                        $('#alert-wrapper').html('');
                        $('#rsvp-modal').modal('show');
                    }
                })
                .fail(function (data) {
                    console.log(data);
                    $('#alert-wrapper').html(alert_markup('danger', '<strong>Lo sentimos!</strong> Hubo un problema con el servidor.'));
                });
        }
    });

    /********************** Language toggle (ES default / EN) **********************/
    function applyLanguage(lang) {
        $('[data-i18n]').each(function () {
            var $el = $(this);
            if ($el.data('i18nEs') === undefined) { $el.data('i18nEs', $el.text()); }
            var k = $el.attr('data-i18n');
            $el.text(lang === 'en' && EN_DICT[k] ? EN_DICT[k] : $el.data('i18nEs'));
        });
        $('[data-i18n-html]').each(function () {
            var $el = $(this);
            if ($el.data('i18nHtmlEs') === undefined) { $el.data('i18nHtmlEs', $el.html()); }
            var k = $el.attr('data-i18n-html');
            $el.html(lang === 'en' && EN_DICT[k] ? EN_DICT[k] : $el.data('i18nHtmlEs'));
        });
        $('[data-i18n-ph]').each(function () {
            var $el = $(this);
            if ($el.data('i18nPhEs') === undefined) { $el.data('i18nPhEs', $el.attr('placeholder')); }
            var k = $el.attr('data-i18n-ph');
            $el.attr('placeholder', lang === 'en' && EN_DICT[k] ? EN_DICT[k] : $el.data('i18nPhEs'));
        });
        renderCalendar(lang);
        document.documentElement.lang = lang;
        $('.lang-es').toggleClass('active', lang === 'es');
        $('.lang-en').toggleClass('active', lang === 'en');
    }
    $(document).on('click', '.lang-es', function (e) { e.preventDefault(); applyLanguage('es'); });
    $(document).on('click', '.lang-en', function (e) { e.preventDefault(); applyLanguage('en'); });

});

/********************** Extras **********************/

// Google map
function initMap() {
    var location = {lat: 4.6082548, lng: -74.0707352};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: location,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initBBSRMap() {
    var la_fiesta = {lat: 20.305826, lng: 85.85480189999998};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: la_fiesta,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: la_fiesta,
        map: map
    });
}

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}

// MD5 Encoding
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};