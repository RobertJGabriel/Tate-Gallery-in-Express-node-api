$("img").error(function () {
    $(this).unbind("error").attr("src", "https://s3.amazonaws.com/uifaces/faces/twitter/rogie/128.jpg");
});
$('.list-group.nothide').slice(19).hide();
