// Ajustes de temperatura y viento
window.addEventListener('load', () => {
    // Obtener los elementos de los select
    const unidadTemperatura = document.getElementById('unidad-temperatura');
    const unidadViento = document.getElementById('unidad-viento');

    // Verificar si ya hay configuración guardada en el localStorage
    if (localStorage.getItem('unidad-temperatura')) {
        unidadTemperatura.value = localStorage.getItem('unidad-temperatura');
    }

    if (localStorage.getItem('unidad-viento')) {
        unidadViento.value = localStorage.getItem('unidad-viento');
    }

    // Guardar las configuraciones cuando el usuario cambia una opción
    unidadTemperatura.addEventListener('change', () => {
        localStorage.setItem('unidad-temperatura', unidadTemperatura.value);
    });

    unidadViento.addEventListener('change', () => {
        localStorage.setItem('unidad-viento', unidadViento.value);
    });
});
