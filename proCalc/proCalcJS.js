function refreshMath(){
    MathJax.typeset();
}

function mathDisp(id){
    let n = id[2] + id[3];
    let iD = 'iD' + n + 'i';
    document.getElementById(iD).innerHTML = '`' + document.getElementById(id).value + '`';
    refreshMath();
}