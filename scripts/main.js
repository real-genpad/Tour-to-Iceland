$(document).ready(function () {

    const menuItem = $('.menu-item a');
    const gallerySlider = $('.gallery-slider');
    const form = $('.order-form');
    const name = $('#name');
    const phone = $('#phone');
    const url = 'https://testologia.site/checkout';
    const gratitude = $('.gratitude');
    const order = $('.order');
    const mobileWidth = 375;
    const gratitudeButton = $('.gratitude-button');

    $(window).on('resize', function (e) {
        const target = e.target;
        if (mobileWidth <= target.offsetWidth) {
            gratitudeButton.text('Хорошо')
        } else {
            gratitudeButton.text('Вернуться на главную')
        }
    });

    menuItem.on('click', function (event) {
        const section = event.target.getAttribute('data-id');
        $(`.${section}`)[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    $('.main-button').on('click', function () {
        $(".order")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    })

    $('.scroll-to-video').on('click', function () {
        $(".movie")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    })

    $('#burger-icon').on('click', function (e) {
        $('#menu').addClass('open');
    });

    $('#menu').find('*').on('click', function () {
        $('#menu').removeClass('open');
    });

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.main-video').on('click', function (e) {
        $('.movie').css('background', '#2c2c2c');
        $('.main-video').css('display', 'none')
        $('iframe').css('display', 'block');
    });

    $('.program-items').slick({
        prevArrow: $('.program-button-prev'),
        nextArrow: $('.program-button-next'),
        adaptiveHeight: false,
    });

    $('.reviews-items').slick({
        prevArrow: $('.review-button-prev'),
        nextArrow: $('.review-button-next'),
        infinite: false
    });

    gallerySlider.slick({
        prevArrow: '<button class="slick-prev" ><img src="images/leftGallery.png" alt="arrow"></button>',
        nextArrow: '<button class="slick-next" ><img src="images/rightGallery.png" alt="arrow"></button>',
        dots: true,
        arrows: true,
    });

    $('.gallery-images_1023').slick({
        prevArrow: '<button class="slick-prev" ><img src="images/leftGallery.png" alt="arrow"></button>',
        nextArrow: '<button class="slick-next" ><img src="images/rightGallery.png" alt="arrow"></button>',
        dots: true,
        arrows: true,
    });

    gallerySlider.magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {enabled: true}
    });

    phone.inputmask({"mask": "+7(999) 999-9999"});

    form.submit(function (event) {
        event.preventDefault();

        const form = $(this);
        let selectedPersons = $("input[name='persons']:checked").val();

        $('.error-input').hide();

        name.css('border-color', '#C50303FF')
        phone.css('border-color', '#C50303FF')
        let hasError = false;

        if (!name.val()) {
            name.next().show();
            name.css({'border': '1px solid #C50303FF'})
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css({'border': '1px solid #C50303FF'})
            hasError = true;
        }
        if (!hasError) {
            let data = {
                persons: selectedPersons,
                name: name.val(),
                phone: phone.val()
            };

            $.ajax({
                method: "POST",
                url: url,
                data: data
            })
                .done(function (message) {
                    if (message.success === 1) {
                        gratitude.css('display', 'block');
                        if (mobileWidth <= window.innerWidth) {
                            gratitudeButton.text('Хорошо')
                        } else {
                            gratitudeButton.text('Вернуться на главную')
                        }
                        order.addClass('show-overlay');
                        form[0].reset();
                        name.css('border-color', '#fff');
                        phone.css('border-color', '#fff');
                    } else {
                        alert('Возникла ошибка при оформлении заказа');
                    }
                });
        }
    });

    gratitudeButton.on('click', function () {
        if (gratitude.css('display', 'block')) {
            gratitude.css('display', 'none');
            order.removeClass('show-overlay');
        }
    })

    $('.gratitude-cancel').on('click', function () {
        if (gratitude.css('display', 'block')) {
            gratitude.css('display', 'none');
            order.removeClass('show-overlay');
        }
    })

});
