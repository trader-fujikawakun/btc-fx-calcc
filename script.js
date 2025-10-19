document.addEventListener("DOMContentLoaded", () => {
  const currencyButtons = document.querySelectorAll(".currency-btn");
  const unitDisplay = document.getElementById("unit");

  const balance = document.getElementById("balance");
  const lossPercent = document.getElementById("lossPercent");
  const entryPrice = document.getElementById("entryPrice");
  const stopLossPrice = document.getElementById("stopLossPrice");
  const takeProfitPrice = document.getElementById("takeProfitPrice");

  const positionSize = document.getElementById("positionSize");
  const expectedLoss = document.getElementById("expectedLoss");
  const expectedProfit = document.getElementById("expectedProfit");

  let selectedCurrency = "BTC";

  const currencyUnits = {
    BTC: "BTC",
    XAUT: "XAUT",
    ETH: "ETH",
    XRP: "XRP"
  };

  function calculate() {
    const b = parseFloat(balance.value);
    const p = parseFloat(lossPercent.value);
    const e = parseFloat(entryPrice.value);
    const s = parseFloat(stopLossPrice.value);
    const tp = parseFloat(takeProfitPrice.value);

    if (isNaN(b) || isNaN(p) || isNaN(e) || isNaN(s) || e === s) return;

    const lossAmount = b * (p / 100);
    const size = lossAmount / Math.abs(e - s);
    positionSize.textContent = size.toFixed(4);
    expectedLoss.textContent = lossAmount.toFixed(2) + " USDT";

    if (!isNaN(tp)) {
      const profitAmount = Math.abs(tp - e) * size;
      expectedProfit.textContent = profitAmount.toFixed(2) + " USDT";
    } else {
      expectedProfit.textContent = "-";
    }
  }

  [balance, lossPercent, entryPrice, stopLossPrice, takeProfitPrice].forEach(input => {
    input.addEventListener("input", calculate);
  });

  currencyButtons.forEach(button => {
    button.addEventListener("click", () => {
      currencyButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      selectedCurrency = button.dataset.currency;
      unitDisplay.textContent = currencyUnits[selectedCurrency];

      // 通貨ごとの背景色切り替え
      let bg = "#ffffff";
      if (selectedCurrency === "BTC") bg = "#fff4e6";
      if (selectedCurrency === "XAUT") bg = "#f1e3d3";
      if (selectedCurrency === "ETH") bg = "#e6e6e6";
      if (selectedCurrency === "XRP") bg = "#f4f4f4";
      document.body.style.background = bg;

      // 記入例はBTCのみ表示
      document.querySelectorAll(".example").forEach(el => {
        el.style.display = (selectedCurrency === "BTC") ? "inline" : "none";
      });

      calculate();
    });
  });

  calculate(); // 初期計算
});
