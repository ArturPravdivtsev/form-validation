$(document).ready(function() {
    var limit = 2;
    $('input.checkbox').on('change', function(evt) {
        if ($('.do').find(':checked').length > limit) {
            this.checked = false;
        }
    });
    $('#submit').click(
        function() {
            $('#result_form').html("");
            $('.info').remove();
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
        if (json[0].fields.NAME || json[0].required) {
            if (name == "") {
                $('#result_form').after('<p class="info">Имя обязательное поле</p>');
            }
        }
        if (json[1].fields.LAST_NAME || json[1].required) {
            if (lastname == "") {
                $('#result_form').after('<p class="info">Фамилия обязательное поле</p>');
            }
        }
        if (json[2].fields.EMAIL || json[2].fields.PHONE || json[2].required) {
            if (email == "" && phone == "") {
                $('#result_form').after('<p class="info">Необходимо заполнить хотя бы одно из полей "E-mail" или "Телефон"</p>');
            }
        }
        if (json[4].fields.TEXT) {
            if (about == "") {
                $('#about').css({ 'border': '1px solid red' })
            }
        }
        $.ajax({
            url: "https://workspace.ru/ajax/test/test.php",
            type: "POST",
            dataType: "html",
            data: $("#form").serializeArray(),
            success: function(response) {
                result = $.parseJSON(response);
                $('#result_form').html(result.data.message);
            },
        });
    }
});