const quotes = [
  "勝つことに集中するな。負けないことに集中せよ。",
  "恐怖は最大の敵。冷静さが勝利を呼ぶ。",
  "準備がすべてを決める。",
  "リスクを制する者が市場を制す。",
  "資金管理はトレーダーの命綱。",
  "ルールを破るならトレードをやめろ。"
];

const currencySettings = {
  BTC: { unit: "BTC", color: "#f7931a", bg: "#fff5e6" },
  XAUT: { unit: "XAUT", color: "#8B4513", bg: "#fdf1e7" },
  ETH: { unit: "ETH", color: "#3c3c3d", bg: "#f0f0ff" },
  XRP: { unit: "XRP", color: "#000000", bg: "#f7f7f7" }
};

function calculate() {
  const balance = parseFloat(document.getElementById("balance").value);
  const risk = parseFloat(document.getElementById("risk").value);
  const entry = parseFloat(document.getElementById("entry").value);
  const stoploss = parseFloat(document.getElementById("stoploss").value);
  const takeprofit = parseFloat(document.getElementById("takeprofit").value);
  const unit = document.getElementById("unit").textContent;

  if (balance && risk && entry && stoploss && entry !== stoploss) {
    const lossPerUnit = Math.abs(entry - stoploss);
    const riskAmount = balance * (risk / 100);
    const positionSize = riskAmount / lossPerUnit;

    document.getElementById("positionSize").textContent = positionSize.toFixed(4);
    document.getElementById("lossAmount").textContent = `${riskAmount.toFixed(2)} USD`;

    if (takeprofit) {
      const profitPerUnit = Math.abs(takeprofit - entry);
      const profitAmount = profitPerUnit * positionSize;
      document.getElementById("profitAmount").textContent = `${profitAmount.toFixed(2)} USD`;
    } else {
      document.getElementById("profitAmount").textContent = "-";
    }
  } else {
    document.getElementById("positionSize").textContent = "-";
    document.getElementById("lossAmount").textContent = "-";
    document.getElementById("profitAmount").textContent = "-";
  }
}

// 自動計算設定
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculate);
});

// ランダム名言
document.getElementById("randomQuote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

// 通貨切り替え
document.querySelectorAll(".currency-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".currency-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const currency = tab.dataset.currency;
    const settings = currencySettings[currency];

    // 色変更
    document.documentElement.style.setProperty("--tab-color", settings.color);
    document.documentElement.style.setProperty("--bg-color", settings.bg);

    document.getElementById("unit").textContent = settings.unit;

    // 記入例
    document.getElementById("example-balance").textContent = currency === "BTC" ? "例: 50000" : "";
    document.getElementById("example-risk").textContent = currency === "BTC" ? "例: 2" : "";
    document.getElementById("example-entry").textContent = currency === "BTC" ? "例: 35000" : "";
    document.getElementById("example-stop").textContent = currency === "BTC" ? "例: 34000" : "";
    document.getElementById("example-takeprofit").textContent = currency === "BTC" ? "例: 37000" : "";

    // 入力リセット
    document.querySelectorAll("input").forEach(i => (i.value = ""));
    calculate();
  });
});
