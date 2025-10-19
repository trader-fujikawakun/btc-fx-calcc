function calculate() {
  const capital = parseFloat(document.getElementById('capital').value) || 0;
  const riskPercentage = parseFloat(document.getElementById('riskPercentage').value) || 0;
  const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
  const stopLoss = parseFloat(document.getElementById('stopLoss').value) || 0;
  const takeProfit = parseFloat(document.getElementById('takeProfit').value);

  const riskAmount = capital * (riskPercentage / 100);
  const priceDifference = Math.abs(entryPrice - stopLoss);

  let positionSize = "-";
  let profit = "-";

  if (priceDifference && entryPrice) {
    positionSize = (riskAmount / priceDifference).toFixed(4);
  }

  if (!isNaN(takeProfit) && takeProfit > 0) {
    const potentialProfit = Math.abs(takeProfit - entryPrice) * parseFloat(positionSize);
    profit = Math.round(potentialProfit).toLocaleString();
  }

  document.getElementById('positionSize').textContent = positionSize;
  document.getElementById('lossAmount').textContent = Math.round(riskAmount).toLocaleString();
  document.getElementById('profitAmount').textContent = profit;
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculate);
});

const tabs = document.querySelectorAll(".currency-tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const currency = tab.dataset.currency;
    document.body.setAttribute("data-currency", currency);
    document.getElementById('unit').textContent = currency;

    // リセット
    document.getElementById('calcForm').reset();
    document.getElementById('positionSize').textContent = '-';
    document.getElementById('lossAmount').textContent = '-';
    document.getElementById('profitAmount').textContent = '-';

    // 記入例の表示制御
    const example = document.getElementById('priceExample');
    if (currency === 'BTC') {
      example.textContent = "(例: BTCなら4000000)";
    } else {
      example.textContent = "";
    }
  });
});
