# parcel-plugin-jsonpack

[Parcel](https://github.com/parcel-bundler/parcel) plugin that uses [jsonpack](https://github.com/rgcl/jsonpack) to pack imported json files into much smaller strings. You can then unpack the string client-side. This plugin is useful if you have large amounts of JSON data with long keys to send. jsonpack itself is around 7kb minifed but can save even up to 50% of the JSON size.

* * *

### Installation and usage:

`npm install --save-dev parcel-plugin-jsonpack`  
`npm install --save jsonpack`  

Test

`npm run test`  

Usage:
```javascript
    import jsonData from "./data.json";
    import jsonpack from "jsonpack";

    const data = jsonpack.unpack(jsonData);
```

* * *

### Is there something wrong?

Please tell me!