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
            .catch(error => displayError(error));
    }

    const displayError = error => {
        document.getElementById('error-message').style.display = 'block';
    }

    const displaySearch = phones => {
        const searchResult = document.getElementById('search_result');
        searchResult.textContent = "";


        phones.slice(0, 20).forEach(phone => {
            console.log(phone);

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Name : ${phone.phone_name}</h5>
            <p class="card-text">Brand : ${phone.brand} </p>
        </div>
    </div>
        `;
            searchResult.appendChild(div);

        });
    }
}