var when = require('when');
var fs = require('fs');

/*
var getFile2 = function(file) {

    return when.promise(function(resolve, reject, notify) {

        fs.readFile(file, 'utf8', function(err, data) {
            if (err) reject(err);
            if (data) resolve(data);
        });
    });
};

var promisedFile = getFile2('./manifest2.json');

promisedFile.then(function(data) {
    console.log(data);
    console.log('here');
});

promisedFile.catch(function(err) {
    console.log(err);
});

*/



function getFile4(path) {
    var d = when.defer();
    fs.readFile(path, 'utf8', function(err, data) {
            if (err) return d.reject(err);
            if (data)  return d.resolve(data);
        });
    return d.promise;


}



var promise2 = when.try(getFile4, './manifest2.json');

promise2.done(function(data) { console.log(data); }, function(err) { console.log(err); });
