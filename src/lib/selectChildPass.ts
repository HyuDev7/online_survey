export default function selectChildPass(
  childpass1: string,
  childpass2: string,
  childpass3?: string
) {
  //choose next path randomly
  if (childpass3) {
    const randomValue = Math.random() * 3;
    if (randomValue < 1) {
      return childpass1;
    } else if (randomValue < 2) {
      return childpass2;
    } else {
      return childpass3;
    }
  } else {
    const randomValue = Math.random();
    if (randomValue < 0.5) {
      return childpass1;
    } else {
      return childpass2;
    }
  }
}
