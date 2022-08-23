How to run this web app and reproduce the issue?

1. After download the code, build solution and publish to the IIS that can visible on the network.
2. In the main.js change url of the published web http://192.168.88.159 to yours.
3. Navigate to url http://192.168.88.159/user_a.html for getting ping messages from "User B" in interval 1 sec.
4. Please another PC/laptop that plugged in to the same network. You need to navigate to url http://192.168.88.159/user_b.html for getting ping messages from "User A" in interval 1 sec.

Scenario A. Messages are received correctly.
A.1. Unplug network cable/connection from this PC/laptop for a moment (1-2 sec) and plugin back. 
A.2. Check the numbers of sequence or the delivered messages. You can experinece that all messages were delivered in right sequence as they keept in signalr buffer while connection is lost.
See video demo https://youtu.be/UbQA3LAvQRY

Scenario B. Messages are lost due to long time of reconnectiong.
A.1. Unplug network cable/connection from this PC/laptop for a long time (15 sec or more) and plugin back. 
A.2. You can experinece that part of sequence of messages are lost and not delivered from "user A".
See video demo https://youtu.be/KchVsQYV3NI

The task is to handle correctly "Scenario B" in order to avoid lost messages from "User A" during "User B" is reconnecting.
