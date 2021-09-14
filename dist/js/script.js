let faqDl = document.querySelectorAll('dl');

faqDl.forEach(elem => {
    var faqOpen = elem;
    faqOpen.onclick = function (event) {
        let target = event.target;
        if (target.tagName == 'DT') {
            this.classList.toggle('active')
        }
    }
})

let popup_links = document.querySelectorAll('#popup-link');

popup_links.forEach(elem => {
    var popup_link = elem;
    popup_link.addEventListener("click", openPopup);

    function openPopup(event) {
        event.preventDefault();

        let popup = document.querySelector('.popup');
        popup.classList.add('active-popup');

        let body = document.querySelector('body');
        body.classList.add('body-disabled')

        let close = document.querySelector('.close');
        close.onclick = function () {
            popup.classList.remove('active-popup');
            body.classList.remove('body-disabled');

            let link = document.querySelector('.link');
            link.classList.add('remove-animation')
        }

        popup.onclick = function (event) {
            let link = document.querySelector('.link');
            link.classList.add('remove-animation')
            body.classList.remove('body-disabled');

            let target = event.target;
            if (target.classList.contains('popup-main')) {
                popup.classList.remove('active-popup');
            }
        }
    }
})


let menu_burger = document.querySelector('.menu-burger');

menu_burger.onclick = function () {
    let open_menu = document.querySelector('.menu-mobile');
    open_menu.classList.toggle('open-menu');

    let body = document.querySelector('body');
    body.classList.toggle('body-overflow');

    let main_screen = document.querySelector('.main-screen');
    main_screen.classList.toggle('header-green')
};

function sendEmail() {
    var email = $("#email");
    var body = $("#body");

    if (mailTest() && isNotEmpty(body)) {
        $('.popup__body').addClass('sending');
        $.ajax({
            url: 'sendmail.php',
            method: 'POST',
            dataType: 'json',
            data: {
                email: email.val(),
                body: body.val()
            },
            success: function (response) {
                $('#form-popup')[0].reset();
                $('.popup__body').removeClass('sending');
                $('.result').text("Запит відправлено успішно");

                function hidePopup() {
                    $('.popup').removeClass('active-popup');
                    $('.result').text("");
                }
                setTimeout(hidePopup, 2000);
            }
        });

    }
}

function mailTest() {
    var email_value = $('#email').val();
    var email = $("#email");
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var result = $('.result');
    if (testEmail.test(email_value)) {
        email.css('border', '');
        result.text("").removeClass('valid-email');
        return true
    } else {
        email.css('border', '1px solid rgb(240, 101, 101)');
        result.text("Вкажіть коректну адресу електронної пошти").addClass('valid-email');
        return false; 
    }
}


function isNotEmpty(body) {
    body = $('#body')
    if (body.val() == "") {
        body.css('border', '1px solid rgb(240, 101, 101)');
        return false;
    } else
        body.css('border', '');

    return true;
}