'use strict';
(function () {

    var component = {
        binding: {
            currency: '=',
            amount: '='
        },
        controllerAs: '$currency',
        controller: ['$scope', 'bitcoinService', function ($scope, service) {
            var _this = this;
            this.$onInit = function () {
                _this.selectedCurrency = null;
                _this.amount = 1;
                _this.price = 0;
                _this.currency = 0;
                _this.prices = null;
                $('select').material_select();

                _this.onChange = function () {
                    console.log(_this.selectedCurrency);
                    service.current().then(function (res) {
                        _this.prices = res;
                        _this.price = _this.currency = res[_this.selectedCurrency].bid;
                    });
                };

            };

            $scope.$parent.$watch('$currency.amount', function (value) {
                console.log(value);
            });

            $scope.$watch(function () {
                    return _this.amount;
                },
                function (newValue, oldValue) {
                    if (_this.selectedCurrency) {
                        _this.price = _this.currency * newValue;
                    }
                }
            );

            $scope.$watch(function () {
                    return _this.price;
                },
                function (newValue, oldValue) {
                    if (_this.selectedCurrency) {
                        var price = _this.prices[_this.selectedCurrency].bid;
                        _this.amount =  price === newValue ? 1 : Math.ceil(_this.price / price);
                    }
                }
            );
        }],
        template: `
            <div class="col s6 input-field">
                <select class="browser-default" ng-change="$currency.onChange()" ng-model="$currency.selectedCurrency">
                    <option value="" disabled selected>Choose your currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                </select>
                <pre></pre>
                <input placeholder="Current Price" id="any_number" class="browser-default" type="number" ng-model="$currency.amount" />

            </div>

            <div class="input-field col s6">
              <input placeholder="Btc Price" id="btc_any_number" class="browser-default" type="number" ng-model="$currency.price" />
              <label for="icon_prefix2">BTC Price</label>
            </div>
        
            <div class="col s6">
            
               
            </div>
        `
    };

    angular.module('tms-bitcoin').component('currency', component);
})();