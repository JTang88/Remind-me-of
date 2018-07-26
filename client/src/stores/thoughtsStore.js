import { observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'

class Thought {
  @persist @observable _id = ''
  @persist @observable text = ''
}

class ThoughtsStore  {
  @persist('list', Thought) @observable thoughts = [];

  @action initalizeThoughts = (thoughts) => {
    this.thoughts = thoughts
    console.log('here are thougths after initalization', this.thoughts)
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