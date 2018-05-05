import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.model{
   export class Product extends Asset {
      productId: string;
      owner: Person;
      isOnSale: boolean;
      isBlocked: boolean;
      price: number;
   }
   export class Account extends Asset {
      accountId: string;
      balans: number;
      bank: Bank;
      owner: Person;
   }
   export enum PersonType {
      Seller,
      Buyer,
   }
   export class Person extends Participant {
      name: string;
      type: PersonType;
   }
   export class Bank extends Participant {
      bankId: string;
   }
   export class setProductToSale extends Transaction {
      product: Product;
   }
   export class Buy extends Transaction {
      product: Product;
      newowner: Person;
   }
// }
