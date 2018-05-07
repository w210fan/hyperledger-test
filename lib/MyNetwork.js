const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const IdCard = require('composer-common').IdCard;
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const AdminConnection = require('composer-admin').AdminConnection;

var adminConnection = new AdminConnection();

class MyNetwork {
    constructor(cardName) {
      this.currentParticipantId;
      this.cardName = cardName;
      this.connection = new BusinessNetworkConnection();
    }
    init() {
        var _this = this;
        return this.connection.connect(this.cardName).then((result) => {
            _this.businessNetworkDefinition = result;
            _this.serializer = _this.businessNetworkDefinition.getSerializer()
        })
    }
    ping() {
        var _this = this;
        return this.connection.ping().then(function (result) {
            return result
        })
    }
    logout() {
        var _this = this;
      
        return this.ping().then(function(){
          return adminConnection.deleteCard(_this.cardName)
        })
    }

    static importCardToNetwork(cardData) {
        var data, name;
        var businessNetworkConnection = new BusinessNetworkConnection();
      
        return IdCard.fromArchive(cardData).then(function(idCardData) {
          data = idCardData;
          return BusinessNetworkCardStore.getDefaultCardName(idCardData)
        }).then(function(idCardName) {
          name = idCardName;
          return adminConnection.importCard(name, data);
        }).then(function(imported) {
            return businessNetworkConnection.connect(name)
        }).then(function(businessNetworkDefinition){
          if (!businessNetworkDefinition) {
            console.log('business: ', businessNetworkDefinition);
            return null;
          }
          return name;
        })
      }
}

module.exports = MyNetwork;