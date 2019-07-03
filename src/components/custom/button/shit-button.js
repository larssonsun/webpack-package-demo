export {
    fkbutton
}

let fkbutton = (parent, msg) => {
    let bt = document.createElement("button");
    bt.innerHTML = "fukin button";
    bt.onclick = () => {
        alert(msg + "; NODE_ENV in shit-button: " + process.env.NODE_ENV)
    };
    parent.appendChild(bt);
};