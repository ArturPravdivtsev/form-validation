$(document).ready(function() {
    json = $.parseJSON('[{"required": true, "fields": {"NAME": false}}, {"required": false, "fields": {"LAST_NAME": true}}, {"required": true, "fields": {"EMAIL": false, "PHONE": false}}, {"required": false, "fields": {"TYPE": false}}, {"required": false, "fields": {"TEXT": false}}]');
    console.log(json);
    console.log(json[0].fields);

    $('#submit').click(
        function() {
            formValidation();
            return false;
        }
    );

    function formValidation() {
        name = $('#name').val();
        lastname = $('#last-name').val();
        email = $('#email').val();
        phone = $('#phone').val();
        about = $('#about').val();
        console.log(name, lastname, email, phone, about);
        json = $.parseJSON('[{"required": true, "fields": {"NAME": false}}, {"required": false, "fields": {"LAST_NAME": true}}, {"required": true, "fields": {"EMAIL": false, "PHONE": false}}, {"required": false, "fields": {"TYPE": false}}, {"required": false, "fields": {"TEXT": false}}]');
        if (json[0].fields) {
            if (name == "") { $('#name').css({ 'border': '1px solid red' }) }
        }
        if (json[1].fields) {
            if (lastname == "") {
                $('#last-name').css({ 'border': '1px solid red' })
            }
        }
        if (json[2].fields) {
            if (email == "") {
                $('#email').css({ 'border': '1px solid red' })
            }
        }
        if (json[3].fields) {
            if (phone == "") {
                $('#phone').css({ 'border': '1px solid red' })
            }
        }
        if (json[4].fields) {
            if (about == "") {
                $('#about').css({ 'border': '1px solid red' })
            }
        }
        $.ajax({
            url: "https://workspace.ru/ajax/test/test.php",
            type: "POST",
            dataType: "html",
            data: $("#form").serialize(),
            success: function(response) {
                console.log(response);
                result = $.parseJSON(response);
                console.log(result);
                $('#result_form').html('Имя: ' + result.success);
            },
            error: function(response) { // Данные не отправлены
                $('#result_form').html('Ошибка. Данные не отправлены.');
            }
        });
    }
});
