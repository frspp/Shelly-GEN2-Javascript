// Shelly GEN2 script: HTTP POST - Send energy meter watts to Thingspeak cloud

// Settings 
let tsapikey = "WRITEAPIKEY"; // Copy from Thingspeak.com > Channels > Channel > API Keys > Write API key
let tsjsonurl = "https://api.thingspeak.com/update.json"; // Server url
let interval = 5 * 60 * 1000; // Define timespan: Minutes * 60 sec * 1000 milliseconds

// Assign watts to variable
let status = Shelly.getComponentStatus("switch", 0);
let watts = status.apower;
print(watts);
// watts = 5;

// Create JSON
let tsjson = {
	"api_key": tsapikey,
	"field1": watts
};

// Create timer which sends the HTTP POST
Timer.set(
  interval,
  true,
  function () {Shelly.call("HTTP.POST", {"url": tsjsonurl, "body": tsjson, "timeout": 5});}
);
