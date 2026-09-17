// 1. Configurar sintetizador
const synth = new Tone.Synth().toDestination();

// 2. Definir las notas del piano con sus respectivas opciones de nombres y teclas de ordenador (QWERTY)
const pianoKeys = [
    { note: "C4", type: "white", noteName: "Do", abc: "C", qwerty: "a" },
    { note: "C#4", type: "black", noteName: "Do#", abc: "C#", qwerty: "w" },
    { note: "D4", type: "white", noteName: "Re", abc: "D", qwerty: "s" },
    { note: "D#4", type: "black", noteName: "Re#", abc: "D#", qwerty: "e" },
    { note: "E4", type: "white", noteName: "Mi", abc: "E", qwerty: "d" },
    { note: "F4", type: "white", noteName: "Fa", abc: "F", qwerty: "f" },
    { note: "F#4", type: "black", noteName: "Fa#", abc: "F#", qwerty: "t" },
    { note: "G4", type: "white", noteName: "Sol", abc: "G", qwerty: "g" },
    { note: "G#4", type: "black", noteName: "Sol#", abc: "G#", qwerty: "y" },
    { note: "A4", type: "white", noteName: "La", abc: "A", qwerty: "h" },
    { note: "A#4", type: "black", noteName: "La#", abc: "A#", qwerty: "u" },
    { note: "B4", type: "white", noteName: "Si", abc: "B", qwerty: "j" },
    { note: "C5", type: "white", noteName: "Do (5)", abc: "C5", qwerty: "k" },
    { note: "C#5", type: "black", noteName: "Do#5", abc: "C#5", qwerty: "o" },
    { note: "D5", type: "white", noteName: "Re (5)", abc: "D5", qwerty: "l" },
    { note: "D#5", type: "black", noteName: "Re#5", abc: "D#5", qwerty: "p" },
    { note: "E5", type: "white", noteName: "Mi (5)", abc: "E5", qwerty: "ñ" }
];

const keyboardElement = document.getElementById('keyboard');

// 3. Generar las teclas automáticamente en la pantalla
function buildKeyboard() {
    keyboardElement.innerHTML = '';
    let whiteKeyIndex = 0;

    pianoKeys.forEach((k) => {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key', k.type);
        keyDiv.setAttribute('data-note', k.note);
        keyDiv.setAttribute('data-qwerty', k.qwerty);

        // Posicionar correctamente las teclas negras encima de las blancas
        if (k.type === 'white') {
            whiteKeyIndex++;
            keyDiv.style.left = `${(whiteKeyIndex - 1) * 44}px`;
        } else {
            // Ajustar posición de la tecla negra entre las blancas
            keyDiv.style.left = `${(whiteKeyIndex * 44) - 13}px`;
        }

        // Crear etiqueta de texto inicial (Notas por defecto)
        updateKeyLabel(keyDiv, k, 'notes');

        // Evento de clic con ratón o táctil
        keyDiv.addEventListener('mousedown', () => playNote(k.note, keyDiv));

        keyboardElement.appendChild(keyDiv);
    });
}

// 4. Actualizar etiquetas de las teclas según el menú desplegable
function updateKeyLabel(keyDiv, k, mode) {
    let mainText = '';
    let subText = `(${k.qwerty.toUpperCase()})`;

    if (mode === 'notes') {
        mainText = k.noteName;
    } else if (mode === 'abc') {
        mainText = k.abc;
    } else if (mode === 'qwerty') {
        mainText = k.qwerty.toUpperCase();
        subText = k.noteName;
    }

    keyDiv.innerHTML = `${mainText}<br><small>${subText}</small>`;
}

document.getElementById('labelMode').addEventListener('change', (e) => {
    const mode = e.target.value;
    const allKeys = document.querySelectorAll('.key');
    
    allKeys.forEach((keyDiv, index) => {
        updateKeyLabel(keyDiv, pianoKeys[index], mode);
    });
});

// 5. Función para reproducir notas
function playNote(note, keyElement) {
    const isSustain = document.getElementById('sustain').checked;

    if (isSustain) {
        synth.triggerAttackRelease(note, "1n"); // Suena durante más tiempo (eco/sustain)
    } else {
        synth.triggerAttackRelease(note, "8n"); // Nota corta normal
    }

    if (keyElement) {
        keyElement.classList.add('pressed');
        setTimeout(() => keyElement.classList.remove('pressed'), 150);
    }
}

// 6. Controles de Volumen y Color de Fondo
document.getElementById('volume').addEventListener('input', (e) => {
    synth.volume.value = Tone.gainToDb(e.target.value);
});

document.getElementById('bgColorPicker').addEventListener('input', (e) => {
    document.getElementById('page-body').style.backgroundColor = e.target.value;
});

// 7. Tocar con el teclado del ordenador (QWERTY)
window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const pressedChar = e.key.toLowerCase();
    const targetKey = document.querySelector(`.key[data-qwerty="${pressedChar}"]`);

    if (targetKey) {
        const note = targetKey.getAttribute('data-note');
        playNote(note, targetKey);
    }
});

// Inicializar el piano al cargar la página
buildKeyboard();