const postData = async function (url, data = {}) {
    const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });
    return response.json();
};

let count = 1;
const webApi = "http://192.168.88.159"; // Please change to yours!!!
const user = document.getElementById("userName").value;
const toUser = document.getElementById("toUserName").value;

function getDate() {
    const d = new Date();
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}

async function main()
{
    const response = await postData(webApi + "/login", { userId: user });

    const connection = new signalR.HubConnectionBuilder()
        .withUrl(webApi + "/chathub", {
            accessTokenFactory: () => response.token
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.onclose(async () => {
        await start();
    });

    connection.on("ReceiveMessage", (user, message, connId) => {
        const li = document.createElement("li",);
        li.className = user;
        li.innerHTML = `<b>${user}</b>: ${message}<br><span>connection Id: ${connId}</span>`;
        document.getElementById("messageList").appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);
    });

    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
    }

    setInterval(async function () {
        try {
            await connection.invoke("SendMessageToUser", toUser, "message N<b>" + count++ + "</b> at " + getDate());
        } catch (err) {
            console.error(err);
        }
    }, 1000);

}

// Start working.
main();