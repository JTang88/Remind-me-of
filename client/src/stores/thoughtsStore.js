import { observable, action, toJS } from 'mobx'
import { create, persist } from 'mobx-persist'

class Thought {
  @persist @observable _id = ''
  @persist @observable text = ''
}

class ThoughtsStore  {

  @persist('list', Thought) @observable thoughts = [];

  @action initalizeThoughts = (thoughts) => {
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

  @action replaceThought = (thoughtId, text) => {
    for (let i = 0; i < this.thoughts.length; i++) {
      if (this.thoughts[i]._id === thoughtId) {
        this.thoughts[i].text = text;
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