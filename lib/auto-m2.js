'use babel';

import AutoM2View from './auto-m2-view';
import { CompositeDisposable } from 'atom';

export default {

  autoM2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.autoM2View = new AutoM2View(state.autoM2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.autoM2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'auto-m2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.autoM2View.destroy();
  },

  serialize() {
    return {
      autoM2ViewState: this.autoM2View.serialize()
    };
  },

  toggle() {
    console.log('AutoM2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
