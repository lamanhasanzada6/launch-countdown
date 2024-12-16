const countToDate = new Date().setDate(new Date().getDate() + 10);
let previous;

const intervalId = setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000);

  if (timeBetweenDates <= 0) {
    clearInterval(intervalId);
    flipAllCards(0);
    return;
  }

  if (timeBetweenDates !== previous) {
    flipAllCards(timeBetweenDates);
  }
  previous = timeBetweenDates;
}, 1000);

function flipAllCards(timeBetweenDates) {
  const days = Math.floor(timeBetweenDates / (24 * 3600));
  const hours = Math.floor((timeBetweenDates / 3600) % 24);
  const minutes = Math.floor((timeBetweenDates / 60) % 60);
  const seconds = Math.floor(timeBetweenDates % 60);

  const daysCard = document.querySelector(".days > .flip-card");
  const hoursCard = document.querySelector(".hours > .flip-card");
  const minutesCard = document.querySelector(".minutes > .flip-card");
  const secondsCard = document.querySelector(".seconds > .flip-card");

  flipCard(daysCard, days);
  flipCard(hoursCard, hours);
  flipCard(minutesCard, minutes);
  flipCard(secondsCard, seconds);
}

function flipCard(flipCard, time) {
  time = String(time).padStart(2, "0");
  const currentValue = flipCard.querySelector(".top").innerText;
  if (time == currentValue) return;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  topFlip.innerText = currentValue;

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");
  bottomFlip.innerText = time;

  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");

  topFlip.addEventListener("animationstart", () => {
    topHalf.innerText = time;
  });
  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.innerText = time;
    bottomFlip.remove();
  });

  flipCard.appendChild(topFlip);
  flipCard.appendChild(bottomFlip);
}
