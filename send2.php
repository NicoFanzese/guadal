<?php
    header('Access-Control-Allow-Origin: *');
    
    $eol = PHP_EOL;

//Guardo físicamente el archivo y lo convierto en json
    $file = fopen("encuesta.json", "a");
    $data = $_POST["data"];
    fwrite($file, $data . PHP_EOL);
    
    fclose($file);

//Ahora lo levanto y lo convierto en adjunto.
    $filename = "encuesta.json";
    $pdfdoc = file_get_contents($filename);
    $attachment = chunk_split(base64_encode($pdfdoc));

//Config
    //$email_to = 'lcondori@gmail.com';
    $email_to = $_POST["mailsend"];
    $email_from = 'lcondori@gmail.com';
    $from = 'lcondori@gmail.com';
    $subject = 'Base de datos ';
    $message = 'Adjuntamos la base de datos de su app <br>';
    $message .= 'Este es el nombre: '.$_POST["namesend"].' <br>';
    $message .= 'Este es el mail: '.$_POST["mailsend"].'<br>';

    $separator = md5(time());

    $headers  = "From: \"LeoCondori\"<" . $email_from . ">".$from.$eol;
    $headers .= "MIME-Version: 1.0".$eol; 
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"";

    $body = "--".$separator.$eol;

    $body .= "Content-Type: text/html; charset=\"utf-8\"".$eol;
    $body .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
    $body .= $message.$eol;

    // adjunto
    $body .= "--".$separator.$eol;
    $body .= "Content-Type: application/octet-stream; name=\"".$filename."\"".$eol;
    $body .= "Content-Transfer-Encoding: base64".$eol;
    $body .= "Content-Disposition: attachment".$eol.$eol;
    $body .= $attachment.$eol;
    $body .= "--".$separator."--";

    $error_ocurred = mail($email_to, $subject, $body, $headers);
    if(!$error_ocurred){
       // echo "<center>Ocurrio un problema al enviar su información, intente mas tarde.<br/>";
       // echo "Si el problema persiste contacte a un administrador.</center>";
        $array = array("status"=>"Error");
        echo json_encode($array);
    }else{
        //echo "<center>Su informacion ha sido enviada correctamente a la direccion de email especificada.<br/>(sientase libre de cerrar esta ventana)</center>";
        $array = array("status"=>"OK");
        echo json_encode($array);        
    }


/*
    $destinatario = "lcondori@gmail.com"; 
    $asunto = "Un nuevo mensaje desde la web!"; 
    $cuerpo = ' 
                <html> 
                <head> 
                <title>Un nuevo mensaje</title> 
                </head> 
                <body> 
                <h1>Respondé rápido...</h1> 
                    <p> 
                    Estos son los datos ingresados.<br>
                    Nombre: '.$_POST["name"].'<br>
                    Nombre: '.$_POST["data"].'<br>
                    </p> 
                </body> 
                </html> 
            '; 

//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: Leo on Web <info@leocondori.com.ar>\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
//$headers .= "Reply-To: mariano@desarrolloweb.com\r\n"; 

//ruta del mensaje desde origen a destino 
//$headers .= "Return-path: holahola@desarrolloweb.com\r\n"; 

//direcciones que recibián copia 
//$headers .= "Cc: maria@desarrolloweb.com\r\n"; 

//direcciones que recibirán copia oculta 
//$headers .= "Bcc: lcondori@gmail.com\r\n"; 

if(!mail($destinatario,$asunto,$cuerpo,$headers)){
    //echo 'Por favor, volvé a presionar el botón enviar.';
    //echo '<script type="text/javascript">$("#log").html("Por favor, volvé a presionar el botón enviar.");</script>';
    $array = array("status"=>"Error");
    echo json_encode($array);
}else{
    $array = array("status"=>"OK");
    echo json_encode($array);
    //echo '<script type="text/javascript">$("#log").html("Mensaje enviado, en breve te voy a responder, te vas a sorprender."); $("#sendMessage").hide();</script>';
}
*/    
?>