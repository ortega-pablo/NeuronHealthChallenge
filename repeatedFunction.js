const numbers = [1, 5, 1, 2, 3, 6, 5, 1, 2, 4, 5, 8, 5, 4, 7, 5, 1, 2, 1, 2, 2];

const repeated = (array) => {
  array.sort();
  const repetitions = [];
  let mostRepeated = [];
  let counter = 1;
  let max = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === array[i + 1]) {
      counter += 1;
    } else {
      repetitions.push({ numero: array[i], repeticiones: counter });
      if (counter > max) {
        max = counter;
        mostRepeated = [array[i]];
      } else if (counter === max) {
        mostRepeated.push(array[i]);
      }
      counter = 1;
    }
  }
  // eslint-disable-next-line no-console
  console.log('El array ingresado es: ', array);
  // eslint-disable-next-line no-console
  console.log('El arreglo de incidencias es: ', repetitions);
  // eslint-disable-next-line no-console
  console.log('El/los número/s que más se repite/n es/son: ', mostRepeated);
};

repeated(numbers);
