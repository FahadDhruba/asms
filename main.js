let sendBtn = document.getElementById("sendBtn");
let auth = 'Bearer 664|gfgo4ffap7nt8tt8qpre8wC2eIoxEc8HzUAS6EiR';

document.getElementById("sendType").addEventListener("change", function() {
    let smsstnow = document.getElementById("sendType").value;
    if (smsstnow == "ss") {
        document.getElementById("ssd").classList.remove("hidden");
        document.getElementById("bsd").classList.add("hidden");
    } else if (smsstnow == "bs") {
        document.getElementById("bsd").classList.remove("hidden");
        document.getElementById("ssd").classList.add("hidden");
    }

    //upcoming else if here
});

//function end

sendBtn.addEventListener("click", worker);

function validateInput(input) {
    const pattern = /^8801\d{9}$/;
    return pattern.test(input);
}

function worker() {

    let smsStatus = document.getElementById("sendType").value;

    if (smsStatus == "ss") {
        let receiverNum = document.getElementById("ssRecNum").value;
        let mssg = document.getElementById("sMsg").value;

        if (receiverNum != "" && mssg != "") {
            if (validateInput(receiverNum)) {
                document.getElementById("sendBtn").classList.add("hidden");
                let sid = document.getElementById("sid").value;
                fetch('https://app.smsnoc.com/api/v3/sms/send', {
                        method: 'POST',
                        headers: {
                            'Authorization': auth,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'recipient': receiverNum,
                            'sender_id': sid,
                            'type': 'plain',
                            'message': mssg
                        })
                    })
                    .then(response => response.json())
                    .then(data => {

                        if (data.status == "success") {


                            document.getElementById("successstat").innerHTML = `<span class="font-bold uppercase">${data.status}: </span>SMS sent to ${data.data.to} uid:${data.data.uid}`;
                            document.getElementById("successstat").classList.remove("hidden");
                            document.getElementById("sendBtn").classList.remove("hidden");

                            remUnitPull();
                            setTimeout(hider, 2000);


                        } else if (data.status == "error") {

                            document.getElementById("errorstat").innerHTML = `<span class="font-bold uppercase">${data.status}: </span>${data.message}`;
                            document.getElementById("errorstat").classList.remove("hidden");
                            document.getElementById("sendBtn").classList.remove("hidden");
                            setTimeout(hider, 2000);


                        } else {

                        }
                    });

            } else {
                alert("Input is not in the correct format.\n8801xxxxxxxxx is the Correct Format. 😃");
            }
        } else {
            alert("Enter Both (Receiver's Number & Message) 😤");
        }
    } else if (smsStatus == "bs") {
        let receiverNum = document.getElementById("bsRecNum").value.replace(/ /g, "");
        let mssg = document.getElementById("sMsg").value;
        if (receiverNum != "" && mssg != "") {


            let sid = document.getElementById("sid").value;
            fetch('https://app.smsnoc.com/api/v3/sms/send', {
                    method: 'POST',
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'recipient': receiverNum,
                        'sender_id': sid,
                        'type': 'plain',
                        'message': mssg
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status == "success") {


                        document.getElementById("successstat").innerHTML = `<span class="font-bold uppercase">${data.status} </span>`;
                        document.getElementById("successstat").classList.remove("hidden");
                        document.getElementById("sendBtn").classList.remove("hidden");

                        remUnitPull();
                        setTimeout(hider, 2000);


                    } else if (data.status == "error") {

                        document.getElementById("errorstat").innerHTML = `<span class="font-bold uppercase">${data.status}</span>`;
                        document.getElementById("errorstat").classList.remove("hidden");
                        document.getElementById("sendBtn").classList.remove("hidden");
                        setTimeout(hider, 2000);


                    } else {

                    }
                });
        } else {
            alert("Enter Both (Receiver's Number & Message) 😤");
        }
    } else {
        alert("Select SMS Type 😒")
    }
}

// hide warnings

function hider() {
    document.getElementById("errorstat").classList.add("hidden");
    document.getElementById("successstat").classList.add("hidden");

}


//unit data

function remUnitPull() {

    fetch('https://app.smsnoc.com/api/v3/balance', {
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("unitData").innerHTML = data.data.remaining_unit

        });

};

remUnitPull();
