const cardList = [
    {
        title: "Song 1",
        image: "images/banner.png",
        link: "https://www.youtube.com/watch?v=xgMGfOt7XhU",
        desciption: "Demo desciption about Song 2"
    },
    {
        title: "Song 2",
        image: "images/banner.png",
        link: "https://www.youtube.com/watch?v=tghIoadPRgE",
        desciption: "Demo desciption about Song 2"
    },
    {
        title: "Song 3",
        image: "images/banner.png",
        link: "https://youtu.be/twCHVhk8iMU",
        desciption: "Demo desciption about Song 3"
    }
]
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
    addDataToApp(formData);
}

//ajax function...
const addDataToApp = (project) => {
        $.ajax({
            url: '/api/projects',
            data: project,
            type: 'POST',
            success: (result) => {
                alert(result.message);
    //             location.reload(); // it automatically reloads the page 
            }
        })
    }
    
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `<div class="col s4 center-align">
    <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="${item.image}">
    </div><div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span><p><a href="${item.link}" target=_blank>${item.title}</a></p></div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>'+
        <p class="card-text">${item.desciption}</p>
      </div></div></div>`
      $("#card-section").append(itemToAppend)
    });
}



$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#formSubmit').click(()=>{
        submitForm();
        alert('Please Check the Console for more information.')
    })
    addCards(cardList);
  });
