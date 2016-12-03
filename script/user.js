function  edit_profile() { 
    $.ajax({
        url: "/edit_artists",
        type: "GET",
        data: {
          username : this.id
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
    window.location.href = "/edit_artist?username=" + this.id;
add}

function get_search_text() {
    var search_text = document.getElementById("search_text").value;
    var search_option = $("#search_option").val();

    console.log(search_option);
    if (search_option == "id") {
      console.log("the id function is running");
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          id : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      window.location.href = "/artists?id=" + search_text;
    }

    if (search_option == "country") {
      console.log("the country function is running");
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          country : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      //window.location.href = "/artists?id=" + search_text;
      window.location.href = "/artists?country=" + search_text;
    }

    if (search_option == "fname") {
      $.ajax({
        url: "/artists",
        type: "GET",
        data: {
          fname : search_text
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
        
      });
      window.location.href = "/artists?fname=" + search_text;
    }
}

function show_gallery(){
      $.ajax({
        url: "/getartistproduct",
        type: "GET",
/*        data: {
          fname : search_text
        },*/
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
        
      });
      
}

$(document).ready(function() {

    // set the search btn
    $("#search_btn").on("click", get_search_text);

    // set the behaviour for all edit btn
    $(".edit_btn").on("click", edit_profile);
    
    // set the behaviour for all gallery btn
    $("#gallery_btn").on("click", show_gallery);

    $("[data-toggle]").click(function() {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });
     
});