import React from "react";
import {
  Card,
  CardContent,
  withStyles,
  Typography,
  CardHeader,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from "@material-ui/core";
import { connect } from "react-redux";
import { getUser, getUserHistory } from "./Store/authentication/selectors";

const mapStateToProps = (state, ownProps) => {
  const user = getUser(state);
  const history = getUserHistory(state);
  const historyData = history && history.toJS();
  const { name } = ownProps;

  const dataToSend =
    historyData && historyData.filter(item => item.company === name)[0];
  const historyForCompany = dataToSend && dataToSend.history;
  const companyName = dataToSend && dataToSend.company;
  return {
    companyName,
    user: user && user.toJS(),
    history: historyForCompany
  };
};

const styles = {
  cardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "lightslategrey"
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingTop: "10px"
  },
  rowData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px"
  },
  header: {
    backgroundColor: "crimson",
    "& h6": {
      color: "white"
    }
  },
  card: {
    borderRadius: "6px",
    maxWidth: "45%"
  }
};

class History extends React.PureComponent {
  render() {
    const { classes, history, companyName } = this.props;
    console.log(history, companyName);
    return (
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h6"> {companyName}</Typography>}
          className={classes.header}
        />
        <CardContent className={classes.cardContent}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gallons Requested</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Suggested Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history &&
                history.map(element => (
                  <TableRow>
                    <TableCell>{element.gallons}</TableCell>
                    <TableCell>{element.delivery}</TableCell>
                    <TableCell>{element.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(History));
