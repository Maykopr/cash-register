const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cidDisplay = document.getElementById("cid-display");
const priceDisplay = document.getElementById("price");

let price = 3.26;
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

function resolveExtenge() {
	let cidWithCurrency = cid.map((curr) => [...curr, cidCurrency[curr[0]]]).reverse();
	let changeDue = parseFloat((cashInput.value - price).toFixed(2));
	let totalFunds = parseFloat(cidWithCurrency.reduce((acc, val) => acc + val[1], 0).toFixed(2));
	if (totalFunds < changeDue) {
		return (displayChangeDue.innerHTML = '<p class="status">Status: INSUFFICIENT_FUNDS</p>');
	}
	let result = "";
	cidWithCurrency.forEach((curr) => {
		const currency = curr[2];
		let originalValue = curr[1];
		if (changeDue >= currency && curr[1] > 0) {
			while (changeDue >= currency && curr[1] > 0) {
				changeDue = parseFloat((changeDue - currency).toFixed(2));
				curr[1] = parseFloat((curr[1] - currency).toFixed(2));
			}
			result += "<p>" + curr[0] + ": $" + parseFloat((originalValue - curr[1]).toFixed(2)) + "</p>";
		}
	});
	totalFunds = parseFloat(cidWithCurrency.reduce((acc, val) => acc + val[1], 0).toFixed(2));

	cid = cidWithCurrency.map((curr) => [curr[0], curr[1]]).reverse();
	if (changeDue > 0) {
		return (displayChangeDue.innerHTML = '<p class="app__status">Status: INSUFFICIENT_FUNDS</p>');
	} else if (totalFunds === 0) {
		displayCid(cidWithCurrency);
		return (displayChangeDue.innerHTML = `<p class="app__status">Status: CLOSED </p><p>${result}</p>`);
	} else {
		displayCid(cidWithCurrency);
		return (displayChangeDue.innerHTML = `<p class="app__status">Status: OPEN <p>${result}</p>`);
	}
}

function displayCid(arr) {
	const result = arr.map((item) => `<p>${item[0]}: ${item[1]}</p>`).join("");
	cidDisplay.innerHTML = `<h3 class="drawer__title">Change in drawer:</h3>${result}`;
}

function main() {
	if (cashInput.value < price) {
		alert("Customer does not have enough money to purchase the item");
		cashInput.value = "";
		return;
	} else if (parseFloat(cashInput.value) === price) {
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
