// skywayを使う場合はこのへんを仕込んでおいて
// window.meshRoom.send() を用いてイベント発生
// 受け取ったイベントはdataを使ってフックする
window.__SKYWAY_KEY__ = "f4e8c608-6e6f-4e20-a536-967f19ab03f3";


export const peer = (window.peer = new Peer({
  key: window.__SKYWAY_KEY__,
  debug: 2,
}));
peer.once("open", (id) => {
  console.log(`open id=${id}`);
  const meshRoom = peer.joinRoom("eisei", {
    mode: "mesh",
  });
  window.meshRoom = meshRoom;
  meshRoom.on("open", () => {
    console.log("room opened");
  });
  meshRoom.on("peerJoin", (peerId) => {
    console.log(`peerId: ${peerId} joined`);
  });
  meshRoom.on("data", (obj) => {
    // 誰の発信で何を受け取ったかはこれでわかる
    console.log(`src: ${obj.src}, data: ${obj.data}`);
  });
});
peer.on("connection", (dataConnection) => {
  console.log(`dataConnection ${dataConnection}`);
});
peer.on("error", console.error);
