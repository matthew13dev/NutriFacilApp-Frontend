var peso;
var altura;
var idade;
var sexoHomem;
var sexoMulher;

var formNutri = document.getElementById("form-nutricional");

formNutri.addEventListener("submit",(event)=>{
    event.preventDefault();

    peso = parseFloat(document.getElementById("peso").value);

    altura = parseFloat(document.getElementById("altura").value/100);

    idade = parseInt(document.getElementById("idade").value);

    sexoHomem = document.getElementById("homem").checked;
    sexoMulher = document.getElementById("mulher").checked;

    var sexoReal = sexoHomem ? "homem": "mulher";
    if (!peso || !altura || !idade || (!sexoHomem && !sexoMulher)) {
        alert("Por favor, preencha todos os campos!");
        return;
    }


    var imc = calcularIMC(peso,altura);
    var tmb = calcularTMB(imc,peso,altura,idade,sexoReal);
    var fatorAtividade = calcularFatorAtividade(document.getElementById("fatorAtividade").value,tmb);


    var paciente = {
        infoPaciente:{
            peso: peso,
            altura: altura,
            idade: idade,
            sexo: sexoReal
        },
        imc: {valor: imc, categoria: categoriaIMC(imc)},
        taxaMetabolica: {valorRepouso: tmb,valorDiario: Math.round(fatorAtividade),formula: formulaTMB(imc)}
    }

    console.log(paciente);

    var resultados = ["IMC: "+ paciente.imc.valor,"Categoria: "+paciente.imc.categoria,"TMB em Repouso: "+paciente.taxaMetabolica.valorRepouso + "cal","TMB Diário: "+paciente.taxaMetabolica.valorDiario + "cal","Fórmula Usada: "+paciente.taxaMetabolica.formula];

    var listaResultado = document.getElementById("resultadoTMBLista");
    resultados.map((item)=>{
        
        var li = document.createElement("li");
        li.innerText = item;
        listaResultado.appendChild(li);

    })


    document.getElementById("resultadoTMB").style.opacity = "1";

})



function calcularIMC(peso,altura){
    const imc=  peso / (altura*altura);
    return Math.round(imc * 100) / 100 ;
}

function categoriaIMC(imc){
    if(imc >=30){
        return "Obsidade";
    } else if(imc >= 25){
        return "Sobrepeso";
    } else if(imc >= 18.5){
        return "Peso Normal";
    } else {
        return "Abaixo do Peso";
    }
}

function calcularTMB(imc,peso,altura,idade,sexo){
    if(imc > 30){
        return harrisBenedict(peso, altura,idade,sexo);
    } 
    else{
        return mifflinStJeor(peso, altura,idade,sexo);
    }
}

function formulaTMB(imc){
    return imc > 30 ? "Mifflin St. Jeor" : "Harris Benedict";
}

function harrisBenedict(peso, altura, idade, sexo){

    var alturaCm = altura * 100;
    var homensTBM = 66 + (13.7 * peso) + (5 * alturaCm) - (6.8 * idade);
    var mulheresTBM = 665 + (9.6 * peso) + (1.8 * alturaCm) - (4.7 * idade);

    if(sexo === "homem"){

        return homensTBM;
    }
    else{
        return mulheresTBM;
    }
}

function mifflinStJeor(peso, altura, idade, sexo){

    var alturaCm = altura * 100;
    var homensTBM = (10 * peso) + (6.25 * alturaCm) - (8 * idade) + 5;
    var mulheresTBM =(10 * peso) + (6.25 * alturaCm) - (8 * idade) + 161;

    if(sexo === "homem"){
        
        return homensTBM;
    }
    else{
        return mulheresTBM;
    }

}


function calcularFatorAtividade(fatorAtividade, tmb){
    switch(fatorAtividade){
        case "sedetario":
            return tmb * 1.2;
            break;
        case "poucoAtivo":
            return tmb * 1.375;
            break;
        case "moderadamenteAtivo":
            return tmb * 1.55;
            break;
        case "muitoAtivo":
            return tmb * 1.725;
            break;
        case "extremamenteAtivo": 
            return tmb * 1.9;
            break;;
    }
}