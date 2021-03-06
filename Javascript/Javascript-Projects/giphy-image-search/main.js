// 1. input안의 값을 잡는다.
const input = document.querySelector('#js-userinput')
const button = document.querySelector('#js-go')
const resultArea = document.querySelector('#result-area')
const changeImage = document.querySelector('#change-image')

input.addEventListener('keypress', e => {
    if(e.keyCode === 13){
        const value = input.value
        getGifs(value)
    }
})

button.addEventListener('click', e =>{
    const value = input.value
    getGifs(value)
})

// 2. giphy api를 통해 data를 받아서 가공한다.
const getGifs = (query) => {
    resultArea.innerHTML = null

    const API_KEY = '{}'
    const URL = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}`
    
    const XHR = new XMLHttpRequest()
    XHR.open('GET', URL)
    XHR.send()
    XHR.addEventListener('load', e => {
        const rawData = e.target.response
        const parsedData = JSON.parse(rawData)
        console.log(parsedData)
        for (const data of parsedData.data){
            pushToDom(data.images.fixed_height.url)
        }
        let index = 0
        changeImage.src = parsedData.data[index].images.fixed_height.url

        setInterval(() =>{
            index = (++index) % parsedData.data.length
            changeImage.src = parsedData.data[index].images.fixed_height.url
        },3000)
    })
}


// 3. gif 파일들을 DOM에 밀어넣는다.
const pushToDom = (data) => {
    const gif = document.createElement('img')
    gif.src = data
    // appendChild()는 역순으로 들어간다.
    //resultArea.appendChild(gif)
    // insertBefore(넣을 값, 기준) 기준의 바로 앞쪽에 삽입된다.
    resultArea.insertBefore(gif, resultArea.firstChild)
}


