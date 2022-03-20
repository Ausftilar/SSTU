// 'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //Modal

    const modal = document.querySelector('.header__modal'),
          modalActive = document.querySelector('.header__modal-descr');

    modal.addEventListener('click', () => {
        modalActive.classList.toggle('header__modal-descr_active');
    });

    //ModalForms

    const modalBtn = document.querySelector('.list__plus'),
          modalClose = document.querySelector('.modal-forms__close'),
          modalForms = document.querySelector('.modal-forms'),
          modalFormsBtn = document.querySelector('.modal-forms_btn');

    modalBtn.addEventListener('click', () => {
        modalForms.classList.add('modal-forms_active');
    });

    modalClose.addEventListener('click', () => {
        modalForms.classList.remove('modal-forms_active');
    });

    modalFormsBtn.addEventListener('click', () => {
        modalForms.classList.remove('modal-forms_active');
    });

    //Tabs

    let tabs = document.querySelectorAll('.list__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.list__wrapper_list');
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('list__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('list__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('list__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //FilmsDB

    const movieDB = {
        movies: [
            "Человек паук",
            "Шрек навсегда",
            "Джентельмены"
        ]
    };

    const movieList = document.querySelector('.list__wrapper_list'),
          addForm = document.querySelector('form.modal-forms__wrapper'),
          addInput = addForm.querySelector('[name=name]');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value;

        if (newFilm) {

            if (newFilm.length > 19) {
                newFilm = `${newFilm.substring(0, 20)}...`;
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
            tabs = document.querySelectorAll('.list__item');
        }

        e.target.reset();
    });

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <div class="list__item">${i + 1} ${film}
                    <div class="delete"></div>
                </div>
            `;
        });



        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                
                createMovieList(films, parent);
                tabs = document.querySelectorAll('.list__item');
            });
        });
    }

    createMovieList(movieDB.movies, movieList);
    tabs = document.querySelectorAll('.list__item');
    
    hideTabContent();
    showTabContent();
});