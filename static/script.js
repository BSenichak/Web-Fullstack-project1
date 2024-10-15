let wrapper = document.querySelector(".wrapper");
fetch("/ads", {
    method: "post",
}).then(async (response) => {
    let ads = await response.json();
    wrapper.innerHTML = "";
    ads.forEach((product) => {
        wrapper.innerHTML += `
                <div class="ad">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>${product.price}</p>
                </div>
                `;
    });
});


document.querySelector("#add").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});