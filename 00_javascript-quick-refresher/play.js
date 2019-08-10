const person = {
  name: 'Tajib',
  age: 23,
  greet() {
    console.log('Hi I am ' + this.name)
  }
}
person.greet()

const copoedObject = {...person}
console.log(copoedObject)


const hobbies = ['Cinema', 'Reading']
for (let hobby of hobbies) {
  console.log(hobby)
}

const coppiedArray = [...hobbies]
console.log( coppiedArray)

const toArray = (...args) => {
  return args
}
console.log(toArray(1, 2, 3, 4, 5, 6))


const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
    });
}, 2000);

console.log('Hello!');
console.log('Hi!');
