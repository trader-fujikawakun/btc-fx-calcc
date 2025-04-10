const capitalInput = document.getElementById('capital');
const riskInput = document.getElementById('risk');
const entryInput = document.getElementById('entry');
const stopInput = document.getElementById('stop-price');
const takeInput = document.getElementById('take-price');

const positionSizeOutput = document.getElementById('position-size');
const lossOutput = document.getElementById('loss');
const profitOutput = document.getElementById('profit');
const quoteOutput = document.getElementById('quote');

// 名言パターン
const quotes = [
  "勝つまでやれば負けない。",
  "損小利大、人生も同じ。",
  "焦るな、待てる者が勝つ。",
  "退場しない者が最後に笑う。",
  "マーケットは敵じゃない。味方にしろ。"
];

// 自動計算実行
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', calculate);
});

function calculate() {
  const capital = parseFloat(capitalInput.value);
  const risk = parseFloat(riskInput.value);
  const entry = parseFloat(entryInput.value);
  const stop = parseFloat(stopInput.value);
  const take = parseFloat(takeInput.value);

  if (isNaN(capital) || isNaN(risk) || isNaN(entry) || isNaN(stop)) {
    return;
  }

  const riskAmount = capital * (risk / 100);
  const lossPerBTC = Math.abs(entry - stop);
  const positionSize = riskAmount / lossPerBTC;

  const totalLoss = positionSize * lossPerBTC;
  let totalProfit = "-";

  if (!isNaN(take)) {
    const profitPerBTC = Math.abs(take - entry);
    totalProfit = (positionSize * profitPerBTC).toFixed(2);
  }

  positionSizeOutput.textContent = positionSize.toFixed(3);
  lossOutput.textContent = totalLoss.toFixed(2);
  profitOutput.textContent = totalProfit;

  showQuote();
}

function showQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteOutput.textContent = quotes[randomIndex];
}
