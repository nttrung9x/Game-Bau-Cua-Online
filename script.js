const $ = document.querySelector.bind (document);
const $$ = document.querySelectorAll.bind (document);

const submit = $("#submit");
const BauCua = $("#BauCua");
const Audio = $("#audio");

const IMG = $$ (".LacBC");
const Chips = $$ (".ChipsCoin");
const ChooseBC = $$ (".ChooseBC");

const PlateLidPlace = $("#PlateLidPlace");
const PlateLid = $("#PlateLid");
const Lid = $("#Lid");
const LidIn = $("#LidIn");
const closeShake = $("#closeShake");
const balanceText = $("#balanceText");
const ShowBet = $("#ShowBet");


var Balance = 500000000;

const XiNgau = ["Nai.png","Bau.png","Ga.png","Ca.png","Cua.png","Tom.png"];
const PriceChip = [1,5,10,20,50,100,500,1000];

const NameBC = ["Nai","Bầu","Gà","Cá","Cua","Tôm"];
var ValueBC = [0,0,0,0,0,0];

var ResultBet = ["Cua","Cua","Cua"];

var ChipNow = PriceChip[0];

var Count = 35;

var CanSub = true;

submit.addEventListener ("click", () => {
	if (CanSub) {
		CanSub = false;
		closeShake.style.display = "none";
		Audio.load ();
		submit.classList.add ("block");
		PlateLidPlace.style.display = "flex";
		Lid.style.animationDirection = "initial";
		Lid.style.animationFillMode = "backwards";
		setTimeout (()=>{
			Audio.play ();
			PlateLid.classList.add ("shake");
			RandomBauCua ();
			LidIn.style.display = "initial";
			Lid.style.display = "none";
		},1000);
		
	}
});

closeShake.addEventListener ("click", () => {
	CanSub = true;
	submit.classList.remove ("block");
	PlateLidPlace.style.display = "none";
	let RemoveChip =  document.getElementsByClassName ("chipBet");
	while(RemoveChip.length > 0){
        RemoveChip[0].parentNode.removeChild(RemoveChip[0]);
    };
});

function RandomBauCua () {
	setTimeout (() => {
		PlateLid.classList.remove ("shake");
		Audio.pause ();
		IMG.forEach(function(userItem,index) {
			let indexRD = Math.floor (Math.random () * 6);
			userItem.src = "BauCua/"+XiNgau[indexRD];
			ResultBet[index] = NameBC[indexRD];
		});
		LidIn.style.display = "none";
		Lid.style.display = "initial";
		Lid.style.animationDirection = "reverse";
		Lid.style.animationFillMode = "forwards";
		closeShake.style.display = "initial";
		for (var i=0; i<ResultBet.length; i++) {
			Balance+=ValueBC[NameBC.indexOf(ResultBet[i])];
		}
		for (var i=0; i<ValueBC.length; i++) {
			if (ResultBet.includes(NameBC[i]))
				Balance+=ValueBC[i];
			ValueBC[i] = 0;
		}
		ChangeBalance ();
	},1500);
}

Chips.forEach ((item, index) => {
	item.onclick = function () {
		$(".ChipsCoin.ChipsActive").classList.remove ("ChipsActive");
		this.classList.add ("ChipsActive");
		ChipNow = PriceChip[index];
	};
});

ChooseBC.forEach ((item,index) => {
	item.onclick = function () {
		if (ChipNow <= Balance) {
			let coordT = Math.floor(Math.random () * (ChooseBC[0].offsetWidth - 55));
			let coordL = Math.floor(Math.random () * (ChooseBC[0].offsetWidth - 55));
			Balance-= ChipNow;
			item.insertAdjacentHTML ("beforeend","<img class='chipBet' style='--randomIndexT:"+coordT+"px; --randomIndexL:"+coordL+"px;' src='Chips/Chip"+ChipNow+".png'>")
			ValueBC[index] += ChipNow;
			$("#BetNowBC"+index).textContent = NameBC[index]+": "+ConvertMoney (ValueBC[index])+"$";
			ChangeBalance ();
		}
		else {
			Swal.fire(
			  'Không Đủ Tiền',
			  'Số tiền đặt cược vượt quá số tiền hiện có...',
			  'error'
			)
		}
	};
});

function ChangeBalance () {
	balanceText.textContent = "Tài sản: "+ConvertMoney (Balance)+"$";
}

function ConvertMoney (money) {
	let text = money.toString();
	let result = "";
	let index = 0;
	for (var i=text.length-1; i>=0; i--) {
		if ((index)%3===0 && index != 0) result = "."+result;
		result = text[i]+result;
		index++;
	}
	return result;
}

function OpenDetail() {
	ShowBet.style.display = "flex";
}

function CloseDetail() {
	ShowBet.style.display = "none";
}
