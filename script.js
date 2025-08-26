function menuHeader(){
    const menuButtons = [...document.querySelectorAll(".btnMenu")];
    const contentSections = [...document.querySelectorAll(".content-sections")];

    if(menuButtons.length>0){
            menuButtons[0].click();
        }
        

    menuButtons.map((btn)=>{
        btn.addEventListener("click",()=>{
        

            menuButtons.map((btn) => {
                btn.classList.remove("active")
            });

            btn.classList.add("active");


            renderSection(btn.getAttribute("data-target"));

        })
    })


    function renderSection(id){

        contentSections.map((section)=>{
            section.style.display = "none";
        })

        const targetSection = document.getElementById(id);

        if(targetSection){
            targetSection.style.display = "block";
        }

        
    }
}

menuHeader();

function nutriFacilApp(){
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
                imc: {
                    valor: imc, categoria: categoriaIMC(imc)
                },
                taxaMetabolica: {
                    valorRepouso: tmb,
                    valorDiario: Math.round(fatorAtividade),
                    formula: formulaTMB(imc)
                }
            }

            console.log(paciente);

            var resultados = [
                "Categoria: "+paciente.imc.categoria,
                "TMB em Repouso: "+paciente.taxaMetabolica.valorRepouso + " kcal",
                "TMB Diário: "+paciente.taxaMetabolica.valorDiario + " kcal"];

            var listaResultado = document.getElementById("resultadoTMBLista");
            listaResultado.innerText = "";
            resultados.map((item)=>{
                
                var li = document.createElement("li");
                li.innerText = item;
                listaResultado.appendChild(li);

            })


            document.getElementById("resultadoTMB").style.opacity = "1";
            document.querySelector(".resultado p").style.display = "none";

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
            if(imc >= 30){
                return harrisBenedict(peso, altura,idade,sexo);
            } 
            else{
                return mifflinStJeor(peso, altura,idade,sexo);
            }
        }

        function formulaTMB(imc){
            return imc >= 30 ? "Mifflin St. Jeor" : "Harris Benedict";
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
                case "sedentario":
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
}

nutriFacilApp();


function tabelaNutricionalNavegacao(){

    // Pega todas as abas e seus conteudos
    const abasNutricionaisArray = [...document.querySelectorAll(".title-tabs")];
    const contentAbasArray = [...document.querySelectorAll(".content-tabs")];

    // Adicionando data-target nos botoes
    abasNutricionaisArray.map((abaTitle)=>{
        if(!abaTitle.dataset.target){
            abaTitle.dataset.target = abaTitle.textContent.toLowerCase()+"-section";
        }
    });


    


    // Adiconando evento de click em cada aba
    abasNutricionaisArray.map((abaTitle)=>{
        abaTitle.addEventListener("click",()=>{

            // remove a classe ativa de todas
            abasNutricionaisArray.map((abaTitle)=>{

                abaTitle.classList.remove("active-tab");
            })

             // adiciona a classe na aba clicada
            abaTitle.classList.add("active-tab");
            

            // mostrar o conteudo correspondente
            var id = abaTitle.getAttribute("data-target");
            renderContentTabs(id);


        })

       

        // Pega a primeira aba e ativa
        if(abasNutricionaisArray.length>0){
            abasNutricionaisArray[0].click();
        }

    })


    function renderContentTabs(id){
        contentAbasArray.map((contentTab)=>{
            contentTab.style.display = "none";
        })

        const targetAbaId = document.getElementById(id);
        if(targetAbaId){
            targetAbaId.style.display = "block";
        }

    }
}

tabelaNutricionalNavegacao();


async function carregarDadosTabelaNutricional(){
    try{
        const response = await fetch("alimentos.json");
        if(!response.ok) throw new Error("Falha ao carregar dados");

        const dadosNutricionais = await response.json();

        // 1. criando um array para todos os alimentos
        const todosAlimentos = [];


        // return Object.entries(dadosNutricionais)
        //     .flatMap(([categoria, items]) => 
                
        //         items.map((item)=>{

        //             const partes = item.nome.split("(");
        //             const nome = partes[0].trim();
        //             const porcao = partes[1] ? partes[1].replace("(","").trim(): "100g";


        //              const id = `${categoria.toLowerCase()}-${nome.toLowerCase().replace(/\s+/g, '-')}`

        //             return {
        //                 categoria: categoria,
        //                 nome: nome,
        //                 porcao: porcao,
        //                 calorias: item.calorias,
        //                 id:id
        //             }

        // })); 


        // 2.processando cada categoria do array
       for(const [categoria, alimentos] of Object.entries(dadosNutricionais)){

            
            //3.processando cada alimento
            for(const alimentoItem of alimentos){


                // 3.extraindo nome e porcao
                const partes = alimentoItem.nome.split("(");
                const nome = partes[0].trim();
                const porcao = partes[1] ? partes[1].replace(")","").trim(): "100g";

                const id = `${categoria.toLowerCase()}-${nome.toLowerCase().replace(/\s+/g, '-')}`


                alimentoObjeto = {
                    categoria: categoria,
                    nome: nome,
                    porcao: porcao,
                    calorias: alimentoItem.calorias,
                    id: id
                }

                todosAlimentos.push(alimentoObjeto);
            }
        }

        return todosAlimentos;

    } catch(error){
        console.log("Erro ao carregar dados nutricionais: ", error);
    }
}


async function rendertabelaNutricional(){
    //dados para as tabelas
    const dados = await carregarDadosTabelaNutricional()

    //criando array de categorias
    const categorias = [...new Set(dados.map(item=>item.categoria))];
    
    //criando arrays de alimentos para cada categoria
    for(const categoria of categorias){
        const alimentosFiltrados = dados.filter(item =>item.categoria === categoria);
        
        // container para as tabelas
        const contentID = normalizarParaID(categoria);

        //renderizar uma tabela para cada elemento do DOM
        renderTabelaPorCategoria(categoria,alimentosFiltrados,contentID)
        

    
    }


    function normalizarParaID(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
        .replace(/\s+/g, '-') // Espaços para hífens
        + '-section';
}
}

rendertabelaNutricional();



 function renderTabelaPorCategoria(categoria,alimentosFiltrados, id){
    

    const categoriaContent = document.getElementById(id);
    categoriaContent.innerHTML = "";

    // cria a div para a tabela
    const divTabela = document.createElement("div");
    divTabela.classList.add("tabela-categoria");
    divTabela.setAttribute("data-categoria",categoria);

    // // cria titulo
    const titulo = document.createElement("h2");
    titulo.textContent = categoria;
    divTabela.appendChild(titulo);

    //criando tabela
    const tabela = document.createElement("table");

    //criando cabecalho
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");


    const textosHeader = ["Alimento","Porcao","Calorias"];

    textosHeader.forEach(texto=>{
        const th = document.createElement("th");
        th.textContent = texto;
        headerRow.appendChild(th);
    })

    thead.appendChild(headerRow);
    tabela.appendChild(thead)


    // Criando corpo
    const corpoTabela = document.createElement("tbody");

    const alimentosFiltradosOrdenaddos = [...alimentosFiltrados].sort((a, b)=>a.nome.localeCompare(b.nome));
    for(const alimento of alimentosFiltradosOrdenaddos){

        const row = document.createElement("tr")

        const alimentoPropriedade = ["nome","porcao","calorias"];
        alimentoPropriedade.forEach(propriedade =>{
            const td = document.createElement("td")
            td.textContent = alimento[propriedade]

            if(alimento.calorias < 100){
                row.setAttribute("data-calorias", "true");
            }
            row.appendChild(td);
            
        })

        corpoTabela.appendChild(row)
    }

    tabela.appendChild(corpoTabela);
    divTabela.appendChild(tabela);



    categoriaContent.appendChild(divTabela);
}


async function renderTabelaTodosAlimentos(){
    
    const todosOsAlimentos = await carregarDadosTabelaNutricional();
    const todosOsAlimentosOrdenados = [...todosOsAlimentos].sort((a, b)=>a.nome.localeCompare(b.nome));

    
    const categoria = "Todos os alimentos";
    const categoriaContent = document.getElementById("nonSeachTable");

    // cria a div para a tabela
    const divTabela = document.createElement("div");
    divTabela.classList.add("tabela-categoria");
    divTabela.setAttribute("data-categoria",categoria);

    // // cria titulo
    const titulo = document.createElement("h2");
    titulo.textContent = categoria;
    

    //criando tabela
    const tabela = document.createElement("table");
    divTabela.appendChild(titulo);

    //criando cabecalho
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");


    const textosHeader = ["Alimento","Porcao","Calorias","Categoria"];

    textosHeader.forEach(texto=>{
        const th = document.createElement("th");
        th.textContent = texto;
        headerRow.appendChild(th);
    })

    thead.appendChild(headerRow);
    tabela.appendChild(thead)


    // Criando corpo
    const corpoTabela = document.createElement("tbody");

    for(const alimento of todosOsAlimentosOrdenados){

        const row = document.createElement("tr")

        const alimentoPropriedade = ["nome","porcao","calorias","categoria"];
        alimentoPropriedade.forEach(propriedade =>{
            const td = document.createElement("td")
            td.textContent = alimento[propriedade]

            if(alimento.calorias < 100){
                row.setAttribute("data-calorias", "true");
            }
            row.appendChild(td);
            
        })

        corpoTabela.appendChild(row)
    }

    tabela.appendChild(corpoTabela);
    divTabela.appendChild(tabela);



    categoriaContent.appendChild(divTabela);
    document.getElementById("seachTable").style.display = "none";

}


renderTabelaTodosAlimentos();


function buttonMobile(){

    const menuMobileButton  =document.querySelector(".menuMobileButton");

    const menuLinks  = document.querySelector(".menuLinks");

    const body = document.querySelector("body")

    

    menuMobileButton.addEventListener("click", ()=>{

        menuMobileButton.classList.toggle("active")
        menuLinks.classList.toggle("active")

        document.addEventListener("click",(event)=>{
        if(!menuMobileButton.contains(event.target) && !menuLinks.contains(event.target)){
            menuMobileButton.classList.remove("active")
            menuLinks.classList.remove("active")
        }
    })
    })

    

    
}

buttonMobile();



function seachBar(){
    var formPesqusar = document.getElementById("form-pesquisar");

    return formPesqusar.addEventListener("submit",async (event)=>{
        event.preventDefault();
        
        const buscaElement = document.getElementById("seachBar");
        const buscaValor = normalizeText(buscaElement.value);

        const todosAlimentos = await carregarDadosTabelaNutricional();

        const alimentosMatch = todosAlimentos.filter((alimento) =>{

            const nomeAlimento = normalizeText(alimento.nome);
           
            
          return buscaValor === nomeAlimento || buscaValor.includes(nomeAlimento) || nomeAlimento.includes(buscaValor);
        })

        renderSeachTable(alimentosMatch,buscaValor);
    })
}

seachBar();

function renderSeachTable(array,busca){

    const todosOsAlimentos = array;
    console.log(todosOsAlimentos)
    const todosOsAlimentosOrdenados = [...todosOsAlimentos].sort((a, b)=>a.nome.localeCompare(b.nome));

    
    const categoria = "Busca por: " + busca;
    const categoriaContent = document.getElementById("seachTable")
    categoriaContent.innerHTML = "";


    // cria a div para a tabela
    const divTabela = document.createElement("div");
    divTabela.classList.add("tabela-categoria");
    divTabela.setAttribute("data-categoria",categoria);

    // // cria titulo
    const titulo = document.createElement("h2");
    titulo.textContent = categoria;
    divTabela.appendChild(titulo);

    //criando tabela
    const tabela = document.createElement("table");

    //criando cabecalho
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");


    const textosHeader = ["Alimento","Porcao","Calorias","Categoria"];

    textosHeader.forEach(texto=>{
        const th = document.createElement("th");
        th.textContent = texto;
        headerRow.appendChild(th);
    })

    thead.appendChild(headerRow);
    tabela.appendChild(thead)


    // Criando corpo
    const corpoTabela = document.createElement("tbody");

    for(const alimento of todosOsAlimentosOrdenados){

        const row = document.createElement("tr")

        const alimentoPropriedade = ["nome","porcao","calorias","categoria"];
        alimentoPropriedade.forEach(propriedade =>{
            const td = document.createElement("td")
            td.textContent = alimento[propriedade]

            if(alimento.calorias < 100){
                row.setAttribute("data-calorias", "true");
            }
            row.appendChild(td);
            
        })

        corpoTabela.appendChild(row)
    }

    tabela.appendChild(corpoTabela);
    divTabela.appendChild(tabela);



    categoriaContent.appendChild(divTabela);

    categoriaContent.style.display = "block";
    document.getElementById("nonSeachTable").style.display = "none";
}


function normalizeText(texto){
        return texto.toLowerCase()
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
        .replace(/\s+/g, '-') // Espaços para hífens
}

function todosButtonTab(){
    document.getElementById("todosButtonTab").addEventListener("click",() =>{
        
        document.getElementById("seachBar").value = "";
        document.getElementById("seachTable").style.display = "none";
        document.getElementById("nonSeachTable").style.display = "block";
    })
}

todosButtonTab();

function startApp(){
    document.getElementById("taxaMetabolicaBasal").style.display = "none";
    document.getElementById("tabelaNutricional").style.display = "block";
}


startApp();