const blogBtn = () => {
    window.location.href = "./BlogPage/blog.html";
}


const getCategories = async () => {
    const categories = document.getElementById("categories")

    url = 'https://openapi.programming-hero.com/api/videos/categories'
    const res = await fetch(url);
    const data = await res.json()

    const categoriesData = data.data

    categoriesData.forEach(element => {
        const categoriesBtn = document.createElement("button")

        categoriesBtn.classList = `text-sm rounded-sm px-4 py-2 font-semibold text-black bg-gray-300 active:bg-red-700`
        categoriesBtn.id = "handelCategory" + element.category_id
        categoriesBtn.innerText = element.category

        categoriesBtn.onclick = () => getCategoriesIteams(`${element.category_id}`)

        categories.appendChild(categoriesBtn)
    });

}
const getCategoriesIteams = async (id) => {

    const cardContainer = document.getElementById("card-container")
    const opps = document.getElementById('opps')
    opps.classList.add("hidden")

    url = `https://openapi.programming-hero.com/api/videos/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    const status = data.status
    cardContainer.innerText = ''

    if (status === true) {
        const categoriesIteams = data.data
        categoriesIteams.forEach(element => {

            const categoriesCard = document.createElement("div")
            categoriesCard.classList = `card card-compac shadow-sm`
            categoriesCard.innerHTML = `
                        <div class = "card card-compac shadow-xs p-1">
                        <figure class= "relative">
                            <img class= "mb-3 w-full h-36 rounded-xl" src = ${element ?.thumbnail} alt = "Shoes"/>
                            <p>${element?.others?.posted_date ? `
                            <div class = "absolute bottom-5 right-2 bg-black text-white w-24 h-4 rounded-sm">
                                <p id="date" class= "text-[10px] text-center">${time(element?.others?.posted_date)}</p>
                            </div>` : ""}</p>

                        </figure>
                        <div class = "flex space-x-3">
                        <div class = "">
                            <img class = "rounded-full w-10 h-10" src = ${element ?.authors[0] ?.profile_picture} alt ="">
                        </div>
                        <div class = "space-y-2">
                        <h2 class = "card-title font-bold text-lg">${element ?.title}</h2>
                        <div class = "flex">
                        <p class = "text-sm font-semibold text-gray-600 mr-2" >${element ?.authors[0] ?.profile_name}</p>
                        <p>${element ?.authors[0] ?.verified ? `<svg xmlns = "http://www.w3.org/2000/svg"
                                width = "20"
                                height = "20"
                                viewBox = "0 0 20 20"
                                fill = "none">
                                    <g clip-path = "url(#clip0_11_34)">
                                    <path d = "M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
                                fill = "#2568EF"/>
                                    <path d = "M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z"
                                fill = "#FFFCEE"/>
                                    </g> 
                                    <defs>
                                    <clipPath id = "clip0_11_34">
                                    <rect width = "20"
                                height = "20"
                                fill = "white"/>
                                    </clipPath>
                        </defs></svg>` : ""} </p>
                        </div>
                            <div id= "slotView">
                                <p class= "text-xs text-gray-600" >${element?.others?.views} views</p>
                            </div>
                        </div>
                    </div>
                </div>`

            cardContainer.appendChild(categoriesCard)
        });

    } else {
        opps.classList.remove("hidden")
    }
}

const time = (s) => {
    let totalSeconds = s;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return `${hours}hrs ${minutes} min ago`;
}
const handelSortView = () => {
    const cardContainer = document.getElementById("card-container");
    const cards = Array.from(cardContainer.children);

    const sortedCards = cards.sort((slotViewA, slotViewB) => {
        const viewsA = parseInt(slotViewA.querySelector("#slotView p").textContent.split(" ")[0]);
        const viewsB = parseInt(slotViewB.querySelector("#slotView p").textContent.split(" ")[0]);

        return viewsB - viewsA;
    });

    cardContainer.innerHTML = '';

    sortedCards.forEach(card => {
        cardContainer.appendChild(card);
    });
}


getCategories()
getCategoriesIteams(1000)