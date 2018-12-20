'use strict';

(function () {
  // Высота острия главного пина +
  var PIN_MAIN_HEIGHT_POINTER = 19;

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Контейнер формы фильтрации
  var mapFilters = document.querySelector('.map__filters-container');

  // Главный Pin +
  var pinMain = document.querySelector('.map__pin--main');

  // Контейнер Div Пинов на карте
  var pinsContainerMap = document.querySelector('.map__pins');

  // Форма объявлений
  var formAds = document.querySelector('.ad-form');


  // Функция добавления пинов в разметку через фрагмент
  function addPins(array) {
    var fragmentPin = document.createDocumentFragment();

    // Проверка у переданного с сервера массива, есть ли у его объектов ключа .offer
    var newArray = array.filter(function (elem) {
      return elem.offer;
    });

    for (var i = 0; i < newArray.length; i++) {
      fragmentPin.appendChild(window.pin.сreate(newArray[i]));
    }

    pinsContainerMap.appendChild(fragmentPin);

    // Обработчик события
    pinsContainerMap.addEventListener('click', onPinClick);
  }


  // Функция добавления карточки в разметку
  function addCard(object) {
    map.insertBefore(object, mapFilters);
  }

  // Функция подсчета координат для Основного пина
  function getCoordinates() {
    var coordinates = {
      x: parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2),
      y: parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2)
    };

    if (!map.classList.contains('map--faded')) {
      coordinates.y = parseInt(pinMain.style.top, 10) + pinMain.offsetHeight + PIN_MAIN_HEIGHT_POINTER;
    }

    return coordinates;
  }

  // Объект с координатами
  // Импорт window.form

  // // (Handler) Функция внесения координат в адрес input
  // function writeАddressFormAds(object) {
  //   addressFormAds.value = (object.x + ',' + object.y);
  // }


  // (Handler) Функция обработчик: по нажатию на пин => отрисовка карточки в HTML
  function onPinClick(evt) {
    var pinsClick = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (pinsClick) {
      // Импорт с data -  window.data
      var currentInfo = window.data.generatedObjects.filter(function (item) {
        return item.id === pinsClick.id;
      });

      // window.data.generatedObjects.filter().[i]
      // Закрытие перед отрисовкой
      closeCard();

      // Отрисовка
      // Импорт window.card
      addCard(window.card.create(currentInfo[0]));

      // Закрытие карточки по кнопке
      var closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCard);
    }
  }

  // Функция закрытия карточек + Проверка существует ли она вообще, перед закрытием
  function closeCard() {
    var card = document.querySelector('.map__card');
    if (card) {
      map.removeChild(document.querySelector('.map__card'));
    }
  }

  // (Handler) Функция обработчика нажатия по Escape
  function onEscPress(evt) {
    if (evt.code === 'Escape') {
      closeCard();
    }
  }

  // Обработчик события клика и последующего закрытия карточки
  document.addEventListener('keydown', onEscPress);

  // Экспорт
  window.map = {
    addPins: addPins,
    getCoordinates: getCoordinates,
    onPinClick: onPinClick

  };

})();
