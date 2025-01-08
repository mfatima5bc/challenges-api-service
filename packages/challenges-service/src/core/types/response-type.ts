// Error
export class Error<E, S> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  get data(): E {
    if (this.isError()) return this.value as E;
    throw new Error('Cannot get error from a Success');
  }

  isSuccess(): this is Success<E, S> {
    return false;
  }

  isError(): this is Error<E, S> {
    return true;
  }
}

// Success
export class Success<E, S> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  get data(): S {
    if (this.isSuccess()) return this.value as S;
    throw new Error('Cannot get data from a Failure');
  }

  isSuccess(): this is Success<E, S> {
    return true;
  }

  isError(): this is Error<E, S> {
    return false;
  }
}

export type ResponseType<E, S> = Error<E, S> | Success<E, S>;

export const error = <E, S>(value: E): ResponseType<E, S> => {
  return new Error<E, S>(value);
};

export const success = <E, S>(value: S): ResponseType<E, S> => {
  return new Success<E, S>(value);
};
