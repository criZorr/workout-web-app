export default async function getData(url) {
  let res = await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .catch((err) => console.log(err));

  return res;
}
