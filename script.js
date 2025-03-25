const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cidDisplay = document.getElementById("cid-display");
const priceDisplay = document.getElementById("price");

const price = 3.26;
let cid = [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
];

const cidCurrency = {
	PENNY: 0.01,
	NICKEL: 0.05,
	DIME: 0.1,
	QUARTER: 0.25,
	ONE: 1,
	FIVE: 5,
	TEN: 10,
	TWENTY: 20,
	"ONE HUNDRED": 100,
};

function addCurrencyToCid() {
	const cidWithCurrency = cid.map((currency) => [...currency, cidCurrency[currency[0]]]);
	return cidWithCurrency;
}

function getTotalFunds() {
	return +cid.reduce((acc, val) => acc + val[1], 0);
}

function resolveExtenge() {
	const cidWithCurrencyReversed = addCurrencyToCid().reverse();
	let changeDue = parseFloat((cashInput.value - price).toFixed(2));
	let totalFunds = getTotalFunds();

	if (totalFunds < changeDue) {
		return (displayChangeDue.innerHTML = '<p class="status">Status: INSUFFICIENT_FUNDS</p>');
	}

	let cidToDisplay = "";

	cidWithCurrencyReversed.forEach(([currencyName, amount, currencyValue]) => {
		const originalAmount = amount;
		if (changeDue >= currencyValue && amount > 0) {
			while (changeDue >= currencyValue && amount > 0) {
				changeDue = parseFloat((changeDue - currencyValue).toFixed(2));
				amount = parseFloat((amount - currencyValue).toFixed(2));
			}
			cidToDisplay += `<p>${currencyName}: ${parseFloat((originalAmount - amount).toFixed(2))}</p>`;
		}
	});

	cid = cidWithCurrencyReversed.map((curr) => [curr[0], curr[1]]).reverse();
	totalFunds = getTotalFunds();

	if (changeDue > 0) {
		return (displayChangeDue.innerHTML = '<p class="app__status">Status: INSUFFICIENT_FUNDS</p>');
	}
	displayCid(cidWithCurrencyReversed);
	if (totalFunds === 0) {
		return (displayChangeDue.innerHTML = `<p class="app__status">Status: CLOSED </p><p>${cidToDisplay}</p>`);
	}
	displayChangeDue.innerHTML = `<p class="app__status">Status: OPEN <p>${cidToDisplay}</p>`;
}

function displayCid(arr) {
	const result = arr.map((item) => `<p>${item[0]}: ${item[1]}</p>`).join("");
	cidDisplay.innerHTML = `<h3 class="drawer__title">Change in drawer:</h3>${result}`;
}

function main() {
	const cash = +cashInput.value;
	if (cash < price) {
		alert("Customer does not have enough money to purchase the item");
		cashInput.value = "";
		return;
	}
	if (cash === price) {
		displayChangeDue.innerHTML = "<p class='status'>No change due - customer paid with exact cash</p>";
		cashInput.value = "";
		return;
	} else {
		resolveExtenge();
		cashInput.value = "";
	}
}

priceDisplay.textContent = price;
displayCid(cid);
purchaseBtn.addEventListener("click", main);

cashInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		main();
	}
});
