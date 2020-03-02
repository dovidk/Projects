const form = document.getElementById('form');
const search = document.getElementById('search');
const display = document.getElementById('display');
const display2 = document.getElementById('display2');
const p = document.getElementById('p');

window.map = undefined;
const reverseGeocode = (place) => {
    fetch(`https://us1.locationiq.com/v1/reverse.php?key=???&lat=${place.lat}&lon=${place.lng}&format=json`)
        .then((resp) => {
            resp.json()
                .then((data) => {
                    if (data.error) {
                        display.innerText = `Error: ${data.error}`;
                    }
                    else {
                        const county = (data.address.county) ? `${data.address.county}, ` : "";
                        const state = (data.address.state) ? `${data.address.state}, ` : "";
                        display.innerText = `${county} ${state} ${data.address.country}`;
                    }
                });
        });
};
function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: 40.1187, lng: -74.9305 }
    });
}

window.onload = () => {
    window.map.addListener('click', (e) => {
        p.innerText = '';
        display.innerText = 'Loading...';
        fetch(`/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}`)
            .then((resp) => {
                resp.json()
                    .then((data) => {
                        const latLng = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng()
                        };
                        reverseGeocode(latLng);
                        window.map.panTo(latLng);
                        window.map.setZoom(10);
                        display2.innerText = data.forecastData;
                    });
            });
    });

};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    p.innerText = '';
    display.innerText = 'Loading...';
    display2.innerText = '';

    fetch(`/weather?location=${search.value}`)
        .then((resp) => {
            resp.json()
                .then((data) => {
                    if (data.error) {
                        display.innerText = data.error;
                    }
                    else {
                        const latLng = {
                            lat: +data.lat,
                            lng: +data.lon
                        };
                        window.map.panTo(latLng);
                        window.map.setZoom(9);
                        display.innerText = data.location;
                        display2.innerText = data.forecastData;
                    }
                });
        });
});
