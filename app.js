
const dbName = "UserDB";
const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("users", { keyPath: "email" });
};




request.onsuccess = function(event) {
    const db = event.target.result;
    
    document.getElementById("userForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        store.put({ name, email });

        loadUsers();
    });

    function loadUsers() {
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        store.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const li = document.createElement("li");
                li.textContent = `${cursor.value.name} - ${cursor.value.email}`;
                userList.appendChild(li);
                cursor.continue();
            }
        };
    }

    loadUsers();
};


function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "c5151c3df42e4b92fe82dda3d8903bba"; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weatherData").textContent =
                `Temperatura: ${data.main.temp}°C, Warunki: ${data.weather[0].description}`;
        })
        .catch(error => {
            document.getElementById("weatherData").textContent = "Nie udało się pobrać danych.";
        });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
            if (registrations.length === 0) {
                return navigator.serviceWorker.register('/service-worker.js')
                    .then((registration) => {
                        console.log('Service Worker zarejestrowany pomyślnie:', registration);
                    })
                    .catch((error) => {
                        console.error('Błąd rejestracji Service Worker:', error);
                    });
            } else {
                console.log('Service Worker już działa:', registrations);
            }
        })
        .catch((error) => {
            console.error(' Błąd pobierania Service Worker:', error);
        });
}

