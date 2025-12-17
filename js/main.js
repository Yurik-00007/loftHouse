const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
  navIcon.classList.toggle("nav-icon--active");
  nav.classList.toggle("header__top-row--mobile");
  document.body.classList.toggle("no-scroll");
}

/* Phone Mask*/
mask('[data-tel-input]')

/*
 Удаляем '+' если больше ничего не введено, чтобы показать placeholder
*/
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value == '+') input.value = '';
  })
  input.addEventListener('blur', () => {
    if (input.value == '+') input.value = '';
  })
});

/* Yandex Map*/
/*
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
	// Создание карты.
	var map = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [59.943543, 30.338928],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 16,
	});

	var myPlacemark = new ymaps.Placemark(
		[59.943543, 30.338928],
		{
			balloonContent: `
				<div class="balloon">
					<div class="balloon__address">Наб. реки Фонтанки 10-15</div>
					<div class="balloon__contacts">
						<a href="tel:+78121234567">+8 (812) 123-45-67</a>
					</div>
				</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: './img/map/location-pin.svg',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -40],
		}
	);

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип

	// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	map.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();

}
*/

async function initMap() {
  // Ждем загрузки API
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapDefaultMarker
  } = ymaps3;


  // Создаем карту
  const map = new YMap(
    document.getElementById('map'),
    {
      location: {
        // center: [37.588144, 55.733842],
        center: [30.338928, 59.943543],// долгота, широта
        zoom: 16
      },
      behaviors: [
            'drag' // оставляем только перетаскивание
          ]
    }
  );
  // 1. Добавляем слой карты (подложку)
  map.addChild(new YMapDefaultSchemeLayer());

  // 2. Добавляем слой для маркеров (ОБЯЗАТЕЛЬНО!)
  map.addChild(new YMapDefaultFeaturesLayer());



// 3. Создаем и добавляем маркер
  const markerElement = document.createElement('div');
  markerElement.className = 'marker';
  // markerElement.innerText = "I'm marker!";
  markerElement.innerHTML = `
  <img src="./../img/map/location-pin.svg" width="40" height="40" />
`;

  /*
  // Или вставьте временную иконку для проверки
    markerElement.innerHTML = `
      <div style="width: 40px; height: 40px; background: red; border-radius: 50%;"></div>
    `;
  */

  const marker = new YMapMarker(
    {
      coordinates: [30.338928, 59.943543],
      draggable: false, // можно перетаскивать?
      title: 'Наб. реки Фонтанки 10-15',
      subtitle: '+8 (812) 123-45-67',
      color: 'blue'
    },
    markerElement
  );


  map.addChild(marker);
}

initMap();

