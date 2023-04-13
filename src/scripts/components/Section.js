export class Section {
  constructor({ items, renderer }, elementsAlbum) {
    this._renderItems = items;
    this._renderer = renderer;
    this._elementsAlbum = elementsAlbum;
  };

  renderItems() {
    this._renderItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  };

  addItems(elements) {
    this._elementsAlbum.prepend(elements);
  };
};