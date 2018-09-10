// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    $('.modal').modal();


    $(document).on("click", ".modal-close", function (event) {
        console.log("clicked submit")
        return true;
    })

    $(".comment").on("click", function (event) {
        console.log("clicked Comment", $(this).attr("id"));
        let queryID = $(this).attr("id");
        $("#comment-submit").attr("name", "queryId");
        $("#comment-submit").attr("value", queryID);
        $('#comment-modal').modal('open');
        $.ajax({
            method: "GET",
            url: "/notes",
            data: {
                queryID: queryID
            }
        });

    });

});
