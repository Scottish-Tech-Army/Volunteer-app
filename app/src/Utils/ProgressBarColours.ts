/**
 * @desc This file contains the functions that are used to change the colour of the progress bar
 */

type ProgressBarColors = {
  box1: string
  box2: string
  box3: string
  box4: string
}

export const progressBarColors = (currentBox: number): ProgressBarColors => {
  return {
    box1: currentBox >= 1 ? 'purple.20' : 'secondaryGrey.80',
    box2: currentBox >= 2 ? 'purple.20' : 'secondaryGrey.80',
    box3: currentBox >= 3 ? 'purple.20' : 'secondaryGrey.80',
    box4: currentBox >= 4 ? 'purple.20' : 'secondaryGrey.80',
  }
}

export const changeScreen = (
  currentBox: number,
  setCurrentBox: (value: number) => void,
) => {
  if (currentBox < 4) {
    setCurrentBox((value: number) => value + 1)
  }
}

export const goBackScreen = (
  currentBox: number,
  setCurrentBox: (value: number) => void,
) => {
  if (currentBox > 1) {
    setCurrentBox(value => value - 1)
  }
}
