import { makeStyles } from "@material-ui/core/styles"
export function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}
export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxwidth: "100%",
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid lightblue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
