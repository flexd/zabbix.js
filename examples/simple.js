var z = require ('../lib/zabbix');

var zabbix = new z.Client('http://zabbix.test.sparebank1.no/api_jsonrpc.php','e3130', 'zabbix');

zabbix.getApiVersion(function (err, resp, body) {
  if (!err) {
    console.log("Unauthenticated API version request, and the version is: " + body.result)
  }
});
zabbix.authenticate(function (err, resp, body) {
  if (!err) {
    console.log("Authenticated! AuthID is: " + zabbix.authid);
  }
  // Unless there are any errors, we are now authenticated and can do any call we want to! :)

  zabbix.getApiVersion(function (err, resp, body) {
    console.log("Zabbix API version is: " + body.result);
  });
  zabbix.call("host.get",
    {
    "search" : {"host" : ""},
    "groupids" : "2",
    "output" : "extend",
    "sortfield" : "host",
    "searchWildcardsEnabled" : 1
    }
    ,function (err, resp, body) {
      if (!err) {
        console.log(resp.statusCode + " result: " + JSON.stringify(body.result[0]));
      }
    });
});






