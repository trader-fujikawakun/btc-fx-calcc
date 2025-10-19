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

  const currencyUnits = {
    BTC: "BTC",
    XAUT: "XAUT",
    ETH: "ETH",
    XRP: "XRP"
  };

  const backgroundColors = {
    BTC: "#fff8ec",
    XAUT: "#f5ede3",
    ETH: "#f1f1f1",
    XRP: "#eeeeee"
  };

  let selectedCurrency = "BTC";

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
      document.body.style.background = backgroundColors[selectedCurrency] || "#ffffff";

      document.querySelectorAll(".example").forEach(el => {
        el.style.display = selectedCurrency === "BTC" ? "inline" : "none";
      });

      calculate();
    });
  });

  calculate();
});
