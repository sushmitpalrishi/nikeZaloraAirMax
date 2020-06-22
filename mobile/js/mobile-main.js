(function() {

    var body = document.getElementsByTagName("body")[0];
    var getStartedBtn = document.getElementById("tutorial-on");
    var mainCarouselSection = document.getElementsByClassName(".carousel-container")[0];
    var closeBtn = document.getElementById("close-btn");
    var closeBtn2 = document.getElementById("shop-close");

    var currentSlideIndex = 0,
        running = false,
        currentSlide, newSlide, mode, mouseOverVar, slideSelector, slideContainer, skuJSON, shopLinkHref;

    var positionValue = 100;
    var currentSlideIndexStore = [{ "headContainer": 0 }, { "bodyContainer": 0 }, { "legsContainer": 0 }, { "shoesContainer": 0 }];
    var imageCounter = 0;
    var imageCount = 78;

    window.onload = function(e) {
        function init() {

            loadDataFromJson();

        }

        init();

        function loadDataFromJson() {
            $.getJSON("json/productJson.json", function(json) {

                skuJSON = json;

                for (var key in skuJSON) {

                    if (skuJSON.hasOwnProperty(key)) {

                        for (var p = 0; p < skuJSON[key].length; p++) {
                            var carouselItemDiv = document.createElement("div");
                            carouselItemDiv.className = "carousel-item slideshow-slide";
                            carouselItemDiv.setAttribute('data-sku', skuJSON[key][p][p]);
                            var imageElementInsideDiv = document.createElement("img");
                            imageElementInsideDiv.onload = function(e) {                                
                                imageCounter++;
                                if(imageCounter >=imageCount){
                                    $('body').addClass("loaded");
                                    setContainerSize();
                                }                              
                            };
                            imageElementInsideDiv.src = "images/" + key + "/" + (p + 1) + ".png";
                            imageElementInsideDiv.alt = "";
                            imageElementInsideDiv.draggable = "false";
                            imageElementInsideDiv.className = "fluid carousel-img";

                            carouselItemDiv.appendChild(imageElementInsideDiv);

                            document.getElementById(key + "Container").appendChild(carouselItemDiv);
                        }

                    }
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////

                $('body').addClass("no-scroll");

                slideContainer = document.getElementsByClassName('slideshow');

                slideSelector = 0;

                numSlides = 0;

                shopLinkHref = document.getElementById("shopLink");


                for (var k = 0; k < slideContainer.length; k++) {
                    for (var j = 0; j < slideContainer[k].children.length; j++) {
                        if (j == 0) {
                            slideContainer[k].children[0].style.left = 0 + "%";
                        } else if (isEven(j)) {
                            slideContainer[k].children[j].style.left = positionValue + "%";
                        } else {
                            slideContainer[k].children[j].style.left = "-" + positionValue + "%";
                        }
                    }
                }

                document.getElementById("headContainerPrevBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('next', event.target.parentElement.parentElement.children[0]);
                }, false);

                document.getElementById("headContainerNextBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('prev', event.target.parentElement.parentElement.children[0]);
                }, false);

                document.getElementById("bodyContainerPrevBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('next', event.target.parentElement.parentElement.children[0]);
                }, false);

                document.getElementById("bodyContainerNextBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('prev', event.target.parentElement.parentElement.children[0]);
                }, false);


                document.getElementById("legsContainerPrevBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('next', event.target.parentElement.parentElement.children[0]);
                }, false);

                document.getElementById("legsContainerNextBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('prev', event.target.parentElement.parentElement.children[0]);
                }, false);


                document.getElementById("shoesContainerPrevBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('next', event.target.parentElement.parentElement.children[0]);
                }, false);

                document.getElementById("shoesContainerNextBtn").addEventListener("click", function(event) {
                    slideSelector = event.target.parentElement.parentElement.children[0].querySelectorAll(".slideshow-slide");
                    numSlides = slideSelector.length;
                    animateSlides('prev', event.target.parentElement.parentElement.children[0]);
                }, false);


                ////////////////////////////////////////////////////////////////////

                for (var i = 0; i < slideContainer.length; i++) {

                    var gestureVar = document.getElementsByClassName('slideshow')[i];

                    var hammerDetect = new Hammer(gestureVar);

                    hammerDetect.on("swipeleft", function(ev) {


                        slideSelector = ev.target.parentElement.parentElement.querySelectorAll(".slideshow-slide");
                        numSlides = slideSelector.length;
                        animateSlides('next', ev.target.parentElement.parentElement);

                    });

                    hammerDetect.on("swiperight", function(ev) {

                        slideSelector = ev.target.parentElement.parentElement.querySelectorAll(".slideshow-slide");
                        numSlides = slideSelector.length;
                        animateSlides('prev', ev.target.parentElement.parentElement);

                    });
                }


                /////////////////////////////////////////////////////////////////////////////////////                
                

                initiaTween = new TimelineLite();

                initiaTween.staggerFrom(".section-title", .4, { y: 30, opacity: 0 }, .2)
                    .from(".tout-copy", .4, { y: 30, opacity: 0 })
                    .from("#tutorial-on", .4, { y: 30, opacity: 0 });

                instructionTween = new TimelineLite({
                    paused: true,
                    onComplete: function() {



                        setTimeout(function() {

                            $('body').addClass("tutorial-on");
                            tutorialTween.play();
                        }, 1500);
                    }
                });
                instructionTween.from(".instructions-copy-wrap", .4, { opacity: 0 }).staggerFrom(".instruction-copy", .4, { y: 40, opacity: 0 }, .2);


                var swipeRightTween = new TimelineLite({ paused: true });
                swipeRightTween.to("#swipeRight", .8, { x: "0" })

                var swipeLeftTween = new TimelineLite({ paused: true });
                swipeLeftTween.to("#swipeLeft", .8, { x: "-50%", delay: 1 })

                var tutorialTween = new TimelineLite({ paused: true });
                tutorialTween.from(".swipe-hands", .2, {
                        opacity: 1,
                        onComplete: function() {

                            var d = this.target[0];
                            d.className += " swipe-right";
                        }
                    })
                    .from(".swipe-hands", 1, {
                        x: -40,
                        onComplete: function() {

                            var d = this.target[0];
                            d.className -= "swipe-right";
                            d.className += " swipe-hands";
                            swipeRightTween.play()

                        }
                    })
                    .to(".swipe-hands", 1, {
                        y: "200%",
                        delay: 0.5,
                        onComplete: function() {

                            var d = this.target[0];
                            d.className += " swipe-left";
                            swipeLeftTween.play()
                        }
                    })
                    .from(".swipe-hands", 1, {
                        x: 40,
                        onComplete: function() {

                            var d = this.target[0];
                            d.className -= "swipe-left";
                            d.className += " swipe-hands";
                            swipeLeftTween.play()
                        }
                    })
                    .from(".tutorial-btn", .4, { y: 30, opacity: 0, delay: 0.4 }).to(".swipe-hands", .8, { y: "1100%" }).to(".tutorial-btn", .4, { y: -5, scale: .95, delay: .4 }).to(".tutorial-btn", .4, { y: 0, scale: 1 })

                var mobileGetStartedTween = new TimelineLite({
                    paused: true,
                    onComplete: function() {
                        $('body').addClass("init");
                        instructionTween.play();
                    }
                });
                mobileGetStartedTween.to(".right-content", .4, { opacity: 0 }).to(".right-content", .2, { zIndex: 1, })

                var carouselActiveTween = new TimelineLite({ paused: true });
                carouselActiveTween.to(".complete-img", .4, { opacity: 0, zIndex: 1, delay: 1 }).to(".complete-img-container", .1, { zIndex: 1 })

                $("#tutorial-on").on("click touchend", function(e) {
                    e.preventDefault();

                    mobileGetStartedTween.play();
                })

                TweenLite.set("#shopLink", { display: "none" });
                closeBtn.addEventListener("click", function() {
                    $('body').removeClass("tutorial-on");

                    instructionTween.reverse();
                    carouselActiveTween.play();
                    TweenLite.set("#tutorial-on", { opacity: 0, visibility: "hidden", display: "none" })
                    document.getElementById("shopLink").style.display = "inline-block";

                    // timer initialise to show shop the look cta 
                    clearInterval(timerInterval);
                    startTimer(10); //set timer for 10sec interval;



                });

            });
        }


        // show-shop



        document.getElementById("show-shop").addEventListener("click", function() {
            $('body').addClass("show-shop-section");
        });

        closeBtn2.addEventListener("click", function() {

            $('body').removeClass("show-shop-section");

            // timer initialise to show shop the look cta 
            clearInterval(timerInterval);
            startTimer(10); //set timer for 10sec interval;

        })



        function isEven(n) {
            return n % 2 == 0;
        }

        function animateSlides(newMode, currentParent) {

            // timer initialise to show shop the look cta 
            clearInterval(timerInterval);
            startTimer(10); //set timer for 10sec interval;

            if (running) {
                return false;
            }
            running = true;

            for (var i = 0; i < currentSlideIndexStore.length; i++) {
                var nameCheckArray = Object.getOwnPropertyNames(currentSlideIndexStore[i]);
                if (nameCheckArray[0] == currentParent.id) {
                    currentSlideIndex = currentSlideIndexStore[i][currentParent.id];

                    break;
                }
            }



            mode = newMode;
            setTargets(newMode, currentParent);
            newSlide.style.left = mode === 'prev' ? '-100%' : '100%';
            currentSlide.style.left = '0%';
            $(newSlide).addClass("inactive");
            animate(newSlide, "newSlide");
            animate(currentSlide, "currentSlide");

            TweenLite.fromTo(".show-shop", 0.3, { x: -1 }, { x: 1, ease: RoughEase.ease.config({ strength: 8, points: 20, template: Linear.easeNone, randomize: false }), clearProps: "x" })

        }

        function setTargets(newMode, currentParent) {

            if (mode === "prev") {
                newSlideIndex = slideSelector[currentSlideIndex - 1] === undefined ? (numSlides - 1) : currentSlideIndex - 1;

            } else {
                newSlideIndex = slideSelector[currentSlideIndex + 1] === undefined ? 0 : currentSlideIndex + 1;
            }

            currentSlide = slideSelector[currentSlideIndex];

            newSlide = slideSelector[newSlideIndex];

        }

        function animate(slide, identifier) {


            if (mode == "prev") {
                if (identifier == "newSlide") {
                    TweenLite.to(slide, 0.5, { left: "0%", onUpdate: showUpdate, onComplete: showResult });
                } else {
                    TweenLite.to(slide, 0.5, { left: "100%", onUpdate: showUpdate, onComplete: showResult });
                }

            } else {

                if (identifier == "newSlide") {
                    TweenLite.to(slide, 0.5, { left: "0%", onUpdate: showUpdate, onComplete: showResult });
                } else {
                    TweenLite.to(slide, 0.5, { left: "-100%", onUpdate: showUpdate, onComplete: showResult });
                }


            }


        }

        function updateSkuID() {
            var hrefString = "&getSKU=";
            for (n = 0; n < currentSlideIndexStore.length; n++) {

                var nameCheckArray = Object.getOwnPropertyNames(currentSlideIndexStore[n]);
                var temp2 = document.getElementById(nameCheckArray[0]);
                var temp3 = temp2.children[currentSlideIndexStore[n][nameCheckArray[0]]];
                if ((n == 0) || (n == 1)) {
                    hrefString = hrefString + temp3.getAttribute('data-sku');

                } else {
                    hrefString = hrefString + "--" + temp3.getAttribute('data-sku');

                }


            }


            shopLinkHref.href = "https://www.zalora.sg/women/all-products/?brand=closet--zalora--mango--nike--river-island--something-borrowed--topshop--only--missguided--factorie--bysi--dorothy-perkins--miss-selfridge" + hrefString;
        }

        function showUpdate() {

        }

        function showResult() {


            $(currentSlide).addClass('inactive');
            newSlide.style.left = '0%';
            // clearInterval(animationInt);
            currentSlideIndex = newSlideIndex;

            for (var i = 0; i < currentSlideIndexStore.length; i++) {
                var nameCheckArray = Object.getOwnPropertyNames(currentSlideIndexStore[i]);
                if (nameCheckArray[0] == newSlide.parentElement.id) {
                    currentSlideIndexStore[i][newSlide.parentElement.id] = currentSlideIndex;
                }
            }



            running = false;
            hammerDetectFlag = false;
            updateSkuID();
        }



        function setContainerSize() {

            for (var i = 0; i < slideContainer.length; i++) {
                var eachContainer = slideContainer[i].querySelectorAll(".slideshow-slide");
                var container = slideContainer[i];

                for (var j = 0; j < eachContainer.length; j++) {
                    container.style.height = getComputedStyle(eachContainer[j].children["0"]).height;
                }

            }

            console.log("computed image height provided!");

        }


        window.onresize = function() {
            setContainerSize();
            $("canvas").width($(window).width());
        };

        // timer function for shop the look cta

        var timerInterval;

        function startTimer(duration) {
            var timer = 0;
            timerInterval = setInterval(function() {

                // call function if no action taken for the given duration
                if (timer++ == duration) {
                    // call the shop the look cta
                    body.classList.add("show-shop-section");
                    clearInterval(timerInterval);

                }

            }, 1000);
        }

        // timer function for shop the look cta end
    }


})();