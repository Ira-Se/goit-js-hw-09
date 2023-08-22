import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      Notiflix.Notify.info(
        'The time has been successfully chosen! Press "Start"'
      );
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr(input, options);
btnStart.disabled = true;
btnStart.addEventListener('click', handlerStart);
input.value = '';

function handlerStart(evt) {
  const onStart = setInterval(() => {
    selectedDate = Date.parse(input.value);
    const differenceTime = selectedDate - Date.now();

    btnStart.disabled = true;
    input.disabled = true;

    if (differenceTime <= 0) {
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';

      input.disabled = false;
      input.value = '';
      clearInterval(onStart);
      Notiflix.Notify.success('This time has come!');
      return;
    } else {
      const counter = convertMs(differenceTime);
      timerDays.textContent = addLeadingZero(counter.days);
      timerHours.textContent = addLeadingZero(counter.hours);
      timerMinutes.textContent = addLeadingZero(counter.minutes);
      timerSeconds.textContent = addLeadingZero(counter.seconds);
    }
  }, 1000);
}
