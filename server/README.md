## Initial step
After checkout edit below files as per your preoject details

* **package.json** : edit name, contributors section
* **apidoc.json** : edit name, description section
* **express_server\config\index.js** : edit app_name, port, etc



## Run below command to create api documentation
```
apidoc -i express_server\api\  -o express_server\apidocs\ 
```
## References
* [apidocs](http://apidocjs.com/) - to create api documentation
* [node-mysql](https://github.com/felixge/node-mysql) - to write mysql queries  

Trobleshooting
------------------------------------------------------------
"Error: Cannot find module '../build/Release/bson'"
Got it fixed by below steps :

1. Create folder "Release" inside "node_modules\bson\build\" location
2. Copy bson.js from "node_modules\bson\browser_build\"
3. Paste bson.js inside "node_modules\bson\build\Release" folder.