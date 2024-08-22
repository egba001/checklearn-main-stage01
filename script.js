import { allPreferences } from "./preferences.js";

// Variables to hold all options selected by the user
const accordionWrapper = document.getElementById("accordion_wrapper");


// Attach all question in the accordion to the relevant span that shows the selected preference under the accordion
const spanMapping = {
    "How do you drink your coffee?": document.getElementById("variation"),
    "What type of Coffee": document.getElementById("typeOfCoffee"),
    "How much would you like?": document.getElementById("quantity"),
    "Want us to grind them?": document.getElementById("grinded"),
    "How often should we deliver?":
        document.getElementById("deliveryFrequency"),
};

// Function to update the relevant span based on the clicked preference
function updateSpan(question, preferenceName) {
    const spanElement = spanMapping[question];
    if (spanElement) {
        spanElement.textContent = preferenceName;
    }
}

allPreferences.forEach((section) => {
    // Create accordion button
    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    accordion.innerHTML = `
        <p>${section.question}</p>
        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 15.5l-7-7 1.4-1.4L12 12.7l5.6-5.6 1.4 1.4-7 7z" fill="#0E8784"/>
        </svg>`;

    // Create panel
    const panel = document.createElement("div");
    panel.classList.add("panel");

    section.preferences.forEach((preference) => {
        const div = document.createElement("div");
        div.classList.add("preference");

        const title = document.createElement("h3");
        title.textContent = preference.name;
        div.appendChild(title);

        const text = document.createElement("p");
        text.textContent = preference.text;
        div.appendChild(text);

        // Click event to handle preference selection
        div.addEventListener("click", () => {
            updateSpan(section.question, preference.name);
        });

        panel.appendChild(div);
    });

    // Append accordion and panel to the wrapper
    accordionWrapper.appendChild(accordion);
    accordionWrapper.appendChild(panel);

    // Accordion functionality
    accordion.addEventListener("click", function () {
        const isActive = this.classList.toggle("active");
        panel.classList.toggle("show", isActive);
    });
});
