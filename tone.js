// 1. Configurar el sintetizador de sonido
const synth = new Tone.Synth().toDestination();

// 2. Control de Volumen
document.getElementById('volume').addEventListener('input', (e) => {
    synth.volume.value = Tone.gainToDb(e.target.value);
});

// 3. Control de Color del Piano
document.getElementById('pianoColor').addEventListener('input', (e) => {
    document.getElementById('piano').style.backgroundColor = e.target.value;
});

// 4. Tocar nota al hacer clic con el ratón o pantalla táctil
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('mousedown', () => {
        playNote(key);
    });
});

function playNote(keyElement) {
    const note = keyElement.getAttribute('data-note');
    const isSustainChecked = document.getElementById('sustain').checked;

    // Si el sustain está activo, dejamos la nota sonando más tiempo (o simulamos eco)
    if (isSustainChecked) {
        synth.triggerAttackRelease(note, "1n"); // "1n" es una nota larga (duración de una redonda)
    } else {
        synth.triggerAttackRelease(note, "8n"); // "8n" es una nota corta (corchea)
    }

    // Efecto visual de pulsación
    keyElement.classList.add('pressed');
    setTimeout(() => keyElement.classList.remove('pressed'), 150);
}

// 5. Tocar con el teclado del ordenador (QWERTY)
window.addEventListener('keydown', (e) => {
    // Evitar que se repita el evento si se mantiene la tecla presionada
    if (e.repeat) return; 

    const keyPressed = e.key.toLowerCase();
    const targetKey = document.querySelector(`.key[data-key="${keyPressed}"]`);
    
    if (targetKey) {
        playNote(targetKey);
    }
});