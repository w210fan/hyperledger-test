'use strict';

/**
 * setProductToSale transaction processor function.
 * @param {org.acme.model.setProductToSale} set transaction instance.
 * @transaction
 */
function setProductToSale(set) {
    var asset = set.product;
    asset.isOnSale = true;
    return getAssetRegistry('org.acme.model.Product')
        .then(function (assetRegistry) {
            return assetRegistry.update(asset);
        });
}
/**
 * buyerBlockProduct transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function buyerBlockProduct(buy) {
    var asset = buy.product;
    asset.isBlocked = true;
    return getAssetRegistry('org.acme.model.Product')
        .then(function (assetRegistry) {
            return assetRegistry.update(asset);
        });
}
/**
 * BankValidateBalans transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function BankValidateBalans(buy) {
    var price = buy.product.price;
    var owner = buy.newowner;
    return query('selectAccount', {'owner' : owner})
        .then(function (results) {
            if (results[0].balans < price) {
                throw new Error('Не достаточно баланса');
            }
        };
}
/**
 * BankValidateBlock transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function BankValidateBlock(buy) {
    var product = buy.product;
    if (product.isBlocked == false) {
        throw new Error('Товар не заблокирован');
    }
    return;
}
/**
 * BankProcessAccountBuyer transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function BankProcessAccountBuyer(buy) {
    var price = buy.product.price;
    var owner = buy.newowner;
    return getAssetRegistry('org.acme.model.Account')
        .then(function (assetRegistry) {
            return query('selectAccount', {'owner' : owner})
                .then(function (results) {
                    var asset = results[0];
                    asset.balans = asset.balans - price;
                    return assetRegistry.update(asset);
                });
        });
}
/**
 * BankProcessAccountSeller transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function BankProcessAccountSeller(buy) {
    var price = buy.product.price;
    var owner = buy.product.owner;
    return getAssetRegistry('org.acme.model.Account')
        .then(function (assetRegistry) {
            return query('selectAccount', {'owner' : owner})
                .then(function (results) {
                    var asset = results[0];
                    asset.balans = asset.balans + price;
                    return assetRegistry.update(asset);
                });
        });
}
/**
 * setProductNewOwner transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function setProductNewOwner(buy) {
    var asset = buy.product;
    asset.owner = buy.newowner;
    return getAssetRegistry('org.acme.model.Product')
        .then(function (assetRegistry) {
            return assetRegistry.update(asset);
        });
}
