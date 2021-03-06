$(document).ready(function(){    

    Pusher.logToConsole = true;

    var pusher = new Pusher('f340cad50520e3403696', {
        cluster: 'us2',
        encrypted: false
    });

    let channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function(){
        const message = $("#message").val();
        $("#message").val("");

        //send message
        $.post( "http://localhost:5000/message", { message } );
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);

        $(".chat").append(template);
    }
});