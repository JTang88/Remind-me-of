import { observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'

class UserStore {
  @persist @observable name = ''
  @persist @observable id = ''
  @persist @observable pictureURL = ''

  @action insertUserInfo = ({ name, id, picture: { data: { url } } }) => {
    this.name = name
    this.id = id
    this.pictureURL = url
  }

}

const hydrate = create({
  storage: localStorage,   
  jsonify: true
})

// create the state
const userStore = new UserStore()

export default userStore;

hydrate('userStore', userStore)
  // post hydration
  .then(() => console.log('userStore hydrated'))