'use strict';

/**
 * SetProductOnSale
 * @param {org.acme.model.SetProductOnSale} set transaction instance.
 * @transaction
 */
function setProductOnSale(set) {
    return getAssetRegistry('org.acme.model.ProductOnSale')
        .then(function (registry) {
          var factory = getFactory();
            var Asset = factory.newResource(
              'org.acme.model',
              'ProductOnSale',
              set.product.productId
            );
            Asset.owner = set.product.owner;
            Asset.price = set.price;
            Asset.blocked = false;
            return registry.add(Asset);
        });
}
/**
 * Buy transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function makeRequestToBuy(buy) {
    return getAssetRegistry('org.acme.model.Requests')
        .then(function (registry) {
          var factory = getFactory();
            var Asset = factory.newResource(
              'org.acme.model',
              'Requests',
              buy.product.productId
            );
            Asset.product = buy.product;
            Asset.buyer = buy.buyer;
            return registry.add(Asset);
        });
}
/**
 * Buy transaction processor function.
 * @param {org.acme.model.Buy} buy transaction instance.
 * @transaction
 */
function makeRequestToBlockProduct(buy) {
    var asset = buy.product;
    asset.blocked = true;
    // Get the asset registry that stores the assets. Note that
    // getAssetRegistry() returns a promise, so we have to return
    // the promise so that Composer waits for it to be resolved.
    return getAssetRegistry('org.acme.model.ProductOnSale')
        .then(function (assetRegistry) {
            return assetRegistry.update(asset);
        });
}