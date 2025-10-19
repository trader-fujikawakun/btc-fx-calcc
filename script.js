function calculatePositionSize() {
  const balance = parseFloat(document.getElementById("balance").value);
  const riskPercentage = parseFloat(document.getElementById("riskPercentage").value);
  const entryPrice = parseFloat(document.getElementById("entryPrice").value);
  const stopLoss = parseFloat(document.getElementById("stopLoss").value);
  const takeProfit = parseFloat(document.getElementById("takeProfit").value);

  if (isNaN(balance) || isNaN(riskPercentage) || isNaN(entryPrice) || isNaN(stopLoss)) {
    document.getElementById("result").style.display = "none";
    return;
  }

  const riskAmount = balance * (riskPercentage / 100);
  const positionSize = riskAmount / Math.abs(entryPrice - stopLoss);
  document.getElementById("positionSize").innerText =
    `ポジションサイズ: ${positionSize.toFixed(3)} 枚`;

  if (!isNaN(takeProfit)) {
    const expectedProfit = positionSize * Math.abs(takeProfit - entryPrice);
    document.getElementById("expectedProfit").innerText =
      `想定利益: ${expectedProfit.toFixed(2)} USDT`;
  } else {
    document.getElementById("expectedProfit").innerText = "";
  }

  document.getElementById("result").style.display = "block";
}

// 自動計算イベント
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculatePositionSize);
});

// 通貨切替
document.getElementById("btc-tab").addEventListener("click", () => setCurrencyTab("btc"));
document.getElementById("xaut-tab").addEventListener("click", () => setCurrencyTab("xaut"));
document.getElementById("eth-tab").addEventListener("click", () => setCurrencyTab("eth"));
document.getElementById("xrp-tab").addEventListener("click", () => setCurrencyTab("xrp"));

function setCurrencyTab(tab) {
  const buttons = document.querySelectorAll(".currency-toggle button");
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(`${tab}-tab`).classList.add("active");

  const bgColors = {
    btc: "#fff9f2",
    xaut: "#f0f4f9",
    eth: "#eaf7ff",
    xrp: "#f8f0ff"
  };

  document.body.style.backgroundColor = bgColors[tab] || "#ffffff";
}
