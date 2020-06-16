// import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from "flatpickr";
const initFlatpickr = () => {
// First we define two variables that are going to grab our inputs field. You can check the ids of the inputs with the Chrome inspector.
  const dateInput = document.getElementById('datepicker');
    // Check that the query selector id matches the one you put around your form.
    if (dateInput) {
      flatpickr(dateInput, {
        enableTime: true,
        maxDate: "today",
        dateFormat: "Y-m-d H:i",
      });
    };
};

export { initFlatpickr };