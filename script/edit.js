function save_profile() {
	var id = document.getElementById("email_name").innerText;
	var givenname = document.getElementById("edit_givenname").value;
	var lastname = document.getElementById("edit_lastname").value;
	var gender = document.getElementById("edit_gender").value;
	var country = document.getElementById("edit_country").value;
	var status = $("#edit_status").val();
	var role = document.getElementById("edit_role").value;
    
	$.ajax({
        url: "/updateartists",
        type: "GET",
        data: {
          id : id,
          givenname: givenname,
          lastname: lastname,
          gender: gender,
          country: country,
          status: status,
          role: role
        },
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        success: function(response) {
          window.alert('evaluate response and show alert');
        }
      });
      window.location.href="/admin_home";    
}

function get_search_text() {
    var search_text = document.getElementById("search_text").value;
    var search_option = $("#search_option").val();

    console.log(search_option);
    if (search_option == "id") {
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
      //window.location.href = "/artists?id=" + search_text;
      window.location.href = "/artists?fname=" + search_text;
    }
}


$(document).ready(function() {

    // set the search btn
    $("#search_btn").on("click", get_search_text);

    // set the behaviour for save btn
    $("#ok_btn").on("click", save_profile);

    $("[data-toggle]").click(function() {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });
     
});