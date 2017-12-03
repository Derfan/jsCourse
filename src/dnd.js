/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div');
    let options = {
        class: 'draggable-div',
        position: 'absolute',
        random(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        },
        width() {
            return this.random(20, 150) + 'px';
        },
        height() {
            return this.random(20, 150) + 'px';
        },
        positionTop() {
            return this.random(0, 100) + '%';
        },
        positionLeft() {
            return this.random(0, 100) + '%';
        },
        color() {
            return `rgb(${this.random(0, 256)}, ${this.random(0, 256)}, ${this.random(0, 256)})`;
        }
    };

    div.classList.add(options.class);
    div.style.position = options.position;
    
    div.style.width = options.width();
    div.style.height = options.height();

    div.style.top = options.positionTop();
    div.style.left = options.positionLeft();

    div.style.backgroundColor = options.color();

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('mousedown', (e) => {
        let coords = getCoords(target);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        let moveTo = (e) => {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        };
        moveTo(e);
        
        document.onmousemove = e => moveTo(e);

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };

        target.addEventListener('mouseup', () => document.onmousemove = null);
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
