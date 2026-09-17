// 1. Configurar sintetizador
const synth = new Tone.Synth().toDestination();

// 2. Definición exacta de las teclas con el mapeo del teclado de tu imagen (números y letras secuenciales)
const pianoKeys = [
    // Octava izquierda (Teclas blancas con números del 1 al 7 y negras con símbolos)
    { note: "C3", type: "white", noteName: "Do 3", abc: "C3", qwerty: "1" },
    { note: "C#3", type: "black", noteName: "Do#3", abc: "C#3", qwerty: "!" },
    { note: "D3", type: "white", noteName: "Re 3", abc: "D3", qwerty: "2" },
    { note: "D#3", type: "black", noteName: "Re#3", abc: "D#3", qwerty: "@" },
    { note: "E3", type: "white", noteName: "Mi 3", abc: "E3", qwerty: "3" },
    { note: "F3", type: "white", noteName: "Fa 3", abc: "F3", qwerty: "4" },
    { note: "F#3", type: "black", noteName: "Fa#3", abc: "F#3", qwerty: "$" },
    { note: "G3", type: "white", noteName: "Sol 3", abc: "G3", qwerty: "5" },
    { note: "G#3", type: "black", noteName: "Sol#3", abc: "G#3", qwerty: "%" },
    { note: "A3", type: "white", noteName: "La 3", abc: "A3", qwerty: "6" },
    { note: "A#3", type: "black", noteName: "La#3", abc: "A#3", qwerty: "^" },
    { note: "B3", type: "white", noteName: "Si 3", abc: "B3", qwerty: "7" },

    // Octava central (Teclas blancas con números 8, 9, 0 y letras Q, W, E, R, T, Y...)
    { note: "C4", type: "white", noteName: "Do", abc: "C", qwerty: "8" },
    { note: "C#4", type: "black", noteName: "Do#", abc: "C#", qwerty: "*" },
    { note: "D4", type: "white", noteName: "Re", abc: "D", qwerty: "9" },
    { note: "D#4", type: "black", noteName: "Re#", abc: "D#", qwerty: "(" },
    { note: "E4", type: "white", noteName: "Mi", abc: "E", qwerty: "0" },
    { note: "F4", type: "white", noteName: "Fa", abc: "F", qwerty: "q" },
    { note: "F#4", type: "black", noteName: "Fa#", abc: "F#", qwerty: "Q" },
    { note: "G4", type: "white", noteName: "Sol", abc: "G", qwerty: "w" },
    { note: "G#4", type: "black", noteName: "Sol#", abc: "G#", qwerty: "W" },
    { note: "A4", type: "white", noteName: "La", abc: "A", qwerty: "e" },
    { note: "A#4", type: "black", noteName: "La#", abc: "A#", qwerty: "E" },
    { note: "B4", type: "white", noteName: "Si", abc: "B", qwerty: "r" },

    // Octava derecha (Continuación de letras: t, y, u, i, o, p, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m)
    { note: "C5", type: "white", noteName: "Do 5", abc: "C5", qwerty: "t" },
    { note: "C#5", type: "black", noteName: "Do#5", abc: "C#5", qwerty: "T" },
    { note: "D5", type: "white", noteName: "Re 5", abc: "D5", qwerty: "y" },
    { note: "D#5", type: "black", noteName: "Re#5", abc: "D#5", qwerty: "Y" },
    { note: "E5", type: "white", noteName: "Mi 5", abc: "E5", qwerty: "u" },
    { note: "F5", type: "white", noteName: "Fa 5", abc: "F5", qwerty: "i" },
    { note: "F#5", type: "black", noteName: "Fa#5", abc: "F#5", qwerty: "I" },
    { note: "G5", type: "white", noteName: "Sol 5", abc: "G5", qwerty: "o" },
    { note: "G#5", type: "black", noteName: "Sol#5", abc: "G#5", qwerty: "O" },
    { note: "A5", type: "white", noteName: "La 5", abc: "A5", qwerty: "p" },
    { note: "A#5", type: "black", noteName: "La#5", abc: "A#5", qwerty: "P" },
    { note: "B5", type: "white", noteName: "Si 5", abc: "B5", qwerty: "a" },

    // Extremo agudo
    { note: "C6", type: "white", noteName: "Do 6", abc: "C6", qwerty: "s" },
    { note: "C#6", type: "black", noteName: "Do#6", abc: "C#6", qwerty: "S" },
    { note: "D6", type: "white", noteName: "Re 6", abc: "D6", qwerty: "d" },
    { note: "D#6", type: "black", noteName: "Re#6", abc: "D#6", qwerty: "D" },
    { note: "E6", type: "white", noteName: "Mi 6", abc: "E6", qwerty: "f" },
    { note: "F6", type: "white", noteName: "Fa 6", abc: "F6", qwerty: "g" },
    { note: "F#6", type: "black", noteName: "Fa#6", abc: "F#6", qwerty: "G" },
    { note: "G6", type: "white", noteName: "Sol 6", abc: "G6", qwerty: "h" }
];

const keyboardElement = document.getElementById('keyboard');

// 3. Generar las teclas automáticamente
function buildKeyboard() {
    keyboardElement.innerHTML = '';
    let whiteKeyIndex = 0;

    pianoKeys.forEach((k) => {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key', k.type);
        keyDiv.setAttribute('data-note', k.note);
        keyDiv.setAttribute('data-qwerty', k.qwerty.toLowerCase());

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

// 4. Actualizar etiquetas según el modo seleccionado (Notas, ABC o QWERTY)
function updateKeyLabel(keyDiv, k, mode) {
    let mainText = '';
    let subText = k.qwerty;

    if (mode === 'notes') {
        mainText = k.noteName;
    } else if (mode === 'abc') {
        mainText = k.abc;
    } else if (mode === 'qwerty') {
        mainText = k.qwerty;
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

// 5. Reproducir notas
function playNote(note, keyElement) {
    const isSustain = document.getElementById('sustain').checked;

    if (isSustain) {
        synth.triggerAttackRelease(note, "1n");
    } else {
        synth.triggerAttackRelease(note, "8n");
    }

    if (keyElement) {
        keyElement.classList.add('pressed');
        setTimeout(() => keyElement.classList.remove('pressed'), 150);
    }
}

// 6. Controles de Volumen y Color
document.getElementById('volume').addEventListener('input', (e) => {
    synth.volume.value = Tone.gainToDb(e.target.value);
});

document.getElementById('bgColorPicker').addEventListener('input', (e) => {
    document.getElementById('page-body').style.backgroundColor = e.target.value;
});

// 7. Tocar con el teclado del ordenador
window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const pressedChar = e.key;
    const targetKey = document.querySelector(`.key[data-qwerty="${pressedChar}"]`);

    if (targetKey) {
        const note = targetKey.getAttribute('data-note');
        playNote(note, targetKey);
    }
});

buildKeyboard();