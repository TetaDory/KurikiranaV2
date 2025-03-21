
document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/humidity_alerts')
        .then(response => response.json())
        .then(alertsByItem => {
            const reportContainer = document.querySelector(".report-container");
            reportContainer.innerHTML = ""; // Clear existing content

            for (const itemId in alertsByItem) {
                const item = alertsByItem[itemId];

                const card = document.createElement("div");
                card.classList.add("item-card");

                const header = document.createElement("h3");
                header.textContent = item.food_name;
                card.appendChild(header);

                const maxTemp = document.createElement("p");
                maxTemp.textContent = `Maximum Humidity: ${item.max_temp}g/kg`;
                card.appendChild(maxTemp);

                const alertsList = document.createElement("ul");
                item.alerts.forEach(temp => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Humidity: ${temp}g/kg`;
                    alertsList.appendChild(listItem);
                });
                card.appendChild(alertsList);

                reportContainer.appendChild(card);
            }
        });
});