console.log("DOM loaded");

const Slider = function (elemSelector) {
    this.currentSlide = 0;
    this.sliderSelector = elemSelector;
    this.elem = null;
    this.slider = null;
    this.slides = null;
    this.prev = null;
    this.next = null;
    this.dots = [];

    this.generateSlider();
}

Slider.prototype.generateSlider = function () {

    //pobieranie elementu który zmienia na slider
    this.slider = document.querySelector(this.sliderSelector);
    this.slider.classList.add('slider');

    //tworzenie konteneru dla slajdów
    const slidesCnt = document.createElement('div');
    slidesCnt.classList.add('slider-slides-cnt');

    //pobieramy element slajdów
    this.slides = this.slider.children;

    //to jest żywa kolekcja, więc przy przeniesieniu każdego slajda
    //jej długość maleje
    while (this.slides.length) {
        this.slides[0].classList.add('slider-slide');
        //jeżeli element appendujemy do innego elementu
        //to tak jakbyśmy go usuwali z tej kolekcji
        //bo jeden element nie może być równocześnie w 2 miejscach
        slidesCnt.appendChild(this.slides[0]);
    }

    ///musimy na nowo pobrać slajdy, bo powyższa kolekcja jest już pusta
    this.slides = slidesCnt.querySelectorAll('.slider-slide');

    //wygenerowaliśmy kontener ze slajdami, wstawiamy go więc do slidera
    this.slider.appendChild(slidesCnt);

    this.createPrevNext();
    this.createDots();
}

Slider.prototype.createPrevNext = function () {
    this.prev = document.createElement('button');
    this.prev.type = "button";
    this.prev.innerText = "Poprzedni slide";
    this.prev.classList.add('slider-button');
    this.prev.classList.add('slider-button-prev');
    // this.prev.addEventListener('click', this.slidePrev.bind(this));

    this.next = document.createElement('button');
    this.next.type = "button";
    this.next.innerText = "Następny slide";
    this.next.classList.add('slider-button');
    this.next.classList.add('slider-button-next');
    // this.next.addEventListener('click', this.slideNext.bind(this));

    const nav = document.createElement('div');
    nav.classList.add('slider-nav');
    nav.setAttribute('aria-label', 'Slider prev next');
    nav.appendChild(this.prev);
    nav.appendChild(this.next);
    this.slider.appendChild(nav);
}

Slider.prototype.createDots = function () {
    const ulDots = document.createElement('ul');
    ulDots.classList.add('slider-dots');
    ulDots.setAttribute('arial-label', 'Slider pagination');

    // tworzenie pętli w ilości liczby slajdów
    for (let i = 0; i < this.slides.length; i++) {
        /*
            Tworzenie kazdorazowo LI z buttonem kazdy button
            po kliknieciu zmieni slajd za pomoca metody changeSlide()
        */

        const li = document.createElement('li');
        li.classList.add('slider-dots-element');

        const btn = document.createElement('button');
        btn.classList.add('slider-dots-button');
        btn.type = "button";
        btn.innerText = i + 1;
        btn.setAttribute('aria-label', 'Set slide ' + (i + 1));

        btn.addEventListener('click', function () {
            this.changeSlide(i);
        }.bind(this));

        li.appendChild(btn);

        ulDots.appendChild(li);

        // wrzucenie przycisku do wspolnej tablicy
        this.dots.push(li);
    }

    this.slider.appendChild(ulDots);
}

const slide = new Slider('#slider1');