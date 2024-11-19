window.addEventListener('load', () => {
    let lon;
    let lat;
    let ciudad = "Ciudad de México"; // Ciudad predeterminada

    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');
    let maxMin = document.getElementById('max-min');
    let pronosticoContainer = document.getElementById('pronostico');

    // Función para obtener clima actual y pronóstico de 5 días
    const obtenerClima = (ciudad) => {
        const apiKey = '763cc4f2c652488cf0839fd21d016eb2';  // Tu clave API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let temp = Math.round(data.main.temp);
                temperaturaValor.textContent = `${temp} °C`;
                temperaturaDescripcion.textContent = data.weather[0].description.toUpperCase();
                ubicacion.textContent = data.name;
                vientoVelocidad.textContent = `${data.wind.speed} m/s`;
                maxMin.textContent = `${data.main.temp_max}°C / ${data.main.temp_min}°C`;

                // Icono dinámico según el clima
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        iconoAnimado.src = 'animated/thunder.svg';
                        break;
                    case 'Drizzle':
                        iconoAnimado.src = 'animated/rainy-2.svg';
                        break;
                    case 'Rain':
                        iconoAnimado.src = 'animated/rainy-7.svg';
                        break;
                    case 'Snow':
                        iconoAnimado.src = 'animated/snowy-6.svg';
                        break;
                    case 'Clear':
                        iconoAnimado.src = 'animated/day.svg';
                        break;
                    case 'Clouds':
                        iconoAnimado.src = 'animated/cloudy-day-1.svg';
                        break;
                    default:
                        iconoAnimado.src = 'animated/cloudy-day-1.svg';
                }

                // Obtener pronóstico de 5 días
                const pronosticoUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=es&units=metric&appid=${apiKey}`;
                fetch(pronosticoUrl)
                    .then(response => response.json())
                    .then(pronosticoData => {
                        pronosticoContainer.innerHTML = ''; // Limpiar pronósticos anteriores
                        for (let i = 0; i < 4; i++) {
                            const pronosticoDia = pronosticoData.list[i * 8]; // Cada 8 horas
                            const dia = new Date(pronosticoDia.dt * 1000).toLocaleDateString();
                            const tempDia = Math.round(pronosticoDia.main.temp);
                            const iconoDia = pronosticoDia.weather[0].icon;
                            const descripcionDia = pronosticoDia.weather[0].description;

                            const pronosticoHTML = `
                                <div class="hora">
                                    <p>${dia}</p>
                                    <img src="http://openweathermap.org/img/wn/${iconoDia}.png" alt="icono clima" width="50">
                                    <p>${tempDia}°C</p>
                                    <p>${descripcionDia}</p>
                                </div>
                            `;
                            pronosticoContainer.innerHTML += pronosticoHTML;
                        }
                    })
                    .catch(error => console.log('Error al obtener pronóstico:', error));
            })
            .catch(error => {
                console.log('Error en la API:', error);
            });
    };

    // Cargar el clima al inicio
    obtenerClima(ciudad);

    // Evento de búsqueda por ciudad
    document.getElementById('buscar-btn').addEventListener('click', () => {
        ciudad = document.getElementById('ciudad-input').value;
        obtenerClima(ciudad);
    });
});
