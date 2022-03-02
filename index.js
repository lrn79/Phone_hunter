const searchPhone = () => {
    const searchFeild = document.getElementById('search_feild');
    const searchText = searchFeild.value;
    // clear data 
    searchFeild.value = '';
    // error msg for emty string 

    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }

    else {
        document.getElementById('error-message').style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.data))

    }



    const displaySearch = phones => {
        console.log(phones)
        if (phones.length == 0) {
            document.getElementById('error-message').style.display = 'block';
        } else {
            const searchResult = document.getElementById('search_result');
            searchResult.textContent = "";
            const connectedDisplayID = document.getElementById('detail_part');
            connectedDisplayID.textContent = "";


            phones.slice(0, 20).forEach(phone => {
                // console.log(phone);

                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
            <div class="card">
            <img src="${phone.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Name : ${phone.phone_name}</h5>
                <p class="card-text">Brand : ${phone.brand} </p>
                <button  class="btn btn-outline-secondary bg-dark text-warning rounded-3 margin_left"
                onclick="datailPart('${phone.slug}')">Detail</button>
            </div>
        </div>
            `;
                searchResult.appendChild(div);

            });
        }
    }

}

// detail section

const datailPart = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;


    fetch(url)
        .then(res => res.json())
        .then(data => displayDtailPart(data.data))
}

const displayDtailPart = detail => {
    // console.log(detail.slug)

    const connectedDisplayID = document.getElementById('detail_part');
    connectedDisplayID.textContent = "";

    const div = document.createElement("div")
    div.classList.add("col")
    div.innerHTML = `<div class="card mb-3 mx-auto" style="max-width:800px;margin-right:100px">
    <div class="col-md-4 mx-auto">
    <img style="width:100%" src="${detail.image}" class="w-100 rounded-3 " alt="..">
    </div>
    <div class="row g-0 ">
   
    
    <div class="col-md-8">
    <div class="card-body >

    <p class ="mx-auto"><i class = "Detail_color2 fw-bold mb-1">ALL ABOUT THIS PHONE</i></p>
    <p class="card-text fw-bold text-danger mb-1">Model: ${detail.name}</p>
    <p class="card-text fw-bold text-danger mb-1">Brand: ${detail.brand}</p>
    <p class="Detail_color fw-bold mb-1">Main Features:</p>
    <p>storage: ${detail.mainFeatures.storage ? detail.mainFeatures.storage : 'No data here'}</p>
    <p>Memory: ${detail.mainFeatures.memory ? detail.mainFeatures.memory : 'No data here'}</p>
    <p>chipSet: ${detail.mainFeatures.chipSet ? detail.mainFeatures.chipSet : 'No data here'}</p>
    <p>Display: ${detail.mainFeatures.displaySize ? detail.mainFeatures.displaySize : 'No data here'}</span>
    <p class="Detail_color  fw-bold mb-1">Sensors:</p>
    <span >${detail.mainFeatures.sensors ? detail.mainFeatures.sensors : 'No data found'}</p>
    <p class="card-text mb-1">Release-Date: ${detail.releaseDate ? detail.releaseDate : "Not realised yet..."}</p>
    <p class="Detail_color fw-bold mb-1">Others:</p>
    ${detail.others ?
            `<span >Bluetooth:${detail.others.Bluetooth} </span>
    <p >Wlan:${detail.others.WLAN} </p>
     <p>GPS:  ${detail.others.GPS}</p>
     <p >NFC:  ${detail.others.NFC} </p>
     <p >Radio:  ${detail.others.Radio}</p>
     <p >Usb:  ${detail.others.USB}</p>`

            : 'This phone has not any features yet'}
    </div>
    </div>
    
    </div>
    
    </div>`
    connectedDisplayID.appendChild(div);

}