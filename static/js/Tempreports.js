document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/temperature_alerts')
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
                maxTemp.textContent = `optimum Temperature: ${item.max_temp}°C`;
                card.appendChild(maxTemp);

                const alertsList = document.createElement("ul");
                item.alerts.forEach(temp => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Temperature: ${temp}°C`;
                    alertsList.appendChild(listItem);
                });
                card.appendChild(alertsList);

                reportContainer.appendChild(card);
            }
        });
});