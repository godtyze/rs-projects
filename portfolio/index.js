import i18Obj from './translate.js';

const langEn = document.querySelector('.lang-en');
const langRu = document.querySelector('.lang-ru');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-wrapper');
const overlay = document.querySelector('.overlay');
const switchTheme = document.querySelector('.theme-switch');
const portfolioBtnsContainer = document.querySelector('.portfolio__btns');
const portfolioBtns = document.querySelectorAll('.portfolio__btns-item');
const portfolioImages = document.querySelectorAll('.portfolio__imgs-item');
const whiteThemeList = document.querySelectorAll('body,.nav-wrapper,.background-wrapper,.hamburger,.hamburger-line,.header__link-icon,.list-item__link,.lang,.hero__title, .hero__text, .btn,.section, .section-title,.skills__list-item,.portfolio__btns-item,.description-text,.price__cards-item-title,.price__cards-item-price,.contacts__container,.contacts__info-title,.form__input,.form__textarea,.footer__list-item,.footer__list-item-link,.socials__item-link,.theme-switch');
const vidWrapper = document.querySelector('div.video-wrapper');
const poster = document.querySelector('.poster');
const video = document.querySelector('video.video');
const videoBtn = document.querySelector('.video-btn');
const playIcon = document.querySelector('.play-icon');
const volumeIcon = document.querySelector('.volume-icon');
const progress = document.querySelector('.progress');
const volume = vidWrapper.querySelector('.volume');

let lang = localStorage.getItem('lang') || 'en';
let theme = localStorage.getItem('theme') || 'dark';

const setLocalStorage = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
}

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('theme') === 'white') {
        whiteThemeList.forEach((el) => el.classList.add('white'));
    }
    if (localStorage.getItem('lang') === 'ru') {
        langRu.classList.add('active');
        langEn.classList.remove('active');
        getTranslate(lang);
    }
}

window.addEventListener('load', getLocalStorage);

const toggleSwitchLang = (event) => {
    if (event.target.classList.contains('active') || event.target.classList.contains('lang-slash')) {
        return;
    }
    if (event.target.classList.contains('lang-ru')) {
        langEn.classList.remove('active');
        langRu.classList.add('active');
    } else {
        langRu.classList.remove('active');
        langEn.classList.add('active');
    }
    lang === 'en' ? lang = 'ru' : lang = 'en'
    getTranslate(lang);
}

const getTranslate = (lang) => {
    let dataList = document.querySelectorAll('[data-i18]');
    dataList.forEach((el) => {
        el.textContent = i18Obj[lang][el.dataset.i18];
        if (el.placeholder) {
            el.placeholder = i18Obj[lang][el.dataset.i18]
            el.textContent = '';
        }
    });
}

const themeClickHandler = () => {
    theme === 'dark' ? theme = 'white' : theme = 'dark';
    whiteThemeList.forEach((el) => el.classList.toggle('white'));
}

const toggleHamburgerMenu = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
}

const closeMenu = (event) => {
    if (event.target.classList.contains('list-item__link') || (event.target.classList.contains('overlay'))) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
    }
}

const togglePortfolioCategories = (event) => {
    if (event.target.classList.contains('portfolio__btns-item')) {
        if (event.target.classList.contains('active')) {
            return;
        }
        portfolioBtns.forEach((btn) => btn.classList.remove('active'));
        event.target.classList.add('active');
        portfolioImages.forEach((img, idx) => {
            img.style.backgroundImage = `url(./assets/images/${event.target.id}/${idx + 1}.jpg)`;
        });
    }
}

const toggleVideoStatus = () => {
    if (video.paused) {
        poster.style.opacity = '0';
        poster.style.pointerEvents = 'none';
        setTimeout(() => poster.style.display = 'none', 1000);
        video.play();
        playIcon.classList.toggle('pause');
        videoBtn.classList.toggle('active');
    } else {
        video.pause();
        playIcon.classList.toggle('pause');
        videoBtn.classList.toggle('active');
    }
}

const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;
    progress.style.background = `linear-gradient(
                  to right,
                  #bdae82 0%,
                  #bdae82 ${progress.value}%,
                  #c8c8c8 ${progress.value}%,
                  #c8c8c8 100%)`
    if (video.currentTime === video.duration) {
        playIcon.classList.remove('pause');
        videoBtn.classList.remove('active');
        video.currentTime = 0;
    }
}

const updateVolume = () => {
    video.volume = volume.value;
    if (video.volume !== 0) {
        volumeIcon.style.background = 'url(./assets/video/svg/volume.svg) no-repeat';
        volumeIcon.style.backgroundSize = 'contain';
    } else {
        volumeIcon.style.background = 'url(./assets/video/svg/mute.svg) no-repeat';
        volumeIcon.style.backgroundSize = 'contain';
    }
}

let curVol = 0;
const toggleVolumeButton = () => {
    if(video.volume !== 0) {
        volumeIcon.style.background = 'url(./assets/video/svg/mute.svg) no-repeat';
        volumeIcon.style.backgroundSize = 'contain';
        curVol = video.volume;
        video.volume = 0;
    } else if (volume.value > 0) {
        volumeIcon.style.background = 'url(./assets/video/svg/volume.svg) no-repeat';
        volumeIcon.style.backgroundSize = 'contain';
        video.volume = curVol;
    } else {
        return;
    }
}


langEn.addEventListener('click', toggleSwitchLang);
langRu.addEventListener('click', toggleSwitchLang);
hamburger.addEventListener('click', toggleHamburgerMenu);
nav.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
switchTheme.addEventListener('click', themeClickHandler);
portfolioBtnsContainer.addEventListener('click', togglePortfolioCategories);
playIcon.addEventListener('click', toggleVideoStatus);
video.addEventListener('click', toggleVideoStatus);
videoBtn.addEventListener('click', toggleVideoStatus);
poster.addEventListener('click', toggleVideoStatus);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', () => {
    video.currentTime = (progress.value * video.duration) / 100;
    updateProgress();
});
volume.addEventListener('input', updateVolume);
volumeIcon.addEventListener('click', toggleVolumeButton);
volume.addEventListener('input', function () {
    const value = this.value;
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value * 100}%, #c8c8c8 ${value * 100}%, #c8c8c8 100%)`
});
