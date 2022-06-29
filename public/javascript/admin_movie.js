document.addEventListener('DOMContentLoaded',() => {

    document.querySelectorAll('.delete-movie').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            let link = e.currentTarget;
            fetch(`${link.href}`, { method: 'delete'} ).then((result) => {
                if(result.status === 200) {
                   link.closest('tr').remove();
                }
            })
        })
    })

});