const margin = document.getElementById("margin");
const entryPrice = document.getElementById("entry-price");
const leverage = document.getElementById("leverage");
const stopLoss = document.getElementById("stop-loss");
const takeProfit = document.getElementById("take-profit");

const positionSizeEl = document.getElementById("position-size");
const lossAmountEl = document.getElementById("loss-amount");
const profitAmountEl = document.getElementById("profit-amount");
const resultCard = document.getElementById("result-card");

const currencyTabs = document.querySelectorAll(".currency-tab");

function calculate() {
  const m = parseFloat(margin.value);
  const e = parseFloat(entryPrice.value);
  const l = parseFloat(leverage.value);
  const s = parseFloat(stopLoss.value);
  const t = parseFloat(takeProfit.value);

  if (isNaN(m) || isNaN(e) || isNaN(l) || isNaN(s)) {
    resultCard.classList.add("hidden");
    return;
  }

  const maxPositionSize = (m * l) / e;
  const stopDiff = Math.abs(e - s);
  const lossPerUnit = stopDiff;
  const lossAmount = lossPerUnit * maxPositionSize;

  positionSizeEl.textContent = maxPositionSize.toFixed(4) + " 枚";
  lossAmountEl.textContent = Math.floor(lossAmount).toLocaleString() + " 円";

  if (!isNaN(t)) {
    const profitPerUnit = Math.abs(t - e);
    const profitAmount = profitPerUnit * maxPositionSize;
    profitAmountEl.textContent = Math.floor(profitAmount).toLocaleString() + " 円";
  } else {
    profitAmountEl.textContent = "-";
  }

  resultCard.classList.remove("hidden");
}

// 入力変更で即時反映
[margin, entryPrice, leverage, stopLoss, takeProfit].forEach(input => {
  input.addEventListener("input", calculate);
});

// タブ切り替え
currencyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".currency-tab.active").classList.remove("active");
    tab.classList.add("active");

    const selected = tab.getAttribute("data-currency");
    document.body.setAttribute("data-currency", selected);

    // 入力リセット
    [margin, entryPrice, leverage, stopLoss, takeProfit].forEach(input => input.value = "");
    resultCard.classList.add("hidden");
  });
});
