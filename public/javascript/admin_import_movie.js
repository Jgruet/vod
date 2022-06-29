document.addEventListener('DOMContentLoaded',() => {

    let form = document.querySelector('.import-movie');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.currentTarget.target);
        fetch(window.location.href, { method : 'post', body: new FormData(form)})
        .then((response) => console.log(response))
    })

});