export default function selectChildPass(
  childpass1: string,
  childpass2: string
) {
  //choose next path randomly
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return childpass1;
  } else {
    return childpass2;
  }
}
