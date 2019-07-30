


var saida = testecallback(10,(valor) => {

    let valor2 = valor
    console.log(valor2)

    valor2=valor2*345
    return valor2
});
function testecallback(parametro,callback){

    let manipulado = parametro*parametro/8*5
    return callback(manipulado)
}


console.log(saida)