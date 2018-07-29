import { observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'

class Thought {
  @persist @observable _id = ''
  @persist @observable text = ''
  @persist @observable createdAt = ''
  @persist @observable updatedAt = ''
}

class UserStore {
  @persist('list', Thought) @observable thoughts = [];
  @persist @observable name = ''
  @persist @observable id = ''
  @persist @observable pictureURL = ''
  @persist @observable from = ''
  @persist @observable to = ''
  @persist @observable freq = ''


  @action updateProp = (propName, newProp) => {
    this[propName] = newProp;
  }

  @action insertUserInfo = ({ name, id, picture: { data: { url } } }) => {
    this.name = name
    this.id = id
    this.pictureURL = url
  }

  @action initalizeUser = ({ thoughts, from, to, freq }) => {
    this.from = from
    this.to = to
    this.freq = freq
    thoughts.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    this.thoughts = thoughts
  }

  @action deleteThought = (thoughtId) => {
    for (let i = 0; i < this.thoughts.length; i++) {
      if (this.thoughts[i]._id === thoughtId) {
        this.thoughts.splice(i, 1)
      }
    }
  }

  @action addThought = (thought) => {
    this.thoughts.unshift(thought)
  }

  @action getThought = (thoughtId) => {
    for (let i = 0; i < this.thoughts.length; i++) {
      if (this.thoughts[i]._id === thoughtId) {
        return this.thoughts[i].text
      }
    }
  }

  @action replaceThought = (thought) => {
    this.deleteThought(thought._id)
    this.addThought(thought)
  }

  @action updateReminds = ({ from, to, freq }) => {
    console.log('here are info', from, to, freq)
    this.from = from
    this.to = to
    this.freq = freq
  }
}

const hydrate = create({
  storage: localStorage,   
  jsonify: true
})

// create the state
const userStore = new UserStore()

hydrate('userStore', userStore)
  // post hydration
  .then(() => console.log('userStore hydrated'))

export default userStore;
