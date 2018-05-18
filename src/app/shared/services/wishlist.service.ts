import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WishList } from '../entities/wish-list';
import { AngularFirestore } from 'angularfire2/firestore';
import { forEach } from '@angular/router/src/utils/collection';
import { Wish } from '../entities/wish';

@Injectable()
export class WishlistService {
  whislists: WishList[];
  list: WishList;
  constructor(private afs: AngularFirestore) {
  }

  getWishLists(uid: string):  Observable<any> {

   let ref =  this.afs.collection
   ('wishlist', ref => ref.where('owner', '==', uid));
       return ref.snapshotChanges().map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as WishList;
          data.id = a.payload.doc.id;
          return data;
        })
       });
  }

  createWishlist(list: WishList): Promise<any>{
    if (list != null) {
      console.log("list in serivce:" + list);
      const collection = this.afs.collection<any>('wishlist');
      return collection.add({owner: list.owner, wListName: list.wListName});

    } else {
      return new Promise((resolve, reject) => {
        reject('Value is not a valid');
      });
    }
  }
  updateWishList(list: WishList): Promise<any>{
    return this.afs.collection('wishlist').doc(list.id).update({owner: list.owner, wListName: list.wListName});
  }

  deleteWishList(list: WishList): Promise<any>{
    return this.afs.collection('wishlist').doc(list.id).delete();
  }
}