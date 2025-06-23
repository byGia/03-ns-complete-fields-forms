// ==UserScript==
// @name         Complete fields in forms
// @namespace    https://tu-netsuite
// @version      2.3
// @description  Aplica valor del campo #label al último input visible de cada fila editable
// @author       Giannina Bernal 💅
// @match        https://*.app.netsuite.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function simularInput(input, nuevoValor) {
        input.focus();
        input.value = '';
        input.value = nuevoValor;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
        input.style.border = '2px solid #38b000'; // borde visual
    }

    function insertarValor() {
        const campoFuente = document.getElementById('label');
        if (!campoFuente) {
            alert("⚠️ No se encontró el campo con id='label'");
            return;
        }

        const valor = campoFuente.value;

        const filas = Array.from(document.querySelectorAll('tr')).filter(row =>
            row.querySelectorAll('input.uir-input-text').length > 0
        );

        let contador = 0;

        filas.forEach(row => {
            const inputs = row.querySelectorAll('input.uir-input-text');
            const target = inputs[inputs.length - 1]; // último input de la fila
            if (target) {
                simularInput(target, valor);
                contador++;
            }
        });

        alert(`✅ Se insertó el valor en ${contador} campo(s) (último input de cada fila)`);
    }

    window.addEventListener('keydown', function (e) {
        if (e.altKey && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            insertarValor();
        }
    });
})();
