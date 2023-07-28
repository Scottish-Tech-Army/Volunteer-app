/**
 * @file This file contains the functions that are used to change the colour of the progress bar
 */

// type for the colours of the progress bar
type ProgressBarColors = {
  box1: string
  box2: string
  box3: string
  bgColor: string
}

/**
 *
 * @param currentBox
 * @param bgColor
 * @returns  {ProgressBarColors} - returns the colours for the progress bar
 */

export const getProgressBarColors = (
  currentBox: number,
  bgColor: string,
): ProgressBarColors => {
  const boxes = ['#F1F1F1', '#F1F1F1', '#F1F1F1'] // default colour for all boxes while the user is on the same screen
  for (let i = 0; i < currentBox; i++) {
    boxes[i] = bgColor
  }

  return {
    box1: boxes[0],
    box2: boxes[1],
    box3: boxes[2],
    bgColor: boxes[3] === bgColor ? bgColor : '#F1F1F1',
  }
}

export const nextScreen = (
  currentBox: number,
  setCurrentBox: (value: number) => void,
) => {
  if (currentBox < 4) {
    setCurrentBox(currentBox + 1)
  }
}

//return to previous screen and update progress bar. Not used currently but can be used in future
export const goBackScreen = (
  currentBox: number,
  setCurrentBox: (value: number) => void,
) => {
  if (currentBox > 1) {
    setCurrentBox(currentBox - 1)
  }
}
