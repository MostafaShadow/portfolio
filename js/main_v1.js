
$(function () {

    $("body").css("overflow", "hidden");
    // Show Page Loading And Hide
    $('.loading-container').each(function () {
        if ($(this).is(':visible')) {
            $('.loading-container').delay(5000).fadeOut(100, function () {
                $('.loading-container').css({
                    display: 'none'
                });
                $('.all-element').fadeIn(100, function () {
                    $("body").css("overflow", "auto");
                    $('.all-element').css({ display: 'block' });
                    // run function typer
                    typerFunc();
                });
            });

        }
    });


    //   animate scroll from sections on click
    $(".ul-nav li").on("click", function () {
        $("body,html").animate({
            scrollTop: $('#' + $(this).data('offset')).offset().top
        }, 500);

    })
    // add class to active item section 
    $(".ul-nav li").on('click', function () {
        $(".ul-nav li").removeClass("active");
        $(this).addClass("active");
        $(".ul-nav span path").removeClass("active-svg");
        $(this).siblings().children().children().addClass("active-svg");
    });


    // fix add class active in home
    $(window).scroll(function () {
        if ($(window).scrollTop() > $("main").offset().top - 20) {
            $(".ul-nav li").removeClass("active");
            $(".ul-nav li.home").addClass("active");
            $(".ul-nav span path").removeClass("active-svg");
            $(".ul-nav li.home").siblings().children().children().addClass("active-svg");

        } else {
            $(".ul-nav li.home").removeClass("active");

        }
    })
    // scroll window to catch section
    $(window).scroll(function () {
        $(".section").each(function () {
            if ($(window).scrollTop() > $(this).offset().top - 20) {
                var sectionId = $(this).attr("id");
                $(".ul-nav li").removeClass("active");
                $(".ul-nav span path").removeClass("active-svg");
                var storgeDate = $('.ul-nav li[data-offset="' + sectionId + '"]')
                $(storgeDate).addClass('active');
                $(storgeDate).siblings().children().children().addClass("active-svg");
            }
        })
    });

    // toggle show  hide heder
    var lineOne = $(".line-one");
    var lineTwo = $(".line-two");
    var lineThree = $(".line-three");
    $(".bullets-container").on("click", function () {
        if ($(lineTwo).hasClass("visible")) {
            $("header").animate({ left: "0px" }, 100);
            $(lineTwo).removeClass("visible").addClass("hidden");
            $(lineOne).addClass("rotate-plus");
            $(lineThree).addClass("rotate-minus");
        }
        else {
            $("header").animate({ left: "-300px" }, 100);
            $(lineTwo).removeClass("hidden").addClass("visible");
            $(lineOne).removeClass("rotate-plus");
            $(lineThree).removeClass("rotate-minus");
        }
    });

    // change mode 
    var body = $("body");
    var containerToggle = $(".toggle");
    var toggle = $(".toggle span");

    $(containerToggle).on("click", function () {
        if ($(body).hasClass("dark")) {
            $(body).addClass("light").removeClass("dark");
            $(toggle).animate({ left: "22px" }, 50);

        } else {
            $(body).addClass("dark").removeClass("light");
            $(toggle).animate({ left: "0" }, 50);

        }
    });

    // run animation progress bar 
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $("#skills").offset().top - 300) {
            progressAnimation()
        }
    })

    //show item to hover projects
    $(".my-projects").hover(function () {
        $(this).find("a").animate({ bottom: "0px" }, 50);
    }, function () {
        $(this).find("a").animate({ bottom: "-40px" }, 50);
    });

    /** click Scrolling smooth */

    $('.btn-top').on('click', function () {
        $("html,body").animate({
            scrollTop: 0
        }, 2000);
    });
    //Show Icon Scrolling

    $(window).scroll(function () {
        if ($(window).scrollTop() > 1000) {
            $('.btn-top').fadeIn(300)
        }
        else {
            $('.btn-top').fadeOut(300)
        }
    })



    // create typer function
    function typerFunc() {
        let theText = $('.typer').data('text'),
            theTextLength = theText.length,
            n = 0;
        theTyper = setInterval(function () {
            $('.typer').each(function () {
                $(this).html($(this).html() + theText[n]);
            });
            n++;
            if (n >= theTextLength) {
                clearInterval(theTyper);
            }
        }, 200);
    }

    // animate progress bar 
    function progressAnimation() {
        $(".progress span").each(function () {
            $(this).animate({ width: $(this).data("progress") }, 1000)
        })
    }
});




const form = document.getElementById("my-form");
async function handleSubmit(event) {
    event.preventDefault();
    var statusError = document.getElementById("error-message");
    var statusResponse = document.getElementById("response-message");
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        showResponseMessage(statusResponse, statusError);
        form.reset()
    }).catch(error => {
        showErrorMessage(statusError, statusResponse);

    });
}
form.addEventListener("submit", handleSubmit)



function showErrorMessage(statusError, statusResponse) {
    statusError.style.display = "block";
    statusResponse.style.display = "none";
}
function showResponseMessage(statusResponse, statusError) {
    statusError.style.display = "none";
    statusResponse.style.display = "block";

}