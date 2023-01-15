$(document).ready(function () {
    $(".menu-toggle").on("click", function () {
        var topVal = 45;
        if ($(this).hasClass("active")) {
            topVal = -980;
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
        $("nav").stop().animate(
            {
                top: topVal,
            },
            600
        );
        $("nav ul li a").click(function () {
            $(".menu-toggle").removeClass("active");
            $("nav").stop().animate(
                {
                    top: -980,
                },
                600
            );
        });
    });

    $("#show-password").change(function () {
        $(this).prop("checked")
            ? $("#password, #confirmPass").prop("type", "text")
            : $("#password, #confirmPass").prop("type", "password");
    });
});
