let dataIllegal = [];
let search_Data = [];
const dataProduct = [];
const dataApps = [];
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
    const office_name = document.createElement('h3');
    office_name.innerText = dataObject.name;
    const desc = document.createElement('p');
    desc.innerText = dataObject.address;
    card.append(office_name,desc);
    return card;
}
function searchData(){
    const search_name = document.getElementsByClassName('input-name').value;
    const regex = new RegExp(search_name,'i');
    search_Data = [];
    search_Data = dataIllegal.filter((data) => {
        console.log(data.name);
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