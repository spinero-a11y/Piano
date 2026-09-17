// 1. Configurar sintetizador
const synth = new Tone.Synth().toDestination();

// 2. Definir una lista mucho más larga de notas (múltiples octavas) con sus teclas de ordenador (QWERTY)
const pianoKeys = [
    // Octava 3
    { note: "C3", type: "white", noteName: "Do 3", abc: "C3", qwerty: "z" },
    { note: "C#3", type: "black", noteName: "Do#3", abc: "C#3", qwerty: "s" },
    { note: "D3", type: "white", noteName: "Re 3", abc: "D3", qwerty: "x" },
    { note: "D#3", type: "black", noteName: "Re#3", abc: "D#3", qwerty: "d" },
    { note: "E3", type: "white", noteName: "Mi 3", abc: "E3", qwerty: "c" },
    { note: "F3", type: "white", noteName: "Fa 3", abc: "F3", qwerty: "v" },
    { note: "F#3", type: "black", noteName: "Fa#3", abc: "F#3", qwerty: "g" },
    { note: "G3", type: "white", noteName: "Sol 3", abc: "G3", qwerty: "b" },
    { note: "G#3", type: "black", noteName: "Sol#3", abc: "G#3", qwerty: "h" },
    { note: "A3", type: "white", noteName: "La 3", abc: "A3", qwerty: "n" },
    { note: "A#3", type: "black", noteName: "La#3", abc: "A#3", qwerty: "j" },
    { note: "B3", type: "white", noteName: "Si 3", abc: "B3", qwerty: "m" },
    
    // Octava 4 (Zona central del teclado del ordenador)
    { note: "C4", type: "white", noteName: "Do", abc: "C", qwerty: "q" },
    { note: "C#4", type: "black", noteName: "Do#", abc: "C#", qwerty: "2" },
    { note: "D4", type: "white", noteName: "Re", abc: "D", qwerty: "w" },
    { note: "D#4", type: "black", noteName: "Re#", abc: "D#", qwerty: "3" },
    { note: "E4", type: "white", noteName: "Mi", abc: "E", qwerty: "e" },
    { note: "F4", type: "white", noteName: "Fa", abc: "F", qwerty: "r" },
    { note: "F#4", type: "black", noteName: "Fa#", abc: "F#", qwerty: "5" },
    { note: "G4", type: "white", noteName: "Sol", abc: "G", qwerty: "t" },
    { note: "G#4", type: "black", noteName: "Sol#", abc: "G#", qwerty: "6" },
    { note: "A4", type: "white", noteName: "La", abc: "A", qwerty: "y" },
    { note: "A#4", type: "black", noteName: "La#", abc: "A#", qwerty: "7" },
    { note: "B4", type: "white", noteName: "Si", abc: "B", qwerty: "u" },

    // Octava 5
    { note: "C5", type: "white", noteName: "Do 5", abc: "C5", qwerty: "i" },
    { note: "C#5", type: "black", noteName: "Do#5", abc: "C#5", qwerty: "9" },
    { note: "D5", type: "white", noteName: "Re 5", abc: "D5", qwerty: "o" },
    { note: "D#5", type: "black", noteName: "Re#5", abc: "D#5", qwerty: "0" },
    { note: "E5", type: "white", noteName: "Mi 5", abc: "E5", qwerty: "p" },
    { note: "F5", type: "white", noteName: "Fa 5", abc: "F5", qwerty: "[" },
    { note: "F#5", type: "black", noteName: "Fa#5", abc: "F#5", qwerty: "=" },
    { note: "G5", type: "white", noteName: "Sol 5", abc: "G5", qwerty: "]" }
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

        // Posicionar correctamente las teclas blancas y negras en fila continua
        if (k.type === 'white') {
            whiteKeyIndex++;
            keyDiv.style.left = `${(whiteKeyIndex - 1) * 44}px`;
        } else {
            keyDiv.style.left = `${(whiteKeyIndex * 44) - 13}px`;
        }

        updateKeyLabel(keyDiv, k, document.getElementById('labelMode').value);

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
        synth.triggerAttackRelease(note, "1n"); // Eco / Sostenido largo
    } else {
        synth.triggerAttackRelease(note, "8n"); // Nota corta
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
        playNodeAction = playNote(note, targetKey);
    }
});

// Inicializar el piano al cargar la página
buildKeyboard();