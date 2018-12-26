'use strict';

(function () {

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Функция активации страницы в mouseup (callback)
  function activatePage() {

    // Функция callback получает данные от сервера и отрисовывает их при активации страницы + записывает в них id + вызывает функцию adsWithId которая отправляет массив в map
    window.backend.load(function (ads) {
      var adsWithId = setId(ads);
      window.formFilters.setDataAds(adsWithId);
      updatePins(adsWithId);
    }, window.message.showErrorMessage);

    window.map.toggleSiteState();

    // импорт c form - window.map (рассчета + внесения координат в адрес input) - при активации страницы, с учетом острия (асинхронно)
    window.formAd.writeАddressformAd(window.map.getCoordinates());
  }

  var filteredAds;


  // Функция  массива данных с сервера и дальнейшие манипуляции с данными, фильтрация + отрисовка пинов
  function updatePins(ads) {
    // Фильтрация полученного массива данных с сервера
    filteredAds = window.formFilters.filter(ads);
    // Закрытие открытых карточек
    window.map.closeCard();
    // Удаление старых пинов из разметки
    window.map.removePins();
    // Добавления пинов в разметку через фрагмент
    window.map.addPins(filteredAds);
    // Передача и сохранения отфильтрованного массива данных и дальнейней манипуляции
    window.map.setSaveAds(filteredAds);
  }


  // Функция дезактивации страницы
  function deactivatePage() {
    window.formAd.onResetFormSite();
  }


  // Функция по добавлению id в массив с объектами полученный c сервера
  function setId(ads) {
    for (var i = 0; i < ads.length; i++) {
      ads[i].id = 'map__pin_id' + (i + 1);
    }
    return ads;
  }

  // Функция передачи callback (активации страницы)
  window.slider.setPinMainMouseUpCallback(function () {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
  });


  // Функция передачи callback (рассчета + внесения координат в адрес input) при каждом движении курсора (асинхронно)
  window.slider.setPinMainMouseMoveCallback(function () {
    window.formAd.writeАddressformAd(window.map.getCoordinates());
  });


  // Функция передачи callback (дезактивация страницы) при успешной отправки формы
  window.formAd.setSuccessSubmitCallback(function () {
    deactivatePage();
  });

  // Функция передачи callback фильтрации массива который пришел сервера, дальнейшая отрисовка пинов + карточек
  window.formFilters.setUpdatePinsCallback(function (ads) {
    updatePins(ads);
  });

})();
