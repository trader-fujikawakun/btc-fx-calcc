const tabs = document.querySelectorAll(".tab");
const body = document.body;

const colorMap = {
  BTC: '#FFA500',
  XAUT: '#8B4513',
  ETH: '#708090',
  XRP: '#000000'
};

let selectedAsset = "BTC";

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    selectedAsset = tab.dataset.asset;
    document.documentElement.style.setProperty('--accent-color', colorMap[selectedAsset]);
    body.style.background = `linear-gradient(to bottom right, ${colorMap[selectedAsset]}22, #f0f0f0)`;
    calculatePosition();
  });
});

const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
  input.addEventListener("input", calculatePosition);
});

function calculatePosition() {
  const balance = parseFloat(document.getElementById("balance").value);
  const riskPercent = parseFloat(document.getElementById("risk-percent").value);
  const entryPrice = parseFloat(document.getElementById("entry-price").value);
  const stopLoss = parseFloat(document.getElementById("stop-loss").value);
  const takeProfit = parseFloat(document.getElementById("take-profit").value);

  if (!balance || !riskPercent || !entryPrice || !stopLoss) return;

  const riskAmount = balance * (riskPercent / 100);
  const lossPerUnit = Math.abs(entryPrice - stopLoss);
  const positionSize = (riskAmount / lossPerUnit).toFixed(4);

  const lossAmount = (lossPerUnit * positionSize).toFixed(2);
  const profitAmount = takeProfit ? ((Math.abs(takeProfit - entryPrice) * positionSize).toFixed(2)) : "-";

  document.getElementById("position-size").textContent = `${positionSize} ${selectedAsset}`;
  document.getElementById("loss-amount").textContent = `${lossAmount} USDT`;
  document.getElementById("profit-amount").textContent = takeProfit ? `${profitAmount} USDT` : "-";

  showQuote();
}

function showQuote() {
  const quotes = [
    "勝者とは、諦めない者である。",
    "感情を排せ、ロジックで取引せよ。",
    "リスク管理こそが最大の武器。",
    "損切りは敗北ではない、戦略である。",
    "継続こそが成功への近道。",
    "市場は常に正しい。間違うのは自分だ。"
  ];
  const quoteBox = document.getElementById("quote-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = `📘 今日の名言：${randomQuote}`;
}
