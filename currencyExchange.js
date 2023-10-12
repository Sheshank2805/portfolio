let secretKey = "4e073b18b234915f35f5c3f72beef9a4";
    let currencyExchangeApi = `http://data.fixer.io/api/latest?access_key=${secretKey}`;

    function updateCurrencyRates() {
    fetch(currencyExchangeApi)
      .then((result) => result.json())
      .then((currencyData) => {
        let fromCurrencySelect = document.getElementById("fromCurrency");
        let toCurrencySelect = document.getElementById("toCurrency");

        fromCurrencySelect.innerHTML = "";
        toCurrencySelect.innerHTML = "";

        Object.keys(currencyData.rates).forEach((element) => {
          let fromOption = document.createElement("option");
          let toOption = document.createElement("option");
          fromOption.value = element;
          fromOption.textContent = element;
          toOption.value = element;
          toOption.textContent = element;
          fromCurrencySelect.appendChild(fromOption);
          toCurrencySelect.appendChild(toOption);
        });

        document.getElementById("convertBtn").addEventListener("click", () => {
          let fromCurrency = fromCurrencySelect.value;
          let toCurrency = toCurrencySelect.value;
          let amount = parseFloat(document.getElementById("amount").value);

          if (!isNaN(amount)) {
            let convertedAmount = (amount / currencyData.rates[fromCurrency]) * currencyData.rates[toCurrency];
            document.getElementById("result").textContent = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}`;
          } else {
            document.getElementById("result").textContent = "Please enter a valid amount.";
          }
        });
      });
    }
    updateCurrencyRates();
setInterval(updateCurrencyRates, 24 * 60 * 60 * 1000);
