class Elemento {
  constructor(value = 0, next = null) {
    this.next = next;
    this.value = value;
  }
}

export class FilaCircular {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  queue(elemento) {
    const el = new Elemento(elemento);

    if (this.size === 0) {
      this.last = el;
      this.first = el;
      this.first.next = this.last; // Torna a fila circular
    } else {
      this.last.next = el;
      this.last = el;
      this.last.next = this.first; // Torna a fila circular
    }

    this.size += 1;
  }

  dequeue(rodadas) {
    if (this.size === 0) {
      return -1;
    }

    let atual = this.first;

    for (let i = 0; i < rodadas; i++) {
      if (rodadas - 1 === i) {
        if (atual.next.value === this.first.value) {
          this.first = atual.next.next;
        }
        const aux = atual.next;
        atual.next = atual.next.next;
        this.size -= 1;
        return aux.value;
      }

      atual = atual.next;
    }
  }

  toString() {
    let fila = "";
    let atual = this.first;

    for (let i = 0; i < this.size; i++) {
      if (i === this.size - 1) {
        fila = fila + atual.value + ".";
      } else {
        fila = fila + atual.value + ", ";
      }

      atual = atual.next;
    }

    return fila;
  }

  toArray() {
    let array = [];
    let atual = this.first;

    for (let i = 0; i < this.size; i++) {
      array.push(atual.value);

      atual = atual.next;
    }

    return array;
  }
}
