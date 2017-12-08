/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    const req = new XMLHttpRequest();
    const promise = new Promise(resolve => {
        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        req.responseType = 'json';
        req.onload = () => {
            resolve(req.response.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            }));
        };
        req.send();
    });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
