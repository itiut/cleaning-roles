import shortid from 'shortid';

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle (array) {
  for (let i = 0; i < array.length - 1; i++) {
    const j = randomInt(i, array.length);
    if (i !== j) {
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

class Items {
  constructor (key, values = []) {
    this.key = key;
    this.data = values.map(this.constructor.toItem);
  }

  static toItem (value) {
    return { value, id: shortid.generate() };
  }

  add (value) {
    this.data.push(this.constructor.toItem(value));
  }

  change (index, valueOrProps) {
    if (index < 0 || index > this.data.length) {
      return;
    }
    if (index === this.data.length) {
      this.add(valueOrProps);
      return;
    }
    if (valueOrProps !== undefined) {
      this.update(index, valueOrProps);
      return;
    }
    this.delete(index);
  }

  delete (index) {
    this.data.splice(index, 1);
  }

  kvPairs () {
    return this.data.map(item => [this.key, item.value]);
  }

  /**
   * Create random surjective mapping from IDs to other Items' values
   * @param {Items} other
   * @param {(any) => boolean} filterFn
   */
  randomMapping (other, filterFn = () => true) {
    const data = this.data.filter(filterFn);
    const otherData = other.data.filter(filterFn);
    if (otherData.length > data.length) {
      // can't create surjective mapping
      return null;
    }

    if (otherData.length < data.length) {
      otherData.length = data.length;
    }
    shuffle(otherData);
    const mapping = {};
    for (const [index, { id }] of data.entries()) {
      if (otherData[index]) {
        mapping[id] = otherData[index].value;
      }
    }
    return mapping;
  }

  swap (i, j) {
    if (i < 0 || j < 0 || i > this.data.length || j > this.data.length || i === j) {
      return;
    }
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  update (index, props) {
    this.data[index] = { ...this.data[index], ...props };
  }
}

export default Items;
