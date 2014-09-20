<?php
$pin = 2623;
if(!exists($pin)){
	die("No such pin: $pin\n");
}

class WeirdProto {
	var $version = "1.0";
	var $minimumVersion = "0.9";
	var $txId = 1;
	var $rxId = 1;
	var $clientId = null;

	// timesync extension
	var $netlag = 0;
	var $clockoff = 0;
	var $keep_perc = 0.7;
	
	var $sock;
	function __construct($socket){
		$this->sock = $socket;
	}

	function send($data){
		echo "TX: $data\n";
		$data .= "\n";
		return fwrite($this->sock,$data,strlen($data));
	}
	function read(){
		$data = trim(fgets($this->sock));
		echo "RX: $data\n";
		return $data;
	}
	function ws_frame($data){
		$bin = "";
		$bin .= "\x81"; // 1000 0011 // fin 000  op1
		if(strlen($data>125)){
			if(strlen($data)<65536)
				$len = 126; // give me 16 bits kthx
			else
				$len = 127; // give me 64 freaking bits kthx
		} else $len = strlen($data);
		$bin .= chr(128 | $len);
		if($len==126){
			$a = strlen($data)/256; // upper
			$b = strlen($data)%256; // lower
			$bin .= chr($a).chr($b); // msb
		}
	}
	function timesync_send(){
		$ts = new stdClass();
		$ts->tc = $this->timestamp();
		$ts->l = $this->netlag;
		$ts->o = $this->clockoff;
		return $ts;
	}
	function timesync_recv($ts){
		$now = $this->timestamp();
		$lag = ($now-($ts->tc)-($ts->p))/2;
		$off = ($ts->ts)-($ts->tc)-$lag;

		if($this->netlag==0) $this->netlag = $lag;
		else $this->netlag = ($this->netlag*$this->keep_perc) + $lag*(1-$this->keep_perc);
		
		if($this->clockoff==0) $this->clockoff = $off;
		else $this->clockoff = ($this->clockoff*$this->keep_perc) + $off*(1-$this->keep_perc);
		$this->clockoff = intval($this->clockoff);
		$this->netlag = intval($this->netlag);
	}
	function timestamp(){
		return intval(microtime(1)*1000);
	}
	function encode_initial(){
		$object = new stdClass();
		$object->version = $this->version;
		$object->minimumVersion = $this->minimumVersion;
		$object->supportedConnectionTypes=array("websocket","long-polling");
		$object->advice = new stdClass();
		$object->advice->timeout=60000;
		$object->advice->interval=0;
		$object->channel = "/meta/handshake";
		$object->ext = new stdClass();
		$object->ext->ack=true;
		// timesync extension
		$object->ext->timesync = $this->timesync_send();
		return $this->encode($object);
	}
	function encode($object){
		$object->id = strval($this->txId++);
		if($this->clientId!==null) $object->clientId = $this->clientId;
		return json_encode(array($object));
	}
	function decode_initial($string){
		$data = $this->decode($string);
		if($data->minimumVersion>$this->version){
			return false; // Not new enough
		}
		unset($data->minimumVersion);
		if(!$data->successful) return false; // Not successful
		unset($data->successful);
		$this->clientId = $data->clientId;
		unset($data->clientId);
		unset($data->version);
		if($data->channel!="/meta/handshake") return false; // Wrong channel
		return $data;
	}
	function decode($string){
		$data = json_decode($string);
		$data = $data[0];
		if(intval($data->id) != $this->rxId){
			echo "$data->id != $this->rxId\n";
			return false; // Wrong message
		}
		if(isset($data->ext)){
			if(isset($data->ext->timesync)){
				$this->timesync_recv($data->ext->timesync);
				unset($data->ext->timesync);
			}
		}
		$this->rxId++;
		unset($data->id);
		return $data;
	}
}

cometd($pin);
//webapi($nick); // only a profanity filter, but we'll keep it just in case

function webapi($nick){
	$meh = "https://api1.webpurify.com/services/rest/?api_key=135d6f571ed76470aef59395ca137046&method=webpurify.live.return&format=json&lang=en&callback=angular.callbacks._0&text=$nick";
	echo curl_get($meh);
}
function cometd($pin){
	$url = "https://kahoot.it/cometd";
	$socket = get_ws($url, $pin);
	$w = new WeirdProto($socket);
	$w->send($w->encode_initial());

	while(!feof($socket)){
		echo trim(fgets($socket))."\n";
	}
	fclose($socket);
	return;


	$data = $w->read();
	print_r($w->decode_initial($data));
	
	while(!feof($socket)){
		$data = $w->read();
		print_r($w->decode($data));
	}
}
function exists($pin,$time=null){
	if($time===null) $time=time();
	$url = "https://kahoot.it/reserve/test/$pin/?$time";
	$data = curl_get($url);
	if($data=="false") return false;
	if($data=="true") return true;
	echo $data."\n";
	die("Weird response in exists()\n");
}

function get_ws($url, $pin){
	// 1: Connect
	$ur = parse_url($url);
	$scheme = $ur['scheme'];
	$transport = (($scheme=='https') ? 'ssl' : (($scheme=="http")?'tcp':false));
	if(!$transport) die("Invalid transport in get_ws: $scheme\n");

	if(!isset($ur['port'])){
		$port = ($transport=='ssl') ? 443:80;
	} else $port = $ur['port'];
	$host = $ur['host'];
	$rem_sock = "$transport://$host:$port";

	echo "Opening web socket to $rem_sock...\n";
	$sock = stream_socket_client($rem_sock);
	if(!$sock) die("Could not open socket\n");
	// 2: Make request
	if(!isset($ur['path'])) $path='/';
	else $path = $ur['path'];
	$key = "BX7J0WyxDXO8qGpcXzE8fg==";
	$req =	"GET $path HTTP/1.1\r\n".
		"Host: $host\r\n".
		"User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20131215 Firefox/24.0 Iceweasel/24.2.0\r\n".
		"Sec-WebSocket-Version: 13\r\n".
		"Sec-WebSocket-Key: $key\r\n".
		"Cookie: no.mobitroll.session=$pin\r\n".
		"Connection: keep-alive, Upgrade\r\n".
		"Upgrade: websocket\r\n".
		"\r\n";
	fwrite($sock,$req,strlen($req));

	// response
	$resp = trim(fgets($sock));
	if($resp!="HTTP/1.1 101 Switching Protocols") die("Not the response we were asking for in get_ws(): $resp\n");

	$headers = array();
	while(!feof($sock)){
		$resp = trim(fgets($sock));
		$a = substr($resp,0,strpos($resp,":"));
		$b = trim(substr($resp,strpos($resp,":")+1));
		if($resp=="") break;
		$headers[strtolower($a)]=$b;
	}
	if(!isset($headers['sec-websocket-accept'])) die("Contradiction :\\ server is capable of websocket, but is not setting the right header\n");
	$myresp = base64_encode(hexbin(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11")));
	$resp = $headers['sec-websocket-accept'];
	if($myresp!=$resp){
		die("Websocket server messed up the did-you-read-the-rfc challenge\n");
	}
	return $sock;
}
function curl_get($url){
	global $ch;
	if(!isset($ch)) $ch = curl_init();
	curl_setopt($ch, CURLOPT_VERBOSE, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20131215 Firefox/24.0 Iceweasel/24.2.0"));
	curl_setopt($ch, CURLOPT_URL, $url);
	$data = curl_exec($ch);
	return $data;
}
function hexbin($str){
	$bin = "";
	for($i=0;$i<strlen($str);$i+=2){
		$bin .= chr(hexdec(substr($str,$i,2)));
	}
	return $bin;
}
