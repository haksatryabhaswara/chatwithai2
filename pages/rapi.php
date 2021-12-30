<?php session_start();
include_once("koneksi/koneksi.php");
require __DIR__ . '/vendor/autoload.php';

use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;

$connector = new FilePrintConnector("COM2");
$printer = new Printer($connector);
include "static.php";
function barcode($filepath = "", $text = "0", $size = "20", $orientation = "horizontal", $code_type = "code128", $print = false, $SizeFactor = 1)
{
    $code_string = "";
    // Translate the $text into barcode the correct $code_type
    if (in_array(strtolower($code_type), array("code128", "code128b"))) {
        $chksum = 104;
        // Must not change order of array elements as the checksum depends on the array's key to validate final code
        $code_array = array(" " => "212222", "!" => "222122", "\"" => "222221", "#" => "121223", "$" => "121322", "%" => "131222", "&" => "122213", "'" => "122312", "(" => "132212", ")" => "221213", "*" => "221312", "+" => "231212", "," => "112232", "-" => "122132", "." => "122231", "/" => "113222", "0" => "123122", "1" => "123221", "2" => "223211", "3" => "221132", "4" => "221231", "5" => "213212", "6" => "223112", "7" => "312131", "8" => "311222", "9" => "321122", ":" => "321221", ";" => "312212", "<" => "322112", "=" => "322211", ">" => "212123", "?" => "212321", "@" => "232121", "A" => "111323", "B" => "131123", "C" => "131321", "D" => "112313", "E" => "132113", "F" => "132311", "G" => "211313", "H" => "231113", "I" => "231311", "J" => "112133", "K" => "112331", "L" => "132131", "M" => "113123", "N" => "113321", "O" => "133121", "P" => "313121", "Q" => "211331", "R" => "231131", "S" => "213113", "T" => "213311", "U" => "213131", "V" => "311123", "W" => "311321", "X" => "331121", "Y" => "312113", "Z" => "312311", "[" => "332111", "\\" => "314111", "]" => "221411", "^" => "431111", "_" => "111224", "\`" => "111422", "a" => "121124", "b" => "121421", "c" => "141122", "d" => "141221", "e" => "112214", "f" => "112412", "g" => "122114", "h" => "122411", "i" => "142112", "j" => "142211", "k" => "241211", "l" => "221114", "m" => "413111", "n" => "241112", "o" => "134111", "p" => "111242", "q" => "121142", "r" => "121241", "s" => "114212", "t" => "124112", "u" => "124211", "v" => "411212", "w" => "421112", "x" => "421211", "y" => "212141", "z" => "214121", "{" => "412121", "|" => "111143", "}" => "111341", "~" => "131141", "DEL" => "114113", "FNC 3" => "114311", "FNC 2" => "411113", "SHIFT" => "411311", "CODE C" => "113141", "FNC 4" => "114131", "CODE A" => "311141", "FNC 1" => "411131", "Start A" => "211412", "Start B" => "211214", "Start C" => "211232", "Stop" => "2331112");
        $code_keys = array_keys($code_array);
        $code_values = array_flip($code_keys);
        for ($X = 1; $X <= strlen($text); $X++) {
            $activeKey = substr($text, ($X - 1), 1);
            $code_string .= $code_array[$activeKey];
            $chksum = ($chksum + ($code_values[$activeKey] * $X));
        }
        $code_string .= $code_array[$code_keys[($chksum - (intval($chksum / 103) * 103))]];
        $code_string = "211214" . $code_string . "2331112";
    } elseif (strtolower($code_type) == "code128a") {
        $chksum = 103;
        $text = strtoupper($text); // Code 128A doesn't support lower case
        // Must not change order of array elements as the checksum depends on the array's key to validate final code
        $code_array = array(" " => "212222", "!" => "222122", "\"" => "222221", "#" => "121223", "$" => "121322", "%" => "131222", "&" => "122213", "'" => "122312", "(" => "132212", ")" => "221213", "*" => "221312", "+" => "231212", "," => "112232", "-" => "122132", "." => "122231", "/" => "113222", "0" => "123122", "1" => "123221", "2" => "223211", "3" => "221132", "4" => "221231", "5" => "213212", "6" => "223112", "7" => "312131", "8" => "311222", "9" => "321122", ":" => "321221", ";" => "312212", "<" => "322112", "=" => "322211", ">" => "212123", "?" => "212321", "@" => "232121", "A" => "111323", "B" => "131123", "C" => "131321", "D" => "112313", "E" => "132113", "F" => "132311", "G" => "211313", "H" => "231113", "I" => "231311", "J" => "112133", "K" => "112331", "L" => "132131", "M" => "113123", "N" => "113321", "O" => "133121", "P" => "313121", "Q" => "211331", "R" => "231131", "S" => "213113", "T" => "213311", "U" => "213131", "V" => "311123", "W" => "311321", "X" => "331121", "Y" => "312113", "Z" => "312311", "[" => "332111", "\\" => "314111", "]" => "221411", "^" => "431111", "_" => "111224", "NUL" => "111422", "SOH" => "121124", "STX" => "121421", "ETX" => "141122", "EOT" => "141221", "ENQ" => "112214", "ACK" => "112412", "BEL" => "122114", "BS" => "122411", "HT" => "142112", "LF" => "142211", "VT" => "241211", "FF" => "221114", "CR" => "413111", "SO" => "241112", "SI" => "134111", "DLE" => "111242", "DC1" => "121142", "DC2" => "121241", "DC3" => "114212", "DC4" => "124112", "NAK" => "124211", "SYN" => "411212", "ETB" => "421112", "CAN" => "421211", "EM" => "212141", "SUB" => "214121", "ESC" => "412121", "FS" => "111143", "GS" => "111341", "RS" => "131141", "US" => "114113", "FNC 3" => "114311", "FNC 2" => "411113", "SHIFT" => "411311", "CODE C" => "113141", "CODE B" => "114131", "FNC 4" => "311141", "FNC 1" => "411131", "Start A" => "211412", "Start B" => "211214", "Start C" => "211232", "Stop" => "2331112");
        $code_keys = array_keys($code_array);
        $code_values = array_flip($code_keys);
        for ($X = 1; $X <= strlen($text); $X++) {
            $activeKey = substr($text, ($X - 1), 1);
            $code_string .= $code_array[$activeKey];
            $chksum = ($chksum + ($code_values[$activeKey] * $X));
        }
        $code_string .= $code_array[$code_keys[($chksum - (intval($chksum / 103) * 103))]];
        $code_string = "211412" . $code_string . "2331112";
    } elseif (strtolower($code_type) == "code39") {
        $code_array = array("0" => "111221211", "1" => "211211112", "2" => "112211112", "3" => "212211111", "4" => "111221112", "5" => "211221111", "6" => "112221111", "7" => "111211212", "8" => "211211211", "9" => "112211211", "A" => "211112112", "B" => "112112112", "C" => "212112111", "D" => "111122112", "E" => "211122111", "F" => "112122111", "G" => "111112212", "H" => "211112211", "I" => "112112211", "J" => "111122211", "K" => "211111122", "L" => "112111122", "M" => "212111121", "N" => "111121122", "O" => "211121121", "P" => "112121121", "Q" => "111111222", "R" => "211111221", "S" => "112111221", "T" => "111121221", "U" => "221111112", "V" => "122111112", "W" => "222111111", "X" => "121121112", "Y" => "221121111", "Z" => "122121111", "-" => "121111212", "." => "221111211", " " => "122111211", "$" => "121212111", "/" => "121211121", "+" => "121112121", "%" => "111212121", "*" => "121121211");
        // Convert to uppercase
        $upper_text = strtoupper($text);
        for ($X = 1; $X <= strlen($upper_text); $X++) {
            $code_string .= $code_array[substr($upper_text, ($X - 1), 1)] . "1";
        }
        $code_string = "1211212111" . $code_string . "121121211";
    } elseif (strtolower($code_type) == "code25") {
        $code_array1 = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
        $code_array2 = array("3-1-1-1-3", "1-3-1-1-3", "3-3-1-1-1", "1-1-3-1-3", "3-1-3-1-1", "1-3-3-1-1", "1-1-1-3-3", "3-1-1-3-1", "1-3-1-3-1", "1-1-3-3-1");
        for ($X = 1; $X <= strlen($text); $X++) {
            for ($Y = 0; $Y < count($code_array1); $Y++) {
                if (substr($text, ($X - 1), 1) == $code_array1[$Y])
                    $temp[$X] = $code_array2[$Y];
            }
        }
        for ($X = 1; $X <= strlen($text); $X += 2) {
            if (isset($temp[$X]) && isset($temp[($X + 1)])) {
                $temp1 = explode("-", $temp[$X]);
                $temp2 = explode("-", $temp[($X + 1)]);
                for ($Y = 0; $Y < count($temp1); $Y++)
                    $code_string .= $temp1[$Y] . $temp2[$Y];
            }
        }
        $code_string = "1111" . $code_string . "311";
    } elseif (strtolower($code_type) == "codabar") {
        $code_array1 = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "$", ":", "/", ".", "+", "A", "B", "C", "D");
        $code_array2 = array("1111221", "1112112", "2211111", "1121121", "2111121", "1211112", "1211211", "1221111", "2112111", "1111122", "1112211", "1122111", "2111212", "2121112", "2121211", "1121212", "1122121", "1212112", "1112122", "1112221");
        // Convert to uppercase
        $upper_text = strtoupper($text);
        for ($X = 1; $X <= strlen($upper_text); $X++) {
            for ($Y = 0; $Y < count($code_array1); $Y++) {
                if (substr($upper_text, ($X - 1), 1) == $code_array1[$Y])
                    $code_string .= $code_array2[$Y] . "1";
            }
        }
        $code_string = "11221211" . $code_string . "1122121";
    }
    // Pad the edges of the barcode
    $code_length = 20;
    if ($print) {
        $text_height = 30;
    } else {
        $text_height = 0;
    }

    for ($i = 1; $i <= strlen($code_string); $i++) {
        $code_length = $code_length + (int)(substr($code_string, ($i - 1), 1));
    }
    if (strtolower($orientation) == "horizontal") {
        $img_width = $code_length * $SizeFactor;
        $img_height = $size;
    } else {
        $img_width = $size;
        $img_height = $code_length * $SizeFactor;
    }
    $image = imagecreate($img_width, $img_height + $text_height);
    $black = imagecolorallocate($image, 0, 0, 0);
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefill($image, 0, 0, $white);
    if ($print) {
        imagestring($image, 5, 31, $img_height, $text, $black);
    }
    $location = 10;
    for ($position = 1; $position <= strlen($code_string); $position++) {
        $cur_size = $location + (substr($code_string, ($position - 1), 1));
        if (strtolower($orientation) == "horizontal")
            imagefilledrectangle($image, $location * $SizeFactor, 0, $cur_size * $SizeFactor, $img_height, ($position % 2 == 0 ? $white : $black));
        else
            imagefilledrectangle($image, 0, $location * $SizeFactor, $img_width, $cur_size * $SizeFactor, ($position % 2 == 0 ? $white : $black));
        $location = $cur_size;
    }

    // Draw barcode to the screen or save in a file
    if ($filepath == "") {
        header('Content-type: image/png');
        imagepng($image);
        imagedestroy($image);
    } else {
        imagepng($image, $filepath);
        imagedestroy($image);
    }
}

$filepath = 'barcode/' . $notrans . '.png';
$text = $notrans;
$size = "40";
$orientation = (isset($_GET["orientation"]) ? $_GET["orientation"] : "horizontal");
$code_type = "Code39";
$print = true;
$sizefactor = (isset($_GET["sizefactor"]) ? $_GET["sizefactor"] : "1");

$image = $notrans . '.png';
$waktumasuk = date("Y-m-d H:i:s");


if ($_POST['id'] != "") { //cek jika member

    if ($sps == TRUE) { //cek jika server online


        $loka = mysqli_query($sp, "select idmasukTransaksi from transaksimasuk where noTransaksi = " . $_POST['id'] . " order by idmasukTransaksi desc limit 1");
        $lks = mysqli_num_rows($loka);
        $member = mysqli_query($sp, "SELECT member.nama_lengkap, transaksimember.tanggal_exp, member.id_member FROM `transaksimember` LEFT JOIN member ON transaksimember.id_member = member.id_member WHERE transaksimember.id_member= '" . $_POST['id'] . "' ORDER BY tanggal_terdaftar DESC LIMIT 0,1");
        $mbr = mysqli_num_rows($member);
        $mbr1 = mysqli_fetch_array($member);

        if ($lks > 0) { //cek member sudah didalam
            echo 'gate gak kebuka';
            header("location:scriptdalem.php");
            //header("location:voice.php?in=0&nama=");
        } else {


            if ($mbr > 0 and $mbr1['tanggal_exp'] < $waktumasuk) {
                //PRINT KARCIS MEMBER EXPIRED

                barcode($filepath, $text, $size, $orientation, $code_type, $print, $sizefactor);
                echo 'print expired';
                $datad = mysqli_query($sp, "select deskripsiIklan from iklan where tanggalExp > '" . $waktumasuk . "' order by idIklan desc limit 1 ");
                $iklan = mysqli_fetch_array($datad);
                $jum = mysqli_num_rows($datad);

                $justification = array(Printer::JUSTIFY_CENTER);
                $logo = EscposImage::load("barcode/siu.jpg");

                $printer->setJustification($justification[0]);
                $printer->graphics($logo);
                $printer->text("\n SIU PARKING\n");
                $printer->text("==========================\n");
                $printer->text("PT. Sinar Indo Utama\n");
                $printer->text("Bpk/Ibu " . $mbr1['nama_lengkap'] . "\n");

                $printer->text("Member Anda Telah Berakhir Pada\n ");
                $printer->setTextSize(2, 2);
                $printer->text(date('d F Y', strtotime($mbr1['tanggal_exp'])) . "\n");
                $printer->text(date('H:i:s', strtotime($mbr1['tanggal_exp'])) . "\n");
                $printer->setTextSize(1, 1);
                $img = EscposImage::load("barcode/" . $notrans . ".png");

                $printer->bitImage($img, Printer::IMG_DOUBLE_WIDTH | Printer::IMG_DOUBLE_HEIGHT);
                $printer->feed();

                $printer->text("Segera perpanjang atau anda \n dikenakan tarif normal\n");
                $printer->setPrintWidth(440);
                $printer->setPrintLeftMargin(60);
                $printer->setTextSize(1, 1);
                $printer->text("\nDenda Tiket Hilang\nMotor : Rp 10K | Mobil : Rp 20K");
                $printer->text("\nDenda Inap\nMotor : Rp 50K | Mobil : Rp 100K\n");
                $printer->text("Kehilangan & Kerusakan Barang \nBukan Tanggungjawab Pengelola Parkir\n");
                $printer->setPrintWidth(350);
                $printer->setPrintLeftMargin(120);
                $printer->text($iklan['deskripsiIklan']);
                $printer->setPrintLeftMargin(0);
                $printer->setJustification();
                $printer->text("\n");
                $printer->text("\n");
                $printer->cut();
                $printer->close();

                $sql = "INSERT INTO transaksimasuk 
	(noTransaksi, masukTransaksi, image, stats, jenisKendaraan) VALUES
	('" . $_POST['id'] . "', 
	'" . $waktumasuk . "',
	'" . $image . "',
	'N',
	'" . $kendaraan . "')";

                if ($sp->query($sql) == TRUE) {
                    echo "Data Masuk";
                    // include "buka.php";
                    $message = include_once("test.php");
                    if ($message) {
                        echo "GERBANG KEBUKA";
                    }
                } else {
                    echo "Server Offline";
                }
                header("location:scripthabis.php");
                //header("location:voice.php?in=2&nama=".$mbr1['nama_lengkap']);	
            } elseif ($mbr > 0 and $mbr1['tanggal_exp'] > $waktumasuk) {
                //PRINT KARCIS TAPI MEMBER GAK EXPIRED

                $sql = "INSERT INTO transaksimasuk 
	(noTransaksi, masukTransaksi, image, stats, jenisKendaraan, pintuMasuk) VALUES
	('" . $_POST['id'] . "', 
	'" . $waktumasuk . "',
	'" . $image . "',
	'Y',
	'" . $kendaraan . "',
	'PM" . $gate . "')";

                if ($sp->query($sql) == TRUE) {
                    echo "Data Masuk";
                    // include "buka.php";
                    $message = include_once("test.php");
                    if ($message) {
                        echo "GERBANG KEBUKA";
                    }
                } else {
                    echo "Database Server Offline";
                }
                header("location:script.php");
                //header("location:voice.php?in=1&nama=".$mbr1['nama_lengkap']);	
            } else {
                //PRINT KETIK NGASAL
                header("location:pintumasuk.php");
            }
        }
    } else { //else if offline


        $now = date("d F Y H:i:s");
        $now1 = date("YmdHis");

        $filepath = 'barcode/' . $notrans . '.png';
        $text = $notrans;
        $size = "40";
        $orientation = (isset($_GET["orientation"]) ? $_GET["orientation"] : "horizontal");
        $code_type = "Code39";
        $print = true;
        $sizefactor = (isset($_GET["sizefactor"]) ? $_GET["sizefactor"] : "1");


        barcode($filepath, $text, $size, $orientation, $code_type, $print, $sizefactor);


        $justification = array(Printer::JUSTIFY_CENTER);
        $logo = EscposImage::load("barcode/siu.jpg");

        $printer->setJustification($justification[0]);
        $printer->graphics($logo);
        $printer->text("\n" . $bold1 . " SIU PARKING" . $bold0 . "\n");
        $printer->text("==========================\n");
        $printer->text("PT. Sinar Indo Utama\n");

        $printer->text($telp);
        $printer->text(" | ");
        $printer->text($domain);
        $printer->text("\n");

        $printer->text($lokasi);
        $printer->text("\n");
        $printer->text($alamat);
        $printer->text("\n");
        $printer->text("Pintu " . $gate . " | Offline | " . $kendaraan . "");
        $printer->text("\n");
        $printer->text($now);
        $printer->text("\n");

        $img = EscposImage::load("barcode/" . $notrans . ".png");

        $printer->bitImage($img, Printer::IMG_DOUBLE_WIDTH | Printer::IMG_DOUBLE_HEIGHT);
        $printer->feed();

        $printer->text("Selamat Datang\n");
        $printer->setPrintWidth(440);
        $printer->setPrintLeftMargin(60);
        $printer->text("\nDenda Tiket Hilang\nMotor : Rp 10K | Mobil : Rp 20K");
        $printer->text("\nDenda Inap\nMotor : Rp 50K | Mobil : Rp 100K");
        $printer->text("Kehilangan & Kerusakan Barang \nBukan Tanggungjawab Pengelola Parkir\n");
        $printer->setPrintWidth(350);
        $printer->setPrintLeftMargin(120);
        $printer->text($valuek);
        $printer->setPrintLeftMargin(0);
        $printer->setJustification();



        $printer->text("\n");
        $printer->text("\n");

        $printer->cut();
        $printer->close();
        unlink($filepath);
        // include "buka.php";
        $message = include_once("test.php");
        if ($message) {
            echo "GERBANG KEBUKA";
        }
        header("location:script.php");
        //header("location:voice.php?in=3");

    }
} else {
    //PRINT KARCIS BUKAN MEMBER

    $now = date("d F Y H:i:s");
    $now1 = date("YmdHis");

    $filepath = 'barcode/' . $notrans . '.png';
    $text = $notrans;
    $size = "40";
    $orientation = (isset($_GET["orientation"]) ? $_GET["orientation"] : "horizontal");
    $code_type = "Code39";
    $print = true;
    $sizefactor = (isset($_GET["sizefactor"]) ? $_GET["sizefactor"] : "1");


    barcode($filepath, $text, $size, $orientation, $code_type, $print, $sizefactor);
    if ($sps == true) {
        $now = date('Y-m-d H:i:s');
        $datad = mysqli_query($sp, "select deskripsiIklan from iklan where tanggalExp > '" . $now . "' order by idIklan desc limit 1 ");
        $loka = mysqli_query($sp, "select domain, telp from lokasi order by idlokasi desc limit 1 ");
        $lks = mysqli_fetch_array($loka);
        $iklan = mysqli_fetch_array($datad);
        $jum = mysqli_num_rows($datad);
        $telp = $lks['telp'];
        $domain = $lks['domain'];
        if ($jum > 0) {
            $valuek = $iklan['deskripsiIklan'];
        } else {
            $valuek = $iklan['deskripsiIklan'];
        }
        $st = 'Online';
    } else {
        $st = 'Offline';
        $valuek = $iklan['deskripsiIklan'];
    }
    $justification = array(Printer::JUSTIFY_CENTER);
    $logo = EscposImage::load("barcode/siu.jpg");

    $printer->setJustification($justification[0]);
    $printer->graphics($logo);
    $printer->text("\n" . $bold1 . " SIU PARKING" . $bold0 . "\n");
    $printer->text("==========================\n");
    $printer->text("PT. Sinar Indo Utama\n");

    $printer->text($telp);
    $printer->text(" | ");
    $printer->text($domain);
    $printer->text("\n");


    $printer->text($lokasi);
    $printer->text("\n");
    $printer->text($alamat);
    $printer->text("\n");
    $printer->text("Pintu " . $gate . " | " . $st . " | " . $kendaraan . "");
    $printer->text("\n");
    $printer->text($now);
    $printer->text("\n");

    $img = EscposImage::load("barcode/" . $notrans . ".png");

    $printer->bitImage($img, Printer::IMG_DOUBLE_WIDTH | Printer::IMG_DOUBLE_HEIGHT);
    $printer->feed();
    $printer->setPrintWidth(440);
    $printer->setPrintLeftMargin(60);
    $printer->setTextSize(1, 1);
    $printer->text("\nDenda Tiket Hilang\nMotor : Rp 10K | Mobil : Rp 20K");
    $printer->text("\nDenda Inap\nMotor : Rp 50K | Mobil : Rp 100K\n");
    $printer->text("Kehilangan & Kerusakan Barang \nBukan Tanggungjawab Pengelola Parkir\n");
    $printer->setPrintWidth(350);
    $printer->setPrintLeftMargin(120);
    $printer->text($valuek);
    $printer->setPrintLeftMargin(0);
    $printer->setJustification();



    $printer->text("\n");
    $printer->text("\n");

    $printer->cut();
    $printer->close();
    unlink($filepath);


    $sql = "INSERT INTO transaksimasuk 
(noTransaksi, masukTransaksi, image, stats, jenisKendaraan, pintuMasuk) VALUES
('" . $notrans . "', 
'" . $waktumasuk . "',
'" . $image . "',
'Y',
'" . $kendaraan . "',
'PM" . $gate . "')";



    if ($sps == TRUE) {
        $sql = "INSERT INTO transaksimasuk 
(noTransaksi, masukTransaksi, image, stats, jenisKendaraan, pintuMasuk) VALUES
('" . $notrans . "', 
'" . $waktumasuk . "',
'" . $image . "',
'Y',
'" . $kendaraan . "',
'PM" . $gate . "')";

        if ($sp->query($sql) == TRUE) {
            echo "Data Masuk";
        } else {
            echo "Server Offline";
        }
    } else {
        echo "Server Offline";
    }
    $message = include_once("test.php");
    if ($message) {
        echo "GERBANG KEBUKA";
    }
    
    header("location:script.php");
    //header("location:voice.php?in=3");

}
