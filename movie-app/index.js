let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=93d4286ea1fdbc879a03b6610b3b5928';
const input = document.querySelector('.search');
const main = document.querySelector('.main');
const form = document.querySelector('form');

async function getData() {
    let res = await fetch(url);
    let data = await res.json();
    renderData(data.results);
}

getData();

function renderData(data) {
    if (data.length > 0) {
        data.forEach(({poster_path: imgSrc, title, overview, vote_average: score}) => {
            const poster = createPoster(imgSrc, title);
            const movieInfo = createMovieInfo(title, score);
            const movieOverview = createMovieOverview(overview);
            const movie = createWrapper('div', 'movie', [poster, movieInfo, movieOverview]);
            main.append(movie);
        });
    } else {
        const img = document.createElement('img');
        img.src = './assets/404.gif';
        img.alt = '404 error';
        img.style.maxWidth = '500px';
        img.style.width = '100%';
        img.style.alignSelf = 'center';
        main.append(img);
    }
}

function createPoster(src, alt) {
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w1280${src}`;
    img.alt = alt;

    if (src === null) {
        img.src = './assets/404.gif';
        img.alt = '404 error';
    }

    return img;
}

function createWrapper(tag, className, [...children]) {
    const wrapper = document.createElement(tag);
    wrapper.classList.add(className);
    wrapper.append(...children);
    return wrapper;
}

function createMovieInfo(title, score) {
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = title;

    const movieScore = document.createElement('p');
    movieScore.classList.add('movie-score', `${getScoreColorClass(score)}`);
    movieScore.textContent = score;

    return createWrapper('div', 'movie-info', [movieTitle, movieScore]);
}

function createMovieOverview(overview) {
    const header = document.createElement('h3');
    header.classList.add('overview-header');
    header.textContent = 'Overview';

    const movieOverview = document.createElement('p');
    movieOverview.classList.add('overview-text');
    movieOverview.textContent = overview;

    return createWrapper('div', 'overview', [header, movieOverview]);
}

function getScoreColorClass(score) {
    return score > 8 ? 'green' :
        score < 5 ? 'red' : 'orange'
}

document.addEventListener('DOMContentLoaded', () => input.focus());
form.addEventListener('submit', (event) => {
    event.preventDefault();
    url = `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=127e8707582903e0aaa823a521ecd1b8`;

    if (input.value) {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        getData();
    }
});
