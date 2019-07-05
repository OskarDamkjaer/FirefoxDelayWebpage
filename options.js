function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        color: document.querySelector("#bg_color").value
        time: document.querySelector("#time").time * 1000
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#bg_color").value = result.color || "#3CAEA3";
        document.querySelector("#time").value = result.time / 1000 || 5;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    const getting = browser.storage.sync.get(null);
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
