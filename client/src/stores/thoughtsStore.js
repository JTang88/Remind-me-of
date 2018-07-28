import { observable, action, toJS } from 'mobx'
import { create, persist } from 'mobx-persist'

class Thought {
  @persist @observable _id = ''
  @persist @observable text = ''
  @persist @observable createdAt = ''
  @persist @observable updatedAt = ''

}

class ThoughtsStore  {

  @persist('list', Thought) @observable thoughts = [];

  @action initalizeThoughts = (thoughts) => {
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

  @action replaceThought = (thoughtId, text, updatedAt) => {
    for (let i = 0; i < this.thoughts.length; i++) {
      if (this.thoughts[i]._id === thoughtId) {
        this.thoughts[i].text = text;
        this.thoughts[i].updatedAt = updatedAt;
      }
    }
  }

}

const hydrate = create({
  storage: localStorage,
  jsonify: true
})

// create the state
const thoughtsStore  = new ThoughtsStore()

export default thoughtsStore 

hydrate('thoughtsStore ', thoughtsStore )
  // post hydration
  .then(() => console.log('thoughtsStore  hydrated'))