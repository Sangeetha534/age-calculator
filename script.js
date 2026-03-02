const { DateTime } = luxon;

// Datepicker
const picker = flatpickr("#birthdate", {
    dateFormat: "Y-m-d",
    maxDate: "today"
});

const result = document.getElementById("result");
const extra = document.getElementById("extra");
const errorMsg = document.getElementById("errorMsg");

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Form Submit
document.getElementById("ageForm").addEventListener("submit", function(e) {
    e.preventDefault();

    errorMsg.textContent = "";
    result.classList.remove("show");
    extra.classList.remove("show");

    const selectedDate = picker.selectedDates[0];

    if (!selectedDate) {
        errorMsg.textContent = "Please select a valid birthdate.";
        return;
    }

    const birthDate = DateTime.fromJSDate(selectedDate);
    const today = DateTime.now();

    if (birthDate > today) {
        errorMsg.textContent = "Invalid birthdate selected.";
        return;
    }

    // Exact Age
    const diff = today.diff(birthDate, ['years', 'months', 'days']).toObject();

    result.textContent =
        `You are ${Math.floor(diff.years)} years, 
        ${Math.floor(diff.months)} months, 
        and ${Math.floor(diff.days)} days old.`;

    // Total Days Lived
    const totalDays = Math.floor(today.diff(birthDate, 'days').days);

    // Next Birthday
    let nextBirthday = birthDate.set({ year: today.year });
    if (nextBirthday < today) {
        nextBirthday = nextBirthday.plus({ years: 1 });
    }

    const birthdayDiff = nextBirthday.diff(today, ['months', 'days']).toObject();

    extra.innerHTML = `
        🎉 Total Days Lived: ${totalDays} days <br>
        🎂 Next Birthday In: ${Math.floor(birthdayDiff.months)} months 
        and ${Math.floor(birthdayDiff.days)} days
    `;

    // Animation
    setTimeout(() => {
        result.classList.add("show");
        extra.classList.add("show");
    }, 100);
});