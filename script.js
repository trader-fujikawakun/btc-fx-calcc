document.addEventListener("DOMContentLoaded", () => {
  const currencyButtons = document.querySelectorAll(".currency-btn");
  const unitDisplay = document.getElementById("unit");

  const inputs = {
    balance: document.getElementById("balance"),
    lossPercent: document.getElementById("lossPercent"),
    entryPrice: document.getElementById("entryPrice"),
    stopLossPrice: document.getElementById("stopLossPrice"),
    takeProfitPrice: document.getElementById("takeProfitPrice")
  };

  const results = {
    positionSize: document.getElementById("positionSize"),
    expectedLoss: document.getElementById("expectedLoss"),
    expectedProfit: document.getElementById("expectedProfit")
  };

  const currencyUnits = {
    BTC: "BTC",
    XAUT: "XAUT",
    ETH: "ETH",
    XRP: "XRP"
  };

  const backgroundColors = {
    BTC: "#fff8ec",
    XAUT: "#f5eee6",
    ETH: "#f1f1f1",
    XRP: "#eeeeee"
  };

  let selectedCurrency = "BTC";

  function calculate() {
    const b = parseFloat(inputs.balance.value);
    const p = parseFloat(inputs.lossPercent.value);
    const e = parseFloat(inputs.entryPrice.value);
    const s = parseFloat(inputs.stopLossPrice.value);
    const tp = parseFloat(inputs.takeProfitPrice.value);

    if (isNaN(b) || isNaN(p) || isNaN(e) || isNaN(s) || e === s) return;

    const lossAmount = b * (p / 100);
    const size = lossAmount / Math.abs(e - s);
    results.positionSize.textContent = size.toFixed(4);
    results.expectedLoss.textContent = lossAmount.toFixed(2) + " USDT";

    if (!isNaN(tp)) {
      const profitAmount = Math.abs(tp - e) * size;
      results.expectedProfit.textContent = profitAmount.toFixed(2) + " USDT";
    } else {
      results.expectedProfit.textContent = "-";
    }
  }

  Object.values(inputs).forEach(input => {
    input.addEventListener("input", calculate);
  });

  currencyButtons.forEach(button => {
    button.addEventListener("click", () => {
      currencyButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      selectedCurrency = button.dataset.currency;

      // 背景変更
      document.body.style.background = backgroundColors[selectedCurrency] || "#ffffff";

      // 単位変更
      unitDisplay.textContent = currencyUnits[selectedCurrency];

      // 例文表示はBTCだけ
      document.querySelectorAll(".example").forEach(el => {
        el.style.display = selectedCurrency === "BTC" ? "inline" : "none";
      });

      // 入力値リセット
      Object.values(inputs).forEach(input => {
        input.value = "";
      });

      // 結果リセット
      results.positionSize.textContent = "-";
      results.expectedLoss.textContent = "-";
      results.expectedProfit.textContent = "-";
    });
  });

  calculate();
});
