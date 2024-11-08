const producers = [
  { id: 1, name: "Producer 1" },
  { id: 2, name: "Producer 2" },
  { id: 3, name: "Producer 3" },
  // other producers...
];

//Nhiều Id truyền vào
function getProducerNamesByIds(ids) {
  return ids.map((id) => {
    const producer = producers.find((producer) => producer.id === id);
    return producer ? producer.name : "Unknown Producer";
  });
}

// Example usage
const producerIds = [1, 3];
console.log(getProducerNamesByIds(producerIds)); // ["Producer 1", "Producer 3"]

//1 Id truyền vào
function getProducerNameById(id) {
  const producer = producers.find((producer) => producer.id === id);
  return producer ? producer.name : "Unknown Producer";
}

return <p>{getProducerNameById(movie.producer)}</p>;

{
  /* 
<td>{getProducerNameById(movie.producer)}</td>
<td>{getProducerNamesByIds(movie.producers).join(', ')}</td> 
*/
}
