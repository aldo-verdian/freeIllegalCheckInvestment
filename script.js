let dataIllegal = [];
let search_Data = [];
const RENDER_DATA = "render-data";

async function getDataIllegal(){
    let response = await fetch('https://ojk-invest-api.vercel.app/api/illegals');
    let data = await response.json();
    return data;
}
document.addEventListener("DOMContentLoaded", ()=>{
    const inputForm = document.getElementById('form-check');
    
    getDataIllegal().then(
        response=>{
            dataIllegal = response.data.illegals.map((data)=>{
                return data;
            })
        }
    );

    inputForm.addEventListener("submit", (event) => {
        searchData();
        event.preventDefault();
    });
});
document.addEventListener(RENDER_DATA, () => {
    show(search_Data);
});
function createResultElement(dataObject){
    const card = document.createElement('div');
    card.classList.add('result-card');
    const content = document.createElement('div');
    content.classList.add('card-content');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image');
    const image = document.createElement('img');
    image.src = "image/building1.png";
    image.alt = "icon building";
    const txtContainer = document.createElement('div');
    txtContainer.classList.add('card-txt-content');
    const office_name = document.createElement('h3');
    office_name.innerText = dataObject.name;
    const alias = document.createElement('h4');
    alias.innerText = (dataObject.alias.length > 0) ? `(${dataObject.alias[0]})` : "Tidak ada";
    const tipe = document.createElement('p');
    tipe.innerText = (dataObject.type !== "") ? dataObject.type : "Tidak diketahui";
    const footer = document.createElement('div');
    footer.classList.add("card-footer");
    const address = document.createElement('p');
    address.innerText = (dataObject.address !== "") ? dataObject.address : "Tidak diketahui";
    imageContainer.append(image);
    txtContainer.append(office_name,alias,tipe);
    content.append(imageContainer,txtContainer);
    footer.append(address);
    card.append(content,footer);
    return card;
}
function searchData(){
    const search_name = document.getElementById('input-name').value;
    const regex = new RegExp(search_name,'i');
    search_Data = [];
    search_Data = dataIllegal.filter((data) => {
        console.log(regex.test(data.name));
        return regex.test(data.name);
    });
    document.dispatchEvent(new Event(RENDER_DATA));
}
function show(arrayData){
    const result = document.getElementById('result');
    result.innerHTML = "";
    for(let i=0; i<=arrayData.length;i++){
        const element = createResultElement(arrayData[i]);
        result.append(element);
    }
}