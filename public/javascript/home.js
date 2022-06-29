document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.movie-loader').addEventListener('click', (e) => {
        e.preventDefault();
        let page = e.currentTarget.dataset.page;
        e.currentTarget.dataset.page = parseInt(page)+1;
        fetch(`/load?page=${page}`)
        .then((response) => response.text())
        .then((data) => {
            document.querySelector('#movie-list').innerHTML += data;
            clickMovieMiniature();
        })
    })

    clickMovieMiniature();
})

function clickMovieMiniature(){
    document.querySelectorAll('#movie-list article').forEach((element) => {
        console.log('ok')
        element.addEventListener('click', (e) => {
            location.href = element.getAttribute('href');
        })
    })
}