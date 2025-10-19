const tabs = document.querySelectorAll(".currency-tab");
const body = document.body;
const examples = document.querySelectorAll(".example");
const results = document.getElementById("results");
const form = document.getElementById("calc-form");

// 現在の通貨
let currentCurrency = "BTC";

// 通貨ごとの背景と色テーマ
const themes = {
  BTC: {
    bg: "var(--btc-bg)",
    color: "var(--btc-color)",
  },
  XAUT: {
    bg: "var(--xaut-bg)",
    color: "var(--xaut-color)",
  },
  ETH: {
    bg: "var(--eth-bg)",
    color: "var(--eth-color)",
  },
  XRP: {
    bg: "var(--xrp-bg)",
    color: "var(--xrp-color)",
  },
};

// タブ切り替え処理
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.dataset.currency;
    currentCurrency = selected;
    applyTheme(selected);
    updateExample(selected);
    autoCalculate(); // 切り替えたら再計算
  });
});

// テーマ適用
function applyTheme(currency) {
  const theme = themes[currency];
  body.style.background = theme.bg;
}

// BTCだけ記入例を表示
function updateExample(currency) {
  examples.forEach((ex) => {
    ex.style.display = ex.dataset.currency === currency ? "inline" : "none";
  });
}

// 入力イベントで自動計算
form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", autoCalculate);
});

// 自動計算関数
function autoCalculate() {
  const price = parseFloat(document.getElementById("price").value);
  const lossAmount = parseFloat(document.getElementById("loss-amount").value);
  const lossPercent = parseFloat(document.getElementById("loss-percent").value);
  const lossPrice = parseFloat(document.getElementById("loss-price").value);
  const profitPrice = parseFloat(document.getElementById("profit-price").value);

  if (
    isNaN(price) || isNaN(lossAmount) || isNaN(lossPercent) || isNaN(lossPrice)
  ) {
    results.classList.add("hidden");
    return;
  }

  const positionSize = lossAmount / Math.abs(price - lossPrice);
  const expectedLoss = Math.abs(price - lossPrice) * positionSize;
  const expectedProfit = isNaN(profitPrice)
    ? "-"
    : ((Math.abs(profitPrice - price)) * positionSize).toFixed(0);

  document.getElementById("position-size").textContent = positionSize.toFixed(3);
  document.getElementById("expected-loss").textContent = expectedLoss.toFixed(0);
  document.getElementById("expected-profit").textContent = expectedProfit;

  results.classList.remove("hidden");
}

// 初期化
applyTheme("BTC");
updateExample("BTC");
