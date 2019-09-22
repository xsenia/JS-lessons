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

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            body = document.querySelector('body');
        

        // btnMenu.addEventListener('click', () => {
        //     menu.classList.add('active-menu');
        //});

        body.addEventListener(('click'), (event) => {
            let target = event.target;

            if(target.closest('menu') && menu.classList.contains('active-menu')) { 
                if(target.tagName !== 'MENU') {
                    if(target.tagName === 'A'){ 
                        menu.classList.remove('active-menu');
                    }                
                }
            } else if (!target.closest('menu') && !target.closest('.menu')) {
                menu.classList.remove('active-menu');
            } if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            }
           
        });

    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        //const popupClose = document.querySelectorAll('.popup-close');
        const popupContent = document.querySelector('.popup .popup-content');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                setTimeout((()=>{
                    popupContent.style.transform = `translate(-50px)`;
                }), 17);
                
            });
        });
        //убрали, потому что см. popup.addEventListener
        // popupClose.forEach((elem) => {
        //     elem.addEventListener('click', () => {
        //         popup.style.display = 'none';
        //         popupContent.style.transform = `translate(-2000px)`;
        //     });
        // });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
                popupContent.style.transform = `translate(-2000px)`;
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                    popupContent.style.transform = `translate(-2000px)`;
                }
            }
            
        });
    } 

    togglePopup();

    //scrollTo

    const scrollToAnimate = () => {

        let linkNav = document.querySelectorAll('menu ul li a'),
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

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'), //кнопки табов
            tabContent = document.querySelectorAll('.service-tab'); //блоки с контентом

            //перебираем все табы, находить соответствующий и его показывать, остальные скрывать классом d-none
            const toggleTabContent = (index) => {
                for(let i=0; i<tabContent.length; i++) {
                    if(index === i){
                        tab[i].classList.add('active');
                        tabContent[i].classList.remove('d-none');
                    } else {
                        tab[i].classList.remove('active');
                        tabContent[i].classList.add('d-none');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                //1ЫЙ ВАРИАНТ
                //let target = event.target; //получаем элемент, на который кликнули

                // while(target !== tabHeader) {
                //     //проверка, что кликнули по табу:
                //     if(target.classList.contains('service-header-tab')){
                //         //проверяем на какой таб кликнули, находим один из всех
                //         tab.forEach((item,i) => {
                //             if(item === target){
                //                 //console.log(tabContent[i]); //в консоли показываем соответсвующий блок с контентом
                //                 toggleTabContent(i);
                //             }
                //         });
                //         return;
                //     }
                //     target = target.parentNode;
                // }

               //2-ОЙ ВАРИАНТ 
                let target = event.target; 
                target = target.closest('.service-header-tab'); //если у элемента нет этого класса, поднимается выше к его родителю, проверяет, есть ли там этот класс, если и там нет, то поднимается дальше и т.д. Если не нешел, то вернет null. Поднимается только вверх.
                
                if(target){                    
                    tab.forEach((item,i) => {
                        if(item === target){                            
                            toggleTabContent(i);
                        }
                    });
                }
                
            });

    };

    tabs();

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content');

        let dot = [];
        let portfolioDots = document.createElement('ul');
        
        portfolioDots.classList.add('portfolio-dots');
        slider.append(portfolioDots);
        
        for(let i=0; i<slide.length; i++) {
            let dotOne = document.createElement('li');
            dotOne.classList.add('dot');
            dot[i] = dotOne;
            portfolioDots.append(dotOne);
        }


        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3000);



    };

    slider();

    //slider carousel

    

    class sliderCarousel {
        constructor({
            main, 
            wrap, 
            next,
            prev,
            infinity = false,
            position = 0,
            slidesToShow = 3
        }) {
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = document.querySelector(wrap).children;
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.options = {
                position,
                infinity,
                widthSlide: Math.floor(100/this.slidesToShow)
            };
        }

        init(){
            //console.log(this.slides);
            this.addGloClass();
            this.addStyle();
            if(this.prev && this.next) {
                this.controlSlider();
            } else {
                this.addArrow();
                this.controlSlider();
            }
        }

        addGloClass() {
            this.main.classList.add('glo-slider');
            this.wrap.classList.add('glo-slider__wrap');
            for (const item of this.slides) {
                item.classList.add('glo-slider__item');
            }
        }

        addStyle() {
            const style = document.createElement('style');
            style.id = 'sliderCarousel-style';
            style.textContent = `
                .glo-slider {
                    overflow: hidden;
                }
                .glo-slider__wrap {
                    display: flex;
                    transition: transform .5s;
                    will-change: transform;
                }
                .glo-slider__item {
                    flex: 0 0 ${this.options.widthSlide}%;
                    margin: auto 0;
                }
                .companies .companies-hor-item {
                    margin: 0;
                }
            `;
            document.head.appendChild(style);
        }   

        controlSlider() {
            this.prev.addEventListener('click', this.prevSlider.bind(this));
            this.next.addEventListener('click', this.nextSlider.bind(this));
        }

        prevSlider() {
            if (this.options.infinity || this.options.position > 0) {
                --this.options.position;
                console.log('this.options.position: ', this.options.position);
                if (this.options.position < 0) {
                    this.options.position = this.slides.length - this.slidesToShow;
                }
                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
            
        }

        nextSlider() {
            if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
                ++this.options.position;
                console.log('this.options.position: ', this.options.position);
                
                if(this.options.position > this.slides.length - this.slidesToShow) {
                    this.options.position = 0;
                } 
                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        addArrow() {
            this.prev = document.createElement('button');
            this.next = document.createElement('button');

            this.prev.className = 'glo-slider__prev';
            this.next.className = 'glo-slider__next';

            this.main.appendChild(this.prev);
            this.main.appendChild(this.next);

        }


    }


    const options = {
        main: '.companies-wrapper',
        wrap: '.companies-hor',
        prev: '#test-left',
        next: '#test-right',
        slidesToShow: 4,
        infinity: true
    }
    const carousel = new sliderCarousel(options);
    carousel.init();



    const changeImg = () => {
        const img = document.querySelectorAll('#command img');

        img.forEach((elem) => {
            let imgSrc = elem.src;
            elem.addEventListener('mouseenter', (event) => {
                event.target.src = event.target.dataset.img;
            });
            elem.addEventListener('mouseout', (event) => { 
                event.target.src = imgSrc;
            });
        });
    }

    changeImg();

    const validator = () => {
        const input = document.querySelectorAll('.calc-block input');
        input.forEach((elem) => {
            elem.setAttribute('type', 'text');
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/\D/g, '');
            });
        });
        
    }

    validator();


    //calculator
    const calc = (price = 100) => {
        const caclBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,            
                squareValue = +calcSquare.value;
                // console.log('squareValue: ', !!squareValue); - так выведет true / false
                // console.log('typeValue: ', !!typeValue);
            
            if (calcCount.value > 1 ) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }


            totalValue.textContent = total;
        };

        caclBlock.addEventListener('change', (event) => {
            const target = event.target;
            // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
            //     console.log('test');
            // }
            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount ) {
               countSum();
            }

        });


    };

    calc(100);




});