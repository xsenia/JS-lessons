window.addEventListener('DOMContentLoaded', function() {
    'use strict';
   

    //counter
    function countTimer (deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerminutes = document.querySelector('#timer-minutes'),
            timerseconds = document.querySelector('#timer-seconds'),
            timerBlock = document.querySelector('#timer');
            
        function getTimeRemaining () {            
            let dateStop = new Date(deadline).getTime(),            
            dateNow = new Date().getTime(),            
            timeRemainning = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemainning % 60),
            minuts = Math.floor((timeRemainning / 60) % 60),
            hours = Math.floor(timeRemainning / 60 / 60),
            day = Math.floor(timeRemainning / 60 / 60 / 24); 

            if(hours < 10 && hours >= 0 ) {
                hours = '0' + hours;                
            }
            if(minuts < 10 && minuts >= 0) {
                minuts = '0' + minuts;
            }
            if(seconds < 10 && seconds >= 0) {
                seconds = '0' + seconds;
            }
            
            
            return {timeRemainning, hours, minuts, seconds }
        }

        function updateClock () {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerminutes.textContent = timer.minuts;
            timerseconds.textContent = timer.seconds; 
           

            if (timer.hours < 0) { 
                timerBlock.style.color = "red";
                timerHours.textContent = '00';
                timerminutes.textContent = '00';
                timerseconds.textContent = '00';  
            }
        }
            
        updateClock ();

    }
       
    setInterval(countTimer, 1000, '19 september 2019');




    //menu

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = document.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);        

        menuItems.forEach((elem) => {
            elem.addEventListener('click', handlerMenu);
        });



    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelectorAll('.popup-close');
        const popupContent = document.querySelector('.popup .popup-content');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                setTimeout((()=>{
                    popupContent.style.transform = `translate(-50px)`;
                }), 17);
                
            });
        });

        popupClose.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'none';
                popupContent.style.transform = `translate(-2000px)`;
            });
        });
    } 

    togglePopup();

    //scrollTo

    const scrollToAnimate = () => {

        let linkNav = document.querySelectorAll('[href^="#"]'),
        V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
        
        for (var i = 0; i < linkNav.length; i++) {
            linkNav[i].addEventListener('click', function(e) {
                e.preventDefault();

                let scrollWindow = window.pageYOffset, //текущая прокрутка
                    hash = this.href.replace(/[^#]*(.*)/, '$1'),  // к id элемента, к которому нужно перейти
                    top = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                    start = null;
                
                    requestAnimationFrame(step); 
                
                    function step(time) {
                        if (start === null) start = time;
                        let progress = time - start,                    
                            distance = (top < 0 ? Math.max(scrollWindow - progress/V, scrollWindow + top) : Math.min(scrollWindow + progress/V, scrollWindow + top));

                        window.scrollTo(0,distance);
                        if (distance != scrollWindow + top) {
                            requestAnimationFrame(step)
                        } else {
                            location.hash = hash  // URL с хэшем
                        }                    
                    }

            }, false);
        }
    };

    scrollToAnimate();


});