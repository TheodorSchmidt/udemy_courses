/* Задания на 1 урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 


Задания на 2 урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту 

*/

'use strict';

//window
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const addform = document.querySelector('form.add'); 
    const inp = addform.querySelector('.adding__input');
    const ch = addform.querySelector('[type="checkbox"]');
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list');

    const deleteAdv = (arr) => {
        adv.forEach(item => {
            item.remove();
        });    
    };
    
    const makeChanges = () => {
        genre.textContent = "Трагедия";
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    
    const sortArr = (arr) => {
        arr.sort();
    };

    function printMovies(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                printMovies(films, parent);
            });
        });
    }

    deleteAdv(adv); 

    makeChanges();
    
    printMovies(movieDB.movies, movieList);
    
    btn.addEventListener('click', (e) =>  { 
        e.preventDefault();
        let text = inp.value;
        const fl = ch.checked;
        if (text != '') {
            if (text.length > 21) {
                text = text.substr(0, 21) + '...';
            }
            movieDB.movies.push(text);
            if (fl == true) {
                console.log('Фильм добавлен в список любимых');
            }
            printMovies(movieDB.movies, movieList);
        }
    });
});
