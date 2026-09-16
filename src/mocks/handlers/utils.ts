export function randomDelay() {
  const ms = 300 + Math.random() * 1200; 
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shouldFail(rate = 0.15) {
  return Math.random() < rate;
}
