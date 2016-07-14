(function () {
    var service = function ($http, $q) {
        var baseUrl = 'https://api.bitcoinaverage.com/ticker/all';

        this.get = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl
            }).then(function (response) {
                deferred.resolve(response.data);
            }).then(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        return {
            current: this.get
        }
    };
    angular.module('tms-bitcoin').service('bitcoinService', ['$http', '$q', service]);
})();
