// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {

        $('.collapsible').collapsible();
        $('.parallax').parallax();
    $('.modal').modal();

    $(document).on("click", ".comment-delete", function (event) {
        $.ajax({
            method: "DELETE",
            url: "/remove",
            data: {
                queryId: $(this).attr("id"),
            }
        })
            location.reload()
        
    })
    $(document).on("click", ".modal-close", function (event) {
        console.log("close modal")
        location.reload()
    })
    $("#comment-submit").on("click", function (event) {
        console.log($("#comment-submit").attr("value"),$("#comment").val())
        $.ajax({
            method: "POST",
            url: "/submit",
            data: {
                queryId: $("#comment-submit").attr("value"),
                comment: $("#comment").val()
            }
        }).then(function () {
            // $("#comment").empty();
            // location.reload()
        })
        // console.log("clicked submit")
        // return true;

    })

    $(".comment").on("click", function (event) {
        console.log("clicked Comment", $(this).attr("id"));
        let queryId = $(this).attr("id");
        $("#comment-submit").attr("name", "queryId");
        $("#comment-submit").attr("value", queryId);
        $('#comment-modal').modal('open');

    })



});

