# rm network@0.0.1.bna
rm networkadmin.card
rm Seller@network.card

echo 'remove done'

# Generate .bna file
composer archive create -t dir -n .

# Install network from file
composer network install -c PeerAdmin@hlfv1 -a network\@0.0.1.bna

# OR Upgrade network
#composer network upgrade -c PeerAdmin@hlfv1 -n NETWORK-NAME -V NETWORK-VERSION

# Start network and create network admin with card
composer network start -n network -V 0.0.1 -A admin -S adminpw -c PeerAdmin@hlfv1 -f networkadmin.card
composer card import -f networkadmin.card
composer network ping -c admin@network

# Add Seller
composer participant add -c admin@network -d '{"$class":"org.acme.model.Person", "name": "Seller", "type": "Seller"}'
composer identity issue -u Seller -a org.acme.model.Person#Seller -c admin@network
#composer card import -f Seller\@network.card 

# Add Buyer
#composer participant add -c admin@network -d '{"$class":"org.acme.model.Person", "name": "Buyer", "type": "Buyer"}'
#composer identity issue -u Buyer -a org.acme.model.Person#Buyer -c admin@network
#composer card import -f Buyer\@network.card 

