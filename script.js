const form = document.getElementById("calc-form");
const result = document.getElementById("result");
const positionSizeEl = document.getElementById("position-size");
const lossAmountEl = document.getElementById("loss-amount");
const profitAmountEl = document.getElementById("profit-amount");
const quoteEl = document.getElementById("quote");
const pairSelect = document.getElementById("pair-select");
const pageTitle = document.getElementById("page-title");

const quotes = [
  "勝つまでやめなければ、負けない。",
  "恐怖に打ち勝てる者だけが利益を手にする。",
  "マーケットは常に正しい。間違っているのはあなた。",
  "勝者はリスクを恐れず、敗者はチャンスを逃す。",
  "準備が勝利の鍵となる。",
  "一貫性は最強の武器である。",
  "コントロールできるのは『損失』だけだ。"
];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const balance = parseFloat(document.getElementById("balance").value);
  const riskPercent = parseFloat(document.getElementById("risk").value);
  const entry = parseFloat(document.getElementById("entry").value);
  const stop = parseFloat(document.getElementById("stop").value);
  const take = parseFloat(document.getElementById("take").value);
  const pair = pairSelect.value;

  const riskAmount = balance * (riskPercent / 100);
  const perUnitLoss = Math.abs(entry - stop);
  const positionSize = riskAmount / perUnitLoss;
  const profit = take ? (Math.abs(take - entry) * positionSize) : "-";

  positionSizeEl.textContent = `${positionSize.toFixed(4)} ${pair}`;
  lossAmountEl.textContent = `${riskAmount.toFixed(2)} USDT`;
  profitAmountEl.textContent = typeof profit === "string" ? "-" : `${profit.toFixed(2)} USDT`;

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = `💬「${randomQuote}」`;

  result.classList.remove("hidden");

  // カラー切替
  document.body.style.background = pair === "BTC"
    ? "linear-gradient(to bottom right, #fffbe6, #fff)"
    : "linear-gradient(to bottom right, #e0f7fa, #ffffff)";
  document.querySelector(".result-card").style.backgroundColor = pair === "BTC" ? "#fff3e0" : "#e1f5fe";
  pageTitle.textContent = `【${pair} FX専用】ポジションサイズ自動計算`;
});
