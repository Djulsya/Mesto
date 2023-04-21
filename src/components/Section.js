export default class Section {
  constructor({ item, renderer }, elementsAlbum) {
    this._renderItems = item;
    this._renderer = renderer;
    this._elements = document.querySelector(elementsAlbum);
  };

  addItems(element) {
    this._elements.prepend(element);
  };

  asd() {
    this._renderItems.reverse().forEach((item) => this._renderer(item));
  };
}